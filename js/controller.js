function init() {
    hideall();
    localStorage.setItem("pointlessClickCount", 0);
    localStorage.setItem("currentPoints", 1);
    localStorage.setItem("points", 0);
    localStorage.setItem("stage", 0);
    localStorage.setItem("CPS", 0);
    localStorage.setItem("P1Price", 10);
    localStorage.setItem("P10Price", 150);
    localStorage.setItem("P50Price", 1100);
    localStorage.setItem("P201Price", 5500);
    localStorage.setItem("P922Price", 25000);
    localStorage.setItem("P4321Price", 100000);
    localStorage.setItem("timePointless", 0);
    localStorage.setItem("timeAny", 0);
    localStorage.setItem("numOfBets", 0);
    setInterval(updatePoints,1000);
}

function cheat(){
    localStorage.setItem("points", 100000000);
}

function cheatAgain(){
    localStorage.setItem("numOfBets", 24);
}

function pointlessClicked(){
    if(localStorage.getItem("pointlessClickCount") != null ){
        var clicks = localStorage.getItem("pointlessClickCount");
        var points = localStorage.getItem("points");
        var bets = localStorage.getItem("numOfBets");
        clicks = Number(clicks) + 1;
        localStorage.setItem("pointlessClickCount", clicks);
        var stage  = localStorage.getItem("stage");
        localStorage.setItem("timeAny", 0);
        localStorage.setItem("timePointless", 0);

        $('#Output').text("");

        if (Number(stage) === 0) {
            if (Number(clicks) === 1) {
                $('#Output').show();
            } else if (Number(clicks) === 2) {
                $('#Output').text("Huh. Click it again.");
            } else if (Number(clicks) === 3 ) {
                $('#Output').text("Maybe it's pointless.");
            } else if (Number(clicks) === 4 ) {
                $('#Output').text("I'm getting bored already");
            } else if (Number(clicks) === 5) {
                $('#Output').text("Ooooooo. That's new.");
                $('#Points').show();
                $('#Plus').show();
            } else if (Number(clicks) === 6) {
                $('#Output').text("");
                localStorage.setItem("stage",1);
            }
        }

        if (Number(stage) === 1) {

            if (Number(clicks) > 13){
                $('#Output').text(" ");
                stage = 2;
                localStorage.setItem("stage", stage);
                $('#PS1').show();
            }
        }

        if (Number(stage) >= 2) {
            $('#colourChange').show();
        }

        if (Number(stage) >= 3) {
            $('#bet50').show();
            if (Number(bets) >= 10) {
                $('#bet10').show();
            }
            if (Number(bets) >= 25) {
                $('#bet1').show();
            }
        }

    } else {
        localStorage.setItem("pointlessClickCount", 1);
        $('#Output').show();
    }
}

function change(){
    colourChange("colourChange");
    colourChange("Pointless");
}

function colourChange(value){

    var colour = $('#' + value).css("background-color");
    colour = colour.substring(4,colour.length-1);
    var split = colour.split(",");

    if(Number(split[0]) === Number(211)){
        split[0]=255;
        split[1]=3;
        split[2]=3;
    } else if(Number(split[0]) === Number(255)){
        if(Number(split[2]) > Number(3) ){
            split[2] = Number(split[2]) - 63;
        } else if (Number(split[1]) === Number(255)) {
            split[0] = Number(split[0]) - 63;
        } else {
            split[1] = Number(split[1]) + 63;
        }
    } else if(Number(split[1]) === Number(255)){
        if(Number(split[0]) > Number(3) ){
            split[0] = Number(split[0]) - 63;
        } else if (Number(split[2]) === Number(255)) {
            split[1] = Number(split[1]) - 63;
        } else {
            split[2] = Number(split[2]) + 63;
        }
    } else if(Number(split[2]) === Number(255)){
        if(Number(split[1]) > Number(3) ){
            split[1] = Number(split[1]) - 63;
        } else if (Number(split[0]) === Number(255)) {
            split[2] = Number(split[2]) - 63;
        } else {
            split[0] = Number(split[0]) + 63;
        }
    }
    var out = "rgb(" + split[0] + "," + split[1] + "," + split[2] +")";

    $('#' + value).css("background-color", out);

}

function bet(value){
    var points = localStorage.getItem("points");
    var bets = localStorage.getItem("numOfBets");
    var randomBoi = Math.round(Math.random() * 100);

    if ( Number(value) == 50) {
        if (Number(randomBoi) < 60) {
            points = points * 2;
            $('#Output').text("Congrats on the ol' 2 to 1 chance victory.");

        } else {
            points = Math.round(points/2);
            $('#Output').text("And you lose.");

        }
    } else if ( Number(value) == 10) {
        if (Number(randomBoi) < 15) {
            points = points * 10;
            $('#Output').text("1 in 10. You lucky duckling you.");

        } else {
            points = Math.round(points/10);
            $('#Output').text("Ya lost mate.");

        }
    } else if ( Number(value) == 1) {
        if (Number(randomBoi) < 5) {
            points = points * 100;
            $('#Output').text("You won big time. 100 to 1 chance. Lucky fucker.");
        } else {
            points = Math.round(points/100);
            $('#Output').text("You lost. Not a suprise really. You are a bit shit.");

        }
    }


    localStorage.setItem("points", points);
    localStorage.setItem("numOfBets", Number(bets)+1);

}

