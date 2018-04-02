$(document).ready(function() {
    var cars = ["ferrari", "lamborghini", "pagani", "koenigsegg", "bugatti", "mclaren"]
    var main = $("body");
    var btns = main.find('#carButtons');

    for (var i = 0; i < cars.length; i++) {
        var carBtn = $("<button>");
        carBtn.addClass("btn btn-primary");
        carBtn.attr("data-car", cars[i]);
        carBtn.text(cars[i]);
        btns.append(carBtn);
      }
})