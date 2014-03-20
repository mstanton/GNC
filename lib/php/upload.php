<?php
	foreach ($_FILES["images"]["error"] as $key => $error) {
	  if ($error == UPLOAD_ERR_OK) {
	    $name = $_FILES["images"]["name"][$key];
	    move_uploaded_file( $_FILES["images"]["tmp_name"][$key], "../../assets/uploads/" . $_FILES['images']['name'][$key]);

	    $url = "http://localhost:8888/GNC/assets/uploads/".$name;

	    list($width, $height, $type, $attr) = getimagesize($url);

	    $response = array('url'=>$url, 'width'=>$width, 'height'=>$height);

	    echo json_encode($response);
	  }
	}
?>