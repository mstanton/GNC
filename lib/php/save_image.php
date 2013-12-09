<?php
// THIS SCRIPT TOOK FUCKING HOURS TO FIGURE OUT THE CORRECT IMPLEMENTATION
// the jist get raw canvas data sent by ajax
// clean on client side like this imgBase64.replace(/^data:image\/(png|jpg);base64,/, ""); after 
// setting your toDataURL() data
// good god that was fucking painful. 0_o

$dataURL = $_POST["dataURL"];


$image = fopen($dataURL, 'r+');



$file = '../../assets/final/beat_' . uniqid() . '.png';



$success = file_put_contents($file, $image);

print $success ? $file : 'Unable to save this image.';


fclose($image);


// return insta-graph file name
return $file;
?>