function rick(){
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ','_blank');
    $('#Output').text("Yup.");
}

function PS(value){
    var price = localStorage.getItem("P" + value + "Price");
    var points = localStorage.getItem("points");
    var cps = localStorage.getItem("CPS");
    localStorage.setItem("timeAny", 0);

    if (Number(points) >= Number(price)) {
        $('#Output').text(" ");

        points = Number(points) - Number(price);
        price = Math.round(Number(price) * 1.1);
        cps = Number(cps) + Number(value);

        localStorage.setItem("P" + value + "Price", price);
        localStorage.setItem("CPS",cps);
        localStorage.setItem("points",points);


        $('#Points').text("Points: " + points);
        $('#PS'+value).text("+" + value + " Cookie Per Second. Costs " + price +".");
    } else {
        $('#Output').text("You can't afford that. Stop trying.");
    }

    if (Number(value) === 1) {
        if (price >= 25) {
            $('#PS10').show();
        }
    }
    if (Number(value) === 10) {
        if (price >= 389) {
            $('#PS50').show();
            localStorage.setItem("stage", 3);
            localStorage.setItem("pointlessClickCount", 0);
            $('#bet50').show();
        }
    }
    if (Number(value) === 50) {
        if (price >= 2852) {
            $('#PS201').show();
        }
    }
    if (Number(value) === 201) {
        if (price >= 14266) {
            $('#PS922').show();
        }
    }
    if (Number(value) === 922) {
        if (price >= 64844) {
            $('#PS4321').show();
        }
    }
}

function plus(){
    var stage  = localStorage.getItem("stage");
    var points = localStorage.getItem("points");
    localStorage.setItem("timeAny", 0);

    if (Number(stage) === 1) {
        if (Number(points) > Number(20)) {
            $('#Output').text("Maybe click the pointless button. Who knows.");
        }
    }
    var currentPoints = localStorage.getItem("currentPoints");
    increaseScore(currentPoints);
}

function away(){
    $('#timeOut').hide();
    increaseScore(10000);
    localStorage.setItem("timeAny", 0);
    localStorage.setItem("timePointless", 0);

    $('#Output').text("Good to see you're back, mate. Nice piss?");

}

function updatePoints(){
    var cps = localStorage.getItem("CPS");
    var timePointless = localStorage.getItem("timePointless");
    var timeAny = localStorage.getItem("timeAny");

    if (Number(timePointless) > 60) {
        $('#Output').text("Click the pointless button. You will feel better.");
        $('#rick').show();
    }

    if (Number(timeAny) > 180) {
        $('#timeOut').show();
    } else if (Number(timeAny) > 120) {
        $('#Output').text("5 minutes. You have been away for 5 minutes. Am I not good enough for you?");
    } else if (Number(timeAny) > 60) {
        $('#Output').text("You haven't clicked in 1 minute, mate. Have you left?");

    }

    increaseScore(cps);
    timePointless = Number(timePointless) + 1;
    localStorage.setItem("timePointless", timePointless);
    timeAny = Number(timeAny) + 1;
    localStorage.setItem("timeAny", timeAny);
}

function increaseScore(value){
    if(localStorage.getItem("points") != null ){
        var points = localStorage.getItem("points");
        points = Number(points) + Number(value);
        localStorage.setItem("points", points);
        var text = "Points: " + String(points);
        $('#Points').text(text);

    } else {
        localStorage.setItem("points", 1);
        $('#Points').text("Points: 1");
    }
}

function hideall(){
    $('#Output').hide();
    $('#Points').hide();
    $('#Plus').hide();
    $('#PS1').hide();
    $('#PS10').hide();
    $('#PS50').hide();
    $('#PS201').hide();
    $('#PS922').hide();
    $('#PS4321').hide();
    $('#bet1').hide();
    $('#bet10').hide();
    $('#bet50').hide();
    $('#colourChange').hide();
    $('#timeOut').hide();
    $('#rick').hide();
}

function showall(){
    $('#Output').show();
    $('#Points').show();
    $('#Plus').show();
    $('#PS1').show();
    $('#PS10').show();
    $('#PS50').show();
    $('#PS201').show();
    $('#PS922').show();
    $('#PS4321').show();
    $('#bet1').show();
    $('#bet10').show();
    $('#bet50').show();
    $('#colourChange').show();
    $('#timeOut').show();
    $('#rick').show();
}
