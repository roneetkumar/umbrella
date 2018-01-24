$(function() {
    $('.weather-data-wrapper,.app-bar').hide();

    $('svg.back-btn').on('click', function() {
        $('.input-page-wrapper').show();
        $('.weather-data-wrapper,.app-bar').hide();
        $('input.search').val('');
    });

    $('button.sub-btn').on('click', function() {
        if ($('input.search').val() != '') {
            var city = $('input.search').val();

            $('.input-page-wrapper').hide();
            $('.weather-data-wrapper,.app-bar').show();

            var key = '40dbdf6113225894';
            var Weather = "https://api.wunderground.com/api/" + key + "/forecast/geolookup/conditions/q/" + city + ".json";
            console.log(Weather);

            $.ajax({
                url: Weather,
                dataType: "jsonp",
                success: function(data) {

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

                    // var icondummy = 'assets/weather-icons/' + weather + '.png';

                    // var iconw = icondummy.replace(/ /g, '-').toLowerCase();
                    var icon = 'assets/weather-icons/' + data.current_observation.icon + '.png';
                    $('img.w-icon').attr('src', icon);
                    console.log(icon);

                }
            });
        }
    });

    $('button.find-location').on('click', function() {
        $('.input-page-wrapper').hide();
        $('.weather-data-wrapper,.app-bar').show();
        var Geo = {};
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            alert('Geolocation is not supported');
        }

        function error() {
            alert("That's weird! We couldn't find you!");
        }

        function success(position) {
            Geo.lat = position.coords.latitude;
            Geo.lng = position.coords.longitude;
            var key = '40dbdf6113225894';

            var wdata = "https://api.wunderground.com/api/" + key + "/forecast/geolookup/conditions/q/" + Geo.lat + "," + Geo.lng + ".json";

            $.ajax({
                url: wdata,
                dataType: "jsonp",
                success: function(data) {
                    // $.each(data, function(i, item) {
                    // console.log(data.location.city);

                    // });
                    // var location = data['location']['city'];
                    // var temp = data['current_observation']['temp_c'];
                    // var feels = data['current_observation']['feelslike_c'];
                    // var weather = data['current_observation']['weather'];
                    // var dateTime = data['current_observation']['observation_time'];
                    // var li = dateTime.replace(/last updated on|est| ist/gi, '');
                    //
                    // var latitude = data['current_observation']['observation_location']['latitude'];
                    // var longitude = data['current_observation']['observation_location']['longitude'];
                    // var elevation = data['current_observation']['observation_location']['elevation'];
                    //
                    // var humidity = data['current_observation']['relative_humidity'];
                    // var dewp = data['current_observation']['dewpoint_c'];
                    // var pressure = data['current_observation']['pressure_mb'];
                    // var uv = data['current_observation']['UV'];
                    // var visibility = data['current_observation']['visibility_km'];
                    //
                    // var winddir = data['current_observation']['wind_dir'];
                    // var winddeg = data['current_observation']['wind_degrees'];
                    // var windspk = data['current_observation']['wind_kph'];
                    // var windgustk = data['current_observation']['wind_gust_kph'];
                    //
                    // var tesst = data['forecast']['txt_forecast']['forecastday[0]']['pop'];
                    // console.log(tesst);
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

                    // var icondummy = 'assets/weather-icons/' + weather + '.png';

                    // var iconw = icondummy.replace(/ /g, '-').toLowerCase();
                    var icon = 'assets/weather-icons/' + data.current_observation.icon + '.png';
                    $('img.w-icon').attr('src', icon);
                }
            });
        }
    });

});