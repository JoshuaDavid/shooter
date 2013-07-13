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
            "./images/za.jpg",
            "./images/zaba011.jpg",
            "./images/zabu02w4.jpg",
            "./images/zawa90d3.jpg",
            "./images/zawu02w4.jpg",
            "./images/zb.jpg",
            "./images/zbba05d1.jpg",
            "./images/zbba923.jpg",
            "./images/zbbu07p4.jpg",
            "./images/zbbu98p1.jpg",
            "./images/zbwa012.jpg",
            "./images/zbwa08d5.jpg",
            "./images/zbwu06p1.jpg",
            "./images/zbwu90c3.jpg",
            "./images/zc.jpg",
            "./images/zcba03d5.jpg",
            "./images/zcbu90p5.jpg",
            "./images/zcwa935.jpg",
            "./images/zcwu97p4.jpg",
            "./images/zd.jpg",
            "./images/zdba022.jpg",
            "./images/zdbu03c3.jpg",
            "./images/zdwa94d1.jpg",
            "./images/zdwu95w2.jpg",
            "./images/ze.jpg",
            "./images/zeba045.jpg",
            "./images/zebu10p1.jpg",
            "./images/zewa921.jpg",
            "./images/zewu96w1.jpg",
            "./images/zf.jpg",
            "./images/zfba90d3.jpg",
            "./images/zfbu92w1.jpg",
            "./images/zfwa911.jpg",
            "./images/zfwu01p4.jpg",
            "./images/zg.jpg",
            "./images/zgba072.jpg",
            "./images/zgba103.jpg",
            "./images/zgbu04p3.jpg",
            "./images/zgbu08w1.jpg",
            "./images/zgwa02d4.jpg",
            "./images/zgwa06d2.jpg",
            "./images/zgwu07w2.jpg",
            "./images/zgwu99p2.jpg",
            "./images/zh.jpg",
            "./images/zhba94d1.jpg",
            "./images/zhbu05c5.jpg",
            "./images/zhwa03d2.jpg",
            "./images/zhwu05p5.jpg",
            "./images/zi.jpg",
            "./images/ziba08d5.jpg",
            "./images/ziba972.jpg",
            "./images/zibu01p2.jpg",
            "./images/zibu09p5.jpg",
            "./images/ziwa05d2.jpg",
            "./images/ziwa073.jpg",
            "./images/ziwu04p2.jpg",
            "./images/ziwu08p3.jpg",
            "./images/zj.jpg",
            "./images/zjba094.jpg",
            "./images/zjbu97c1.jpg",
            "./images/zjwa04d1.jpg",
            "./images/zjwu03c5.jpg",
            "./images/zk.jpg",
            "./images/zkba99d4.jpg",
            "./images/zkba131.jpg",
            "./images/zkbu11w2.jpg",
            "./images/zkbu16c3.jpg",
            "./images/zkwa97d3.jpg",
            "./images/zkwa152.jpg",
            "./images/zkwu11p4.jpg",
            "./images/zkwu13p1.jpg",
            "./images/zl.jpg",
            "./images/zlba931.jpg",
            "./images/zlbu12p4.jpg",
            "./images/zlwa953.jpg",
            "./images/zlwu16c1.jpg",
            "./images/zm.jpg",
            "./images/zmba96d2.jpg",
            "./images/zmbu91c4.jpg",
            "./images/zmwa98d5.jpg",
            "./images/zmwu94c1.jpg",
            "./images/zn.jpg",
            "./images/znba11d5.jpg",
            "./images/znbu94p4.jpg",
            "./images/znwa16d3.jpg",
            "./images/znwu19c3.jpg",
            "./images/zo.jpg",
            "./images/zoba125.jpg",
            "./images/zobu96w2.jpg",
            "./images/zowa195.jpg",
            "./images/zowu91w3.jpg",
            "./images/zp.jpg",
            "./images/zpba95d3.jpg",
            "./images/zpbu99w5.jpg",
            "./images/zpwa14d1.jpg",
            "./images/zpwu98w5.jpg",
            "./images/zq.jpg",
            "./images/zqba91d4.jpg",
            "./images/zqbu13p3.jpg",
            "./images/zqwa11d4.jpg",
            "./images/zqwu15w2.jpg",
            "./images/zr.jpg",
            "./images/zrba141.jpg",
            "./images/zrba164.jpg",
            "./images/zrbu17w3.jpg",
            "./images/zrbu93c1.jpg",
            "./images/zrwa134.jpg",
            "./images/zrwa964.jpg",
            "./images/zrwu14p3.jpg",
            "./images/zrwu92c2.jpg",
            "./images/zs.jpg",
            "./images/zsba17d3.jpg",
            "./images/zsbu95c2.jpg",
            "./images/zswa174.jpg",
            "./images/zswu93c4.jpg",
            "./images/zt.jpg",
            "./images/ztba98d2.jpg",
            "./images/ztbu14p2.jpg",
            "./images/ztwa995.jpg",
            "./images/ztwu17p5.jpg"
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
