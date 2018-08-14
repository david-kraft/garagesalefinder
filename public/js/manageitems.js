// Once the DOM is fully loaded.
$(function () {

    // on submit , post the request

    $(".create-form").on("click", "#sellerBtn", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        var items = [];
        var sale_event_id = $('.create-form').attr('sale_event_id');

        for (i = 0; i < $('.create-form .custom-range').length; i++) {
            
            // create the object to be posted
            var item = {
                sale_event_id: sale_event_id,
                rank: $('.create-form .custom-range')[i].value,
                category_name: $('.create-form .custom-range')[i].id
            };
            items.push(item);

        };

        // Send the POST request.
        $.ajax("/api/additems/"+sale_event_id, {
            type: "POST",
            data: { items }
        }).then(
            function (resp) {
                // route to listings pages 
                console.log(resp);
                window.location.href = "/mylistings";
            }
        );
    });

});
