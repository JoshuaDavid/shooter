<?
include "./config.php";
$mysqli = new mysqli(MYSQL_HOSTNAME, MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_DATABASE);
$parameters = array(
    "Confirmation" => mysqli_real_escape_string($mysqli, $_POST["confirmation"]),
    "Gender" => mysqli_real_escape_string($mysqli, $_POST["gender"]),
    "BornInUS" => mysqli_real_escape_string($mysqli, $_POST["borninus"]),
    "Ethnicity" => mysqli_real_escape_string($mysqli, $_POST["ethnicity"]),
    "Politics" => mysqli_real_escape_string($mysqli, $_POST["politics"]),
);
$query = "INSERT INTO `GIS`.`Participants`\n(";
foreach($parameters as $name => $value) {
    $query .= "`{$name}`, ";
}
$query = mb_substr($query, 0, -2) . ") VALUES (";
foreach($parameters as $name => $value) {
    if(is_string($value)) {
        $query .= "'{$value}', ";
    } else {
        $query .= "{$value}, ";
    }
}
$query = mb_substr($query, 0, -2) . ");";
mysqli_query($mysqli, $query);
?>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Shooter Task -- Post-Completion Questionnaire</title>
        <link rel="stylesheet" type="text/css" href="./demographics.css" />
    </head>
    <body>
        <h1>Shooter Task</h1>
        <h2>Debriefing</h2>
        <div>
            <p>Debriefing</p>
            <p>You have just participated in an experiment about implicit stereotypes.&nbsp; Implicit stereotypes are automatic associations that are out of conscious control.&nbsp; In the study, you were shown pictures of Black and White men and asked to indicate if they was armed or unarmed. Research finds that the race of the person influences your performance on the task even though race is not relevant to the task (Correll, Park, Judd, &amp; Wittenbrink, 2002). For example, researchers have found that people tend to be faster to shoot an armed target if he is Black than if he is White. </p>
            <p>The purpose of this study is to examine how geographic variables (e.g., where you grew up, where you were raised, and what your neighborhood was like) relate to these types of decisions. We expect that the racial composition of a person’s neighborhood growing up may play a role in how they respond on this test as an adult.</p>
            <p>If you have any questions, you can contact the principal investigator, Debbie Ma at <a href="mailto:debbie.ma@csun.edu" target="_blank">debbie.ma@csun.edu</a>.</p>
            <p>If you have additional concerns, you can contact the Research and Sponsored Projects coordinator, Suzanne Selken at 818-677-5195</p>
            <p>If you are interested in learning more about this test and the researchers who developed this test, please go to <a href="http://www.projectimplicit.com" target="_blank">www.projectimplicit.com</a>. There you can take many other tests and learn more about unconscious bias.</p>
            <p>Correll, J., Park, B., Judd, C. M., &amp; Wittenbrink, B. (2002). The police officer's dilemma: Using ethnicity to disambiguate potentially threatening individuals. Journal of Personality &amp; Social Psychology, 83, 314−1329.</p>
        </div>
        <div>Your confirmation code is <strong><? echo $_POST['confirmation']; ?></strong>.</div>
    </body>
</html>
