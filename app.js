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
        console.log("clicked");

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {

            console.log(queryURL);
            console.log(response);

            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var carDiv = $("<div>");
                carDiv.addClass("carGif");
    
                var p = $("<p>").text("Rating: " + results[i].rating);
                var carImage = $("<img>");
            
                carImage.attr("src", results[i].images.fixed_height.url);
    
                carDiv.append(p);
                carDiv.append(carImage);
    
                $("#carGifs").prepend(carDiv);
            };
        })    
    })

    $("#addcar").click(function(){
        event.preventDefault();
        var newCar = $("#car-input").val().trim();
        if ($("#car-input").val() == "") {
            return false;
        } else {
            cars.push(newCar);
            $("#car-input").val("");
            console.log("addcar Clicked!!!!!");
            console.log(cars);
            $('#carButtons').empty();
            displayBtns ()
        }
    })
})