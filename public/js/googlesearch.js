// Once the DOM is fully loaded.
$(function () {

    // Google API
    var googleapiKey = "AIzaSyBAhNxc8BbsIMC5tFTNUSADF8vhSiNxXmA";

    // Get DOM for find - search button
    var input = document.getElementById('srchtxt');

    // Set google autofil listner for find area
    google.maps.event.addDomListener(window, 'load', init);


    // Google Autofil instance for find button
    function init() {
        var autocomplete = new google.maps.places.Autocomplete(input);
    }

    // When find button clicked start the mainproces
    $(document).on('click', '#searchBtn', mainProcess);

    // Execute a function when the user releases a key on the keyboard
    input.addEventListener("keyup", function (event) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Trigger the button element with a click
            mainProcess();
        }
    });

    // When find button clicked 
    function mainProcess() {

        selText = $('#srchtxt').val().trim();
        $('#srchtxt').val("");
        locationURL = geocodeQueryBuild(selText);
        callgeocodeAPI(locationURL);
    };

    // function to build query URL and return
    function geocodeQueryBuild(selText) {
        var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + selText + "&key=" + googleapiKey;
        return queryURL;
    };

    // This function calls the geocode API and gets city/state and routes to endpoint
    function callgeocodeAPI(queryURL) {
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (gecodeoResp) {
            var resCityObj = gecodeoResp.results[0].address_components.find(obj => obj.types.includes('locality'));
            var resStateObj = gecodeoResp.results[0].address_components.find(obj => obj.types.includes('administrative_area_level_1'));
            console.log(resStateObj, resCityObj);
            if (resCityObj === undefined && resStateObj === undefined) {
                $('#eModalBody').text('Invalid City/State/Zip, Please retry with a valid location!');
                $("#eModalCenter").modal();
            } else if (resCityObj === undefined) {
                window.location.href = "/find/" + resStateObj.short_name;
            } else {
                window.location.href = "/find/" + resStateObj.short_name + "/" + resCityObj.short_name;
            }
        });
    };

});