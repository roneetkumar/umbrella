$(function() {
    $('.weather-data-wrapper,.app-bar').hide();

    // $('button.sub-btn,button.find-location').on('click', function() {
    //
    // });

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
                    var dateTime = data['current_observation']['local_time_rfc822'];
                    var feels = data['current_observation']['feelslike_c'];
                    var weather = data['current_observation']['weather'];

                    $('.city-name').html(location);
                    $('.temp').html(temp + '°C');
                    $('.date-time').html(dateTime);
                    $('.weather').html(weather);
                    $('.feels').html('Feels like ' + feels + '°C');


                    $('img.w-icon').attr('src', 'assets/sun.png');
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
            console.log(wdata);
            $.ajax({
                url: wdata,
                dataType: "jsonp",
                success: function(data) {
                    var location = data['location']['city'];
                    var temp = data['current_observation']['temp_c'];
                    var feels = data['current_observation']['feelslike_c'];
                    var weather = data['current_observation']['weather'];
                    var dateTime = data['current_observation']['observation_time'];
                    var li = dateTime.replace(/last updated on | ist/gi, '');

                    var humidity = data['current_observation']['relative_humidity'];
                    var dewp = data['current_observation']['dewpoint_c'];
                    var pressure = data['current_observation']['pressure_mb'];
                    var uv = data['current_observation']['UV'];

                    $('.city-name').html(location);
                    $('.temp').html(temp + '°C');
                    $('.date-time').html(li);
                    $('.weather').html(weather);
                    $('.feels').html('Feels like ' + feels + '°C');

                    $('.humi-data').html(humidity);
                    $('.dew-data').html(dewp);
                    $('.pre-data').html(pressure);
                    $('.uv-data').html(uv);

                    $('img.w-icon').attr('src', 'assets/sun.png');
                }
            });
        }
    });

});