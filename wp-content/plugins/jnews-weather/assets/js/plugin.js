(function($){

	'use strict';

	window.jnews.weather = window.jnews.weather || {};

	window.jnews.weather =
	{
		init: function( $container )
        {
            let base = this;

            if ( $container === undefined )
            {
                base.container = $('body');
            } else {
                base.container = $container;
            }

            base.topbarWeather();
            base.widgetWeather();
        },

        topbarWeather: function()
        {
            let base = this;

            if ( base.container.find('.jeg_top_weather').length )
            {
                base.element = base.container.find('.jeg_top_weather');
                base.topbarWeatherHover();
                base.topbarWeatherCarousel();
                base.topbarTempClick();
            }
        },

        topbarTempClick: function()
        {
            let base = this;

            base.element.on('click', '.jeg_weather_temp', function()
            {
                let $this     = $(this),
                    $value    = $this.find('.jeg_weather_value'),
                    $unit     = $this.find('.jeg_weather_unit'),
                    dataUnit  = $unit.attr('data-unit');

                if ( $this.find('.jeg_weather_degrees').length ) {
                    $unit     = $this.find('.jeg_weather_degrees');
                    dataUnit  = $unit.attr('data-unit');
                }

                if ( 'f' === dataUnit ) {
                    $value.text( $value.attr('data-temp-c') );
                    $unit.attr('data-unit', 'c');
                    $this.find('.jeg_weather_unit').text( '°c' );
                } else {
                    $value.text( $value.attr('data-temp-f') );
                    $unit.attr('data-unit', 'f');
                    $this.find('.jeg_weather_unit').text( '°f' );
                }
            });
        },

        topbarWeatherHover: function()
        {
            let base = this;

            base.element.hoverIntent({
                over: function () {
                    $(this).find('.jeg_weather_item').fadeIn();
                },
                out: function () {
                    $(this).find('.jeg_weather_item').fadeOut();
                },
                timeout: 300
            });
        },

        topbarWeatherCarousel: function()
        {
            let base = this;
                base.autoplay      = base.element.find('.jeg_weather_item_carousel').attr('data-autoplay');
                base.autoplayDelay = base.element.find('.jeg_weather_item_carousel').attr('data-auto-delay');
                base.autoplayHover = base.element.find('.jeg_weather_item_carousel').attr('data-auto-hover');

            if ( base.element.find('.jeg_weather_item_carousel').length )
            {
                base.element.find('.jeg_weather_item_carousel').owlCarousel({
                    items: 3,
                    rewind: true,
                    dots: false,
                    nav: false,
                    navText: false,
                    autoplay: base.autoplay,
                    autoplayTimeout: base.autoplayDelay,
                    autoplayHoverPause: base.autoplayHover,
                });
            }
        },

        convertTemperature: function( tempUnit, tempValue )
        {
            let data = {};

            if ( 'f' === tempUnit )
            {
                data.unit  = 'c';
                data.value = ( ( tempValue - 32 ) * 5 ) / 9;
                data.value = Math.floor( data.value );
            } else {
                data.unit  = 'f';
                data.value = ( ( tempValue * 9 ) / 5 ) + 32;
                data.value = Math.floor( data.value );
            }

            return data;
        },

        widgetWeather: function()
        {
            let base = this;

            if ( base.container.find('.jeg_weather_widget').length )
            {
                base.element = base.container.find('.jeg_weather_widget');
                base.widgetTempClick();
            }
        },

        widgetTempClick: function()
        {
            let base = this;

            base.element.on('click', '.jeg_weather_temp', function() {
                $(this).find('.jeg_weather_value').each( function() {
                    let $this    = $(this),
                        parent   = $this.parent(),
                        unit     = parent.find('.jeg_weather_unit'),
                        dataUnit = unit.attr('data-unit');

                    if ( 'f' === dataUnit ) {
                        $this.text( $this.attr('data-temp-c') );
                        unit.attr('data-unit', 'c');
                        unit.text( 'c' );
                    } else {
                        $this.text( $this.attr('data-temp-f') );
                        unit.attr('data-unit', 'f');
                        unit.text( 'f' );
                    }
                });
            });
        }
	};

    $(document).bind('ready jnews-ajax-load', function() {
        jnews.weather.init();
    });

})(jQuery);
