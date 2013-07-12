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
        <div class="wrapper">
            <h1>Shooter Task</h1>
            <h2>Study</h2>
            <div class="instructions">
                <strong>Instructions</strong>
                <p>Press the <button class="shoot key">f</button> key to shoot the person.</p>
                <p>Press the <button class="noshoot key">j</button> key to not shoot the person.</p>
            </div>
            <div class="game">
                <div class="remaining">
                    <label for="remaining">Remaining:</label>
                    <input disabled id="remaining" value="" />
                </div>
                <div class="score">
                    <label for="score">Score:</label>
                    <input disabled id="score" value="0" />
                </div>
                <div class="viewer"></div>
            </div>
        </div>
    </body>
</html>
