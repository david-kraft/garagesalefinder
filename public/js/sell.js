// Once the DOM is fully loaded.
$(function () {

    // on submit , post the request

    $(".create-form").on("click", "#sellerBtn", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        var address = $("#address").val().trim();
        var city = $("#city").val().trim();
        var state = $("#state").val().trim();
        var zip = parseInt($("#zipcode").val().trim());
        var comments = $("#comments").val().trim();
        var starttime = $("#start-time").val().trim();
        var endtime = $("#end-time").val().trim();
        var dbDate = $("#date").val().trim();

        //Check for valid input
        if (address == "" || state == "" || zip == "" || city == "" || isNaN(zip)) {
            $('#eModalBody').text('Invalid Street/City/State/Zip, Please retry with valid input!');
            $("#eModalCenter").modal();
            return false;
        }

        //check if date format is correct
        if (!moment($("#date").val().trim(), "M/D/YYYY", true).isValid()) {
            $('#eModalBody').text('Invalid date, Please retry with valid input!');
            $("#eModalCenter").modal();
            return false;
        }
        dbDate = moment(dbDate).format('YYYY-MM-DD');

        // Please ask user to provide comments
        if (comments == "") {
            $('#eModalBody').text('Please provide some description!');
            $("#eModalCenter").modal();
            return false;
        }

        // Check time is valid
        if ((!moment(starttime, "H:mm", true).isValid()) || (!moment(endtime, "H:mm", true).isValid())) {
            $('#eModalBody').text('Invalid start/End time, Please retry with valid input!');
            $("#eModalCenter").modal();
            return false;
        }
        starttime = dbDate + " " + moment(starttime, "H:mm").format('HH:mm');
        endtime = dbDate + " " + moment(endtime, "H:mm").format('HH:mm');

        // create the object to be posted
        var sale = {
            useraccount_id: 1,
            address: address,
            city: city,
            state: state,
            zip: zip,
            date: dbDate,
            start_time: starttime,
            end_time: endtime,
            comments: comments,
            photo_url: "http://via.placeholder.com/350x200",
        };

        //Send the POST request.
        $.ajax("/api/sale", {
            type: "POST",
            data: sale
        }).then(
            function (resp) {
                // Reload the page 
                console.log(resp);
                window.location.href = "/manageitems/" + resp.id;
            }
        );
    });

});
