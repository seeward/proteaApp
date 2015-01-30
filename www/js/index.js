document.addEventListener('deviceready', function() {

    var homePage = $(".home").html();
    var login = $(".login").html();




    $("#page").on("touchstart", "#sorter", function(e) {
        $(".active").removeClass("active");
        $(this).addClass("active");
        $(".notSaGames").fadeOut();

    });

    var injectPlayers, injectVids, injectRank, injectNews, injectFixtures, injectRecords;
    var htmlFixtures = "<h4>Protea World Cup Fixtures 2015</h4><div class='btn-group btn-toggle'><button id='sort' class='btn btn-xs btn-default'>ON</button><button class='btn btn-xs btn-primary active'>OFF</button></div>";
    var fixturesHtml = htmlFixtures + "<h4>Feb</h4><table class='table table-striped'><tr><th>Team A</th><th>Team B</th><th>Grounds</th><th>Date</th></tr>";
    var fixturesHtml2 = "<h4>March</h4><table class='table table-striped'><tr><th>Team A</th><th>Team B</th><th>Grounds</th><th>Date</th></tr>";
    var htmlPlayers = "<h4>Protea World Cup Squad 2015</h4><ul>";
    var url = "https://www.kimonolabs.com/api/8m7imhmo?apikey=bn8MJcEsGlx72UgJ3ee0zXHvEUugNRKM";
    var html = "<h4>Current ICC International Rankings</h4><h4>Test</h4><table class='table table-striped'><tr><th>Team</th><th>Matches</th><th>Points</th><th>Rating</th></tr>";
    var html2 = "<h4>ODI</h4><table class='table table-striped'><tr><th>Team</th><th>Matches</th><th>Points</th><th>Rating</th></tr>";
    var html3 = "<h4>T20</h4><table class='table table-striped'><tr><th>Team</th><th>Matches</th><th>Points</th><th>Rating</th></tr>";
    var htmlVids = "<h4>Protea Fire Videos</h4><ul>";

    var injectHome = $(".home").html();

    $("#page").on("touchstart", "#register", function(e) {


        var u = $("#nickName").val();
        var e = $("#email").val();
        var p = $("#userPassword").val();

        if (u == "" || p == "" || e == "") {
            $("#statusMsg").html("<br><p>You must enter all details to register!</p>").fadeIn();
            return;
        }



        var user = new Parse.User();
        user.set("username", u);
        user.set("password", p);
        user.set("email", e);

        userDetails = {};
        userDetails.u = u;
        userDetails.p = p;
        userDetails.e = e;



        user.signUp(null, {
            success: function(user) {
                $("#page").html(injectHome);
                $("#mainMenu").show();
                $("#footer").show();

                window.localStorage.setItem("user", JSON.stringify(userDetails));
            },
            error: function(user, error) {
                //alert(JSON.stringify(error));
                navigator.notification.alert(error.message);
                //$("#regstatus").html(error.message).addClass("errorDiv");
            }
        });


    });

    injectNews = $(".news").html();

    injectRecords = $(".records").html();

    $("#page").on("touchstart", "#bestBattingInnings",
        function(e) {
            $.getJSON("highestBattingInnings.json", function(d) {
                $("#page").html("");
                h = "<div class='container' style='margin-top:5px;padding-bottom:45px'><h4>Most Runs in a WC Innings</h4><table class='table table-striped'>";
                h += "<tr><th>Runs</th><th>Player</th><th>Match</th><th>Year</th></tr>";
                $.each(d, function(i, o) {

                    h += "<tr><td>" + o.score + "</td><td>" + o.player.text + "</td><td>" + o.match.text + "</td><td>" + o.year + "</td></tr>";

                });
                h += "</table></div>";
                $("#page").html(h);
            });
        });

    $("#page").on("touchstart", "#bowlingCareer",
        function(e) {
            $.getJSON("bowlingCareer.json", function(d3) {
                $("#page").html("");
                h = "<div class='container' style='margin-top:5px;padding-bottom:45px'><h4>Bowling Stats in WC by Player</h4><table class='table table-striped'>";
                h += "<tr><th>Player</th><th>Wkts</th><th>Avg</th><th>Strike Rate</th><th>Economy</th></tr>";
                $.each(d3, function(i, o) {

                    h += "<tr><td>" + o.player.text + "</td><td>" + o.wkts + "</td><td>" + o.avg + "</td><td>" + o.srate + "</td><td>" + o.econ + "</td></tr>";

                });
                h += "</table></div>";
                $("#page").html(h);
            });
        });




    $("#page").on("touchstart", "#boundariesInnings", function(e) {
        $.getJSON("mostBoundariesInnings.json", function(data) {
            i = "<div class='container'><h4>Most Boundaires in a WC Innings</h4><table class='table table-striped'>";
            i += "<tr><th>Runs</th><th>Balls</th><th>4s</th><th>6s</th><th>Player</th><th>Year</th></tr>";

            $.each(data, function(er, o) {
                i += "<tr><td>" + o.runs + "</td><td>" + o.balls + "</td><td>" + o.fours + "</td><td>" + o.sixes + "</td><td>" + o.player.text + "</td><td>" + o.year + "</td></tr>";
            });

            i += "</table></div>";

            $("#page").html(i);


        });
    });

    $("#page").on("touchstart", "#runsByLineup", function(e) {
        $.getJSON("mostRunsPerBattingLineup.json", function(dt) {
            i = "<div class='container'><h4>Most Runs by Position in a WC Innings</h4><table class='table table-striped'>";
            i += "<tr><th>Position</th><th>Score</th><th>Player</th><th>Match</th></tr>";

            $.each(dt, function(er, o) {
                i += "<tr><td>" + o.position + "</td><td>" + o.score + "</td><td>" + o.player.text + "</td><td>" + o.match.text + "</td></tr>";
            });

            i += "</table></div>";

            $("#page").html(i);
        });
    });


    $("#page").on("touchstart", "#totalRuns", function(e) {
        $.getJSON("mostRunsTotal.json", function(dat) {
            i = "<div class='container'><h4>Most Career Runs in the WC</h4><table class='table table-striped'>";
            i += "<tr><th>Player</th><th>Matches</th><th>Runs</th><th>High</th><th>Avg</th></tr>";

            $.each(dat, function(er, o) {
                i += "<tr><td>" + o.player.text + "</td><td>" + o.matches + "</td><td>" + o.runs + "</td><td>" + o.high + "</td><td>" + o.average + "</td></tr>";
            });

            i += "</table></div>";

            $("#page").html(i);
        });

    });

    $("#page").on("touchstart", "#mostWickets", function(e) {
        $.getJSON("mostWickets.json", function(data2) {
            i = "<div class='container'><h4>Most Career Wickets in the WC</h4><table class='table table-striped'>";
            i += "<tr><th>Player</th><th>Wickets</th><th>Best</th><th>Average</th></tr>";

            $.each(data2, function(er, o) {
                i += "<tr><td>" + o.player.text + "</td><td>" + o.wkts + "</td><td>" + o.best + "</td><td>" + o.average + "</td></tr>";
            });

            i += "</table></div>";

            $("#page").html(i);
        });
    });
    $("#page").on("touchstart", "#bestBowlingInnings", function(e) {
        $.getJSON("bestInningsBowling.json", function(data3) {
            i = "<div class='container'><h4>Best Bowling Innings in the WC</h4><table class='table table-striped'>";
            i += "<tr><th>Score</th><th>Player</th><th>Match</th><th>Grounds</th><th>Year</th></tr>";

            $.each(data3, function(er, o) {
                i += "<tr><td>" + o.score + "</td><td>" + o.player.text + "</td><td>" + o.match.text + "</td><td>" + o.grounds.text + "</td><td>" + o.year + "</td></tr>";
            });

            i += "</table></div>";

            $("#page").html(i);
        });
    });



    $("#mainMenu").on("touchstart", "#players", function(e) {
        //alert($(".players").html());
        $("#page").html('');

        $("#page").html(injectPlayers).animate({
            scrollTop: 0
        }, "fast");;


    });

    $("#footer").on("touchstart", "#videos", function(e) {

        $("#page").html('');

        $("#page").html(injectVids);

    });


    $("#footer").on("touchstart", "#rankings", function(e) {

        $("#page").html('');

        $("#page").html(injectRank);

    });

    $("#footer").on("touchstart", "#records", function(e) {

        $("#page").html('');

        $("#page").html(injectRecords);

    });

    $("#mainMenu").on("touchstart", "#fixtures", function(e) {
        $("#page").html('');

        $("#page").html(injectFixtures);


    });



    $("#mainMenu").on("touchstart", "#news", function(e) {
        $("#page").html('<h4>Loading latest News</h4>');
        h = "<h4>Latest South African News</h4><ul>"
        $.ajax({
            url: "http://pipes.yahoo.com/pipes/pipe.run?_id=fb5976bfef39b2913e42671e86c505c5&_render=json",
            dataType: "json",

        }).done(function(data) {
            $.each(data.value.items, function(i, o) {
                h += "<li class='newsItem'><a style='color:#007E45' href='" + o.link + "'>" + o.title + "</a><br><p style='font-size:12px;margin-bottom:-10px'>" + o.pubDate + "</p><hr></li>";
            });


            h += "</ul>";

            $("#page").html(h);
        });

    });


    $("#footer").on("touchstart", "#home", function(e) {

        $("#page").html('');

        $("#page").html(injectHome);

    });



    $.getJSON("fixtures.json", processData);

    function processData(data) {

        $.each(data.feb, function(i, o) {
            console.log(JSON.stringify(o));

            if (o.team1 === "South Africa" || o.team2 === "South Africa") {
                fixturesHtml += "<tr class='success'><td>" + o.team1 + "</td><td>" + o.team2 + "</td><td>" + o.grounds + "</td><td>Feb - " + o.date + "</td></tr>";

            } else {
                fixturesHtml += "<tr class='notSaGames'><td>" + o.team1 + "</td><td>" + o.team2 + "</td><td>" + o.grounds + "</td><td>Feb - " + o.date + "</td></tr>";

            }


        });

        fixturesHtml += "</table>";

        $.each(data.march, function(i, o) {
            if (o.team1 === "South Africa" || o.team2 === "South Africa" || o.team1 == "TBA (Final)") {
                fixturesHtml2 += "<tr class='success'><td>" + o.team1 + "</td><td>" + o.team2 + "</td><td>" + o.grounds + "</td><td>Mar - " + o.date + "</td></tr>";
            } else {
                fixturesHtml2 += "<tr class='notSaGames'><td>" + o.team1 + "</td><td>" + o.team2 + "</td><td>" + o.grounds + "</td><td>Mar - " + o.date + "</td></tr>";

            }

        });

        fixturesHtml2 += "</table>";


        $(".fixtures").html(fixturesHtml + fixturesHtml2);
        injectFixtures = $(".fixtures").html()
    };




    $.getJSON("proteas.json", processPlayers);

    function processPlayers(dt) {


        $.each(dt, function(ind, ob) {
            htmlPlayers += "<li class='link' style='margin-bottom:10px;border-bottom:2px solid #c1c1c1'><div style='float:left;margin-right:50px'><img id='" + JSON.stringify(ob.player) + "' class='pic' style='width:60px' src='" + ob.player.img + "'></div><h4>" + ob.player.name + "</h4><p>" + ob.player.role + "</p>" +
                ob.player.birthdate + "</li>";
        });


        $("#page").on("touchstart", ".pic", function(e) {
            e.preventDefault();
            playerPackage = e.target.id;
            $(".players").trigger("playerSelected", playerPackage);
        });

        htmlPlayers += "</ul>";

        $(".players").append(htmlPlayers);
        injectPlayers = $(".players").html();

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
        injectRank = $(".rankings").html()

    }






    $.getJSON("videos.json", parseData);

    function parseData(data) {
        $.each(data, function(ind, obj) {
            htmlVids += "<li><h4>" + obj.video.text + "</h4><iframe width='100%' height='215' src='http://www.youtube.com/embed/" + obj.video.href + "?rel=0&amp;controls=0&amp;showinfo=0' frameborder='0' allowfullscreen></iframe></li>";
        });


        htmlVids += "</ul>";

        $(".videos").html(htmlVids);
        injectVids = $(".videos").html();
    };


    var init = function() {

        Parse.initialize("jParK9CQZdIRCsZtJ4d3UR5s1HNcZZPUhXlBJ1BN", "qOWRwgP5SPUjGFzy5BrIKRHuT2kzRonqjXrKeSmC");
        //   wLASDBHGKijymxvUeNo4qfaoKVGIQCpVsh4bqnr6

        parsePlugin.initialize("jParK9CQZdIRCsZtJ4d3UR5s1HNcZZPUhXlBJ1BN", "TzibPeTYbJFepHLudcSTIePRjKU5N8b89e806YlH", function() {



            parsePlugin.subscribe('SampleChannel', function() {

                parsePlugin.getInstallationId(function(id) {

                  


                }, function(e) {
                    alert('error');
                });

            }, function(e) {
                alert('error');
            });

        }, function(e) {
            alert('error');
        });



        if (window.localStorage.getItem("user")) {
            $("#page").html(injectHome);
            $("#mainMenu").show();
            $("#footer").show();
        } else {
            $("#page").html(login);
        }




    };

    init();

});