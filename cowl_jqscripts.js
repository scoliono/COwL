$(function() {
    $("legend:not(#Settings_Heros)").click(function() {
        if ($(this).next().find("legend").length !== 0 && $(this).parent().attr("id") !== "Settings") {
            if ($(this).next().css("display") !== "none") {
                $(this).siblings().hide();
                $(this).parent().siblings().show();
                $(this).css("color", "black").text($(this).attr("data-text"));
                pp = $("#title").text().split("/");
                pp.pop();
                $("#title").text(pp.join("/"));
            } else {
                $(this).parent().siblings().hide();
                $("#title").show();
                $("#title").text($("#title").text() + "/" + $(this).text().trim());
                $(this).siblings().show();
                $(this).css("color", "darkblue").attr("data-text", $(this).text()).text("<=Back");
            }
        }
    });

    $("legend#Settings_Heros").click(function() {
        if ($(this).next().find("legend").length !== 0 && $(this).parent().attr("id") !== "Settings") {
            if ($(this).next().css("display") !== "none") {
                $(this).siblings().hide();
                $(this).parent().siblings().show();
                $(this).css("color", "black").text($(this).attr("data-text"));
                pp = $("#title").text().split("/");
                pp.pop();
                $("#title").text(pp.join("/"));
            } else {
                $(this).parent().siblings().hide();
                $("#title").show();
                $("#title").text($("#title").text() + "/" + $(this).text().trim());
                $(this).siblings().show();
                $(this).css("color", "darkblue").attr("data-text", $(this).text()).text("<=Back");
            }
        }
    });

    $("select:not(.switcher)").change(function() {
            var odef = $(this).find("option[name='def']").text();
            var cval = $(this).find(":selected").text();
            setChangesText($(this), cval !== odef, "Change dropdown at \"*\" from \"" + odef + "\" to \"*\"");
            setIOText($(this), cval !== odef, $(this).parent().attr("id"));
    });

    $("select.switcher").change(function() {
            var odef = $(this).find("option[name='def']").text();
            var cval = $(this).find(":selected").text();
            setChangesText($(this), cval !== odef, "Change dropdown at \"*\" from \"" + odef + "\" to \"*\"");
            setIOText($(this), cval !== odef, $(this).parent().attr("id"));
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
            j = JSON.parse(ta.val());
            for (var key in j) {
                id = "[id='" + key;
                if ($(id + "']").find("select").length === 1) {
                    $(id + "']").find("select").val(j[key]);
                } else if ($(id + "']").find(id + "-range']").length === 1) {
                    $(id + "']").find(id + "-range']").val(j[key]);
                    syncToText(key);
                }

            }
        } catch (e) {
            alert("Input format not recognized.");
        }
    });

    $("fieldset#Settings_Heros").children().eq(1).find("select,input[type='range']").change(function(e){
            console.log(e.target.parentElement.id);
            console.log("boybo");
            console.log(document.getElementById(e.target.id.replace(/All-Teams/g, "Team-1")));
            console.log(document.getElementById(e.target.id.replace(/All-Teams/g, "Team-2")));
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
            var xid = pid.split("-").join("_");
            var xxid = "#" + xid;
            if (test) {
                if (document.getElementById(xid) === null) {
                    $("div.sidebar").append("<p id=\"" + xid + "\">");
                }
                txtarr = text.split("*");
                txtthing = pid.split("-").join(" ").split("_").join(" => ")
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
});