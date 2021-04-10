jQuery(document).ready(function(){
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })
    function iOS() {
      return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
      ].includes(navigator.platform)
      // iPad on iOS 13 detection
      || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    }

    $('#popup').modal({backdrop: 'static'});
    $('#popup').modal('show');
    function closePopup(event) {
        AnimateTransition({
            blockOut: "#popup",
            animation: "bounce-out",
            onTransitionEnd: function (blockIn, blockOut, container, event) {
                $('#popup').modal('dispose');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
                customOverlay.style.display = 'none'; 
            }
        });
    };
    var alias = document.getElementById("alias");
    $("#anonym").click(() => {
        alias = "anonymous";
        closePopup();
    });
    $("#submit").click(()=> {
        if (alias.value === "") {
            alias.classList.add("is-invalid");
        } else {
            closePopup();
        }
    alias = alias.value;
    });
    var currWall = 1;
    if(!iOS()) { 
        document.getElementById("out").style = "display: none;";
    }
    var mainOutDiv = [ {maindiv: "#outMaria" , inDiv: "maria" }, {maindiv: "#outRose" , inDiv: "rose" }, {maindiv: "#outSheena" , inDiv: "sheena" }];
    var customOverlay = document.querySelector('.custom-overlay');

    //document.getElementById("popup").setAttribute("data-type", "popup");
    AnimateTransition({
        container: container,
        blockIn: "#popup",
        animation: "bounce-in",
        onTransitionStart: function (blockIn, blockOut, container, event) {
            customOverlay.style.display = 'block';
        },
        onTransitionEnd: function (blockIn, blockOut, container, event) {
        }
    });

    mainOutDiv.forEach(div => {
        var divIn = div.inDiv;
        $(div.maindiv).click(function(e){
            var randomnumber = Math.floor(Math.random() * (999999 - 500 + 500)) + 999999;
            var input = document.createElement("input");
            var div = document.createElement("div");
            var parent = document.getElementById(divIn);

            var inpid = "inp" + randomnumber;
            var divid = "div" + randomnumber;
            input.id = inpid;
            input.style = "border: 0; color: white; outline: none; background: transparent;";
            div.style = "position: absolute;";
            div.id = divid;

            parent.appendChild(div); 
            div.appendChild(input); 
            $('#' + inpid).prop('maxLength', 20);
            $('#' + divid).html(input.focus()).offset({ top: e.pageY, left: e.pageX});

            input.focus();
            //input.setSelectionRange(0, input.value.length)
            input.scrollIntoView();


            document.querySelector('#' + divid).scrollIntoView({
              behavior: 'smooth'
            });
            var textId = inpid;
            var position = $('#' + divid).position();

            var leftPost = position.left/$(window).width() * 100;
            var topPost = position.top/$(window).height() *100;
            console.log(leftPost, topPost);
            // var topPost = $('#' + divid).position().top;
            // var leftPost = $('#' + divid).position().left;
            var ID = [];

            // GET ALL IDs
            $("*").each(function() {
                if (this.id) {
                    ID.push(this.id);
                }
            });
            $('#' + inpid).blur(() => {
                var textValue = $('#' + inpid).val();
                if (textValue !== "") {
                    $.ajax({
                        url: "./php/insertText.php",
                        method: "POST",
                        data: { tId: textId, tVal: textValue, tPost: topPost, lPost: leftPost, IDS: ID , wall: currWall, aId: alias},
                        dataType: "text",
                        success: (data) => {
                            $data = $.parseJSON(data);
                            $inner = "";
                            $data.forEach(elem => {
                                $inner += elem + "</div>";
                            });
                            //console.log($inner);
                            parent.innerHTML = $inner;

                            var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
                            var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                              return new bootstrap.Tooltip(tooltipTriggerEl);
                            });
                        }
                    })
                }
            });

          });

    });
    var maria = document.getElementById("outMaria");
    var rose = document.getElementById("outRose");
    var sheena = document.getElementById("outSheena");

    var nextButton = document.querySelector('#next'),
    prevButton = document.querySelector('#prev'),
    container = 'body';
    $("#outRose").hide();
    $("#outSheena").hide();
    function nextFu(e) {
        var blockIn, blockOut;
        if(currWall === 1 ) {
            blockIn = "#outRose";
            blockOut = "#outMaria";
        } else if (currWall === 2) {
            blockIn = "#outSheena";
            blockOut = "#outRose";
            $('#next').hide("drop", {direction: 'right'});
        }
        $('#prev').show("slide", {direction: 'left'});
        $(blockOut).hide("slide", {direction: 'right'});
        $(blockIn).show("slide", {direction: 'left'}, 0, cb => {
            currWall = (window.getComputedStyle(maria).getPropertyValue("display") === "block") ? 1 : (window.getComputedStyle(rose).getPropertyValue("display") === "block") ? 2 : 
                (window.getComputedStyle(sheena).getPropertyValue("display") === "block") && 3;
        });
        //(currWall === 1) && $('#prev').toggle("bounce", {direction: 'right'}, 1000);
        //(currWall === 3) && $('#next').toggle("bounce", {direction: 'right'}, 1000);

       // // var clone = $("#out").clone(); 
       //  if(!iOS()) { 
       //      // AnimateTransition({       
       //      //     container: container,     
       //      //     blockIn: blockIn,
       //      //     blockOut: blockOut,
       //      //     animation: "slide-in",
       //      //     onTransitionStart: function (blockIn, blockOut, container, event) {
       //      //         nextButton.setAttribute('disabled', 'disabled');
       //      //         //(currWall === 2) && 
       //      //     },
       //      //     onTransitionEnd: function (blockIn, blockOut, container, event) {
       //      //         nextButton.removeAttribute('disabled');
       //      //         console.log(blockIn, blockOut)
       //      //         blockIn.setAttribute('data-block', 'out');
       //      //         blockOut.setAttribute('data-block', 'in');
       //      //         container.appendChild(blockOut);
       //      //         currWall = (maria.getAttribute("data-block") === "out") ? 1 : (rose.getAttribute("data-block") === "out") ? 2 : 
       //      //                 (sheena.getAttribute("data-block") === "out") && 3;
       //      //         var clone = $("#out").clone(); 
       //      //         $("#out").remove();            
       //      //         $("body").append(clone);                
       //      //     }
       //      // });
       //  } else {

       //  }
    };

    function prevFu(e) {
        var blockIn, blockOut;
        console.log(currWall);
        if(currWall === 2) {
            $('#prev').hide("drop", {direction: 'left'});
            blockIn = "#outMaria";
            blockOut = "#outRose";
        } else if (currWall === 3) {
            $('#next').show("drop", {direction: 'right'});
            blockIn = "#outRose";
            blockOut = "#outSheena";
        }
        $(blockOut).hide("slide", {direction: 'left'});
        $(blockIn).show("slide", {direction: 'right'}, 0, cb => {
            currWall = (window.getComputedStyle(maria).getPropertyValue("display") === "block") ? 1 : (window.getComputedStyle(rose).getPropertyValue("display") === "block") ? 2 : 
                (window.getComputedStyle(sheena).getPropertyValue("display") === "block") && 3;
        });
        // AnimateTransition({       
        //     container: container,     
        //     blockIn: blockIn,
        //     blockOut: blockOut,
        //     animation: "slide-out",
        //     onTransitionStart: function (blockIn, blockOut, container, event) {
        //         nextButton.setAttribute('disabled', 'disabled');
        //         (currWall === 2) && $('#prev').hide("drop", {direction: 'left'});
        //     },
        //     onTransitionEnd: function (blockIn, blockOut, container, event) {
        //         nextButton.removeAttribute('disabled');
        //         console.log(blockIn, blockOut)
        //         blockIn.setAttribute('data-block', 'out');
        //         blockOut.setAttribute('data-block', 'in');
        //         container.appendChild(blockOut);
        //         currWall = (maria.getAttribute("data-block") === "out") ? 1 : (rose.getAttribute("data-block") === "out") ? 2 : 
        //                 (sheena.getAttribute("data-block") === "out") && 3;
        //         var clone = $("#out").clone(); 
        //         $("#out").remove();            
        //         $("body").append(clone);        
        //     }
        // });
    }
    $('#next').click(nextFu);

    $("#prev").click(prevFu);
});