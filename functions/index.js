$(function() {

    $('svg.back-btn').on('click', function() {
        $('.input-page-wrapper').show();
        $('.weather-data-wrapper,.app-bar').hide();
        $('input.search').val('');
    });
    $('button.sub-btn').on('click', function() {
        if ($('input.search').val() != '') {
            var city = $('input.search').val();

            var key = 'f9487aac49d53f81';
            var Weather = "https://api.wunderground.com/api/" + key + "/forecast/geolookup/conditions/q/" + city + ".json";
            console.log(Weather);
            $('button.sub-btn svg').addClass('btnClicked');

            $.ajax({
                url: Weather,
                dataType: "jsonp",
                success: function(data) {
                    $('button.sub-btn svg').removeClass('btnClicked');
                    var date = data.current_observation.observation_time.replace(/last updated on|est| ist/gi, '');

                    var wind = data.current_observation.wind_string.replace(/From the/gi, '');

                    $('.city-name').html(data.location.city + ', ' + data.location.state + ', ' + data.location.country_name);
                    $('.temp').html(Math.floor(data.current_observation.temp_c) + '°C');
                    $('.date-time').html(date);
                    $('.weather').html(data.current_observation.weather);
                    $('.feels').html('Feels like ' + data.current_observation.feelslike_c + '°C');

                    $('.lat-data').html(data.current_observation.display_location.latitude);
                    $('.long-data').html(data.current_observation.display_location.longitude);
                    $('.ele-data').html(data.current_observation.display_location.elevation + ' ft');

                    $('.humi-data').html(data.current_observation.relative_humidity);
                    $('.dew-data').html(data.current_observation.dewpoint_c + ' C');
                    $('.pre-data').html(data.current_observation.pressure_mb + ' mb');
                    $('.uv-data').html(data.current_observation.UV);
                    $('.visi-data').html(data.current_observation.visibility_km + ' km');

                    $('.wind-data').html(wind);
                    $('.winddir-data').html(data.current_observation.wind_dir);
                    $('.winddeg-data').html(data.current_observation.wind_degrees);
                    $('.windspk-data').html(data.current_observation.wind_kph + ' kph');
                    $('.windgustk-data').html(data.current_observation.wind_gust_kph + ' kph');

                    $.each($('.forecastCard .title'), function(i, item) {
                        $(this).html(data.forecast.txt_forecast.forecastday[i].title);
                    });

                    $.each($('.forecastCard span.forecast'), function(i, item) {
                        $(this).html(data.forecast.txt_forecast.forecastday[i].fcttext_metric);
                    });

                    $.each($('.forecastCard span.chanceOfRain'), function(i, item) {
                        $(this).html(data.forecast.txt_forecast.forecastday[i].pop + '%');
                    });

                    var icon = 'assets/weather-icons/' + data.current_observation.icon + '.png';
                    $('img.w-icon').attr('src', icon);

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
            var key = 'e449ce5899108221022a7b159186944e';

            // var wdata = "https://api.wunderground.com/api/" + key + "/forecast/geolookup/conditions/q/" + Geo.lat + "," + Geo.lng + ".json";
            var wdata = "https://api.openweathermap.org/data/2.5/forecast?lat=" + Geo.lat + "&lon=" + Geo.lng + "&appid=" + key;
            console.log(wdata);

            $.ajax({
                url: wdata,
                dataType: "jsonp",
                success: function(data) {
                    $('button.find-location svg').removeClass('btnClicked');
                    var date = data.current_observation.observation_time.replace(/last updated on|est| ist/gi, '');

                    $('.city-name').html(data.city.name + ', ' + data.city.country);
                    // $('.temp').html(Math.floor(data.current_observation.temp_c) + '°C');
                    $('.date-time').html(list.dt_txt);
                    console.log(list.dt_txt);
                    // $('.weather').html(data.current_observation.weather);
                    // $('.feels').html('Feels like ' + data.current_observation.feelslike_c + '°C');
                    //
                    // $('.lat-data').html(data.current_observation.display_location.latitude);
                    // $('.long-data').html(data.current_observation.display_location.longitude);
                    // $('.ele-data').html(data.current_observation.display_location.elevation + ' ft');
                    //
                    // $('.humi-data').html(data.current_observation.relative_humidity);
                    // $('.dew-data').html(data.current_observation.dewpoint_c + ' C');
                    // $('.pre-data').html(data.current_observation.pressure_mb + ' mb');
                    // $('.uv-data').html(data.current_observation.UV);
                    // $('.visi-data').html(data.current_observation.visibility_km + ' km');
                    //
                    // $('.winddir-data').html(data.current_observation.wind_dir);
                    // $('.winddeg-data').html(data.current_observation.wind_degrees);
                    // $('.windspk-data').html(data.current_observation.wind_kph + ' kph');
                    // $('.windgustk-data').html(data.current_observation.wind_gust_kph + ' kph');
                    //
                    //
                    //
                    // $.each($('.forecastCard .title'), function(i, item) {
                    //     $(this).html(data.forecast.txt_forecast.forecastday[i].title);
                    // });
                    //
                    // $.each($('.forecastCard span.forecast'), function(i, item) {
                    //     $(this).html(data.forecast.txt_forecast.forecastday[i].fcttext_metric);
                    // });
                    //
                    // $.each($('.forecastCard span.chanceOfRain'), function(i, item) {
                    //     $(this).html(data.forecast.txt_forecast.forecastday[i].pop + '%');
                    // });
                    //
                    // var icon = 'assets/weather-icons/' + data.current_observation.icon + '.png';
                    // $('img.w-icon').attr('src', icon);

                    $('.input-page-wrapper').hide();
                    $('.weather-data-wrapper,.app-bar').show();
                }
            });
        }
    });
});