document.addEventListener('deviceready', function() {


    /*
     _    _____    ____  _____
    | |  / /   |  / __ \/ ___/
    | | / / /| | / /_/ /\__ \ 
    | |/ / ___ |/ _, _/___/ / 
    |___/_/  |_/_/ |_|/____/  
                              
*/






    var loader = "<div class='container'><img src='imgs/loader.gif'></div>";
    var homePage = $(".home").html();
    var login = $(".login").html();
    var pageQueue = [];
    var currentPage = "";
    var lastPage = "init";


    var injectPlayers, injectVids, injectRank, injectNews, injectFixtures, injectRecords;
    var htmlFixtures = "<h4>World Cup Fixtures 2015</h4><hr><button id='sort' class='btn btn-block btn-success'>Proteas Games</button>";
    var fixturesHtml = htmlFixtures + "<h4>Feb</h4><table class='table table-striped'><tr><th>Team A</th><th>Team B</th><th>Grounds</th><th>Date</th></tr>";
    var fixturesHtml2 = "<h4>March</h4><table class='table table-striped'><tr><th>Team A</th><th>Team B</th><th>Grounds</th><th>Date</th></tr>";
    var htmlPlayers = "<h4>Protea World Cup Squad 2015</h4><hr><ul>";
    var url = "https://www.kimonolabs.com/api/8m7imhmo?apikey=bn8MJcEsGlx72UgJ3ee0zXHvEUugNRKM";
    var html = "<h4>Current ICC International Rankings</h4><hr><h6>Test</h6><table class='table table-striped'><tr><th>Team</th><th>Matches</th><th>Points</th><th>Rating</th></tr>";
    var html2 = "<h6>ODI</h6><table class='table table-striped'><tr><th>Team</th><th>Matches</th><th>Points</th><th>Rating</th></tr>";
    var html3 = "<h6>T20</h6><table class='table table-striped'><tr><th>Team</th><th>Matches</th><th>Points</th><th>Rating</th></tr>";
    var htmlVids = "<h4>Protea Fire Videos</h4><hr><ul>";

    var injectHome = $(".home").html();





    document.addEventListener("backbutton", function(e) {

    }, true);

    $("body").on("touchstart", "#backer", function(e) {

    });



    $("#page").on("touchstart", "#sort", function(e) {

        $(".notSaGames").remove();

    });



    $("#page").on("touchstart", "#register", function(e) {


        var u = $("#nickName").val();
        var e = $("#email").val();
        var p = $("#userPassword").val();

        if (u == "" || p == "" || e == "") {
            $("#statusMsg").html("<br><h4>You must enter all details to register!</h4>").fadeIn();
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
                $(".carousel-inner").swipe({
                    //Generic swipe handler for all directions

                    swipeRight: function() {
                        $(this).parent().carousel('prev');
                        $("#mainSpinner").carousel({
                            interval: false
                        });
                    },
                    //Default is 75px, set to 0 for demo so any distance triggers swipe
                    threshold: 0
                });
                $("#mainMenu").show();
                $("#footer").show();
                currentPage = injectHome;
                window.localStorage.setItem("user", JSON.stringify(userDetails));
            },
            error: function(user, error) {
                //alert(JSON.stringify(error));
                navigator.notification.alert(error.message);
                //$("#regstatus").html(error.message).addClass("errorDiv");
            }
        });


    });



    $("#page").on("touchstart", "#bestBattingInnings",
        function(e) {
            lastPage = injectRecords;
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
            lastPage = injectRecords;
            $.getJSON("bowlingCareer.json", function(d3) {
                $("#page").html("");
                h = "<div class='container' style='margin-top:5px;padding-bottom:45px'><h4>Protea WC Bowling Stats</h4><table class='table table-striped'>";
                h += "<tr><th>Player</th><th>Wkts</th><th>Avg</th><th>Strike Rate</th><th>Econ</th></tr>";
                $.each(d3, function(i, o) {

                    h += "<tr><td>" + o.player.text + "</td><td>" + o.wkts + "</td><td>" + o.avg + "</td><td>" + o.srate + "</td><td>" + o.econ + "</td></tr>";

                });
                h += "</table></div>";
                $("#page").html(h);
            });
        });


    $("#page").on("touchstart", "#refresh", function() {
        $("#connect").trigger("touchstart");
    });

    $("#mainMenu").on("touchstart", "#connect",
        function(e) {
            $("#page").html("<div class='container'><h4>Loading...</h4><br>" + loader + "</div>");

            $.ajax({
                url: "http://proteafirefan.tumblr.com/api/read/json?num=50",
                type: "get",
                dataType: "html"
            }).done(function(data) {
                    eval(data);
                    var reData = tumblr_api_read;
                    console.log(reData.posts);
                    var hr = "<h4>#proteaFire Social Media Feed</h4><hr><ul>";
                    $.each(reData.posts, function(i, o) {

                        if (o.type == "regular") {
                            console.log(JSON.stringify(o));
                            hr += "<li class='tweets'>" + o['regular-body'] + "<div class='date'>" + o.date.substr(0, 17); + " || " + o['regular-title'] + "</div></li>";

                        }

                        //if (o.type == "photo") {
                        // alert(JSON.stringify(o));
                        // hr += "<li><div class='box'><img src='"+o['photo-url-250']+"'></div></li>";
                        //}






                    });

                    hr += "</ul>";

                    hd = "<button class='btn btn-success btn-xs pull-right' id='refresh' style='position:static'>refresh</button>";
                    $("#page").scrollTop();
                    $("#page").html(hr);
                    $("#page").prepend(hd).fadeIn(2000);
                }

            );
        });




    $("#page").on("touchstart", "#boundariesInnings", function(e) {
        lastPage = injectRecords;
        $.getJSON("mostBoundariesInnings.json", function(data) {
            i = "<div class='container'><h4>Most Boundaires in a WC Innings</h4><table class='table table-striped'>";
            i += "<tr><th>Runs</th><th>Balls</th><th>4s</th><th>6s</th><th>Player</th><th>Year</th></tr>";

            $.each(data, function(er, o) {
                i += "<tr><td>" + o.runs + "</td><td>" + o.balls + "</td><td>" + o.fours + "</td><td>" + o.sixes + "</td><td>" + o.player.text + "</td><td>" + o.year + "</td></tr>";
            });

            i += "</table></div>";
            $("#page").scrollTop();
            $("#page").html(i);


        });
    });

    $("#page").on("touchstart", "#runsByLineup", function(e) {
        lastPage = injectRecords;
        $.getJSON("mostRunsPerBattingLineup.json", function(dt) {
            i = "<div class='container'><h4>Most Runs by Position in a WC Innings</h4><table class='table table-striped'>";
            i += "<tr><th>Position</th><th>Score</th><th>Player</th><th>Match</th></tr>";

            $.each(dt, function(er, o) {
                i += "<tr><td>" + o.position + "</td><td>" + o.score + "</td><td>" + o.player.text + "</td><td>" + o.match.text + "</td></tr>";
            });

            i += "</table></div>";
            $("#page").scrollTop();
            $("#page").html(i);
        });
    });


    $("#page").on("touchstart", "#totalRuns", function(e) {
        lastPage = injectRecords;
        $.getJSON("mostRunsTotal.json", function(dat) {
            i = "<div class='container'><h4>Most Career Runs in the WC</h4><table class='table table-striped'>";
            i += "<tr><th>Player</th><th>Matches</th><th>Runs</th><th>High</th><th>Avg</th></tr>";

            $.each(dat, function(er, o) {
                i += "<tr><td>" + o.player.text + "</td><td>" + o.matches + "</td><td>" + o.runs + "</td><td>" + o.high + "</td><td>" + o.average + "</td></tr>";
            });

            i += "</table></div>";
            $("#page").scrollTop();
            $("#page").html(i);
        });

    });

    $("#page").on("touchstart", "#mostWickets", function(e) {
        lastPage = injectRecords;
        $.getJSON("mostWickets.json", function(data2) {
            i = "<div class='container'><h4>Most Career Wickets in the WC</h4><table class='table table-striped'>";
            i += "<tr><th>Player</th><th>Wickets</th><th>Best</th><th>Average</th></tr>";

            $.each(data2, function(er, o) {
                i += "<tr><td>" + o.player.text + "</td><td>" + o.wkts + "</td><td>" + o.best + "</td><td>" + o.average + "</td></tr>";
            });

            i += "</table></div>";
            $("#page").scrollTop();
            $("#page").html(i);
        });
    });
    $("#page").on("touchstart", "#bestBowlingInnings", function(e) {
        lastPage = injectRecords;
        $.getJSON("bestInningsBowling.json", function(data3) {
            i = "<div class='container'><h4>Best Bowling Innings in the WC</h4><table class='table table-striped'>";
            i += "<tr><th>Score</th><th>Player</th><th>Match</th><th>Year</th></tr>";

            $.each(data3, function(er, o) {
                i += "<tr><td>" + o.score + "</td><td>" + o.player.text + "</td><td>" + o.match.text + "</td><td>" + o.year + "</td></tr>";
            });

            i += "</table></div>";
            $("#page").scrollTop();
            $("#page").html(i);
        });
    });



    $("#mainMenu").on("touchstart", "#players", function(e) {
        lastPage = currentPage;
        //alert($(".players").html());
        $("#page").html('');
        $("#page").scrollTop();
        $("#page").html(injectPlayers)
        currentPage = injectPlayers;

    });

    $("#footer").on("touchstart", "#videos", function(e) {
        lastPage = currentPage;

        $("#page").html('');
        $("#page").scrollTop();
        $("#page").html(injectVids);
        currentPage = injectVids;

    });


    $("#footer").on("touchstart", "#rankings", function(e) {
        $("#page").html('<h4>Loading current ICC Rankings</h4><br>' + loader);





        lastPage = currentPage;

        $("#page").scrollTop();
        $("#page").html(injectRank);
        currentPage = injectRank;

    });

    $("#footer").on("touchstart", "#records", function(e) {
        lastPage = currentPage;
        $("#page").html('');

        $("#page").html(injectRecords);
        $("#page").scrollTop();
        currentPage = injectRecords

    });

    $("#mainMenu").on("touchstart", "#fixtures", function(e) {
        lastPage = currentPage;
        $("#page").html('');
        $("#page").scrollTop();
        $("#page").html(injectFixtures);

        currentPage = injectFixtures;
    });



    $("#mainMenu").on("touchstart", "#news", function(e) {
        lastPage = currentPage;
        $("#page").html('<h4>Loading latest News</h4><br>' + loader);
        h = "<h4>Latest South African News</h4><ul>"
        $.ajax({
            url: "http://pipes.yahoo.com/pipes/pipe.run?_id=fb5976bfef39b2913e42671e86c505c5&_render=json",
            dataType: "json",

        }).done(function(data) {
            $.each(data.value.items, function(i, o) {
                h += "<li class='newsItem'><a style='color:#007E45' href='" + o.link + "'>" + o.title + "</a><br><p style='font-size:12px;margin-bottom:-10px'>" + o.pubDate + "</p><hr></li>";
            });


            h += "</ul>";
            $("#page").scrollTop();
            $("#page").html(h);
            currentPage = h;
        });

    });




    $("#footer").on("touchstart", "#home", function(e) {
        getBlocks();
        lastPage = currentPage;
        $("#page").html('');
        $("#page").scrollTop();


        setTimeout(function() {

            $("#helper").fadeIn().delay(3000).fadeOut();;
        }, 5000);


        var injectFeatures = $(".features").html();
        $("#page").html(injectFeatures);

        $(".carousel-inner").swipe({


            swipeRight: function() {
                $(this).parent().carousel('prev');

            },
            //Default is 75px, set to 0 for demo so any distance triggers swipe
            threshold: 0
        });

        currentPage = injectHome;

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

            if (ob.player.name == "Farhaan Behardien") {
                // alert("Behardien");
                htmlPlayers += "<li class='link' style='margin-left:15px;height:100px;margin-bottom:40px;border-bottom:2px solid #c1c1c1'><div style='float:left;margin-right:50px'><img id='" + JSON.stringify(ob.player) + "' class='pic' style='width:70px;' src='" + ob.player.img + "'></div><h4 style='margin-bottom:-4px'>" + ob.player.name + "</h4><p style='margin-bottom:-4px'>" + ob.player.role + "</p>" +
                    "<p style='margin-bottom:55px'>" + ob.player.birthdate + "</p></li>";
            } else {
                htmlPlayers += "<li class='link' style='height:100px;margin-bottom:40px;border-bottom:2px solid #c1c1c1'><div style='float:left;margin-right:50px'><img id='" + JSON.stringify(ob.player) + "' class='pic' style='width:100px;' src='" + ob.player.img + "'></div><h4 style='margin-bottom:-4px'>" + ob.player.name + "</h4><p style='margin-bottom:-4px'>" + ob.player.role + "</p>" +
                    "<pstyle='margin-bottom:55px'>" + ob.player.birthdate + "</p></li>";
            }

        });


        $("#page").on("touchend", ".pic", function(e) {
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
        playerDetails += "<img class='img-rounded' style='margin-top:10px' src='" + playerData.img + "' width='300'>";
        playerDetails += "<br><br><table class='table table-striped'>";
        playerDetails += "<tr><td>" + playerData.role + "</td></tr>";
        playerDetails += "<tr><td>" + playerData.birthdate + "</td></tr>";
        playerDetails += "<tr><td>" + playerData.birthplace + "</td></tr>";
        playerDetails += "<tr><td>" + playerData.batting + "</td></tr>";
        playerDetails += "<tr><td>" + playerData.bowling + "</td></tr></table>";
        playerDetails += "<p>" + playerData.bio + "</p>";

        playerDetails += "</div>";
        $("#page").scrollTop();
        $("#page").html(playerDetails);



    });



    var getRankings = function() {
        $.getJSON(url, processData2);

        function processData2(data) {
            //console.log(JSON.stringify(data));

            $.each(data.results.test, function(i, o) {
                //console.log(JSON.stringify(o));

                if (o.test_team == "South Africa") {
                    html += "<tr class='success'><td>" + o.test_team + "</td><td>" + o.test_matches + "</td><td>" + o.test_points + "</td><td>" + o.test_rating + "</td></tr>";

                } else {
                    html += "<tr><td>" + o.test_team + "</td><td>" + o.test_matches + "</td><td>" + o.test_points + "</td><td>" + o.test_rating + "</td></tr>";

                }

            });





            $.each(data.results.odi, function(i, o) {
                //console.log(JSON.stringify(o));

                if (o.odi_team == "South Africa") {
                    html2 += "<tr class='success'><td>" + o.odi_team + "</td><td>" + o.odi_matches + "</td><td>" + o.odi_points + "</td><td>" + o.odi_rating + "</td></tr>";

                } else {
                    html2 += "<tr><td>" + o.odi_team + "</td><td>" + o.odi_matches + "</td><td>" + o.odi_points + "</td><td>" + o.odi_rating + "</td></tr>";

                }

            });



            $.each(data.results.T20, function(i, o) {
                //console.log(JSON.stringify(o));
                if (o.t20_team == "South Africa") {
                    html3 += "<tr class='success'><td>" + o.t20_team + "</td><td>" + o.t20_matches + "</td><td>" + o.t20_points + "</td><td>" + o.t20_rating + "</td></tr>";

                } else {
                    html3 += "<tr><td>" + o.t20_team + "</td><td>" + o.t20_matches + "</td><td>" + o.t20_points + "</td><td>" + o.t20_rating + "</td></tr>";

                }
            });

            html += "</table>";
            html2 += "</table>";
            html3 += "</table>";


            $(".rankings").html(html + html2 + html3);
            injectRank = $(".rankings").html()

        }

    };


    var getVideos = function() {
        $.getJSON("videos.json", parseData);

        function parseData(data) {
            $.each(data, function(ind, obj) {
                htmlVids += "<li><h4>" + obj.video.text + "</h4><iframe width='100%' height='215' src='http://www.youtube.com/embed/" + obj.video.href + "?rel=0&amp;controls=0&amp;showinfo=0' frameborder='0' allowfullscreen></iframe></li>";
            });


            htmlVids += "</ul>";

            $(".videos").html(htmlVids);
            injectVids = $(".videos").html();
        };
    }


    $("body").on("touchstart", "#page", function() {
        //$("#helper").remove();
    })




    var getBlocks = function() {

        var leadUp = Parse.Object.extend("wcLeadUp");
        var query3 = new Parse.Query(leadUp);
        //$("#targetZone2").append("<div id='temp'>" + loader + "</div>");
        query3.find({
            success: function(results) {
                for (var i3 = 0; i3 < results.length; i3++) {
                    var object = results[i3];
                    h3 = object.get('body');
                }
                $("#temp3").remove();
                $("#targetZone1").append(h3)
            },
            error: function(error) {}
        });


        var feat = Parse.Object.extend("featuredPlayer");
        var query2 = new Parse.Query(feat);
        //$("#targetZone3").append("<div id='temp2'>" + loader + "</div>");

        query2.find({
            success: function(results) {
                for (var i2 = 0; i2 < results.length; i2++) {
                    var object = results[i2];
                    h2 = object.get('body');
                }
                $("#temp2").remove();
                $("#targetZone3").append(h2)
            },
            error: function(error) {

            }
        });

        var adBlock = Parse.Object.extend("adBlock");
        var query = new Parse.Query(adBlock);
        //$("#targetZone2").append("<div id='temp'>" + loader + "</div>");
        query.find({
            success: function(results) {
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    h = object.get('body');
                }
                $("#temp").remove();
                $("#targetZone2").append(h)
            },
            error: function(error) {}
        });


    };


    injectNews = $(".news").html();

    injectRecords = $(".records").html();

    var offLine = function(){
        alert("off");
    };

    var onLine = function(){
alert("on");
    };



    var init = function() {
  document.addEventListener("offline", offLine, false);
  document.addEventListener("online", function(){
    alert("on");
  }, false);


        Parse.initialize("jParK9CQZdIRCsZtJ4d3UR5s1HNcZZPUhXlBJ1BN", "qOWRwgP5SPUjGFzy5BrIKRHuT2kzRonqjXrKeSmC");
        
        var dimensions = {
            model : device.model,
            platform : device.platform
        };

        
        Parse.Analytics.track('appLaunch', dimensions);





        //window.localStorage.clear();











        getVideos();
        getRankings();

        /* parsePlugin.initialize("jParK9CQZdIRCsZtJ4d3UR5s1HNcZZPUhXlBJ1BN", "TzibPeTYbJFepHLudcSTIePRjKU5N8b89e806YlH", function() {

            parsePlugin.subscribe('allUsers', function() {

                parsePlugin.getInstallationId(function(id) {

                }, function(e) {
                   
                });

            }, function(e) {
               
            });

        }, function(e) {
          
        });
*/





        if (window.localStorage.getItem("user")) {





            $("#page").html(injectHome);
            //pageQueue.push("injectHome");
            currentPage = injectHome;
            $("#mainMenu").show();
            $("#footer").show();
            $("#brand").show();





            //$(".home").trigger("touchstart");
            if (device.platform == "iOS") {
                $("#backer").show();
                $("#mainMenu").css("margin-top", "25px");
                $("#backer").css("margin-top", "25px");
            }
        } else {
            $("#page").html(login);
            $("#brand").show();
            //$("#helper").show();
        }


        $(".globalStatus").remove();



        $("#mainSpinner").carousel({
            interval: false
        });




        $(".carousel-inner").swipe({
            //Generic swipe handler for all directions
            swipeRight: function() {

                $(this).parent().carousel('prev');
            },
            //Default is 75px, set to 0 for demo so any distance triggers swipe
            threshold: 0
        });
    };

    init();

});