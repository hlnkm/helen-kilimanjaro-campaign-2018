$(document).ready(function(){
	let $animatedTitle = $('.title-animated')
	let $animatedTitleSwitch = 0;
	let $daysLeft = $("#daysLeft") 

	/*
	@ Animated Title: switches between steps & dollars
	*/
	var typeWord = function() {
			// clear the text
			$animatedTitle.text(" ")
			const text = ['FEET', 'DOLLARS']

			if($animatedTitleSwitch >= text.length - 1){
				$animatedTitleSwitch = 0
			} else{
				$animatedTitleSwitch++
			}
	    var selection = text[$animatedTitleSwitch];

	    var i = 0;
	    var selectionLength = selection.length;
	    var typeLetters = setInterval(function(){
	    	if(i <= selectionLength){
	    		$animatedTitle.append(selection[i]);		
	    		i++;
	    	} else{
	    		clearInterval(typeLetters);
	    	}
	    }, 100);
	    
	}
	typeWord();
	setInterval(typeWord, 3000);


	/*
	get current value for fundraiser
	*/
	const mjffUrl = "https://fundraise.michaeljfox.org/tf-2018/HelenandKilimanjaro"
	// $( "#result" ).load( `https://cors-anywhere.herokuapp.com/${mjffUrl} .was-raised`);

	$.get(`https://cors-anywhere.herokuapp.com/${mjffUrl}`, function(data) {
		
		// let body = $.parseHTML(data)
		let wasRaised = $(data).find(".was-raised").text()
		wasRaised = wasRaised.replace(/\D+/g, '');

		var percentage =(wasRaised/19341)*100 ;

		$("#result").html(`<div id='progress-bar' 
			style="width:100%; height:10px; background-color:white"> 
				<div style="width:${percentage}%; height:10px; background-color:#008f95"> </div>
				<div style="padding-top: 5px;"> <span style="font-size: 24px;"><b>$${wasRaised}</b></span></div>
				<div>pledged of the total $19,341 goal</div>
			</div>`)
		console.log(wasRaised);
	});

	/*
	countdown
	*/
	var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
	var endDate = Date.parse('01 Aug 2018 00:00:00 EST');
	var today = new Date()
	var diffDays = Math.round(Math.abs((endDate - today.getTime())/(oneDay)));
	$daysLeft.text(diffDays)



	/*menu*/
	$(document).scroll(function () {
	    var y = $(this).scrollTop();
	    if (y > 200) {
	        $('.bottomMenu').fadeIn();
	    } else {
	        $('.bottomMenu').fadeOut();
	    }

	});

	//initialize swiper when document ready
	// var journeySwiper = new Swiper ('.journey-swiper', {
	//      // Optional parameters
	//      direction: 'horizontal',
	//      loop: true
	//    })


})