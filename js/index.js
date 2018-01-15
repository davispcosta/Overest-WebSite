
/*  -----------------  PORTFOLIO    */

$(function () {
    
var filterList = {

    init: function () {
    
        // https://mixitup.kunkalabs.com/
        $('#gallery').mixItUp({
            selectors: {
            target: '.gallery-item',
            filter: '.filter'	
        },
        load: {
          filter: 'all' // show all items on page load.
        }     
        });								
    
    }

};

// Filter ALL the things
filterList.init();

});


/*  -----------------  METHODOLOGY    */

var fill_rotation = 180;
var fix_rotation = fill_rotation*2;

var mainTl = new TimelineMax({paused: true});

$(".step:not(.first) .radial-progress").each(function(i){
    var circle = $(this);
    var line = 	circle.prev('.line').find('.progress');
    var circleFill = circle.find('.fill:not(.fix)');
    var circleMask = circle.find('.mask.full');
    var circleFillMix = circle.find('.fill.fix');

    mainTl.to(line, 0.15, {width: "100%"})
        .to(circle, 0.3, {rotation: "-="+fill_rotation}, "fillCircle-"+i+"")
        .to([circleFill, circleMask], 0.3, {rotation: fill_rotation}, "fillCircle-"+i+"")
        .to(circleFillMix, 0.3, {rotation: fix_rotation}, "fillCircle-"+i+"")
        .set(circleFillMix, {rotation: fix_rotation}, "stopPoint-"+i+"");
});

$('.step .radial-progress').click(function(){
    if($(this).hasClass('active')){
        return false;
    }

    animateToDefault(); 

    $('.active').removeClass('active');

    var index = parseInt($(this).attr('data-index'));
    mainTl.tweenTo("stopPoint-"+(index-1)+"", {onComplete: animateToActive, onCompleteParams:[$(this)]});	
});

function animateToActive(el) {
    var index = parseInt(el.attr('data-index')) + 1;
    $('.copy-holder').find(".step-"+index+"").addClass('active');
    el.addClass('active');

    var innerCircle = el.find('.inner-circle');
    var inset = el.find('.inset');
    var circle = el.find('.circle');
    var mask = el.find('.mask');
    var fill = el.find('.fill');
    var number = el.next('p');
    var stepsCopy = $('.copy-holder div.active');

    TweenLite.set(number, {color: "rgb(250,250,250)", fontSize: 46})
    TweenLite.to(innerCircle, 0.15, {scale: 0});	
    TweenLite.to(el, 0.3, {scale: 1.3, zIndex: 10, ease: Back.easeOut});
    TweenLite.fromTo(stepsCopy, 0.7, {autoAlpha: 0}, {autoAlpha: 1});
}

function animateToDefault(){
    var mainCircle = $('.radial-progress.active');
    var innerCircle = $('.radial-progress.active').find('.inner-circle');
    var inset = $('.radial-progress.active').find('.inset');
    var number = $('.radial-progress.active').next('p');
    var stepsCopy = $('.copy-holder div');

    TweenLite.to(innerCircle, 0.15, {scale: 1})
    TweenLite.set(number, {color: "rgb(119,119,119)", fontSize: 30});
    TweenLite.to(mainCircle, 0.3, {scale: 1, zIndex: 1, ease: Bounce.easeOut});
    TweenLite.to(stepsCopy, 0.7, {autoAlpha: 0});
}

/*  -----------------  CLOUDS   

$(function(){
	var $body=$("body");
	var $container=$(".clouds");
	var clouds=28;
	var layers=[4,7];
	var widthBig=[70,120]; 
	var widthSmall=[10,40];
	var height=10;
	var speed=[0.1,0.25];
	var layerSpeed=[0.15,0.5];
	var scaleSpeed=[0];
	for(var i=0;i<clouds;i++){
	  var cloud=$("<div/>").addClass("cloud");
	  $container.append(cloud);
	  cloud.data("speed",rand(speed[0],speed[1]))
	  var pos=i*($(window).width()/clouds);
	  cloud.data("pos",rand(0,$(window).width()));
	  cloud.css({
		top:height*Math.round((Math.random()*18)) 
	  })
	  var lastPos=0;
	  var lastWidth=0;
	  var lastBig=false;
	  for(var j=0;j<r(layers);j++){
		var layer=$("<div/>").addClass("cloud-layer");
		layer.data("pos",pos);
		layer.data("speed",r(layerSpeed));
		cloud.append(layer);
		var w=r(!lastBig?widthBig:widthSmall);
		var offset=5;
		var max=-(w-lastWidth)+offset;
		var p=rand(!lastBig?lastPos-offset:max,!lastBig?max:lastPos-offset)
		lastBig=!lastBig;
		lastPos=p;
		lastWidth=w;
		layer.css({
		  width:w,
		  left:p
		})
	  }
	  
	}
	function r(a){
	  return rand(a[0],a[1]);
	}
	function rand(min,max){
	  var d=max-min;
	  return min+(Math.random()*d);
	}
	
	function render(){
	  $(".cloud").each(function(){
		var cur=$(this);
		/*var pos=cur.data("pos");
		pos+=cur.data("speed");
		if(pos>$(window).width()){
		  pos=-200;
		}
		cur.data("pos",pos);
		cur.css({
		  transform:"translate("+pos+"px,0)"
		})
		cur.children(".cloud-layer").each(function(){
		  var layer=$(this);
		  var pos=layer.data("pos");
		  pos+=layer.data("speed");
		  if(pos>$(window).width()+200){
			pos=-200;
		  }
		  layer.data("pos",pos);
		  layer.css({
			transform:"translate("+pos+"px,0)"
		  })
		})
	  })
	  requestAnimationFrame(render);
	}
	render();
  })  */

