$(document).ready(function() {
    var active = false;
    var cooldown = true;
    var becameActive = new Date().getTime();
    var potentialShooters = getPotentialShooters();
    var hasShot = false;
    var hasNotShot = false;
    var currentPotentialShooter = 0;
    var score = 0;
    var shooterIsArmed = null;
    var trials_done = 0;
    
    //Flags
    var MIN_COOLDOWN_PERIOD = 500;
    var MAX_COOLDOWN_PERIOD = 3000;
    var BACKGROUND_DISPLAY_TIME = 1000;
    var MESSAGE_DISPLAY_TIME = 1000;
    var TIME_TO_DECIDE = 850;
    var PENALTY_FOR_SHOOTING_UNARMED = 20;
    var PENALTY_FOR_NOT_SHOOTING_ARMED  = 40;
    var BONUS_FOR_SHOOTING_ARMED = 10;
    var BONUS_FOR_NOT_SHOOTING_UNARMED = 5;
    var PENALTY_FOR_TIMEOUT = 10;
    var NUMBER_OF_TRIALS = 8;
    var PLAY_SOUNDS = true;
    var CONFIRMATION_CODE = getConfirmationCode();
    var SEND_TO_SERVER = true;
    var _shooterTimeout = null;

    // Repeated for every potential shooter
    var message = {confirmation: CONFIRMATION_CODE};
    var $fixation = $('<img src="./images/fixation.jpg" alt="cooldown" />')
    var $background = $('<img/>');
    var $person = $('<img/>');
    var $correct = $('<img src="./images/correct.jpg" alt="correct" />')
    var $incorrect = $('<img src="./images/incorrect.jpg" alt="incorrect" />')
    var beep = $('<audio src="./sounds/beep.wav"/>')[0];
    var ding = $('<audio src="./sounds/ding.wav"/>')[0];
    var gunshot = $('<audio src="./sounds/gunshot.wav"/>')[0];
    var wrong = $('<audio src="./sounds/wrong.wav"/>')[0];
    var timeout = $('<audio src="./sounds/timeout.wav"/>')[0];
    $('.viewer').append($fixation).append($background).append($person).append($correct).append($incorrect);
    $('input#remaining').val(NUMBER_OF_TRIALS);
    $(document).on("keypress", handleKeyPress);
    function getConfirmationCode() {
        var cc = "";
        for(var i = 0; i < 0x20; i++) {
            cc += randint(0, 0xF).toString(0x10);
        }
        return cc;
    }
    function getPotentialShooters() {
        var potentialShooters = [
            "http://localhost/shooter/images/za.jpg",
            "http://localhost/shooter/images/zaba011.jpg",
            "http://localhost/shooter/images/zabu02w4.jpg",
            "http://localhost/shooter/images/zawa90d3.jpg",
            "http://localhost/shooter/images/zawu02w4.jpg",
            "http://localhost/shooter/images/zb.jpg",
            "http://localhost/shooter/images/zbba05d1.jpg",
            "http://localhost/shooter/images/zbba923.jpg",
            "http://localhost/shooter/images/zbbu07p4.jpg",
            "http://localhost/shooter/images/zbbu98p1.jpg",
            "http://localhost/shooter/images/zbwa012.jpg",
            "http://localhost/shooter/images/zbwa08d5.jpg",
            "http://localhost/shooter/images/zbwu06p1.jpg",
            "http://localhost/shooter/images/zbwu90c3.jpg",
            "http://localhost/shooter/images/zc.jpg",
            "http://localhost/shooter/images/zcba03d5.jpg",
            "http://localhost/shooter/images/zcbu90p5.jpg",
            "http://localhost/shooter/images/zcwa935.jpg",
            "http://localhost/shooter/images/zcwu97p4.jpg",
            "http://localhost/shooter/images/zd.jpg",
            "http://localhost/shooter/images/zdba022.jpg",
            "http://localhost/shooter/images/zdbu03c3.jpg",
            "http://localhost/shooter/images/zdwa94d1.jpg",
            "http://localhost/shooter/images/zdwu95w2.jpg",
            "http://localhost/shooter/images/ze.jpg",
            "http://localhost/shooter/images/zeba045.jpg",
            "http://localhost/shooter/images/zebu10p1.jpg",
            "http://localhost/shooter/images/zewa921.jpg",
            "http://localhost/shooter/images/zewu96w1.jpg",
            "http://localhost/shooter/images/zf.jpg",
            "http://localhost/shooter/images/zfba90d3.jpg",
            "http://localhost/shooter/images/zfbu92w1.jpg",
            "http://localhost/shooter/images/zfwa911.jpg",
            "http://localhost/shooter/images/zfwu01p4.jpg",
            "http://localhost/shooter/images/zg.jpg",
            "http://localhost/shooter/images/zgba072.jpg",
            "http://localhost/shooter/images/zgba103.jpg",
            "http://localhost/shooter/images/zgbu04p3.jpg",
            "http://localhost/shooter/images/zgbu08w1.jpg",
            "http://localhost/shooter/images/zgwa02d4.jpg",
            "http://localhost/shooter/images/zgwa06d2.jpg",
            "http://localhost/shooter/images/zgwu07w2.jpg",
            "http://localhost/shooter/images/zgwu99p2.jpg",
            "http://localhost/shooter/images/zh.jpg",
            "http://localhost/shooter/images/zhba94d1.jpg",
            "http://localhost/shooter/images/zhbu05c5.jpg",
            "http://localhost/shooter/images/zhwa03d2.jpg",
            "http://localhost/shooter/images/zhwu05p5.jpg",
            "http://localhost/shooter/images/zi.jpg",
            "http://localhost/shooter/images/ziba08d5.jpg",
            "http://localhost/shooter/images/ziba972.jpg",
            "http://localhost/shooter/images/zibu01p2.jpg",
            "http://localhost/shooter/images/zibu09p5.jpg",
            "http://localhost/shooter/images/ziwa05d2.jpg",
            "http://localhost/shooter/images/ziwa073.jpg",
            "http://localhost/shooter/images/ziwu04p2.jpg",
            "http://localhost/shooter/images/ziwu08p3.jpg",
            "http://localhost/shooter/images/zj.jpg",
            "http://localhost/shooter/images/zjba094.jpg",
            "http://localhost/shooter/images/zjbu97c1.jpg",
            "http://localhost/shooter/images/zjwa04d1.jpg",
            "http://localhost/shooter/images/zjwu03c5.jpg",
            "http://localhost/shooter/images/zk.jpg",
            "http://localhost/shooter/images/zkba99d4.jpg",
            "http://localhost/shooter/images/zkba131.jpg",
            "http://localhost/shooter/images/zkbu11w2.jpg",
            "http://localhost/shooter/images/zkbu16c3.jpg",
            "http://localhost/shooter/images/zkwa97d3.jpg",
            "http://localhost/shooter/images/zkwa152.jpg",
            "http://localhost/shooter/images/zkwu11p4.jpg",
            "http://localhost/shooter/images/zkwu13p1.jpg",
            "http://localhost/shooter/images/zl.jpg",
            "http://localhost/shooter/images/zlba931.jpg",
            "http://localhost/shooter/images/zlbu12p4.jpg",
            "http://localhost/shooter/images/zlwa953.jpg",
            "http://localhost/shooter/images/zlwu16c1.jpg",
            "http://localhost/shooter/images/zm.jpg",
            "http://localhost/shooter/images/zmba96d2.jpg",
            "http://localhost/shooter/images/zmbu91c4.jpg",
            "http://localhost/shooter/images/zmwa98d5.jpg",
            "http://localhost/shooter/images/zmwu94c1.jpg",
            "http://localhost/shooter/images/zn.jpg",
            "http://localhost/shooter/images/znba11d5.jpg",
            "http://localhost/shooter/images/znbu94p4.jpg",
            "http://localhost/shooter/images/znwa16d3.jpg",
            "http://localhost/shooter/images/znwu19c3.jpg",
            "http://localhost/shooter/images/zo.jpg",
            "http://localhost/shooter/images/zoba125.jpg",
            "http://localhost/shooter/images/zobu96w2.jpg",
            "http://localhost/shooter/images/zowa195.jpg",
            "http://localhost/shooter/images/zowu91w3.jpg",
            "http://localhost/shooter/images/zp.jpg",
            "http://localhost/shooter/images/zpba95d3.jpg",
            "http://localhost/shooter/images/zpbu99w5.jpg",
            "http://localhost/shooter/images/zpwa14d1.jpg",
            "http://localhost/shooter/images/zpwu98w5.jpg",
            "http://localhost/shooter/images/zq.jpg",
            "http://localhost/shooter/images/zqba91d4.jpg",
            "http://localhost/shooter/images/zqbu13p3.jpg",
            "http://localhost/shooter/images/zqwa11d4.jpg",
            "http://localhost/shooter/images/zqwu15w2.jpg",
            "http://localhost/shooter/images/zr.jpg",
            "http://localhost/shooter/images/zrba141.jpg",
            "http://localhost/shooter/images/zrba164.jpg",
            "http://localhost/shooter/images/zrbu17w3.jpg",
            "http://localhost/shooter/images/zrbu93c1.jpg",
            "http://localhost/shooter/images/zrwa134.jpg",
            "http://localhost/shooter/images/zrwa964.jpg",
            "http://localhost/shooter/images/zrwu14p3.jpg",
            "http://localhost/shooter/images/zrwu92c2.jpg",
            "http://localhost/shooter/images/zs.jpg",
            "http://localhost/shooter/images/zsba17d3.jpg",
            "http://localhost/shooter/images/zsbu95c2.jpg",
            "http://localhost/shooter/images/zswa174.jpg",
            "http://localhost/shooter/images/zswu93c4.jpg",
            "http://localhost/shooter/images/zt.jpg",
            "http://localhost/shooter/images/ztba98d2.jpg",
            "http://localhost/shooter/images/ztbu14p2.jpg",
            "http://localhost/shooter/images/ztwa995.jpg",
            "http://localhost/shooter/images/ztwu17p5.jpg"
        ];
        return potentialShooters;
    }
    function getRandomShooter() {
        do {
            var i = Math.floor(potentialShooters.length * Math.random());
            var url = potentialShooters[i];
            var hasPerson = url.match(/z[a-z][bw][au]/g);
            var race = "none";
            var isArmed = "none";
            if(url.match(/z[a-z]ba/g)) {
                race = "black";
                isArmed = true;
            }
            else if(url.match(/z[a-z]bu/g)) {
                race = "black";
                isArmed = false;
            }
            else if(url.match(/z[a-z]wa/g)) {
                race = "white";
                isArmed = true;
            }
            else if(url.match(/z[a-z]wu/g)) {
                race = "white";
                isArmed = false;
            }
        } while(!hasPerson);
        var background = url.match(/^.*z[a-z]/g) + ".jpg";
        var potentialShooter = {
            src: url,
            background: background,
            race: race,
            isArmed: isArmed,
            alt: (isArmed?"armed":"unarmed")
        };
        message.shooterPicture = potentialShooter.src;
        message.shooterRace = potentialShooter.race;
        message.shooterIsArmed = potentialShooter.isArmed;
        message.shooterBackground = potentialShooter.background;
        return potentialShooter;
    }
    function showShooter() {
        var potentialShooter = getRandomShooter();
        var background = potentialShooter.background;
        var person = potentialShooter.src;
        var remaining = NUMBER_OF_TRIALS - trials_done - 1;
        $('input#remaining').val(remaining);
        hasShot = false;
        hasNotShot = false;
        shooterIsArmed = (potentialShooter.alt == "armed");
        $background.attr("src", background).hide();
        $person.attr("src", person).hide();
        function displayBackground() {
            showImage($background);
        }
        function displayPerson() {
            showImage($person);
            active = true;
            becameActive = new Date().getTime();
            if(shooterIsArmed) {
                _shooterTimeout = setTimeout(failToShoot, TIME_TO_DECIDE);
            }
            else {
                _shooterTimeout = setTimeout(failToNotShoot, TIME_TO_DECIDE);
            }
        }
        setTimeout(displayBackground, 0);
        setTimeout(displayPerson, BACKGROUND_DISPLAY_TIME);
    }
    function handleKeyPress(e) {
        var eventCodes = {
            102: "shoot",
            106: "noshoot"
        };
        var eventTime = new Date().getTime();
        var eventCode = eventCodes[e.charCode];
        var responseTime = eventTime - becameActive;
        var extraTime = TIME_TO_DECIDE - responseTime;
        if(active) {
            if(eventCode == "shoot") {
                active = false;
                if(shooterIsArmed) correctlyShoot(extraTime);
                else wronglyShoot(extraTime);
            }
            else if(eventCode == "noshoot") {
                if(shooterIsArmed) wronglyNotShoot(extraTime);
                else correctlyNotShoot(extraTime);
            }
        }
        clearTimeout(_shooterTimeout);
    }
    function wronglyShoot(extraTime) {
        score -= PENALTY_FOR_SHOOTING_UNARMED;
        message.action = "shoot";
        if(PLAY_SOUNDS) beep.play();
        showImage($incorrect);
        afterDecision(extraTime);
    }
    function wronglyNotShoot(extraTime) {
        score -= PENALTY_FOR_NOT_SHOOTING_ARMED;
        message.action = "noshoot";
        if(PLAY_SOUNDS) gunshot.play();
        showImage($incorrect);
        afterDecision(extraTime);
    }
    function correctlyShoot(extraTime) {
        score += BONUS_FOR_SHOOTING_ARMED;
        message.action = "shoot";
        if(PLAY_SOUNDS) ding.play();
        showImage($correct);
        afterDecision(extraTime);
    }
    function correctlyNotShoot(extraTime) {
        score += BONUS_FOR_NOT_SHOOTING_UNARMED;
        message.action = "noshoot";
        if(PLAY_SOUNDS) ding.play();
        showImage($correct);
        afterDecision(extraTime);
    }
    function failToShoot() {
        if(PLAY_SOUNDS) timeout.play();
        wronglyNotShoot(-1);
    }
    function failToNotShoot() {
        if(PLAY_SOUNDS) timeout.play();
        correctlyNotShoot(-1);
    }
    function afterDecision(extraTime) {
        active = false;
        if(extraTime < 0) score -= PENALTY_FOR_TIMEOUT;
        $('#score').val(score);
        message.extraTime = extraTime;
        $.post("./saveData.php", message).success(function(response) {
            console.log(response);
        });
        setTimeout(cooldownThenNext, MESSAGE_DISPLAY_TIME);
    }
    function cooldownThenNext() {
        active = false;
        cooldown = true;
        trials_done += 1;
        showImage($fixation);
        if(trials_done < NUMBER_OF_TRIALS) {
            var cooldown_period = randint(MIN_COOLDOWN_PERIOD, MAX_COOLDOWN_PERIOD);
            setTimeout(showShooter, cooldown_period);
        }
        else {
            $.post('./demographics.php', message).success(function(response) {
                $('html').html(response);
            });
        }
    }
    function randint(min, max) {
        return Math.floor(min + (max - min) * Math.random());
    }
    function showImage($image) {
        var $images = [$fixation, $correct, $incorrect, $person, $background];
        for(var i = 0; i < $images.length; i++) {
            if($image == $images[i]) $images[i].show();
            else $images[i].hide();
        }
    }
    showShooter();
});
