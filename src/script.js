jQuery(document).ready(function(){
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    });

    var customOverlay = document.querySelector('#modalias');
    var modsugg = document.querySelector('#modsugg');

    $('#popup').modal({backdrop: 'static'});
    $('#popup').modal('show');

    function animateModal(modal, animation, onStart, onEnd) {
        AnimateTransition({
            container: container,
            blockIn: modal,
            animation: animation,
            onTransitionStart: function (blockIn, blockOut, container, event) {
                if(typeof onStart === "function") {
                    onStart();
                }
            },
            onTransitionEnd: function (blockIn, blockOut, container, event) {
                if(typeof onEnd === "function") {
                    onEnd();
                }
            }
        });
    }
    var myModal = new bootstrap.Modal(document.getElementById('suggestMod'));
    animateModal("#popup", "bounce-in", () => {customOverlay.style.display = 'block';});
    var suggest = document.getElementById("suggestionText");
    $("#suggestionText").keyup(() => {
        if (suggest.value !== '') {
            $('#send').prop("disabled", false); 
        } else {
            $('#send').prop("disabled", true); 
        }
    });
    $("#send").click(() => {
        var text = $("#suggestionText").val();
        Email.send({
            SecureToken: "20b9f0b1-0c18-4daa-86df-22be8ee11699",
            To : 'thefreedomwall11@gmail.com',
            From : "thefreedomwall11@gmail.com",
            Subject : "Suggestion Box",
            Body : text
        });
    });
    $("#suggestion").click(() => {
        suggest.value = "";
        $('#suggestMod').modal('show');
        animateModal("#suggestMod", "bounce-in");
    });

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

    /* MODAL at start*/
    var alias = document.getElementById("alias");
    var nextButton = document.querySelector("#submit");
    $('#submit').prop("disabled", true); 
    $("#alias").keyup(() => {
        if (alias.value !== '') {
            $('#submit').prop("disabled", false); 
        } else {
            $('#submit').prop("disabled", true); 
        }
    });

    $("#anonym").click(() => {
        alias = "anonymous";
        closePopup();
    });
    $("#submit").click(()=> {
        alias = alias.value;
        closePopup();
    });
    var currWall = 1;
    if(!iOS()) { 
        document.getElementById("out").style = "display: none;";
    }
    var mainOutDiv = [ {maindiv: "#outMaria" , inDiv: "maria" }, {maindiv: "#outRose" , inDiv: "rose" }, {maindiv: "#outSheena" , inDiv: "sheena" }];
    var divid = "";
    var clicked;
    function mainClick(divIn, main, e) {
        var parent = document.getElementById(divIn);
        clicked = false;
        var empty;
        function inputFocus(input) {
            input.focus();
            input.onfocus = function () {
                window.scrollTo(0, 0);
                document.body.scrollTop = 0;
            }
            input.scrollIntoView();
        };
        console.log(clicked, divid)
        if (!clicked) {
            var ID = [];
            $("*").each(function() {
                if (this.id) {
                    ID.push(this.id);
                }
            });
            if (ID.includes(divid)) {
            var old = document.getElementById(divid);
                old.remove();
            }
        }

        var randomnumber = Math.floor(Math.random() * (999999 - 500 + 500)) + 999999;
        var input = document.createElement("input");
        var div = document.createElement("div");
        var post = document.createElement("button");
        var styles = document.getElementById("style");

        var butid = "but" + randomnumber;
        var inpid = "inp" + randomnumber;
        divid = "div" + randomnumber;

        post.id = butid;
        input.id = inpid;
        input.size = 1;
        input.style = "border: 0; color: white; outline: 1; background: transparent;";
        div.style = "position: absolute;";
        div.id = divid;

        parent.appendChild(div); 
        div.appendChild(input); 
        div.appendChild(post); 

        post.innerHTML = "Post";
        $('#' + inpid).prop('maxLength', 36);
        $('#' + divid).html(input.focus()).offset({ top: e.pageY, left: e.pageX});
        styles.style.display = "block";

        var position = $('#' + divid).position();

        var leftPost = position.left/$(window).width() * 100;
        var topPost = position.top/$(window).height() *100;
        styles.style.top = (topPost - 4) + "%";
        styles.style.left = (leftPost - 2) + "%";
        inputFocus(input);
        
        input.style.fontFamily = document.getElementById('fontSelect').value;
        input.style.fontSize = document.getElementById('sizeSelect').value;
        input.style.color = document.getElementById('color').value;
        var inputSize = input.style.fontSize;
        var inputColor = input.style.color;
        var inputFont = input.style.fontFamily;

        $('#fontSelect').change(function() {
            input.style.fontFamily = $(this).val();
            inputFont = input.style.fontFamily;
            inputFocus(input)
        });
        $('#sizeSelect').change(function() {
            input.style.fontSize = $(this).val();
            inputSize = input.style.fontSize;
            inputFocus(input)
        });
        var inpudt = document.getElementById('color');
        $('#color').on('input', function() {
            setTimeout(()=>{
                inpudt.setAttribute('type','text');
                inpudt.setAttribute('type','color');
          }, 100);
            input.style.color = $(this).val();
            inputColor = input.style.color
            inputFocus(input)
        });

        inputFocus(input);
        document.querySelector('#' + divid).scrollIntoView({
          behavior: 'smooth'
        });
        $("#" + inpid).keydown(() => {
            input.size = (input.value.length === 0) ? 1 : input.value.length;
        });

        var textId = inpid;
        var ID = [];

        // GET ALL IDs
        $("*").each(function() {
            if (this.id) {
                ID.push(this.id);
            }
        });

        $('#' + butid).click(() => {
            clicked = true;
            var textValue = $('#' + inpid).val();
            if (textValue !== "") {
                $.ajax({
                    url: "./php/insertText.php",
                    method: "POST",
                    data: { 
                        tId: textId, 
                        tVal: textValue, 
                        tPost: topPost, 
                        lPost: leftPost, 
                        IDS: ID, 
                        wall: currWall, 
                        aId: alias, 
                        fFace: inputFont, 
                        fColor: inputColor, 
                        fSize: inputSize,
                    },
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
    }
    mainOutDiv.forEach(div => {
        var divIn = div.inDiv;
        $(div.maindiv).click(function(e) {
            mainClick(divIn, div.maindiv, e);
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

    var mainOutDiv = [ {wall: 1 , inDiv: "maria" }, {wall: 2 , inDiv: "rose" }, {wall: 3 , inDiv: "sheena" }];
    function nextFu(e) {
        mainOutDiv.forEach(div => {
            var divIn = div.inDiv;
            var parent = document.getElementById(divIn);
            $.ajax({
                url: "./php/getText.php",
                method: "POST",
                data: {wall: div.wall},
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
            });
        });
        var styles = document.getElementById("style");
        styles.style.display = "none";
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
    };

    function prevFu(e) {
        console.log((currWall - 1))
        mainOutDiv.forEach(div => {
            var divIn = div.inDiv;
            var parent = document.getElementById(divIn);
            $.ajax({
                url: "./php/getText.php",
                method: "POST",
                data: {wall: div.wall},
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
            });
        });
        var styles = document.getElementById("style");
        styles.style.display = "none";
        var blockIn, blockOut;
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
    }
    $('#next').click(nextFu);

    $("#prev").click(prevFu);
});