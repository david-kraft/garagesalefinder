//  Import Express and create router
var express = require("express");
var router = express.Router();

// Import the model to use its database functions
var db = require("../models");

// Import moment JS
var moment = require('moment');


// Get all sale events and send home page 
router.get("/", function (req, res) {
  db.sale_event.findAll({
    order:['date']
  })
    .then(function (data) {
      var hbsObject = {
        sale: datefmt(data)
      };
      res.render("index", hbsObject);
    });
});

// Sell page route
router.get("/sell", function (req, res) {
  res.render("sell");
});

// Post into Sale_event DB
router.post("/api/sale", function (req, res) {
  db.sale_event.create(req.body).then(function (dbSale) {
    res.json(dbSale);
  });
});

// Routing for each sale even page
router.get("/listing/:id", function (req, res) {
  db.sale_event.findAll({
    where: {
      id: req.params.id
    },
    include: [{
      model: db.item,
      where: { rank: { [db.Op.gt]: 0 } }
    }]
  }).then(function (data) {
    getLatLng(data, function (results) {
      var fmtdata = datefmt(data)
      var hbsObject = {
        sale: fmtdata[0],
        geocds: results
      }
      res.render("listing", hbsObject);
    })
  });
});

// Post into items DB
router.post("/api/additems/:id", function (req, res) {
  db.item.destroy({
    where: {
      sale_event_id: req.params.id
    }
  })
    .then(function (data) {
      db.item.bulkCreate(req.body.items)
        .then(function (dbitems) {
          res.json(dbitems);
        });
    })
});

// Routing for managing the sale items of the event
router.get("/manageitems/:id", function (req, res) {
  var hbsObject = { id: req.params.id }
  res.render("manageitems", hbsObject);
});


// Routing for user listings
router.get("/mylistings", function (req, res) {
  db.sale_event.findAll({})
    .then(function (data) {
      var hbsObject = {
        listing: datefmt(data)
      };
      res.render("mylistings", hbsObject);
    });
});


// Delete listing
router.post("/api/delete/:id", function (req, res) {

  db.sale_event.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(function (data) {
      res.json(data);
    })
});

// Routing for each sale even page
router.get("/editlisting/:id", function (req, res) {
  db.sale_event.findAll({
    where: {
      id: req.params.id
    }
  }).then(function (data) {
    var fmtdata = datefmt(data)
    var hbsObject = {
      sale: fmtdata[0]
    }
    res.render("editlisting", hbsObject);
  });
});

// PUT Request - Update Sale_event DB
router.put("/api/sale", function (req, res) {
  db.sale_event.update(
    req.body,
    {
      where: {
        id: req.body.id
      }
    }).then(function (dbPut) {
      res.json(dbPut);
    });
});

// Get all sale events based on state & city 
router.get("/find/:state/:city", function (req, res) {
  db.sale_event.findAll({
    where: {
      city: req.params.city,
      state: req.params.state
    }
  })
    .then(function (data) {
      if (data.length > 0) {
        getLatLng(data, function (results) {
          var hbsObject = {
            city: req.params.city,
            state: req.params.state,
            sale: datefmt(data),
            geocds: results
          };
          res.render("find", hbsObject);
        });
      } else {
        var hbsObject = {
          city: req.params.city,
          state: req.params.state,
          sale: datefmt(data)
        };
        res.render("find", hbsObject);
      }
    });
});

// Get all sale events based on state 
router.get("/find/:state", function (req, res) {
  db.sale_event.findAll({
    where: {
      state: req.params.state
    }
  })
    .then(function (data) {
      if (data.length > 0) {
        getLatLng(data, function (results) {
          var hbsObject = {
            city: "All Cities",
            state: req.params.state,
            sale: datefmt(data),
            geocds: results
          };
          res.render("find", hbsObject);
        });
      } else {
        var hbsObject = {
          city: "All Cities",
          state: req.params.state,
          sale: datefmt(data)
        };
        res.render("find", hbsObject);
      }
    });
});

// Function to add formatted date & time to display on listing pages
function datefmt(arr) {
  arr.forEach(element => {
    element.fmtdate = moment(element.date).format('MM/DD/YYYY');
    element.fmtdate1 = moment(element.date).format('ddd Do MMM YYYY');
    element.fmtsttime = moment(element.start_time).local().format("HH:mm");
    element.fmtsttime1 = moment(element.start_time).local().format("h:mm A");
    element.fmtendtime = moment(element.end_time).local().format("HH:mm");
    element.fmtendtime1 = moment(element.end_time).local().format("h:mm A");
  });
  return arr
};


// Require google maps

var googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_APIKEY,
  Promise: Promise
});

// Get coordinates from the DB search results.
var getLatLng = function (data, callback) {

  var coords = [];

  data.forEach(function (item) {

    var resultobj = {};
    resultobj.cmpaddress = item.address + ", " + item.city + ", " + item.state;

    googleMapsClient.geocode({ 'address': resultobj.cmpaddress })
      .asPromise()
      .then((response) => {
        resultobj.lat = response.json.results[0].geometry.location.lat;
        resultobj.lng = response.json.results[0].geometry.location.lng;
        coords.push(resultobj);
        // all addresses have been processed
        if (coords.length === data.length) {
          callback(coords);
        }
      })
      .catch((err) => {
        console.log(err);
      });

  });
}

// Export routes for server.js to use.
module.exports = router;
