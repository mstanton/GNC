<!DOCTYPE html>
<html lang="en">
  <head>
    <title>GNC</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
    
    <!--<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.1/css/bootstrap.min.css">-->
    <link rel="stylesheet" type="text/css" href="css/jquery.jcrop.min.css">
    <link rel="stylesheet" type="text/css" href="css/main.css">

    <!--<script src="//netdna.bootstrapcdn.com/bootstrap/3.0.1/js/bootstrap.min.js"></script>-->
    <script type="text/javascript" src="lib/js/jquery.jcrop.min.js"></script>
    <script type="text/javascript" src="lib/js/load.js"></script>
</head>
<body>
<div class="logo"><!--GNC--></div>
<div id="intro" class="intro container">
    <div class="box intro">
        <button id="btnStart"></button>
    </div>
</div>
<div id="step1" class="upload container">
    <!-- Upload and save image to server -->
    <div class="box">
        <ul class="nav_icons">
            <li><img src="assets/images/icon_upload_on.png" width="28" height="28" alt="STEP ONE"/></li>
            <li><img src="assets/images/icon_edit_off.png" width="31" height="27" alt="STEP TWO"/></li>
            <li><img src="assets/images/icon_share_off.png" width="31" height="27" alt="STEP THREE"/></li>
        </ul>
        <div class="lbl_upload"></div>
        <form method="post" enctype="multipart/form-data" action="lib/php/upload.php">  
          <input type="file" name="images" id="images" class="btnUpload"/>  
          <button type="submit" id="btnUpload">Click to Upload.</button>  
        </form>  
           
    </div>
</div>  

<div id="step2" class="crop container"> <!-- style="display:block; left:0px; " -->
    <!-- Crop and save image -->
    <div class="box">
         
        <div class="jcroppy">
            <img id="canvasToThumb" class='thumbnail-img' width="" height="" src=""/> 
        </div>
        
        
        <input type="text" id="x"  name="coord_x" />
        <input type="text" id="y"  name="coord_y" />
        <input type="text" id="x2" name="coord_x2"/>
        <input type="text" id="y2" name="coord_y2"/>
        <input type="text" id="w"  name="size_w"/>
        <input type="text" id="h"  name="size_h"/>

        <button class="previous"></button>
        <button id="crop" class="next"></button>
        
        <div id="response"></div>
        <ul id="image-list"/>

    </div>
</div>

<div id="step3" class="filter container">
    <!-- Loads cropped image as black and white with image overlay options -->
    <div class="box">
        <h3>STEP 3</h3>
        <div class="color_tools_container">
            <ul id="colorTools">
                <li><img src="assets/images/rad_orange_on.png" width="32" height="32" alt="ORANGE"/></li>
                <li><img src="assets/images/rad_red_off.png" width="32" height="32" alt="RED"/></li>
                <li><img src="assets/images/rad_purple_off.png" width="32" height="32" alt="PURPLE"/></li>
                <li><img src="assets/images/rad_blue_off.png" width="32" height="32" alt="BLUE"/></li>
                <li><img src="assets/images/rad_green_off.png" width="32" height="32" alt="GREEN"/></li>
                <li><img src="assets/images/rad_yellow_off.png" width="32" height="32" alt="YELLOW"/></li>
            </ul>
        </div>
        <canvas id="canvasThumbResult" width="500" height="500"></canvas>
        <button class="previous"></button>
        <button class="next"></button>
    </div>
</div>

<div id="step4" class="form container">
    <!-- Text form -->
    <div class="box">
        <h3>STEP 4</h3>
        <button id="btnEnterTxt" class="btn_enter_txt"></button>
    </div>
</div>

<div id="step5" class="text container">
    <!-- Text placement on filtered image -->
    <div class="box">
        <h3>STEP 5</h3>
        <button class="previous"></button>
        <button class="next"></button>
    </div>
</div>

<div id="step6" class="share container">
    <!-- smoked share functionality -->
    <div class="box">
        <h3>STEP 6</h3>
        <button id="btnShare"></button>
    </div>
</div>

<div id="step7" class="final container">
    <!-- display final image that would be shared. -->
    <div class="box">
        <h3>STEP 7</h3>
    </div>
</div>

</body>
</html>