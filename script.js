$(document).ready(function () {

    $(".card-title").text(moment().format('l'))

    var APIKey = "166a433c57516f51dfab1f7edaed8413";
    var cityName = "Baltimore"
    var queryURL = "https://api.openweathermap.org/data/2.5/find?q=" + cityName + "&units=imperial&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        console.log(response.list[0])
        $("#cityNameDisplay").text(response.list[0].name + ", MD")

        $("#temperature").text("Temperature: " + response.list[0].main.temp)
        $("#humidity").text("Humidity: " + response.list[0].main.humidity)
        $("#windSpeed").text("Wind Speed: " + response.list[0].wind.speed)
        $("#uvIndex").text("UV Index: " + response.list[0].main)

        console.log(response.list[0].weather[0].description)



    })










})