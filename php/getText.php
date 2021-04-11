<?php
include('connect.php');
include('timeAgo.php');

if($_POST['wall'] != '') {
	$sql1 = "SELECT * FROM freewall";
	$result = mysqli_query($conn, $sql1);
	$arr = array();
	if (mysqli_num_rows($result) > 0 ) {
		while ($row = mysqli_fetch_assoc($result)) {
			$fontColor = ($row['fontColor'] === "") ? "white" : $row['fontColor'];
			$fontFace = ($row['fontFace'] === "") ? "" : $row['fontFace'];
			$fontSize = ($row['fontSize'] === "0") ? "" : $row['fontSize'];
			// if (!in_array($row['id'], $_POST['IDS'])) {
				// echo "".$row['id'];

				// echo '<br>';
				// echo $_POST['IDS'];
				if($_POST['wall'] === $row['wall']) {
					$arr[] = "<div id='".$row['id']."' data-bs-toggle='tooltip' data-bs-placement='left' title='".$row['alias'].", ".timeAgo($row['timestamp'])."' style='position: absolute; top:". $row['topPost']. "%; left:". $row['leftPost']."%;'><input readonly style='border: 0px; outline: none; color: ".$fontColor."; font-family: ".$fontFace."; font-size: ".$fontSize."; background: transparent;' size='".((strlen($row['text']) < 30) ? strlen($row['text']) : strlen($row['text']) + 5 ) ."' value='".$row['text']."'>";
				}
			// }
		}
	}

	echo json_encode($arr);
} 
?>