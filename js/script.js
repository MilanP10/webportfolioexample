$(document).ready(function(){

//---NAVIGATION--
    (function(){
        var $navigation = $("#navigation");

        if($(this).scrollTop() !== 0){
            $navigation.addClass("scrolled-nav");
        }

        $(window).scroll(function() {
            if($(this).scrollTop() !== 0){
                $navigation.addClass("scrolled-nav");
            }
            else{
                $navigation.removeClass("scrolled-nav");
            }
        });
    })();


//---HOME TEXT--
    (function(){
        var $word = $(".changing-word");
        var textArray = ["making websites", "designing", "building apps"];
        var wordIndex = 0;
        var typeDelay = 170;

        function textChange(){
            for(var i=0; i<textArray[wordIndex].length; i++){
                letterSetTimeout(i);
                if(i == textArray[wordIndex].length-1){
                    endSetTimeout(i);
                    startSetTimeout(i);
                }
            }
        }

        function letterSetTimeout(i) {
             setTimeout(function(){
                $word.append(textArray[wordIndex].charAt(i));
            }, typeDelay*i);
        }

        function endSetTimeout(i) {
             setTimeout(function(){
                $word.addClass("end-text");
            }, (typeDelay*i)+2000);
        }

        function startSetTimeout(i) {
             setTimeout(function(){
                $word.removeClass("end-text");
                $word.text("");
                resetTextChange();
            }, (typeDelay*i)+4500);
        }

        function resetTextChange(){
            wordIndex ++;
            if(wordIndex == textArray.length){
                wordIndex = 0;
            }
            setTimeout(function(){
                textChange();
            }, 800);
        }

        textChange();
    })();

//---TILE OPENING--
    (function(){
        var $imgClick = $(".project-tile img");
        var $openClick = $(".open-tile");
        var $closeClick = $(".close");
        var $tiles = $(".tile-desc");

        $imgClick.on("click", openTile);
        $openClick.on("click", openTile);
        $closeClick.on("click", closeTile);

        function openTile(e){
            var index = $(this).data("index");
            for(var i=0; i<$tiles.length; i++){
                if($tiles.eq(i).data("index") == index){
                    $tiles.eq(i).addClass("tile-open");
                }
            }
        }

        function closeTile(){
            var index = $(this).data("index");
            for(var i=0; i<$tiles.length; i++){
                if($tiles.eq(i).data("index") == index){
                    $tiles.eq(i).removeClass("tile-open");
                }
            }
        }
    })();

//---CONTACT FORM--
    (function(){
        var $formName = $("#form-name");
        var $formMail = $("#form-mail");
        var $formMsg = $("#form-msg");

        $formName.on("focus", contactWrite);
        $formName.on("focusout", contactWrite);
        $formMail.on("focus", contactWrite);
        $formMail.on("focusout", contactWrite);
        $formMsg.on("focus", contactWrite);
        $formMsg.on("focusout", contactWrite);

        function contactWrite(){
            if($(this).val().length == 0){
                $(this).parent().toggleClass("active-input");
            }
        }
    })();

//---MOBILE NAVIGATION--
    (function(){
        var $mobileIcon = $(".mobile-icon");
        var $mobileNav = $(".sections");
        var $mobileLinks = $(".mobile-navigation a");
        var $mobileBackground = $(".mobile-background");
        var $mobileClose = $(".mobile-navigation .close");

        $mobileIcon.on("click", openMobile);
        $mobileLinks.on("click", closeMobile);
        $mobileClose.on("click", closeMobile);
        $mobileBackground.on("click", closeMobile);

        function openMobile(e){
            e.preventDefault();
            $mobileNav.css("transform", "translateX(-70%)");
            $mobileBackground.css({"height":"100%", "opacity":"0.6"});
        }
        function closeMobile(){
            $mobileNav.css("transform","translateX(0)");
            $mobileBackground.css("opacity", "0");
            setTimeout(function(){
                $mobileBackground.css("height", "0");
            }, 300);
        }
    })();

//---SCROLL EFFECT--
    (function(){
        var $links = $(".nav-links a");

        $(window).on("scroll", scrolling);

        function scrolling(){
            $("section").each(function(){
                const slideInAt = (window.scrollY + (window.innerHeight / 1.5));
                const isHalfShown = slideInAt > $(this).offset().top && slideInAt < ($(this).offset().top) + ($(this).height());
                if(isHalfShown){
                    $("section").find(".section-heading").removeClass("active-section");
                    $(this).find(".section-heading").addClass("active-section");
                     var index = parseInt($(this).data("index"));
                     navigationPosition(index);
                }
            });
        }

        function navigationPosition(index){
            $links.removeClass("active-link");
            $links.eq(index).addClass("active-link");
        }
    })();

//---SERVICE EFFECT--
    (function(){
        var $heading = $(".services-grid h5");
        var $text = $(".services-grid p");
        var $icon = $(".service-icon");
        var $serviceSection = $("#service");
        var index = 0;

        $(window).on("scroll", scrolling);

        function scrolling(){
            const slideInAt = (window.scrollY + (window.innerHeight / 3));
            const isHalfShown = slideInAt > $serviceSection.offset().top;
            if(isHalfShown){
                    serviceShow(index);
            }
        }

        function serviceShow(index){
            $heading.eq(index).addClass("active-service");
            $text.eq(index).addClass("active-service");
            $icon.eq(index).addClass("active-service");
            if(index < $icon.length);
            setTimeout(function(){
                serviceShow(index+=1);
            }, 350);
        }

    })();

//---GOOGLE MAPS--
        function initMap(){
            var options = {
                center: {lat: 45.815399, lng: 15.966568},
                zoom: 12
            }
            var map = new google.maps.Map(document.getElementById('map'), options);

            var marker = new google.maps.Marker({
                position: {lat: 45.815399, lng: 15.966568},
                map: map
            });
        }
        initMap();
});
