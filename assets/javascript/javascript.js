var blog = (function() {
    'use strict';
    return {
        init: (function(){
            var articles = jQuery('article');
            
            var currentWidth = jQuery(window).width()/3;        
            console.log(currentWidth);
            articles.each(function(){
                jQuery(this).height(currentWidth); 
                jQuery(this).find('.post-content').css('max-height', currentWidth/2);
            });
            
            jQuery(window).resize(function(){
                var currentWidth = jQuery(window).width()/3;
                articles.each(function(){
                    jQuery(this).height(currentWidth); 
                    jQuery(this).find('.post-content').css('max-height', currentWidth/2);
                });
            });
        })
    };
}());
