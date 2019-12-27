$(document).ready(function () {

    $("#card1").text(moment().add(1, "days").format('l'))
    $("#card2").text(moment().add(2, "days").format('l'))
    $("#card3").text(moment().add(3, "days").format('l'))
    $("#card4").text(moment().add(4, "days").format('l'))
    $("#card5").text(moment().add(5, "days").format('l'))

    renderCities()

    var cityArr = [];

    $(".searchButton").on("click", function (element) {
        event.preventDefault();
        var cityName = $(".inputBox").val().trim();
        var cityListItem = $("<button>").html(cityName).attr("class", "cityList")
        $(".city-container").prepend(cityListItem)
        cityArr.push(cityName)
        $("#cityNameDisplay").html(cityName)

        localStorage.setItem("city names", JSON.stringify(cityArr));

        $(".inputBox").val("");


        var card1Temp = document.getElementsByClassName("card-group")[0].childNodes[1].children[0].children[1].innerText
        var card1Humidity = document.getElementsByClassName("card-group")[0].childNodes[1].children[0].children[2].innerText
        console.log(card1Temp)
        console.log(card1Humidity)
        var card2Temp = document.getElementsByClassName("card-group")[0].childNodes[1].children[0].children[1].innerText
        var card2Humidity = document.getElementsByClassName("card-group")[0].childNodes[1].children[0].children[2].innerText



        var APIKey = "166a433c57516f51dfab1f7edaed8413";
        var cityName = $("#cityNameDisplay").text()
        console.log(cityName)
        var queryURL = "https://api.openweathermap.org/data/2.5/find?q=" + cityName + "&units=imperial&appid=" + APIKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            console.log(response.list[0])


            var conditions = response.list[0].weather[0].main

            if (conditions === "Clouds") {
                image = $("<i>").addClass("fas fa-cloud-sun")
                $("#cityNameDisplay").text(response.list[0].name + " (" + moment().format('l') + ") ")
                $("#cityNameDisplay").append(image);
                $("body").attr("style", "background-image: url(https://cdn.solace.com/wp-content/uploads/2019/01/bg-clouds.jpg)")
                console.log(image)
            } else if (conditions === "Rain") {
                image = $("<i>").addClass("fas fa-cloud-rain")
                $("#cityNameDisplay").text(response.list[0].name + " (" + moment().format('l') + ") ")
                $("#cityNameDisplay").append(image);
                $("body").attr("style", "background-image: url(https://bluestemamphitheater.org/wp-content/uploads/blog-rain-or-shine.jpg)")
            } else if (conditions === "Clear") {
                image = $("<i>").addClass("far fa-sun")
                $("#cityNameDisplay").text(response.list[0].name + " (" + moment().format('l') + ") ")
                $("#cityNameDisplay").append(image);
                $("body").attr("style", "background-image: url(https://external-preview.redd.it/PzZiabszp8qatJxLKE_z9XbERpa0jEVe0VFImlQbqic.jpg?auto=webp&s=301afde517afe860f1c648bf7842eda25582f876)")
            }



            $("#temperature").text("Temperature: " + response.list[0].main.temp)
            $("#humidity").text("Humidity: " + response.list[0].main.humidity)
            $("#windSpeed").text("Wind Speed: " + response.list[0].wind.speed)
            $("#uvIndex").text("UV Index: " + response.list[0].main)



            console.log(response.list[0].weather[0].main)
        })






    })

function renderCities() {
    var cityNames = JSON.parse(localStorage.getItem("city names"));
    console.log(cityNames)
    $.each(cityNames, function(index, value) {
        var cityListItem = $("<button>").html(value).attr("class", "cityList")
        $(".city-container").prepend(cityListItem)
        $("#cityNameDisplay").html(value)
    })
}










})