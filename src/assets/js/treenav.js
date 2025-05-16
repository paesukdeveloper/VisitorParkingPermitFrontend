
(function ($) {
	$.fn.treeNav = function (options) {
		$.extend({
		}, options);
		return this.each(function () {
			const target = $(this);
			const folders = $(target).find("li[data-type='folder']");
			$(folderIcon).addClass("folder").prependTo(folders); //add to each li element that has data-type folder attribute 
			$(".folder").click(function () {
				$(this).toggleClass("open");
				const subItems = $(this).siblings("ul");
				$(subItems).slideToggle();
			});
		});
	};
})(jQuery);
