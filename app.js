$(document).ready(function() {
    var cars = ["ferrari", "lamborghini", "pagani", "koenigsegg", "bugatti", "mclaren"]
    var main = $("body");
    var btns = main.find('#carButtons');

    function displayBtns () {
        for (var i = 0; i < cars.length; i++) {
            var carBtn = $("<button>");
            carBtn.addClass("btn btn-primary");
            carBtn.attr("data-car", cars[i]);
            carBtn.text(cars[i]);
            btns.append(carBtn);
        } 
    };

    displayBtns ();

    $(document).on("click", ".btn-primary", function() {
        $("#carGifs").empty();
        var APIKey = "&api_key=dLCp4RBVmUa1jC0jhTq5WRhJdZlT759Q&limit=10";
        var car = $(this).attr("data-car");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + car + APIKey;
        

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {

            console.log(queryURL);
            console.log(response);

            var results = response.data;

            console.log(results[0].images.fixed_height.url);

            for (var i = 0; i < results.length; i++) {
                var carDiv = $("<div>");
                carDiv.addClass("carGifff");
        
                var p = $("<p>").text("Rating: " + results[i].rating);
                var image = $("<img>");
                image.addClass("carGif");

                image.attr("data-animate", results[i].images.fixed_height.url);
                image.attr("data-still", results[i].images.fixed_height_still.url);
                image.attr("src", results[i].images.fixed_height_still.url);
                image.attr("data-state", "still");
                
                
                carDiv.append(p);
                carDiv.append(image);
    
                $("#carGifs").prepend(carDiv);
            };

        });
    });

    $(document).on("click", ".carGif", function() {
                
                
        var state = $(this).attr("data-state");
        
        if (state === "still") {
            console.log("clicked");
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    $("#addcar").click(function(){
        event.preventDefault();
        var newCar = $("#car-input").val().trim();
        if ($("#car-input").val() == "") {
            return false;
        } else {
            cars.push(newCar);
            $("#car-input").val("");
            $('#carButtons').empty();
            displayBtns ();
        }
    })
})