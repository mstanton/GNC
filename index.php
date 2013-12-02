<!DOCTYPE html>
<html lang="en">
  <head>
     <title>GNC</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
    
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.1/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css/main.css">

    <script src="//netdna.bootstrapcdn.com/bootstrap/3.0.1/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="lib/js/load.js"></script>
</head>
<body>
<div id="step1" class="upload_container">
    <h1>UPLOAD IMAGE</h1>
    <form method="post" enctype="multipart/form-data" action="lib/php/upload.php">  
      <input type="file" name="images" id="images"/>  
      <button type="submit" id="btnUpload">Upload Files!</button>  
    </form>  
  
    <div id="response"></div>  
    <ul id="image-list">
</div>  

<div id="step2" class="edit_container">
    <canvas id="canvas" width="640" height="640"/>
</div>

</body>
</html>