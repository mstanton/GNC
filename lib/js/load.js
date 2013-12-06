$(function () {
  // funky hack for the "browse button"?
  //$('.btnUpload').val("");

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // NAVIGATION CONTROLS/ANIMATIONS & PASSING THE IMAGE
  $('#btnStart').click(function(){
    $('#intro').animate({left: "-9999"}, 700);
    $('#step1').animate({left: "0"}, 250, function() {
      $(this).fadeIn(500);   
    });
  });
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // UPLOAD FILE
  var input = document.getElementById("images"); 
  var formdata = false;

  function showUploadedItem (source) {
      var list = document.getElementById("image-list");
      var li   = document.createElement("li");
      var img  = document.createElement("img");
      img.src = source;
      li.appendChild(img);
      list.appendChild(li);   
  }   

  if (window.FormData) {
      formdata = new FormData();
      $('#btnUpload').css("display", "none");
  }
  
  input.addEventListener("change", function (evt) {
    
    var i = 0;
    var len = this.files.length;
    var img;
    var reader;
    var file;
  
    for ( ; i < len; i++ ) {
      file = this.files[i];
  
      if (!!file.type.match(/image.*/)) {
        if ( window.FileReader ) {
          reader = new FileReader();
          reader.onloadend = function(e) { 
            showUploadedItem(e.target.result, file.fileName);
          };
          reader.readAsDataURL(file);
        }
        if (formdata) {
          formdata.append("images[]", file);
        }
      } 
    }

    if (formdata) {
      $.ajax({
        url: "/GNC/lib/php/upload.php",
        type: "POST",
        data: formdata,
        processData: false,
        contentType: false,
        success: function (res) {
           var data = $.parseJSON(res); 

            var canvasToThumb = document.getElementById("canvasToThumb") 

            // send image to jcrop
            canvasToThumb.src=data.url;

            var width = data.width;    // Current image width
            var height = data.height;  // Current image height

          // dynamically scale image on client side to fit .box
          $('#canvasToThumb').each(function() {
              var maxWidth = 640; // Max width for the image
              var maxHeight = 480;    // Max height for the image
              var ratio = 1;  // Used for aspect ratio
              
              
              // Check if the current width is larger than the max
              if(width > maxWidth){
                  ratio = maxWidth / width;   // get ratio for scaling image
                  $(this).css("width", maxWidth); // Set new width
                  $(this).css("height", height * ratio);  // Scale height based on ratio
                  height = height * ratio;    // Reset height to match scaled image
                  width = width * ratio;    // Reset width to match scaled image
              }

              // Check if current height is larger than max
              if(height > maxHeight){
                  ratio = maxHeight / height; // get ratio for scaling image
                  $(this).css("height", maxHeight);   // Set new height
                  $(this).css("width", width * ratio);    // Scale width based on ratio
                  width = width * ratio;    // Reset width to match scaled image
                  height = height * ratio;    // Reset height to match scaled image
              }

              canvasToThumb.width=width;
              canvasToThumb.height=height;

            });

          
            // transition animation
            $('#step1').animate({left: "-9999"}, 700);
            $('#step2').animate({left: "0"}, 250, function() {
            $(this).fadeIn(500);   
          });

          // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
          // CROP IMAGE TO CANVAS 
          // THERE IS A BETTER WAY TO DO THIS!! JS SCOPE PROBLEMS BECAUSE RTARD
          // Create variables (in this scope) to hold the API and image size
          var jcrop_api, boundx, boundy;

          function updatePreview(c) { // croping image preview
              if (parseInt(c.w) > 0) {
                  var rx = 280 / c.w, ry = 280 / c.h;
              }
          }
          function showCoords(c) { // show all coords
              $('#x').val(c.x);
              $('#y').val(c.y);
              $('#x2').val(c.x2);
              $('#y2').val(c.y2);
              $('#w').val(c.w);
              $('#h').val(c.h);
          }

          $('#canvasToThumb').Jcrop({
              onChange: updatePreview,
              onSelect: showCoords,
              bgFade: false,
              bgOpacity: .2,
              setSelect: [ 0, 0, 380, 380],
              aspectRatio: 0,
              boxWidth: 380,
              boxHeigh: 380,
              allowResize: false,
              allowSelect: false,
              trueSize: [canvasToThumb.width, canvasToThumb.height]
              
          },function(){
              jcrop_api = this;
          });

          $("#crop").on("click", function(){
              var canvas = document.getElementById("canvasThumbResult");
              var context = canvas.getContext("2d");
              var img = document.getElementById("canvasToThumb"),
                  $img = $(img),
                  imgW = canvasToThumb.width,
                  imgH = canvasToThumb.height;
              
              var ratioY = imgH / $img.height(),
                  ratioX = imgW / $img.width();
              
              var getX = $('#x').val() * ratioX,
                  getY = $('#y').val() * ratioY,
                  getWidth = $('#w').val() * ratioX,
                  getHeight = $('#h').val() * ratioY;
              
              context.drawImage(img,getX,getY,getWidth,getHeight,0,0,canvas.width,canvas.height);

              function drawImage(imageObj) {
                var canvas = document.getElementById('canvasThumbResult');
                var context = canvas.getContext('2d');
                var x = 0;
                var y = 0;

                //context.drawImage(imageObj, x, y);

                var imageData = context.getImageData(x, y, canvas.width, canvas.height);
                var data = imageData.data;

                for(var i = 0; i < data.length; i += 4) {
                  var brightness = 0.2 * data[i] + 0.59 * data[i + 1] + 0.71 * data[i + 2];
                  // red
                  data[i] = brightness;
                  // green
                  data[i + 1] = brightness;
                  // blue
                  data[i + 2] = brightness;
                }

                // overwrite original image
                context.putImageData(imageData, x, y);

              }
              var imageObj = new Image();
              imageObj.onload = function() {
                drawImage(this);
              };
              imageObj.src = data.url;

              // goto next step
              $('#step2').animate({left: "-9999"}, 700);
                $('#step3').animate({left: "0"}, 250, function() {
                $(this).fadeIn(500);   
              });
          });  
        // END jCrop
        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        }
      });
    }
  }, false);
  // END UPLOAD 
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // COLOR OVERLAY #ORANGE# 
  $('#btnOrange').click(function(){
    var canvas = document.getElementById("canvasThumbResult");
    var context = canvas.getContext("2d");
    //context.clearRect(0,0, canvas.width,canvas.height)
    context.fillStyle = "rgba(255,150,0, 0.5)"
    context.fillRect(0,0,canvas.width,canvas.height);
  });

  // COLOR OVERLAY #RED#
  $('#btnRed').click(function(){
    var canvas = document.getElementById("canvasThumbResult");
    var context = canvas.getContext("2d");
    //context.clearRect(0,0, canvas.width,canvas.height)
    context.fillStyle = "rgba(206,34,42, 0.5)"
    context.fillRect(0,0,canvas.width,canvas.height);
  });

  // COLOR OVERLAY #PURPLE#
  $('#btnPurple').click(function(){
    var canvas = document.getElementById("canvasThumbResult");
    var context = canvas.getContext("2d");
    //context.clearRect(0,0, canvas.width,canvas.height)
    context.fillStyle = "rgba(148,44,202, 0.5)"
    context.fillRect(0,0,canvas.width,canvas.height);
  });

  // COLOR OVERLAY #BLUE#
  $('#btnBlue').click(function(){
    var canvas = document.getElementById("canvasThumbResult");
    var context = canvas.getContext("2d");
    //context.clearRect(0,0, canvas.width,canvas.height)
    context.fillStyle = "rgba(42,168,227, 0.5)"
    context.fillRect(0,0,canvas.width,canvas.height);
  });

  // COLOR OVERLAY #GREEN#
  $('#btnGreen').click(function(){
    var canvas = document.getElementById("canvasThumbResult");
    var context = canvas.getContext("2d");
    //context.clearRect(0,0, canvas.width,canvas.height)
    context.fillStyle = "rgba(59,159,84, 0.5)"
    context.fillRect(0,0,canvas.width,canvas.height);
  });

  // COLOR OVERLAY #YELLOW#
  $('#btnYellow').click(function(){
    var canvas = document.getElementById("canvasThumbResult");
    var context = canvas.getContext("2d");
    //context.clearRect(0,0, canvas.width,canvas.height)
    context.fillStyle = "rgba(255,216,0, 0.5)"
    context.fillRect(0,0,canvas.width,canvas.height);
  });


  // TEXT PLACEMENT & DUPLICATE PREVIOUS CANVAS
  $('#btnSaveCanvas').click(function(){
      var canvas = document.getElementById("canvasThumbResult");
      var context = canvas.getContext("2d");

      cloneCanvas(canvas); 

      // CLONE CANVAS FUNCTION
      function cloneCanvas(oldCanvas) {
        //create a new canvas
        var txtCanvas = document.getElementById('txtCanvas');
        var ctx = txtCanvas.getContext('2d');

        //set dimensions
        txtCanvas.width = oldCanvas.width;
        txtCanvas.height = oldCanvas.height;

        //apply the old canvas to the new one
        ctx.drawImage(oldCanvas, 0, 0);

        //return the new canvas
        return txtCanvas;
      }

    // goto next step
    $('#step3').animate({left: "-9999"}, 700);
        $('#step4').animate({left: "0"}, 250, function() {
        $(this).fadeIn(500);   
     });
  });

  
  // ADD TEXT TO CANVAS... 
  $('#btnEnterTxt').click(function(){
    // add text



    // goto next step
    $('#step4').animate({left: "-9999"}, 700);
        $('#step5').animate({left: "0"}, 250, function() {
        $(this).fadeIn(500);   
     });
  });


  // PREVIOUS BUTTONS
  $('#prevStepOne').click(function(){
    $('#step2').animate({left: "-9999"}, 250, function(){ // upload button fails on previous return
      $('#step1').animate({left: "0"}, 700);      
    });
  });

  $('#prevStepTwo').click(function(){ //works like a charm
    $('#step3').animate({left: "-9999"}, 700, function(){ 
      $('#step2').animate({left: "0"}, 250);      
    });
  });

  $('#prevStepFour').click(function(){ //works like a charm
    $('#step5').animate({left: "-9999"}, 500, function(){ 
      $('#step4').animate({left: "0"}, 700);      
    });
  });  


 // SAVE FINAL IMAGE
 $('#btnAddText').click(function(){

    // SAVE FINAL IMAGE FUNCTIONALITY HERE

    // goto next step
    $('#step5').animate({left: "-9999"}, 700);
        $('#step6').animate({left: "0"}, 250, function() {
        $(this).fadeIn(500);   
    });
 });


 $('#btnShare').click(function(){



    // goto next step
    $('#step6').animate({left: "-9999"}, 700);
        $('#step7').animate({left: "0"}, 250, function() {
        $(this).fadeIn(500);   
    });
 });







});
