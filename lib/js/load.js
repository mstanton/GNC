$(function(){
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
    //document.getElementById("response").innerHTML = "Uploading . . ."
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
              var maxWidth = 500; // Max width for the image
              var maxHeight = 400;    // Max height for the image
              var ratio = 0;  // Used for aspect ratio
              
              
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
                  var rx = 320 / c.w, ry = 320 / c.h;
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

          $('.thumbnail-img').Jcrop({
              onChange: updatePreview,
              onSelect: showCoords,
              bgFade: false,
              bgOpacity: .2,
              setSelect: [ 0, 0, 320, 320],
              aspectRatio: 1,
          },function(){
              jcrop_api = this;
          });

          $("#crop").on("click", function(){
              var canvas = document.getElementById("canvasThumbResult");
              var context = canvas.getContext("2d");
              var img = document.getElementById("canvasToThumb"),
                  $img = $(img),
                  imgW = img.width,
                  imgH = img.height;
              
              var ratioY = imgH / $img.height(),
                  ratioX = imgW / $img.width();
              
              var getX = $('#x').val() * ratioX,
                  getY = $('#y').val() * ratioY,
                  getWidth = $('#w').val() * ratioX,
                  getHeight = $('#h').val() * ratioY;
              
              context.drawImage(img,getX,getY,getWidth,getHeight,0,0,500,500);

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


  
















});
