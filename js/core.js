var rateObject = {
	urlRate : 'https://app.radio13.ru/chart4/mod/rate.php',
	urlReset : 'https://app.radio13.ru/chart4/mod/reset.php',
	rate : function(obj) {
		$('.rate').on('click', function(e) {

			var thisObj = jQuery(this);
			var thisType = thisObj.hasClass('rateUp') ? 'up' : 'down';
			var thisItem = thisObj.attr('data-item');
			var thisValue = thisObj.children('button > span').text();
			$.getJSON(rateObject.urlRate, { type : thisType, item : thisItem }, function(data) {
				if (!data.error) {
					thisObj.children('button > span').html(parseInt(thisValue, 10) + 1);
					thisObj.parent('.rateWrapper').find('.rate').addClass('active').removeClass('rate');
					thisObj.addClass('active');
					thisObj.attr("disabled", true);
					$.jGrowl("Отлично, мы ценим твой выбор. Принято!", {
						header: 'Голосование',
						life: 3000,
						theme: 'default'
					});	
				}
			});
			e.preventDefault();

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
