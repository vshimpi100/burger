// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".devour").on("click", function(event){

    console.log($(this));

    let id = $(this).data("id");
    let currentDev = $(this).data("devstate")
    let newDev = !currentDev;

    console.log("id",id, "newDev",newDev);

    let newDevState = {
      devoured: newDev
    };

    console.log(newDevState.devoured);

    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newDevState
    }).then(
      function() {
        console.log("changed devoured to", newDev);
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function(event) {
    event.preventDefault();

    var newBurger = {
      burger_name: $("#bgr").val().trim(),
      devoured: $("[name=devoured]:checked").val().trim()
    };

    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function() {
        console.log("created new burger");
        location.reload();
      }
    );
  });
});