/*  -----------------  STARS    */

var canvas = document.getElementById("stars");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

window.addEventListener('resize',function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    makingStar();
});
function rand(a,b) {
    return Math.random()*(b-a+1)+a;
}
var stars = [];

Stars = function(x, y, radius, speed){
    this.x = x;
    this.y = y;
    this.speed = (speed/25);
    this.radius = radius;
    this.saturation = (95+(this.radius)*5);
    this.lightness = (20+this.radius*4);
};

Stars.prototype = {
    update: function(){
        this.x += this.speed;
        if(this.x - this.radius >= window.innerWidth){
            this.x = 0;
        }
    },
    render: function(){
        c.beginPath();
        c.arc(this.x, this.y, (this.radius < 0) ? 0 : this.radius, 0, Math.PI *2, false);
        var flickerAdd = (rand(0, 140) !== 0) ? rand(5, 20) : 0;
        c.fillStyle = 'hsl('+Math.floor(rand(195,200))+', '+this.saturation+'%, '+(this.lightness+flickerAdd)+'%)';
        c.fill();
    }
};

updateStars = function(a){
    var i = a.length;
    while(i--){
        a[i].update();
    }
};
renderStars = function(a){
    var i = a.length;
    while(i--){
        a[i].render(i);
    }
};

makingStar = function(){
    stars = [];
    var base = .75;
    var inc = .2;
    var count = 40;
    var per = 6;
    while(count--){
        var radius = base + inc;
        var perTime = per;
        while(perTime--){
            radius += inc;
            stars.push(new Stars(rand(0, window.innerWidth-radius), rand(0, window.innerHeight-radius), radius, radius*3));
        }
    }
};

function update() {
    window.requestAnimationFrame(update);
    updateStars(stars);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    renderStars(stars);
}

/*  -----------------  SPLASH    */


var url, hour = new Date().getHours();

if (hour > 7 && hour < 18) {
  $(".daytime").addClass("day");
 } else {
	$(".daytime").addClass("night")
	makingStar();
	update();
}

$(document).ready(function() {
	var paths = document.getElementsByClassName("overest");
	var timeouts = [];
	var stagger = 200;
  
	draw();

	setTimeout(function() {
	  $(".me").addClass("shown");
	}, stagger * paths.length);

	setTimeout(function () {
        var id = "#index";
		var offset = 20;
		var target = $(id).offset().top - offset;
		var scroll = $(window).scrollTop();
		if(scroll < 100) {
			$('html, body').animate({
				scrollTop: target
			}, 1000);
		}		
    }, 3500);
	
	function clearTimeouts(arr) {
	  arr.forEach(function(a) {
		clearTimeout(a);
	  });
	}
	
	function draw() {
	  clearTimeouts(timeouts);
	  $(".demo__svg").addClass("hidden");
	  $(paths).removeClass("animatable").css("fill", "transparent");
  
	  [].forEach.call(paths, function(path) {
		$(path).css({
		  "stroke-dasharray": path.getTotalLength(),
		  "stroke-dashoffset": path.getTotalLength()
		});
	  });
  
	  $(".demo__svg").removeClass("hidden");
  
	  [].forEach.call(paths, function(path, i) {
		timeouts[i] = setTimeout(() => {
		  $(path).addClass("animatable");
		  $(path).css({
			"stroke-dashoffset": 0,
			"fill": "#F1F1F1"
		  });
		}, i * stagger);
	  });
	}  
  });

$(window).scroll(function() {
	
	if ($(window).scrollTop() > 100) {
		$('.main_h').addClass('sticky');
	} else {
		$('.main_h').removeClass('sticky');
	}
});

	
	// Mobile Navigation
	$('.mobile-toggle').click(function() {
		if ($('.main_h').hasClass('open-nav')) {
			$('.main_h').removeClass('open-nav');
		} else {
			$('.main_h').addClass('open-nav');
		}
	});
	
	$('.main_h li a').click(function() {
		if ($('.main_h').hasClass('open-nav')) {
			$('.navigation').removeClass('open-nav');
			$('.main_h').removeClass('open-nav');
		}
	});
	
	// navigation scroll lijepo radi materem
	$('nav a').click(function(event) {
		var id = $(this).attr("href");
		var offset = 70;
		var target = $(id).offset().top - offset;
		$('html, body').animate({
			scrollTop: target
		}, 500);
		event.preventDefault();
});

function castParallax() {

	var opThresh = 350;
	var opFactor = 750;

	window.addEventListener("scroll", function(event){

		var top = this.pageYOffset;

		var layers = document.getElementsByClassName("parallax");
		var layer, speed, yPos;
		for (var i = 0; i < layers.length; i++) {
			layer = layers[i];
			speed = layer.getAttribute('data-speed');
			var yPos = -(top * speed / 100);
			layer.setAttribute('style', 'transform: translate3d(0px, ' + yPos + 'px, 0px)');

		}
	});


}

function dispelParallax() {
	$("#nonparallax").css('display','block');
	$("#parallax").css('display','none');
}


function startSite() {

	var platform = navigator.platform.toLowerCase();
	var userAgent = navigator.userAgent.toLowerCase();

	if ( platform.indexOf('ipad') != -1  ||  platform.indexOf('iphone') != -1 ) 
	{
		dispelParallax();
	}
	
	else if (platform.indexOf('win32') != -1 || platform.indexOf('linux') != -1)
	{
		castParallax();					
	}
	
	else
	{
		castParallax();
	}

}

document.body.onload = startSite();


/*  -----------------  TYPING    */

var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
	css.innerHTML = ".day > .wrap { color: #0A2752; }";
	css.innerHTML = ".night > .wrap { color: #DF2E2E; }";
  document.body.appendChild(css);
};
