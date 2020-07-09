(function ($) {
  $(function () {
    $(".sidenav").sidenav();
    $(".parallax").parallax();
  }); // end of document ready
})(jQuery); // end of jQuery name space
var token;
var queryURL =
  "https://cors-anywhere.herokuapp.com/https://api.petfinder.com/v2/oauth2/token";
$.ajax({
  url: queryURL,
  method: "POST",
  data: {
    grant_type: "client_credentials",
    client_id: "jwiHAizfWoRDRFwMQBD46rrrt7RaSXvNMjMDfgDuae8O7eFIEj",
    client_secret: "ME14Jzyaaa4mwLFclDqoVZuw1GFPexThK5Y7zVVs",
  },
}).then(function (response) {
  console.log(response);
  token = response.access_token;
});

document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".carousel");
  var options = [];
  var instances = M.Carousel.init(elems, options);
});

//jQuery to find dogs adoption center 

$(document).ready(function () {
  $(".carousel").carousel();
});

var queryURL = `https://cors-anywhere.herokuapp.com/https://api.petfinder.com/v2/organizations`;

$(".myButton").on("click", function (event) {
  event.preventDefault();
  console.log("myButton click");

  $.ajax({
    url: queryURL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
    data: {
      location: $("#cityInput").val(),
      limit: 10
    },
  }).then(function (response) {
    console.log(response);
     for (var i = 0; i < 10; i++){

    var el = $("<div>");
    // el.text(JSON.stringify(response));
    var name =  $("<h6>" + ("Name: " + response.organizations[i].name)+ "</h6>");
    try{
      
      var photoURL = response.organizations[i].photos[0].medium;
      var photo = `<img src="${photoURL}">`
    }catch(err) {
      var photo = $("<p>" +  `<img src="./Assets/dog-pictures/41. Bichon Frise.jpg">` + "</p>");
    }   
    var address = $("<p>" + ("City: " + response.organizations[i].address.city)+ "</p>");
    var address1 = $("<p>" + ("Addresss: " + response.organizations[i].address.address1)+ "</p>");
    var zipCode = $("<p>" + ("ZipCode :" + response.organizations[i].address.postcode) + "</p>");
    var url = `<p> URL:<a href="${response.organizations[i].url}">${response.organizations[i].url}</a> </p>`;
    el.append(photo).append(name).append(address).append(address1).append(zipCode).append(url);
    $("#cityList").append(el);

     }
    
    
  });
});



$(window).on('load', function () {
  currentLocation();
});

// API Key for current date /time  
var APIKey = "09e0d7e534e41ce68ba5f2577fa5f760";
var q = "";
var now = moment();
//Date and time formate for header
var currentDate = now.format('MMMM Do YYYY || h:mm a');

//Function to get weather details 
function getWeather(q) {
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + q + "&units=imperial&appid=" + APIKey;
  $.ajax({
    // gets the current weather info
    url: queryURL,
    method: "GET",

  }).then(function (response) {
    console.log(response)
    $(".clock").append($("<h5> Current Location : " + response.name + ' (' + currentDate + ')' + "</h5>"));
  });
}

// Display Current Locaion 
function currentLocation() {
  $.ajax({
    url: "https://freegeoip.app/json/",
    method: "GET",
  }).then(function (response) {
    q = response.city || 'philadelphia';
    console.log(q);
    getWeather(q);
  });
};

// google search location 

//var googleURL : "https://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&key="+googleKey;
// var googleKey= "AIzaSyDAFNp-kiQJKedi-e9ntOpVBihzfQXu7VM";
// var proxy = "https://cors-anywhere.herokuapp.com/";
// var queryURL =
//   "https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&key="+googleKey;
// $.ajax({
//   url: proxy + queryURL,
//   method: "GET", 
// }).then(function (response) {
//   console.log("google Response: ");
//   console.log(response);

// });

//mapBox for location search 

// For driving= "pk.eyJ1IjoibW9oYW4yMDM2IiwiYSI6ImNrY2R4ajFyMDAwZTAycG53M3g1MjB6dGgifQ.B4Yjcty24OLz9Xmn8-Gj8g"

$(".myGps").on("click", function (event) {
  event.preventDefault();
  // console.log("myGps Checking ");

  // var inputCity = $("#destiInput").val()
  // var mapGpsToken = "pk.eyJ1IjoibW9oYW4yMDM2IiwiYSI6ImNrY2R4ajFyMDAwZTAycG53M3g1MjB6dGgifQ.B4Yjcty24OLz9Xmn8-Gj8g";
  // var proxy = "https://cors-anywhere.herokuapp.com/";
  // var queryURL =
  //   "https://api.mapbox.com/geocoding/v5/mapbox.places/" + inputCity + ".json?access_token=" + mapGpsToken;
  // $.ajax({
  //   url: proxy + queryURL,
  //   method: "GET",
  //   // data: {
  //   //   location: $("#destiInput").val(),      
  //   // },
  // }).then(function (response) {
  //   console.log("Map Response: ");
  //   console.log(response);
  //   var dest = $("<div>");
  //   dest.text(JSON.stringify(response));
  //   $("#destiList").append(dest);

  // });

  $.ajax({
    url: 'https://freegeoip.app/json/',
    method: 'GET',
  }).then(function (res) {
    mapboxgl.accessToken =
      'pk.eyJ1IjoibW9oYW4yMDM2IiwiYSI6ImNrY2R4ajFyMDAwZTAycG53M3g1MjB6dGgifQ.B4Yjcty24OLz9Xmn8-Gj8g';
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-96, 37.8],
      zoom: 2,
    });

    map.on('load', function () {
      map.addSource('points', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              // feature for Mapbox DC
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [res.longitude, res.latitude],
              },
              properties: {
                title: 'Current Location',
                icon: 'monument',
              },
            },
            {
              // feature for Mapbox SF
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [-122.414, 37.776],
              },
              properties: {
                title: 'Mapbox SF',
                icon: 'harbor',
              },
            },
          ],
        },
      });
      map.addLayer({
        id: 'points',
        type: 'symbol',
        source: 'points',
        layout: {
          // get the icon name from the source's "icon" property
          // concatenate the name to get an icon from the style's sprite sheet
          'icon-image': ['concat', ['get', 'icon'], '-15'],
          // get the title name from the source's "title" property
          'text-field': ['get', 'title'],
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 0.6],
          'text-anchor': 'top',
        },
      });
    });
  });


// API Key for GEO Coding 
var qu = "";
 var geoAPIKey = '03350c02af0f05053c20f3f520cf87595037f73' ,
//  Var geoURl = "https://api.geocod.io/v1.6/api_endpoint_here?api_key=" + geoAPIKey;
 
 //'https://geocoder.cit.api.here.com/6.2/geocode.json?searchtext=200%20S%20Mathilda%20Sunnyvale%20CA&app_ id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg&gen=8'

 $.ajax({
  url: geoURL,  
  method: 'GET',
  }).then(function (response) {
  console.log(response);

  });

});

