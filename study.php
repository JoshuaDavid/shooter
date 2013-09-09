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
        <script src="./js/q.js"></script>
        <script src="study.js"></script>
    </head>
    <body>
        <h1>Shooter Task</h1>
        <div class="wrapper">
            <div class="game hidden">
                <div class="remaining hidden">
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
