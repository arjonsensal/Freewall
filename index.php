<?php
include('php/connect.php');
include('php/timeAgo.php');
session_start();
?>
<html>
<head>
<title>Freedom Wall</title>
<link rel = "icon" href = "https://img.icons8.com/plasticine/2x/pencil.png" type = "image/x-icon">
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<link rel="stylesheet" href="css/transitions.css">
<link rel="stylesheet" href="css/index.css">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
</head>
<body>

	<div class="custom-overlay"></div>
	<div id="next" class="" style="position: fixed; z-index:99; top: 2%; right: 0;"> 
		<div class="container-fluid">
			<button type="button" id="nextBut" class="btn btn-dark btn-lg">Next Wall ></button>
		</div>
	</div>
	<div id="prev" class="" style="position: fixed; z-index:99; top: 2%; left: 0; display: none; "> 
		<div class="container-fluid">
			<button type="button" class="btn btn-dark btn-lg">< Prev Wall</button>
		</div>
	</div>
	<div id = "outMaria" class="section__content animation-container__block first" style="z-index: 4;">
		<h3 class="text-center">Freedom Wall</h3>
		<div id="maria">
			<?php
				function getValues($wall, $conn) {
					$sql = "SELECT * FROM freewall";
					$result = mysqli_query($conn, $sql);
					if (mysqli_num_rows($result) > 0 ) {
						while ($row = mysqli_fetch_assoc($result)) {
							if($row['wall'] === $wall) {
								echo '<div id='.$row['id'].' data-bs-toggle="tooltip" data-bs-placement="left" title="'.$row['alias'].', '.timeAgo($row['timestamp']).'" style="position:absolute; top:';
								echo  $row['topPost'];
								echo  '%; left:';
								echo  $row['leftPost'];
								echo  '%;">';
								echo  '<input readonly size="'.strlen($row['text']).'" style="border: 0px; color: white; outline: none; background: transparent;" value="';
								echo  $row['text'];
								echo  '";>';
								echo "</div>";
							}
						}
					}
				}
				getValues("1", $conn);
			?>
		</div>
	</div>
	<div id = "outRose" class="section__content animation-container__block second" style="z-index: 3;">
		<h3 class="text-center">Great Wall of China</h3>
		<div id="rose">
			<?php
				getValues("2", $conn);
			?>
		</div>
	</div> 
	<div id = "outSheena"  class="section__content animation-container__block third" style="z-index: 1;">
		<h3 class="text-center">Wall E</h3>
		<div id="sheena">
			<?php
				getValues("3", $conn);
			?>
		</div>
	</div> 
	<div id="popup" class="modal" style="z-index: 2000;">
	  <div class="modal-dialog modal-dialog-centered" role="document">
	    <div class="modal-content">
	      <div class="modal-header text-center">
	        <h5 class="modal-title w-100">Welcome to Freedom Wall</h5>
	      </div>
	      <div class="modal-body">
	      	<div class="container text-center">
	      		<img src="img/wall.png" class="img-fluid" style="max-width: 70%">
	      		<hr/>
		      	<form>
				  <div class="form-group">
				    <input type="email" class="form-control" id="alias" aria-describedby="emailHelp" placeholder="Enter your alias">
				    <small id="emailHelp" class="form-text text-muted">Type anything. No one will know who you are.</small>
				  </div>
				</form>
	      	</div>
	      </div>
	      <div class="modal-footer">
	        <button id="submit" type="submit" class="btn btn-dark">Enter </button>
	        <button id="anonym" type="submit" class="btn btn-secondary" data-dismiss="modal">Skip (as Anonymous)</button>
	      </div>
	    </div>
	  </div>
	</div>
	<div id="out" style="cursor:pointer; position:fixed; padding:0; margin:0; top:0; left:0; width: 100%; height: 100%;"></div>
</body>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.1/dist/umd/popper.min.js" integrity="sha384-SR1sx49pcuLnqZUnnPwx6FCym0wLsk5JZuNx2bPPENzswTNFaQU1RDvt3wT4gWFG" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.min.js" integrity="sha384-j0CNLUeiqtyaRmlzUHCPZ+Gy5fQu0dQ6eZ/xAww941Ai1SxSY+0EQqNXNE6DZiVc" crossorigin="anonymous"></script>
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script src="src/animateTransition.min.js"></script>
<script type="text/javascript" src="src/script.js"></script>
</html>