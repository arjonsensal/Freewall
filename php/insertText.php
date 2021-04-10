<?php
include('connect.php');
include('timeAgo.php');

if($_POST['tVal'] != '') {
	date_default_timezone_set("UTC");
	$timestamp = time();
	$sql = "INSERT INTO `freewall` (`id`, `text`, `topPost`, `leftPost`, `timestamp`, `wall`, `alias`) VALUES ('".$_POST['tId']."', '".$_POST['tVal']."', '".$_POST['tPost']."', '".$_POST['lPost']."', $timestamp, '".$_POST['wall']."', '".$_POST['aId']."' )";
	mysqli_query($conn, $sql);

	$sql1 = "SELECT * FROM freewall";
	$result = mysqli_query($conn, $sql1);
	$arr = array();
	if (mysqli_num_rows($result) > 0 ) {
		while ($row = mysqli_fetch_assoc($result)) {
			// if (!in_array($row['id'], $_POST['IDS'])) {
				// echo "".$row['id'];

				// echo '<br>';
				// echo $_POST['IDS'];
				if($_POST['wall'] === $row['wall']) {
					$arr[] = "<div id='".$row['id']."' data-bs-toggle='tooltip' data-bs-placement='left' title='".$row['alias'].", ".timeAgo($row['timestamp'])."' style='position: absolute; top:". $row['topPost']. "%; left:". $row['leftPost']."%;'><input readonly style='border: 0px; outline: none; color: white; background: transparent;' size='".(strlen($row['text']))."' value='".$row['text']."'>";
				}
			// }
		}
	}

	echo json_encode($arr);
} 
?>