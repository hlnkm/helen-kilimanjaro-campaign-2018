$(document).ready(function(){
	let $animatedTitle = $('.title-animated')
	let $animatedTitleSwitch = 0;
	let $daysLeft = $("#daysLeft") 

	/*
	@ Animated Title: switches between steps & dollars
	*/
	var typeWord = function() {
			// clear the text
			$animatedTitle.html("")
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
	$( "#result" ).load( `https://cors-anywhere.herokuapp.com/${mjffUrl} .was-raised`);

	/*
	countdown
	*/
	var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
	var endDate = Date.parse('01 Aug 2018 00:00:00 EST');
	var today = new Date()
	var diffDays = Math.round(Math.abs((endDate - today.getTime())/(oneDay)));
	$daysLeft.text(diffDays)





})