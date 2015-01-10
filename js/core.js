var rateObject = {
	urlRate : '//app.radio13.ru/chart/mod/rate.php',
	urlReset : '//app.radio13.ru/chart/mod/reset.php',
	rate : function(obj) {
		$('.rate').on('click', function(e) {
			var thisObj = jQuery(this);
			var thisType = thisObj.hasClass('rateUp') ? 'up' : 'down';
			var thisItem = thisObj.attr('data-item');
			var thisValue = thisObj.children('button > span').text();
			jQuery.getJSON(rateObject.urlRate, { type : thisType, item : thisItem }, function(data) {
				if (!data.error) {
					thisObj.children('button > span').html(parseInt(thisValue, 10) + 1);
					thisObj.parent('.rateWrapper').find('.rate').addClass('active').removeClass('rate');
					thisObj.addClass('active');
					thisObj.attr("disabled", true);
				}
			});
			e.preventDefault();
		});
	},
	reset : function(obj) {
		obj.on('click', function(e) {
			jQuery.getJSON(rateObject.urlReset, function(data) {
				if (!data.error) {
					location.reload();
				}
			});
			e.preventDefault();
		});
	}
};
jQuery(function() {
	jQuery.ajaxSetup({ cache:false });
	rateObject.rate(jQuery('.rate'));
	rateObject.reset(jQuery('.reset'));
});





