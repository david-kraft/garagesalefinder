// Once the DOM is fully loaded.
$(function () {

    // Google API
    var googleapiKey = "AIzaSyBAhNxc8BbsIMC5tFTNUSADF8vhSiNxXmA";

 
    // Set google autofill listner on address are
    var addr = document.getElementById('address');

     // set google autofil listner for address area
    google.maps.event.addDomListener(window, 'load', initAutoComplete);

 
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
                            if (street != "") {
                                val = street+" "+val
                            }
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