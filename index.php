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
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Amatic+SC&family=Caveat&family=Dancing+Script&family=Eater&family=Emblema+One&family=Faster+One&family=Freckle+Face&family=Kalam:wght@700&family=Libre+Barcode+39+Text&family=Major+Mono+Display&family=Marck+Script&family=Monofett&family=Monoton&family=Parisienne&family=Press+Start+2P&family=Sunshiney&display=swap" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
</head>
<body>

	<div id="modalias" class="custom-overlay"></div>
	<div id="modsugg" class="custom-overlay" ></div>
	<div  id="style" class="container" tabindex="100" style="z-index: 10200; display: none; margin:0; position: absolute;">
		<div class="btn-group" role="group">
  			<div class="btn-group mr-3" role="group">
				<select id="sizeSelect" class="form-select">
					<option selected="">Size</option>
					<option value=15>15</option>
					<option value=16>16</option>
					<option value=17>17</option>
					<option value=20>20</option>
					<option value=22>22</option>
					<option value=25>25</option>
					<option value=26>26</option>
					<option value=28>28</option>
					<option value=30>30</option>
					<option value=32>32</option>
					<option value=34>34</option>
					<option value=36>36</option>
				</select>
			</div>
  			<div class="btn-group mr-3" role="group">
				<select id="fontSelect" class="form-select">
					<option selected="">Font</option>
					<option value="Amatic SC, cursive" style="font-family: Amatic SC, cursive !important;">Amatic SC</option>
					<option value="Caveat, cursive" style="font-family: Caveat, cursive !important;">Caveat</option>
					<option value="Dancing Script, cursive" style="font-family: Dancing Script, cursive !important;">Dancing Script</option>
					<option value="Eater, cursive" style="font-family: Eater, cursive !important;">Eater</option>
					<option value="Emblema One, cursive" style="font-family: Emblema One, cursive !important;">Emblema One</option>
					<option value="Faster One, cursive" style="font-family: Faster One, cursive !important;">Faster One</option>
					<option value="Freckle Face, cursive" style="font-family: Freckle Face, cursive !important;">Freckle Face</option>
					<option value="Kalam, cursive" style="font-family: Kalam, cursive !important;">Kalam</option>
					<option value="'Libre Barcode 39', cursive" style="font-family: 'Libre Barcode 39', cursive !important;">Libre Barcode 39</option>
					<option value="Major Mono Display, monospace" style="font-family: Major Mono Display, monospace !important;">Major Mono Display</option>
					<option value="Marck Script, cursive" style="font-family: Marck Script, cursive !important;">Marck Script</option>
					<option value="Monofett, cursive" style="font-family: Monofett, cursive !important;">Monofett</option>
					<option value="Monoton, cursive" style="font-family: Monoton, cursive !important;">Monoton</option>
					<option value="Parisienne, cursive" style="font-family: Parisienne, cursive !important;">Parisienne</option>
					<option value="'Press Start 2P', cursive" style="font-family: 'Press Start 2P', cursive !important;">Press Start 2P</option>
					<option value="Sunshiney, cursive" style="font-family: Sunshiney, cursive !important;">Sunshiney</option>
				</select> 
			</div>
  			<div class="btn-group mr-3" role="group">
				<input id="color" style="margin: auto;" type="color" id="head" name="head"
           value="#e66465">
  			</div>
		</div>
	</div>
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
								if($wall === $row['wall']) {
									echo "<div id='".$row['id']."' data-bs-toggle='tooltip' data-bs-placement='left' title='".$row['alias'].", ".timeAgo($row['timestamp'])."' style='position: absolute; top:". $row['topPost']. "%; left:". $row['leftPost']."%;'><input readonly style='border: 0px; outline: none; color: ".$fontColor."; font-family: ".$fontFace."; font-size: ".$fontSize."; background: transparent;' size='".((strlen($row['text']) < 30) ? strlen($row['text']) : strlen($row['text']) + 5 ) ."' value='".$row['text']."'></div>";
								}
							// }
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
	<div id="popup" class="modal" data-dismiss="modal" style="z-index: 2000;">
	  <div class="modal-dialog modal-dialog-centered" role="document" style="z-index: 2004;">
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

	<div id="suggestMod" class="modal fade" data-bs-backdrop="false" style="z-index: 2000;">
	  <div class="modal-dialog modal-dialog-centered" role="document">
	    <div class="modal-content">
	      <div class="modal-header text-center">
	        <h5 class="modal-title w-100">Send a Suggestion</h5>
	      </div>
	      <div class="modal-body">
	      	<div class="container text-center">
	      		<img src="img/wall.png" class="img-fluid" style="max-width: 70%">
	      		<hr/>
		      	<form><div class="form-floating">
				  <textarea class="form-control" placeholder="Leave a suggestion here" id="suggestionText" style="height: 100px"></textarea>
				  <label for="floatingTextarea2">Want to add font? feature? a new wall?</label>
				</div>
				</form>
	      	</div>
	      </div>
	      <div class="modal-footer">
	        <button id="send" type="submit" data-bs-dismiss="modal" class="btn btn-dark">Send</button>
	      </div>
	    </div>
	  </div>
	</div>
	<footer class="footer mt-auto py-2" style="background-color: transparent; position: fixed; bottom: 0; width:100%; z-index: 100">
	  <div class="container text-end">
	    <a id="suggestion" style="cursor:pointer; color: white;">Submit a suggestion</a>
	  </div>
	</footer>
	<div id="out" style="cursor:pointer; position:fixed; padding:0; margin:0; top:0; left:0; width: 100%; height: 100%;"></div>
</body>
<script src="https://smtpjs.com/v3/smtp.js"></script>
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script
  src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"
  integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU="
  crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.1/dist/umd/popper.min.js" integrity="sha384-SR1sx49pcuLnqZUnnPwx6FCym0wLsk5JZuNx2bPPENzswTNFaQU1RDvt3wT4gWFG" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.min.js" integrity="sha384-j0CNLUeiqtyaRmlzUHCPZ+Gy5fQu0dQ6eZ/xAww941Ai1SxSY+0EQqNXNE6DZiVc" crossorigin="anonymous"></script>
<script src="src/animateTransition.min.js"></script>
<script src="src/script.js"></script>
</html>