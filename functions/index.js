$(function() {
    $('svg.back-btn').click(function() {
        $('.input-page-wrapper').show();
        $('.weather-data-wrapper,.app-bar').hide();
        $('input.search').val('');
        $('.card').remove();
    });

    $('input.search').keypress(function(e) {
        if (e.which == 13) {
            $('button.sub-btn').click();
        }
    });

    $('button.sub-btn').click(function() {
        if ($('input.search').val() != '') {
            var city = $('input.search').val();
            var key = '895ff6619f3b61beff40fae1c36905d4';
            var weather = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric" + "&appid=" + key;
            // console.log(weather);
            $('button.sub-btn svg').addClass('btnClicked');

            $.ajax({
                url: weather,
                dataType: "jsonp",
                success: function(data) {
                    $('button.sub-btn svg').removeClass('btnClicked');
                    $('button.find-location svg').removeClass('btnClicked');
                    $('.city-name').html(data.city.name + ", " + data.city.country);
                    for (var i = 0; i < data.list.length; i++) {
                        $('.weather-data-wrapper').append(
                            '<div class="card"><div class="date-time"><h1>Date : ' + data.list[i].dt_txt.split(" ", 1) + '</h1><h1>Time : ' + data.list[i].dt_txt.split(" ", 2)[1] + '</h1><h1>Temp : ' + data.list[i].main.temp + ' C</h1><h1>Min : ' + data.list[i].main.temp_min + ' C</h1><h1>Max : ' + data.list[i].main.temp_max + ' C</h1><h1>Pressure : ' + data.list[i].main.pressure + '</h1><h1>Sea Level : ' + data.list[i].main.sea_level + '</h1><h1>Ground Level : ' + data.list[i].main.grnd_level + '</h1><h1>Humidity : ' + data.list[i].main.humidity + '</h1><h1>Wind Speed : ' + data.list[i].wind.speed + '</h1><h1>Wind Deg : ' + data.list[i].wind.deg + '</h1><h1>Clouds : ' + data.list[i].clouds.all + '%</h1></div></div>');
                    }
                    $('.input-page-wrapper').hide();
                    $('.weather-data-wrapper,.app-bar').show();
                }
            });
        }
    });

    $('button.find-location, .menu-btn').on('click', function() {
        var Geo = {};
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
            $('button.find-location svg').addClass('btnClicked');
        } else {
            alert('Geolocation is not supported');
            $('button.find-location svg').removeClass('btnClicked');
        }

        function error() {
            $('button.find-location svg').removeClass('btnClicked');
            alert("That's weird! We couldn't find you!");
        }

        function success(position) {
            Geo.lat = position.coords.latitude;
            Geo.lng = position.coords.longitude;
            var key = '895ff6619f3b61beff40fae1c36905d4';
            var weather = "https://api.openweathermap.org/data/2.5/forecast?lat=" + Geo.lat + "&lon=" + Geo.lng + "&units=metric" + "&appid=" + key;
            // console.log(weather);

            $.ajax({
                url: weather,
                dataType: "jsonp",
                success: function(data) {
                    $('.card').remove();
                    $('button.find-location svg').removeClass('btnClicked');
                    $('.city-name').html(data.city.name + ", " + data.city.country);
                    for (var i = 0; i < data.list.length; i++) {
                        $('.weather-data-wrapper').append(
                            '<div class="card"><div class="date-time"><h1>Date : ' + data.list[i].dt_txt.split(" ", 1) + '</h1><h1>Time : ' + data.list[i].dt_txt.split(" ", 2)[1] + '</h1><h1>Temp : ' + data.list[i].main.temp + ' C</h1><h1>Min : ' + data.list[i].main.temp_min + ' C</h1><h1>Max : ' + data.list[i].main.temp_max + ' C</h1><h1>Pressure : ' + data.list[i].main.pressure + '</h1><h1>Sea Level : ' + data.list[i].main.sea_level + '</h1><h1>Ground Level : ' + data.list[i].main.grnd_level + '</h1><h1>Humidity : ' + data.list[i].main.humidity + '</h1><h1>Wind Speed : ' + data.list[i].wind.speed + '</h1><h1>Wind Deg : ' + data.list[i].wind.deg + '</h1><h1>Clouds : ' + data.list[i].clouds.all + '%</h1></div></div>');
                    }

                    $('.input-page-wrapper').hide();
                    $('.weather-data-wrapper,.app-bar').show();
                }
            });
        }
    });

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('service-worker.js')
            .then(function() {
                console.log("Service-Worker-Registered");
            });
    }
});