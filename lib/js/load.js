$(function(){

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // UPLOAD FILE
  var input = document.getElementById("images"); 
  var formdata = false;

  function showUploadedItem (source) {
      var list = document.getElementById("image-list"),
        li   = document.createElement("li"),
        img  = document.createElement("img");
      img.src = source;
      li.appendChild(img);
    list.appendChild(li);
  }   

  if (window.FormData) {
      formdata = new FormData();
      $('#btnUpload').css("display", "none");
      //document.getElementById("btnUpload").style.display = "none";
  }
  
  input.addEventListener("change", function (evt) {
    document.getElementById("response").innerHTML = "Uploading . . ."
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
          reader.onloadend = function (e) { 
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
          document.getElementById("response").innerHTML = res; 
        }
      });
    }
  }, false);
  // END UPLOAD 
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++

});
