function init() {
    hideall();
    if (localStorage.getItem("pointlessClickCount") == null) {
        localStorage.setItem("pointlessClickCount", 0);
    }

    if (localStorage.getItem("currentPoints") == null) {
        localStorage.setItem("currentPoints", 1);
    }

    if (localStorage.getItem("points") == null) {
        localStorage.setItem("points", 0);
    }

    if (localStorage.getItem("stage") == null) {
        localStorage.setItem("stage", 0);
    }

    if (localStorage.getItem("CPS") == null) {
        localStorage.setItem("CPS", 0);
    }

    if (localStorage.getItem("P1Price") == null) {
        localStorage.setItem("P1Price", 10);
    }

    if (localStorage.getItem("P10Price") == null) {
        localStorage.setItem("P10Price", 150);
    }

    if (localStorage.getItem("P50Price") == null) {
        localStorage.setItem("P50Price", 1100);
    }

    if (localStorage.getItem("P201Price") == null) {
        localStorage.setItem("P201Price", 5500);
    }

    if (localStorage.getItem("P922Price") == null) {
        localStorage.setItem("P922Price", 25000);
    }

    if (localStorage.getItem("P4321Price") == null) {
        localStorage.setItem("P4321Price", 100000);
    }

    if (localStorage.getItem("timePointless") == null) {
        localStorage.setItem("timePointless", 0);
    }

    if (localStorage.getItem("timeAny") == null) {
        localStorage.setItem("timeAny", 0);
    }

    setInterval(updatePoints,1000);

}

function pointlessClicked(){
    if(localStorage.getItem("pointlessClickCount") != null ){
        var clicks = localStorage.getItem("pointlessClickCount");
        var points = localStorage.getItem("points");
        clicks = Number(clicks) + 1;
        localStorage.setItem("pointlessClickCount", clicks);
        var stage  = localStorage.getItem("stage");
        localStorage.setItem("timeAny", 0);
        localStorage.setItem("timePointless", 0);

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
                stage = 3;
                localStorage.setItem("stage", stage);
                $('#PS1').show();
            }
        }


    } else {
        localStorage.setItem("pointlessClickCount", 1);
        $('#Output').show();
    }
}


/*This broke.*/
function colourChange(){
    var colour = $('#Pointless').css("color");
    colour = colour.substring(3);
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

function updatePoints(){
    var cps = localStorage.getItem("CPS");
    var timePointless = localStorage.getItem("timePointless");
    var timeAny = localStorage.getItem("timeAny");
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
}
