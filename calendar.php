<!doctype html>
<html>
<head>
	<style>
	.container {
		font-family: Arial;
		font-size: 11px;
		color: #b5b5b5;
		width: 812px;
		border-right:1px solid #ccc;
		border-bottom:1px solid #ccc;
	}
	body {
		margin:0;
		overflow-x: hidden;
	}
	.row {
		display:table;
		width:100%;
		height: 100px
	}
	.day {
		vertical-align:top;
		width:99px;
		display:inline-block;
		border-top:1px solid #ccc;
		border-left:1px solid #ccc;
		padding:6px 8px;
		height:100%;
		transition:0.15s
	}
	.day:before {
		content: attr(data-before);
		color: #777;
		padding-bottom: 5px;
		text-align: right;
		display: block;
	}
	.day:hover {
		color: #ddd;
		background-color: rgba(220, 100, 20, 0.10);
	}
	.today {
		box-shadow:inset 0 0 10px #ff5a00, 0 0 10px #ff5a00
	}

	.today:before {
		color:#449ef0;
		font-weight: bold;
	}
	.passed {
		background-color:rgba(7, 4, 4, 0.26);
		color:#666;
		border-color: #999
	}
	.day-title {
		font-weight:700;
		display: block;
		padding-bottom:10px
	}
	.raid {
		display:block;
		padding-bottom: 5px;
		color: inherit;
	}
	.weekday {
		text-align: center;
		height: auto;
		font-weight: 700;
		background-color: rgba(7, 4, 4, 0.40);
	}
	.weekday .day {
		padding: 0 8px 5px;
	}
	.today .day-title {color:#449ef0}
	.forest {color: #6fbb6f; font-weight: bold}
	.fire {color: #ce9a3c; font-weight: bold}
	.dmf {color: #bf6ebf; font-weight: bold}
	.WSG {color: #9160c1; font-weight: bold}
	.AV {color: #d10e38; font-weight: bold}
	.AB {color: #e9c437; font-weight: bold}
	</style>

	<script>
	window.addEventListener("load", function() {
		if (window.parent.location == window.location) {
			document.body.style.background = "url('http://cloudfront.shivtr.com/theme_images/3309116.png?1480786375')";
		}
	});
	</script>
</head>
<body>
	<img src="theorycraft.png">
	<div class="container">
		<div class="row weekday">
		<?php 
		$list = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		for ($i = 0; $i < 7; $i++)
			echo "<div class='day'>$list[$i]</div>";

		echo "</div><div class='row'>";

		$dayOffset = date('w') + 7;
		$pvp = ["WSG", "AB", "AV"];
		$dmf = ["Elwynn", "Mulgore"];

		for ($cell = 0; $cell < 7 * 5; $cell++) {
			if ($cell % 7 == 0 && $cell > 0) echo "</div><div class='row'>";

			$timestamp = time() + 24 * 3600 * ($cell - $dayOffset);
			$dm = date('j/n', $timestamp);
			$day = date('z', $timestamp); // [0, 365]
			$className = "day" . ($cell < $dayOffset ? " passed" : ($cell == $dayOffset ? " today" : ""));
			echo "<div class='$className' data-before='$dm'>";

			if ($day % 7 == 3) {
				$eventId = "13635600" + date('W', $timestamp);
				echo "<a class='raid' target='_blank' href='http://chimaeraeu.shivtr.com/events/779228?event_instance_id=$eventId'>Raid 20:00</a>";
			}

			if ($day % 7 == 4) {
				$eventId = "13688333" + date('W', $timestamp);
				echo "<a class='raid' target='_blank' href='http://chimaeraeu.shivtr.com/events/780149?event_instance_id=$eventId'>Raid 20:00</a>";
			}

			if ($day % 7 == 3) echo "<span class='fire'>BWL</span> &amp; <span class='fire'>MC</span> reset<br>";
			if ($day % 3 == 1) echo "<span class='forest'>ZG</span> reset<br>";
			if ($day % 5 == 4) echo "<span class='fire'>Onyxia</span> reset<br>";

			$bg = $pvp[(($day + 4) / 7) % 3];
			if ($day % 7 == 4) echo "<span class='$bg'>$bg</span> weekend start";
			if ($day % 7 == 1) echo "<span class='$bg'>$bg</span> weekend end";

			$zone = $dmf[date('n', $timestamp) % 2];
			if ($day % 7 == 0 && date('j', $timestamp) < 7) echo "<span class='dmf'>DMF $zone</span> start";
			else if ($day % 7 == 0 && date('j', $timestamp) < 14) echo "<span class='dmf'>DMF $zone</span> end";

			echo "</div>";
		} ?>
		</div>
	</div>
</body>
</html>