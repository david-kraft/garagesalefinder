// Once the DOM is fully loaded.
$(function () {

    // Google API
    var googleapiKey = "AIzaSyBAhNxc8BbsIMC5tFTNUSADF8vhSiNxXmA";

    // Get DOM for find - search button
    var input = document.getElementById('srchtxt');

    // Set google autofill listner on address are
    var addr = document.getElementById('address');

    // Set google autofil listner for find area
    google.maps.event.addDomListener(window, 'load', init);

    // set google autofil listner for address area
    google.maps.event.addDomListener(window, 'load', initAutoComplete);

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


    // Google Autofil instance for address area
    function initAutoComplete() {

        var addrComplete = new google.maps.places.Autocomplete(addr);

        addrComplete.addListener('place_changed', fillInAddress);

        var componentForm = {
            street_number: 'short_name',
            route: 'long_name',
            locality: 'long_name',
            administrative_area_level_1: 'short_name',
            country: 'long_name',
            postal_code: 'short_name'
        };

        function fillInAddress() {
            var place = addrComplete.getPlace();
            $('#address').val("").css({ 'background-color': '#ffffff'});
            $('#city').val("").css({ 'background-color': '#ffffff'});;
            $('#state').val("").css({ 'background-color': '#ffffff'});;
            $('#zipcode').val("").css({ 'background-color': '#ffffff'});;
            var street = "";

            for (var i = 0; i < place.address_components.length; i++) {
                var addressType = place.address_components[i].types[0];
                if (componentForm[addressType]) {
                    var val = place.address_components[i][componentForm[addressType]];
                    console.log(addressType, val)
                    switch (addressType) {
                        case "street_number":
                            street = val;
                            break;
                        case "route":
                            val = street+val
                            $('#address').val(val).css({ 'background-color': '#F3FEFF'})
                            break;
                        case "locality":
                            $('#city').val(val).css({ 'background-color': '#F3FEFF'})
                            break;
                        case "administrative_area_level_1":
                            $('#state').val(val).css({ 'background-color': '#F3FEFF'})
                            break;
                        case "postal_code":
                            $('#zipcode').val(val).css({ 'background-color': '#F3FEFF'})
                            break;
                    }
                }
            }

        }
    }

});