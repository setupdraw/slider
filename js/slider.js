/*
* Setupdraw - Rob Dunne
* August 2013
* setupdraw.com
*/

// Set the slider details
var info = {
    0: {
        title: 'Hope',
        desc:  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus blandit sem ac sollicitudin.',
        link:  'http://www.hope.com',
        image: 'images/slider-0.jpg'
    },
    1: {
        title: 'Freedom',
        desc:  'Cras porttitor mi a nisi varius, ut pellentesque dui tincidunt. Vestibulum a pretium ligula.',
        link:  'http://www.freedom.com',
        image: 'images/slider-1.jpg'
    },
    2: {
        title: 'Happiness',
        desc:  'Phasellus iaculis velit nisl, a scelerisque ligula ultricies eu. Donec vestibulum metus erat, ac sodales metus vulputate nec.',
        link:  'http://www.happiness.com',
        image: 'images/slider-2.jpg'
    }
};

// Set the slider delays
var sliderTimeDelay = 8000;
var sliderTextDelay = 1700;

/*
* For most installations you won't need to edit below this line
*/

function startSlider() {
	setTimeout(function() {
		// Wait n milliseconds (sliderTimeDelay) then start the slider
		slides(0,info);
	},sliderTimeDelay);
	
	// Populate caption on load
	$('#slider-caption h4').text(info[0].title);
	$('#slider-caption p').text(info[0].desc);
	$('#slider-caption a').attr('href',info[0].link);
	
	// Add the image elements
	for(var i=0;i<$.keyCount(info);i++) {
		var start = parseInt(i*100)+'%';
		var img = '<img src="img/slider-'+i+'.jpg" id="slider-'+i+'" style="left:'+start+'" />';
		$('#slider').prepend(img);
	}
}

// Bring all the parts together
function slides(num,info) {	
	// Slider
	slidesSlider();
	
	// Keep the counter between 1 and the max number of slides
	num = (num < $.keyCount(info)-1) ? num+1 : 0;
	
	// Add the caption details
	sliderText(num,info);
	
	// Loop
	setTimeout(function() { slides(num,info); },sliderTimeDelay);
}

// Animate the image queue
function slidesSlider() {
	// Slide the queue of images
	for(var i=0;i<$.keyCount(info);i++) {
		$("#slider-"+i).animate({left: "-=100%"}, 5000, "swing",function() { slideReset($(this)); });
	}
}

// Move the last image to go off screen back to the end of the queue
function slideReset(obj) {
	if($(obj).css('left').indexOf('-') !== -1) { 
		var end = parseInt($.keyCount(info)-1);
		$(obj).css('left',end+'00%');
	}
}

// Set the overlay text
function sliderText(num,info) {
	setTimeout(function() {
		$('#slider-caption h4').text(info[num].title);
		$('#slider-caption p').text(info[num].desc);
		$('#slider-caption a').attr('href',info[num].link);
	},sliderTextDelay);
}

// Set the link highlights
function highlightLink(num) {
	setTimeout(function() {
		$('#bottom-content-right a').removeAttr('style');
		$('#bottom-content-right a').eq(num).css('background','#fff');
		$('#bottom-content-right a').eq(num).css('color','#ff6600');
	},sliderTextDelay);
}

// Count the object keys - used to be compatible with IE7/8
$.extend({
    keyCount : function(o) {
        if(typeof o == "object") {
            var i, count = 0;
            for(i in o) {
                if(o.hasOwnProperty(i)) {
                    count++;
                }
            }
            return count;
        } else {
            return false;
        }
    }
});

// Start everything once the page is ready
$(document).ready(function() {
	startSlider();
});