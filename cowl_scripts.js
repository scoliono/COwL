$(function() {
//    $("legend:not(#Settings_Heros *)").click(function() {
    $("legend + fieldset:not(#Settings_Heros *)").prev().click(function() {
//    This is to select only non-Heros traversal legends, not the option-containing legends
        if ($(this).text() == "<=Back") {
            pp = $(".title").text().split("/");
            pp.pop();
            $(".title").text(pp.join("/"));
            levelUp($(this));
        } else {
            $(".title").text($(".title").text() + "/" + $(this).text().trim());
            levelDown($(this));
        }
    });

    $("fieldset#Settings_Heros > * > * > * > legend").click(function() {
//    This is to select only non-Heros traversal legends, not the option-containing legends
        if ($(this).text() == "<=Back") {
            pp = $(".title").text().split("/");
            pp.pop();
            $(".title").text(pp.join("/"));
            levelUp($(this));
            $(".switcher").show();
        } else {
            $(".title").text($(".title").text() + "/" + $(this).text().trim());
            levelDown($(this));
            $(".switcher").show();
        }
    });

    $("#Settings_Heros > legend").click(function() {
        if ($(this).text() == "<=Back") {
            pp = $(".title").text().split("/");
            pp.pop();
            $(".title").text(pp.join("/"));
            levelUp2($(this));
        } else {
            $(".title").text($(".title").text() + "/" + $(this).text().trim());
            levelDown2($(this));
        }
    });

    $("#Settings_Heros > fieldset > fieldset > legend").click(function(e) {
        if ($(this).text() == "<=Back") {
            pp = $(".title").text().split("/");
            pp.pop();
            $(".title").text(pp.join("/"));
            levelUpHeros($(this));
        } else {
            $(".title").text($(".title").text() + "/" + $(this).text().trim());
            levelDownHeros($(this));
            $(this).text("<=Back")
        }
    });

    $("select:not(.switcher)").change(function() {
            console.log("??");
            var odef = $(this).find("option[name='def']").text();
            var cval = $(this).find(":selected").text();
            console.log(odef);
            console.log(cval);
            setChangesText($(this), cval !== odef, "Change dropdown at \"*\" from \"" + odef + "\" to \"*\"");
            setIOText($(this), cval !== odef, $(this).parent().attr("id"));
    });

    $(".switcher").change(function() {
        var idarr;
        var p = $("#Settings fieldset:visible");
        p.each(function(i,e){
            if ($(this).attr("id").search("Team") !== -1) {
                console.log($(".switcher").val())
                var tempid = "#" + $(this).attr("id").replace(/All-Teams|Team-1|Team-2/, $(".switcher").val());
                console.log(tempid)
                $(tempid).show();
                console.log($(this))
                $(this).hide()
            }
        });
    });

    $("input[type='range']").on("mousedown mousemove change", function() {
        if ($(this).val() !== $(this).siblings().val()) {
            syncToText($(this).parent().attr("id"));
            setChangesText($(this), $(this).val() !== $(this).attr("data-default"), "Change slider at \"*\" from \"" + $(this).attr("data-default") + "\" to \"*\"");
            setIOText($(this), $(this).val() !== $(this).attr("data-default"), $(this).parent().attr("id"));
        }
    });

    $("input[type='number']").on("keyup mousemove change", function() {
        if ($(this).val() !== $(this).siblings().val()) {
            syncToRange($(this).parent().attr("id"));
            setChangesText($(this), $(this).val() !== $(this).attr("data-default"), "Change slider at \"*\" from \"" + $(this).attr("data-default") + "\" to \"*\".");
            setIOText($(this), $(this).val() !== $(this).attr("data-default"), $(this).parent().attr("id"));
        }
    });

    $("input[type='text']").on("keyup mousemove change", function() {
        setChangesText($(this), $(this).val() !== $(this).attr("data-default"), "Name: \"*\".");
        setIOText($(this), $(this).val() !== "", "name");
    });

    $("#advio").change(function() {
        try {
            if ($(this).val() === "" || $(this).val() == "{") {
                $(this).val("{}");
            }
            j = JSON.parse($(this).val());
            for (var key in j) {
                id = "[id='" + key;
                if ($(id + "']").find("select").length === 1) {
                    $(id + "']").find("select").val(j[key]);
                } else if ($(id + "']").find(id + "-range']").length === 1) {
                    $(id + "']").find(id + "-range']").val(j[key]);
                    syncToText(key);
                } else {
                    $(id+"']").val(j[key]);
                }
            }
        } catch (e) {
            alert("Input format not recognized.");
        }
    });

    $("fieldset#Settings_Heros").children().eq(1).find("select,input").change(function(e) {
            var l1 = document.getElementById(e.target.parentElement.id.replace(/All-Teams/g, "Team-1"));
            var l2 = document.getElementById(e.target.parentElement.id.replace(/All-Teams/g, "Team-2"));
            if ($(this).is("select")) {
                var t1 = $(l1.children);
                var t2 = $(l2.children);
                if (t1.val() !== $(this).val && t1.find("[name='def']").val() == t1.val()) {
                    t1.val($(this).val());
                    setChangesText(t1, false, "");
                    console.log("first born unicorn");
                }
                if (t2.val() !== $(this).val && t2.find("[name='def']").val() == t2.val()) {
                    t2.val($(this).val());
                    setChangesText(t2, false, "");
                    console.log("hardcore soft porn");
                }
            } else if ($(this).is("input")) {
                var t1 = $(l1.children);
                var t2 = $(l2.children);
                if (t1.val() !== $(this).val && t1.attr("data-default")) {
                    t1.val($(this).val());
                    setChangesText(t1, false, "");
                    console.log("come sail away, come sail away");
                }
                if (t2.val() !== $(this).val && t2.attr("data-default")) {
                    t2.val($(this).val());
                    setChangesText(t2, false, "");
                    console.log("come sail away with me, baby");
                }
            }
    });


    function setIOText(t, test, entry) {
        ta = $("#advio");
        out = JSON.parse(ta.val());
        if (test) {
            out[entry] = t.val();
            ta.val(JSON.stringify(out));
        } else {
            delete out[entry];
            ta.val(JSON.stringify(out));
        }
    }

    function syncToRange(id) {
        rng = document.getElementById(id + "-range");
        txt = document.getElementById(id + "-text");
        rng.value = txt.value;
    }

    function syncToText(id) {
        rng = document.getElementById(id + "-range");
        txt = document.getElementById(id + "-text");
        txt.value = rng.value;
    }

    function setChangesText(t, test, text) {
        if (t.parent().attr("id") != undefined) {
            var pid = t.parent().attr("id");
            var xid = pid.split("_").join("-");
            var xxid = "#" + xid;
            var main = $(document.getElementById(pid.replace(/Team\-\d/g, "All-Teams")).children);
            console.log(main.val());
            if ((test && !(t.parent().attr("id").search("All-Teams") === -1)) || ((t.val() !== main.val()))) {
                if (document.getElementById(xid) === null) {
                    $("div.sidebar").append("<p id=\"" + xid + "\">");
                }
                txtarr = text.split("*");
                txtthing = pid.split("-").join(" ").split("_").join(" => ");
                $(xxid).text(txtarr[0] + txtthing + txtarr[1] + t.val() + "\".");
            } else {
                    $(xxid).remove();
            }
        } else {
            if (t.val() != ""){
                $("div.sidebar").find("p[id='lbbyname']").text("Name: " + t.val());
            } else {
                $("div.sidebar").find("p[id='lbbyname']").text("");
            }
        }
    }

    function levelUp(t, test){
        t.parent().siblings().show();
        t.siblings().hide();
        t.text(t.attr("data-text"));
        if (!test) {
            $(".switcher").hide();
            $(".title").show();
        }
    }
    function levelDown(t){
        t.parent().siblings().hide();
        t.siblings().show();
        $(".title").show();
        t.attr("data-text", t.text());
        t.text("<=Back");
    }

    function levelUp2(t){
        levelUp(t);
        t.siblings().children().hide();
    }
    function levelDown2(t){
        levelDown(t);
        t.siblings().children().eq(0).show();
        t.siblings().children().eq(1).show();
        $(".switcher").show();
    }

    function levelUpHeros(t){
        levelUp(t, 1);
        $(".switcher").show();
        $("#Settings_Heros > legend").show()
    }
    function levelDownHeros(t){
        levelDown(t);
        $(".switcher").show();
        $("#Settings_Heros > legend").hide()
    }
});