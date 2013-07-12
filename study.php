<?
    if($_POST["confirm"] != "really") {
        header("Location: ./consent.html");
    }
?>
<!DOCTYPE HTML>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Shooter Task -- Study</title>
        <link rel="stylesheet" type="text/css" href="./study.css" />
        <script src="http://code.jquery.com/jquery.js"></script>
        <script src="study.js"></script>
    </head>
    <body>
        <h1>Shooter Task</h1>
        <h2>Study</h2>
        <div class="instructions">
            <p>Press the <span class="shoot key">f</span> key to shoot the person.</p>
            <p>Press the <span class="noshoot key">j</span> key to not shoot the person.</p>
        </div>
        <div class="game">
            <div class="score">
                <label for="score">Score</label>
                <input type="number" disabled id="score" value="0" />
            </div>
            <div class="viewer"></div>
        </div>
    </body>
</html>
