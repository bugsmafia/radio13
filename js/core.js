var rateObject = {
	urlRate : '//app.radio13.ru/chart4/mod/rate.php',
	urlReset : '//app.radio13.ru/chart4/mod/reset.php',
	rate : function(obj) {
		$('.rate').on('click', function(e) {
			alert('rate on click');
			var thisObj = jQuery(this);
			var thisType = thisObj.hasClass('rateUp') ? 'up' : 'down';
			var thisItem = thisObj.attr('data-item');
			var thisValue = thisObj.children('button > span').text();
			$.getJSON(rateObject.urlRate, { type : thisType, item : thisItem }, function(data) {
				alert('getJSON rateObject');
				if (!data.error) {
					alert('getJSON data.error');
					thisObj.children('button > span').html(parseInt(thisValue, 10) + 1);
					thisObj.parent('.rateWrapper').find('.rate').addClass('active').removeClass('rate');
					thisObj.addClass('active');
					thisObj.attr("disabled", true);
				}
			});
			e.preventDefault();
			alert('preventDefault');
		});
	},
	reset : function(obj) {
		obj.on('click', function(e) {
			$.getJSON(rateObject.urlReset, function(data) {
				if (!data.error) {
					location.reload();
				}
			});
			e.preventDefault();
		});
	}
};
$(function() {
	$.ajaxSetup({ cache:false });
	rateObject.rate($('.rate'));
	rateObject.reset($('.reset'));
});
