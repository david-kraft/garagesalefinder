// Once the DOM is fully loaded.
$(function () {

    // on submit , post the request

    $(".listings").on("click", "#delbtn", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        var saved = $(this);

        var sale_event_id = saved.attr('sale_event_id');        

        //Send the POST request.
        $.ajax("/api/delete/"+sale_event_id, {
            type: "POST"
        }).then(
            function (resp) {
                // remove the listing on successful delete
                saved.closest(".listings").remove();
            }
        );
    });

    $(".listings").on("click", "#editbtn", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        var saved = $(this);

        var sale_event_id = saved.attr('sale_event_id');        

        //route to edit page.
        window.location.href = "/editlisting/"+sale_event_id;

    });

});
