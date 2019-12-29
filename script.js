$(document).ready(function () {


    var card1 = $("#card1").text(moment().add(1, "days").format('l') + " ")
    var card2 = $("#card2").text(moment().add(2, "days").format('l') + " ")
    var card3 = $("#card3").text(moment().add(3, "days").format('l') + " ")
    var card4 = $("#card4").text(moment().add(4, "days").format('l') + " ")
    var card5 = $("#card5").text(moment().add(5, "days").format('l') + " ")


    var cityArr = [];
    // cityArr.push(localStorage.getItem("city names"));



    $(".searchButton").on("click", function (element) {
        event.preventDefault();
        var card1 = $("#card1").text(moment().add(1, "days").format('l') + " ")
        var card2 = $("#card2").text(moment().add(2, "days").format('l') + " ")
        var card3 = $("#card3").text(moment().add(3, "days").format('l') + " ")
        var card4 = $("#card4").text(moment().add(4, "days").format('l') + " ")
        var card5 = $("#card5").text(moment().add(5, "days").format('l') + " ")
        // var cityArr = [(localStorage.getItem("city names"))];

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


        function generateDisplay() {
            // api.openweathermap.org/data/2.5/weather?q=London
            var APIKey = "166a433c57516f51dfab1f7edaed8413";
            var cityName = $("#cityNameDisplay").text()
            console.log(cityName)
            var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&cnt=6&appid=" + APIKey;

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(response)
                $("#temperature").text("Temperature: " + Math.round(response.main.temp) + "°F")
                $("#humidity").text("Humidity: " + response.main.humidity + "%")
                $("#windSpeed").text("Wind Speed: " + response.wind.speed)
                $("#uvIndex").text("UV Index: " + response.main)
            });
        }
        generateDisplay();




        //FORECAST API
        var APIKey = "166a433c57516f51dfab1f7edaed8413";
        var cityName = $("#cityNameDisplay").text()
        console.log(cityName)
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + cityName + "&units=imperial&cnt=6&appid=" + APIKey;

        // api.openweathermap.org/data/2.5/forecast/daily?q=London&mode=xml&units=metric&cnt=7

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            console.log()
            $(".card-text-temp-1").html("Temperature:" + "<br>" + "High: " + Math.round(response.list[1].temp.max) + "°F" + " || Lo: " + Math.round(response.list[1].temp.min) + "°F")
            $(".card-text-hum-1").html("Humidity: " + response.list[1].humidity + "%")
            $(".card-text-temp-2").html("Temperature:" + "<br>" + "High: " + Math.round(response.list[2].temp.max) + "°F" + " || Lo: " + Math.round(response.list[2].temp.min) + "°F")
            $(".card-text-hum-2").html("Humidity: " + response.list[2].humidity + "%")
            $(".card-text-temp-3").html("Temperature:" + "<br>" + "High: " + Math.round(response.list[3].temp.max) + "°F" + " || Lo: " + Math.round(response.list[3].temp.min) + "°F")
            $(".card-text-hum-3").html("Humidity: " + response.list[3].humidity + "%")
            $(".card-text-temp-4").html("Temperature:" + "<br>" + "High: " + Math.round(response.list[4].temp.max) + "°F" + " || Lo: " + Math.round(response.list[4].temp.min) + "°F")
            $(".card-text-hum-4").html("Humidity: " + response.list[4].humidity + "%")
            $(".card-text-temp-5").html("Temperature:" + "<br>" + "High: " + Math.round(response.list[5].temp.max) + "°F" + " || Lo: " + Math.round(response.list[5].temp.min) + "°F")
            $(".card-text-hum-5").html("Humidity: " + response.list[5].humidity + "%")



            var conditions = response.list[0].weather[0].main


            if (conditions === "Clouds") {
                image = $("<i>").addClass("fas fa-cloud-sun")
                $("#cityNameDisplay").text(response.city.name + " (" + moment().format('l') + ") ")
                $("#cityNameDisplay").append(image);
                $("body").attr("style", "background-image: url(https://cdn.solace.com/wp-content/uploads/2019/01/bg-clouds.jpg)")
                console.log(image)
            } else if (conditions === "Rain") {
                image = $("<i>").addClass("fas fa-cloud-rain")
                $("#cityNameDisplay").text(response.city.name + " (" + moment().format('l') + ") ")
                $("#cityNameDisplay").append(image);
                $("body").attr("style", "background-image: url(https://bluestemamphitheater.org/wp-content/uploads/blog-rain-or-shine.jpg)")
            } else if (conditions === "Clear") {
                image = $("<i>").addClass("far fa-sun")
                $("#cityNameDisplay").text(response.city.name + " (" + moment().format('l') + ") ")
                $("#cityNameDisplay").append(image);
                $("body").attr("style", "background-image: url(https://external-preview.redd.it/PzZiabszp8qatJxLKE_z9XbERpa0jEVe0VFImlQbqic.jpg?auto=webp&s=301afde517afe860f1c648bf7842eda25582f876)")
            } else if (conditions === "Mist") {
                image = $("<i>").addClass("fas fa-smog")
                $("#cityNameDisplay").text(response.city.name + " (" + moment().format('l') + ") ")
                $("#cityNameDisplay").append(image);
                $("body").attr("style", "background-image: url(https://ianwcanoe.files.wordpress.com/2013/01/warm-mist-landscape.jpg)")
            } else if (conditions === "Snow") {
                image = $("<i>").addClass("far fa-snowflake")
                $("#cityNameDisplay").text(response.city.name + " (" + moment().format('l') + ") ")
                $("#cityNameDisplay").append(image);
                $("body").attr("style", "background-image: url(https://media.nbcconnecticut.com/2019/09/2bbad92fa4844225b9c4a90efd4cfa61.jpeg.jpg?fit=4032%2C2793)")
            }

            function attachIcon(element, i) {

                var conditions = response.list[i].weather[0].main
                console.log(conditions)

                if (conditions === "Clouds") {
                    image = $("<i>").addClass("fas fa-cloud-sun")
                    element.append(image)
                } else if (conditions === "Rain") {
                    image = $("<i>").addClass("fas fa-cloud-rain")
                    element.append(image)
                } else if (conditions === "Clear") {
                    image = $("<i>").addClass("far fa-sun")
                    element.append(image)
                } else if (conditions === "Mist") {
                    image = $("<i>").addClass("fas fa-smog")
                    element.append(image)
                } else if (conditions === "Snow") {
                    image = $("<i>").addClass("far fa-snowflake")
                    element.append(image)
                }
            }

            attachIcon(card1, 1);
            attachIcon(card2, 2);
            attachIcon(card3, 3);
            attachIcon(card4, 4);
            attachIcon(card5, 5);
            console.log(card1)











            console.log(response.list[0].weather[0].main)
        })




    })

    function renderCities() {
        var cityNames = JSON.parse(localStorage.getItem("city names"));
        console.log(cityNames)
        $.each(cityNames, function (index, value) {
            var cityListItem = $("<button>").html(value).attr("class", "cityList")
            $(".city-container").prepend(cityListItem)
            $("#cityNameDisplay").html(value + " (" + moment().format('l') + ") ")
        })
    }











})