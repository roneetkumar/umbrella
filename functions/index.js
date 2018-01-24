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
                    var location = data['location']['city'];
                    var temp = data['current_observation']['temp_c'];
                    var feels = data['current_observation']['feelslike_c'];
                    var weather = data['current_observation']['weather'];
                    var dateTime = data['current_observation']['observation_time'];
                    var li = dateTime.replace(/last updated on|est| ist/gi, '');

                    var latitude = data['current_observation']['observation_location']['latitude'];
                    var longitude = data['current_observation']['observation_location']['longitude'];
                    var elevation = data['current_observation']['observation_location']['elevation'];

                    var humidity = data['current_observation']['relative_humidity'];
                    var dewp = data['current_observation']['dewpoint_c'];
                    var pressure = data['current_observation']['pressure_mb'];
                    var uv = data['current_observation']['UV'];
                    var visibility = data['current_observation']['visibility_km'];

                    var windstr = data['current_observation']['wind_string'];
                    var winddir = data['current_observation']['wind_dir'];
                    var winddeg = data['current_observation']['wind_degrees'];
                    var windspk = data['current_observation']['wind_kph'];
                    var windgustk = data['current_observation']['wind_gust_kph'];

                    $('.city-name').html(location);
                    $('.temp').html(Math.floor(temp) + '°C');
                    $('.date-time').html(li);
                    $('.weather').html(weather);
                    $('.feels').html('Feels like ' + feels + '°C');

                    $('.lat-data').html(latitude);
                    $('.long-data').html(longitude);
                    $('.ele-data').html(elevation);

                    $('.humi-data').html(humidity);
                    $('.dew-data').html(dewp);
                    $('.pre-data').html(pressure);
                    $('.uv-data').html(uv);
                    $('.visi-data').html(visibility);

                    $('.windstr-data').html(windstr);
                    $('.winddir-data').html(winddir);
                    $('.winddeg-data').html(winddeg);
                    $('.windspk-data').html(windspk);
                    $('.windgustk-data').html(windgustk);

                    var icondummy = 'assets/weather-icons/' + weather + '.png';

                    var iconw = icondummy.replace(/ /g, '-').toLowerCase();

                    $('img.w-icon').attr('src', iconw);

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
                    var location = data['location']['city'];
                    var temp = data['current_observation']['temp_c'];
                    var feels = data['current_observation']['feelslike_c'];
                    var weather = data['current_observation']['weather'];
                    var dateTime = data['current_observation']['observation_time'];
                    var li = dateTime.replace(/last updated on|est| ist/gi, '');

                    var latitude = data['current_observation']['observation_location']['latitude'];
                    var longitude = data['current_observation']['observation_location']['longitude'];
                    var elevation = data['current_observation']['observation_location']['elevation'];

                    var humidity = data['current_observation']['relative_humidity'];
                    var dewp = data['current_observation']['dewpoint_c'];
                    var pressure = data['current_observation']['pressure_mb'];
                    var uv = data['current_observation']['UV'];
                    var visibility = data['current_observation']['visibility_km'];

                    var winddir = data['current_observation']['wind_dir'];
                    var winddeg = data['current_observation']['wind_degrees'];
                    var windspk = data['current_observation']['wind_kph'];
                    var windgustk = data['current_observation']['wind_gust_kph'];

                    $('.city-name').html(location);
                    $('.temp').html(Math.floor(temp) + '°C');
                    $('.date-time').html(li);
                    $('.weather').html(weather);
                    $('.feels').html('Feels like ' + feels + '°C');

                    $('.lat-data').html(latitude);
                    $('.long-data').html(longitude);
                    $('.ele-data').html(elevation);

                    $('.humi-data').html(humidity);
                    $('.dew-data').html(dewp);
                    $('.pre-data').html(pressure);
                    $('.uv-data').html(uv);
                    $('.visi-data').html(visibility);

                    $('.winddir-data').html(winddir);
                    $('.winddeg-data').html(winddeg);
                    $('.windspk-data').html(windspk);
                    $('.windgustk-data').html(windgustk);

                    var icondummy = 'assets/weather-icons/' + weather + '.png';

                    var iconw = icondummy.replace(/ /g, '-').toLowerCase();
                    $('img.w-icon').attr('src', iconw);

                }
            });
        }
    });

});