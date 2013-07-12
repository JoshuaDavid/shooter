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
    var COOLDOWN_PERIOD = 2000;
    var BACKGROUND_DISPLAY_TIME = 1000;
    var TIME_TO_DECIDE = 800;
    var PENALTY_FOR_SHOOTING_UNARMED = 1000;
    var PENALTY_FOR_NOT_SHOOTING_ARMED  = 1000;
    var BONUS_FOR_SHOOTING_ARMED = 100;
    var BONUS_FOR_NOT_SHOOTING_UNARMED = 100;
    var _shooterTimeout = null;
    $(document).on("keypress", handleKeyPress);
    function getPotentialShooters() {
        var potentialShooters = [
            "http://localhost/shooter/images/za.bmp",
            "http://localhost/shooter/images/zaba011.bmp",
            "http://localhost/shooter/images/zabu02w4.bmp",
            "http://localhost/shooter/images/zawa90d3.bmp",
            "http://localhost/shooter/images/zawu02w4.bmp",
            "http://localhost/shooter/images/zb.bmp",
            "http://localhost/shooter/images/zbba05d1.bmp",
            "http://localhost/shooter/images/zbba923.bmp",
            "http://localhost/shooter/images/zbbu07p4.bmp",
            "http://localhost/shooter/images/zbbu98p1.bmp",
            "http://localhost/shooter/images/zbwa012.bmp",
            "http://localhost/shooter/images/zbwa08d5.bmp",
            "http://localhost/shooter/images/zbwu06p1.bmp",
            "http://localhost/shooter/images/zbwu90c3.bmp",
            "http://localhost/shooter/images/zc.bmp",
            "http://localhost/shooter/images/zcba03d5.bmp",
            "http://localhost/shooter/images/zcbu90p5.bmp",
            "http://localhost/shooter/images/zcwa935.bmp",
            "http://localhost/shooter/images/zcwu97p4.bmp",
            "http://localhost/shooter/images/zd.bmp",
            "http://localhost/shooter/images/zdba022.bmp",
            "http://localhost/shooter/images/zdbu03c3.bmp",
            "http://localhost/shooter/images/zdwa94d1.bmp",
            "http://localhost/shooter/images/zdwu95w2.bmp",
            "http://localhost/shooter/images/ze.bmp",
            "http://localhost/shooter/images/zeba045.bmp",
            "http://localhost/shooter/images/zebu10p1.bmp",
            "http://localhost/shooter/images/zewa921.bmp",
            "http://localhost/shooter/images/zewu96w1.bmp",
            "http://localhost/shooter/images/zf.bmp",
            "http://localhost/shooter/images/zfba90d3.bmp",
            "http://localhost/shooter/images/zfbu92w1.bmp",
            "http://localhost/shooter/images/zfwa911.bmp",
            "http://localhost/shooter/images/zfwu01p4.bmp",
            "http://localhost/shooter/images/zg.bmp",
            "http://localhost/shooter/images/zgba072.bmp",
            "http://localhost/shooter/images/zgba103.bmp",
            "http://localhost/shooter/images/zgbu04p3.bmp",
            "http://localhost/shooter/images/zgbu08w1.bmp",
            "http://localhost/shooter/images/zgwa02d4.bmp",
            "http://localhost/shooter/images/zgwa06d2.bmp",
            "http://localhost/shooter/images/zgwu07w2.bmp",
            "http://localhost/shooter/images/zgwu99p2.bmp",
            "http://localhost/shooter/images/zh.bmp",
            "http://localhost/shooter/images/zhba94d1.bmp",
            "http://localhost/shooter/images/zhbu05c5.bmp",
            "http://localhost/shooter/images/zhwa03d2.bmp",
            "http://localhost/shooter/images/zhwu05p5.bmp",
            "http://localhost/shooter/images/zi.bmp",
            "http://localhost/shooter/images/ziba08d5.bmp",
            "http://localhost/shooter/images/ziba972.bmp",
            "http://localhost/shooter/images/zibu01p2.bmp",
            "http://localhost/shooter/images/zibu09p5.bmp",
            "http://localhost/shooter/images/ziwa05d2.bmp",
            "http://localhost/shooter/images/ziwa073.bmp",
            "http://localhost/shooter/images/ziwu04p2.bmp",
            "http://localhost/shooter/images/ziwu08p3.bmp",
            "http://localhost/shooter/images/zj.bmp",
            "http://localhost/shooter/images/zjba094.bmp",
            "http://localhost/shooter/images/zjbu97c1.bmp",
            "http://localhost/shooter/images/zjwa04d1.bmp",
            "http://localhost/shooter/images/zjwu03c5.bmp",
            "http://localhost/shooter/images/zk.bmp",
            "http://localhost/shooter/images/zkba99d4.bmp",
            "http://localhost/shooter/images/zkba131.bmp",
            "http://localhost/shooter/images/zkbu11w2.bmp",
            "http://localhost/shooter/images/zkbu16c3.bmp",
            "http://localhost/shooter/images/zkwa97d3.bmp",
            "http://localhost/shooter/images/zkwa152.bmp",
            "http://localhost/shooter/images/zkwu11p4.bmp",
            "http://localhost/shooter/images/zkwu13p1.bmp",
            "http://localhost/shooter/images/zl.bmp",
            "http://localhost/shooter/images/zlba931.bmp",
            "http://localhost/shooter/images/zlbu12p4.bmp",
            "http://localhost/shooter/images/zlwa953.bmp",
            "http://localhost/shooter/images/zlwu16c1.bmp",
            "http://localhost/shooter/images/zm.bmp",
            "http://localhost/shooter/images/zmba96d2.bmp",
            "http://localhost/shooter/images/zmbu91c4.bmp",
            "http://localhost/shooter/images/zmwa98d5.bmp",
            "http://localhost/shooter/images/zmwu94c1.bmp",
            "http://localhost/shooter/images/zn.bmp",
            "http://localhost/shooter/images/znba11d5.bmp",
            "http://localhost/shooter/images/znbu94p4.bmp",
            "http://localhost/shooter/images/znwa16d3.bmp",
            "http://localhost/shooter/images/znwu19c3.bmp",
            "http://localhost/shooter/images/zo.bmp",
            "http://localhost/shooter/images/zoba125.bmp",
            "http://localhost/shooter/images/zobu96w2.bmp",
            "http://localhost/shooter/images/zowa195.bmp",
            "http://localhost/shooter/images/zowu91w3.bmp",
            "http://localhost/shooter/images/zp.bmp",
            "http://localhost/shooter/images/zpba95d3.bmp",
            "http://localhost/shooter/images/zpbu99w5.bmp",
            "http://localhost/shooter/images/zpwa14d1.bmp",
            "http://localhost/shooter/images/zpwu98w5.bmp",
            "http://localhost/shooter/images/zq.bmp",
            "http://localhost/shooter/images/zqba91d4.bmp",
            "http://localhost/shooter/images/zqbu13p3.bmp",
            "http://localhost/shooter/images/zqwa11d4.bmp",
            "http://localhost/shooter/images/zqwu15w2.bmp",
            "http://localhost/shooter/images/zr.bmp",
            "http://localhost/shooter/images/zrba141.bmp",
            "http://localhost/shooter/images/zrba164.bmp",
            "http://localhost/shooter/images/zrbu17w3.bmp",
            "http://localhost/shooter/images/zrbu93c1.bmp",
            "http://localhost/shooter/images/zrwa134.bmp",
            "http://localhost/shooter/images/zrwa964.bmp",
            "http://localhost/shooter/images/zrwu14p3.bmp",
            "http://localhost/shooter/images/zrwu92c2.bmp",
            "http://localhost/shooter/images/zs.bmp",
            "http://localhost/shooter/images/zsba17d3.bmp",
            "http://localhost/shooter/images/zsbu95c2.bmp",
            "http://localhost/shooter/images/zswa174.bmp",
            "http://localhost/shooter/images/zswu93c4.bmp",
            "http://localhost/shooter/images/zt.bmp",
            "http://localhost/shooter/images/ztba98d2.bmp",
            "http://localhost/shooter/images/ztbu14p2.bmp",
            "http://localhost/shooter/images/ztwa995.bmp",
            "http://localhost/shooter/images/ztwu17p5.bmp"
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
        var background = url.match(/^.*z[a-z]/g) + ".bmp";
        var potentialShooter = {
            src: url,
            background: background,
            race: race,
            isArmed: isArmed,
            alt: (isArmed?"armed":"unarmed")
        };
        return potentialShooter;
    }
    function showShooter() {
        hasShot = false;
        hasNotShot = false;
        var potentialShooter = getRandomShooter();
        var background = potentialShooter.background;
        var person = potentialShooter.src;
        shooterIsArmed = (potentialShooter.alt == "armed");
        $background = $('<img/>').attr("src", background).hide();
        $person = $('<img/>').attr("src", person).hide();
        $(".viewer").html("").append($background).append($person);
        function displayBackground() {
            $background.show();
        }
        function displayPerson() {
            $background.hide();
            $person.show();
            active = true;
            becameActive = new Date().getTime();
            if(shooterIsArmed) {
                _shooterTimeout = setTimeout(wronglyNotShoot, TIME_TO_DECIDE);
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
        var eventCode = eventCodes[e.keyCode];
        var responseTime = eventTime - becameActive;
        var extraTime = TIME_TO_DECIDE - responseTime;
        if(active) {
            if(eventCode == "shoot") {
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
    function wronglyShoot() {
        score -= PENALTY_FOR_SHOOTING_UNARMED;
        showMessage("You've shot an innocent person!");
        $('#score').val(score);
        cooldownThenNext();
    }
    function wronglyNotShoot() {
        score -= PENALTY_FOR_NOT_SHOOTING_ARMED;
        showMessage("You've been shot!");
        $('#score').val(score);
        cooldownThenNext();
    }
    function correctlyShoot(extraTime) {
        score += BONUS_FOR_SHOOTING_ARMED;
        score += extraTime;
        var message = "Yay, you shot someone armed!<br />"
        message += "Extra time:" + extraTime;
        showMessage(message);
        $('#score').val(score);
        cooldownThenNext();
    }
    function correctlyNotShoot(extraTime) {
        score += BONUS_FOR_NOT_SHOOTING_UNARMED;
        score += extraTime;
        var message = "Yay, you didn't shoot an innocent person!<br />"
        message += "Extra time:" + extraTime;
        showMessage(message);
        $('#score').val(score);
        cooldownThenNext();
    }
    function failToNotShoot() {
        // Not really sure why this option is even here. But whatever.
        correctlyNotShoot(0);
    }
    function cooldownThenNext() {
        active = false;
        cooldown = true;
        $(".viewer").html('<img src="./images/cooldown.jpg" alt="cooldown" />');
        setTimeout(showShooter, COOLDOWN_PERIOD);
    }
    function showMessage(message, time) {
        if(!time) var time = 1000;
        var $message = $('<div class="message"/>').html(message);
        $message.appendTo($(".game"));
        console.log(message, $message);
        setTimeout(function() {
            $message.remove();
        }, time)
    }
    showShooter();
});
