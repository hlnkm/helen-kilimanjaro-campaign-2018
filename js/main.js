$(window).on('load', function() {
  let $daysLeft = $("#Days-Left") 


  //  ==========================================================================  Banner
  var Banner = (function() {

    var $wndwHght, $bnnr, $loader;

    var init = function() {
      loadElements();
      addListeners();
    };

    var loadElements = function() {
      $bnnr = $('#Banner');
      $loader = $('.loader');
    };

    var addListeners = function(offset) {
      resize();
      $(window).resize(function() {
        resize();
      });
    };

    var resize = function() {
      $wndwHght = $(window).height();
      $bnnr.css('height', $wndwHght);
      $loader.addClass('loaded');
    }

    return {
      init: init
    };
  })();

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

      $("#campaign-status").html(`
        <div style="padding-top: 5px;"> <span style="font-size: 24px;"><b>$${wasRaised}</b></span></div>
        <div id='progress-bar' style="width:100%; height:20px; background-color:#EB6E80; border-radius:8px"> 
          <div style="width:${percentage}%; height:20px; background-color:#ED912B ; border-radius:8px"> </div>
          <div>pledged of the total $19,341 goal</div>
        </div>`)
      // console.log(wasRaised);
    });

    /*
    countdown
    */
    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    var endDate = Date.parse('01 Aug 2018 00:00:00 EST');
    var today = new Date()
    var diffDays = Math.round(Math.abs((endDate - today.getTime())/(oneDay)));
    $daysLeft.text(diffDays)


  Banner.init();

});