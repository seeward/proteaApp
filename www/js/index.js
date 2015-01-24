document.addEventListener('deviceready', function() {

    var homePage = $(".home").html();
    $("#page").html(homePage);
    var htmlFixtures = "<h4>Protea World Cup Fixtures 2015</h4>";
    var fixturesHtml = htmlFixtures + "<h4>Feb</h4><table class='table table-striped'><tr><th>Team A</th><th>Team B</th><th>Grounds</th><th>Date</th></tr>";
    var fixturesHtml2 = "<h4>March</h4><table class='table table-striped'><tr><th>Team A</th><th>Team B</th><th>Grounds</th><th>Date</th></tr>";
    var htmlPlayers = "<h4>Protea World Cup Squad 2015</h4><ul>";
    var url = "https://www.kimonolabs.com/api/8m7imhmo?apikey=bn8MJcEsGlx72UgJ3ee0zXHvEUugNRKM";
    var html = "<h4>Current ICC International Rankings</h4><h4>Test</h4><table class='table table-striped'><tr><th>Team</th><th>Matches</th><th>Points</th><th>Rating</th></tr>";
    var html2 = "<h4>ODI</h4><table class='table table-striped'><tr><th>Team</th><th>Matches</th><th>Points</th><th>Rating</th></tr>";
    var html3 = "<h4>T20</h4><table class='table table-striped'><tr><th>Team</th><th>Matches</th><th>Points</th><th>Rating</th></tr>";
    var htmlVids = "<h4>Protea Fire Videos</h4><ul>";




    $("#mainMenu").on("click", "#players", function(e) {
        //alert($(".players").html());
        $("#page").html('');
        var injectPlayers = $(".players").html();
        $("#page").html(injectPlayers);

    });

    $("#mainMenu").on("click", "#videos", function(e) {

        $("#page").html('');
        var injectVids = $(".videos").html();
        $("#page").html(injectVids);

    });
    $("#mainMenu").on("click", "#rankings", function(e) {

        $("#page").html('');
        var injectRank = $(".rankings").html()
        $("#page").html(injectRank);
        
    });
    $("#mainMenu").on("click", "#fixtures", function(e) {
        $("#page").html('');
        var injectFixtures = $(".fixtures").html()
        $("#page").html(injectFixtures);


    });



    $.getJSON("fixtures.json", processData);

    function processData(data) {

        $.each(data.feb, function(i, o) {
            console.log(JSON.stringify(o));
            fixturesHtml += "<tr><td>" + o.team1 + "</td><td>" + o.team2 + "</td><td>" + o.grounds + "</td><td>Feb - " + o.date + "</td></tr>";

        });

        fixturesHtml += "</table>";

        $.each(data.march, function(i, o) {
            //console.log(JSON.stringify(o));
            fixturesHtml2 += "<tr><td>" + o.team1 + "</td><td>" + o.team2 + "</td><td>" + o.grounds + "</td><td>Mar - " + o.date + "</td></tr>";

        });

        fixturesHtml2 += "</table>";


        $(".fixtures").html(fixturesHtml + fixturesHtml2);
    };


    $.getJSON("proteas.json", processPlayers);

    function processPlayers(dt){

        
        $.each(dt, function(ind, ob) {
            htmlPlayers += "<li class='link' style='margin-bottom:10px;border-bottom:2px solid #c1c1c1'><div style='float:left;margin-right:50px'><img id='" + JSON.stringify(ob.player) + "' class='img-circle' height='75'src='" + ob.player.img + "'></div><h4>" + ob.player.name + "</h4><p>" + ob.player.role + "</p>" +
                ob.player.birthdate + "</li>";
        });


        $(document).on("click", "img", function(e) {
            e.preventDefault();
            playerPackage = e.target.id;
            $(".players").trigger("playerSelected", playerPackage);
        });

        htmlPlayers += "</ul>";

        $(".players").append(htmlPlayers);


    };






    $(".players").on("playerSelected", function(e, d) {

        $("#page").html('');
        var playerData = JSON.parse(d);
        var playerDetails = "<div class='container' style='padding:10px'>";
        playerDetails += "<h4>" + playerData.name + "</h4>";
        playerDetails += "<img class='img-rounded' style='margin-top:10px' src='" + playerData.img + "' width='150'>";
        playerDetails += "<br><br><table class='table table-striped'>";
        playerDetails += "<tr><td>" + playerData.role + "</td></tr>";
        playerDetails += "<tr><td>" + playerData.birthdate + "</td></tr>";
        playerDetails += "<tr><td>" + playerData.birthplace + "</td></tr>";
        playerDetails += "<tr><td>" + playerData.batting + "</td></tr>";
        playerDetails += "<tr><td>" + playerData.bowling + "</td></tr></table>";
        playerDetails += "<p>" + playerData.bio + "</p>";

        playerDetails += "</div>";

        $("#page").html(playerDetails);

    });



    $.getJSON(url, processData2);

    function processData2(data) {
        //console.log(JSON.stringify(data));

        $.each(data.results.test, function(i, o) {
            //console.log(JSON.stringify(o));
            html += "<tr><td>" + o.test_team + "</td><td>" + o.test_matches + "</td><td>" + o.test_points + "</td><td>" + o.test_rating + "</td></tr>";

        });





        $.each(data.results.odi, function(i, o) {
            //console.log(JSON.stringify(o));
            html2 += "<tr><td>" + o.odi_team + "</td><td>" + o.odi_matches + "</td><td>" + o.odi_points + "</td><td>" + o.odi_rating + "</td></tr>";

        });



        $.each(data.results.T20, function(i, o) {
            //console.log(JSON.stringify(o));
            html3 += "<tr><td>" + o.t20_team + "</td><td>" + o.t20_matches + "</td><td>" + o.t20_points + "</td><td>" + o.t20_rating + "</td></tr>";

        });

        html += "</table>";
        html2 += "</table>";
        html3 += "</table>";


        $(".rankings").html(html + html2 + html3);


    }






    $.getJSON("videos.json", parseData);

    function parseData(data) {
        $.each(data, function(ind, obj) {
            htmlVids += "<li><h4>" + obj.video.text + "</h4><iframe width='100%' height='215' src='http://www.youtube.com/embed/"+obj.video.href+"?rel=0&amp;controls=0&amp;showinfo=0' frameborder='0' allowfullscreen></iframe></li>";
        });


        htmlVids += "</ul>";

        $(".videos").html(htmlVids);
    }



});