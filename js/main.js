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

  function roundTo2(x) {
    return Number.parseFloat(x).toFixed(2);
  }

  /*
    get current value for fundraiser
    */
    const mjffUrl = "https://fundraise.michaeljfox.org/tf-2018/HelenandKilimanjaro"
    // $( "#result" ).load( `https://cors-anywhere.herokuapp.com/${mjffUrl} .was-raised`);

    $.get(`https://cors-anywhere.herokuapp.com/${mjffUrl}`, function(data) {
      
      // let body = $.parseHTML(data)
      let wasRaised = $(data).find(".was-raised").text()
      wasRaised = wasRaised.replace(/[,$]/g, '');
      // for the decimal point
      wasRaised = Number.parseFloat(wasRaised);
      wasRaised = roundTo2(wasRaised);
      console.log(wasRaised)

      var percentage = Math.floor(wasRaised/19341)*100 ;

      $("#fundingPercentage").text(percentage);

      if(percentage >= 100){
        $("#campaign-status").html(`
          <div style="padding-top: 5px;"> <span style="font-size: 24px;"><b>$${wasRaised}</b></span></div>
          <div id='progress-bar' style="width:100%; height:20px; background-color:#EB6E80; border-radius:8px"> 
            <div style="width:${100}%; height:20px; background-color:#ED912B ; border-radius:8px"> </div>
            <div>pledged of the total $19,341 goal</div>
          </div>`)  
      } else{
        $("#campaign-status").html(`
          <div style="padding-top: 5px;"> <span style="font-size: 24px;"><b>$${wasRaised}</b></span></div>
          <div id='progress-bar' style="width:100%; height:20px; background-color:#EB6E80; border-radius:8px"> 
            <div style="width:${percentage}%; height:20px; background-color:#ED912B ; border-radius:8px"> </div>
            <div>pledged of the total $19,341 goal</div>
          </div>`)
      }
      


      // get supporters list:
      let supportedBy = $(data).find(".topFundName")
      $(supportedBy).find(".topFundimage").remove();;
      // console.log(supportedBy);
      let supportersList = "Danny, Jen, Ellina, Jurry, and Millie";
      $(supportedBy).each(function(idx, name){
        supportersList +=  `, ${$(name).text()}`
      })
      supportersList += ", and all of those helping to raise awareness and support for this campaign and others!"
      // console.log(supportersList)
      $("#supportersList").text(supportersList);

    });

    /*
    countdown
    */
    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    var endDate = Date.parse('25 Jul 2018 00:00:00 EST');
    var today = new Date()
    var diffDays = Math.round(Math.abs((endDate - today.getTime())/(oneDay)));
    $daysLeft.text(diffDays)

  Banner.init();

});