// works on card 1
let weather = {
    apiKey: "b5af752f9ec804ace97776aa558f0ef3",
    
    // fetches weather data
    fetchWeather: function(city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&units=metric&appid=" 
            + this.apiKey
            )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
        },
        
        // displays wetaher data  manipulating the DOM
        displayWeather: function(data) {
            const {name} = data;
            const {icon, description} = data.weather[0];
            const { temp} = data.main; 
            const {temp_min, temp_max} = data.main;
        // console.log(name,icon,description,temp,humidity,speed);
        document.querySelector(".temp").innerHTML = Math.round(temp) + " °";
        document.querySelector(".city").innerText = name.toUpperCase();
        document.querySelector(".description").innerText = description;
        document.querySelector(".tempMinMax").innerText = Math.round(temp_min) + "° / " + Math.round(temp_max) + " °";
        // document.card1.style.backgroundImage = url("CITY.jpg");
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+ icon + ".png";
        const d = new Date();
        document.getElementById("date").innerHTML = d.getDate() + " / " + d.getMonth() + " /  " + d.getFullYear();        
    },
    
    // gets city name from search bar and calls the fetchWeather Fucntion
    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

// works on card 2
let weather2 = {
    apiKey: "b5af752f9ec804ace97776aa558f0ef3",

    // fetches weather data
    fetchWeather: function(city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&units=metric&appid=" 
            + this.apiKey
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },

    // displays wetaher data  manipulating the DOM
    displayWeather: function(data) {
        const {name} = data;
        const {icon, description} = data.weather[0];
        const { temp} = data.main; 
        const {temp_min, temp_max} = data.main;
        // console.log(name,icon,description,temp,humidity,speed);
        document.querySelector(".temp2").innerHTML = Math.round(temp) + " °";
        document.querySelector(".city2").innerText = name.toUpperCase();
        document.querySelector(".description2").innerText = description;
        document.querySelector(".tempMinMax2").innerText = Math.round(temp_min) + "° / " + Math.round(temp_max) + " °";
        // document.card1.style.backgroundImage = url("CITY.jpg");
        document.querySelector(".icon2").src = "https://openweathermap.org/img/wn/"+ icon + ".png";
        // document.querySelector(".weather").classList.remove("loading");
        const d = new Date();
        document.getElementById("date2").innerHTML = d.getDate() + " / " + d.getMonth() + " /  " + d.getFullYear();
    },

    // gets city name from search bar and calls the fetchWeather Fucntion
    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};
let geocode = {
    reverseGeocode: function (latitude,longitude){
        var api_key = '75951cffd9094a86b495ada15dcef1ff';
    
        var query = latitude + ',' + longitude;

        // forward geocoding example (address to coordinate)
        // var query = 'Philipsbornstr. 2, 30165 Hannover, Germany';
        // note: query needs to be URI encoded (see below)

        var api_url = 'https://api.opencagedata.com/geocode/v1/json'

        var request_url = api_url
            + '?'
            + 'key=' + api_key
            + '&q=' + encodeURIComponent(query)
            + '&pretty=1'
            + '&no_annotations=1';

        // see full list of required and optional parameters:
        // https://opencagedata.com/api#forward

        var request = new XMLHttpRequest();
        request.open('GET', request_url, true);

        request.onload = function() {
            // see full list of possible response codes:
            // https://opencagedata.com/api#codes

            if (request.status === 200){
            // Success!
            var data = JSON.parse(request.responseText);

            // Fetch Weather CALL
            weather.fetchWeather(data.results[0].components.city); // gives current location
            // console.log(data.results[0].components); // print the location in console

            } else if (request.status <= 500){
            // We reached our target server, but it returned an error

            console.log("unable to geocode! Response code: " + request.status);
            var data = JSON.parse(request.responseText);
            console.log('error msg: ' + data.status.message);
            } else {
            console.log("server error");
            }
        };

        request.onerror = function() {
            // There was a connection error of some sort
            console.log("unable to connect to server");
        };

        request.send();  // make the request
    },

    getLocation: function(){
       function success(data) {
        geocode.reverseGeocode(data.coords.latitude,data.coords.longitude);
       } 
       if(navigator.geolocation){
           navigator.geolocation.getCurrentPosition(success,console.error);
       }
       else{
        weather.fetchWeather("Chennai");
       }
    }
}

// Event listener for search button
document.querySelector(".search button").addEventListener("click", function() {
    weather2.search();
});

// Event listener for the query box when pressed Enter
document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if(event.key == "Enter") {
        weather2.search();
    }
})

weather.fetchWeather("Chennai")
geocode.getLocation();
