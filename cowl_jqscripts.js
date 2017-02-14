$(document).ready(function() {
    $("legend").click(function() {
        if ($(this).next().css("display") != "none") {
            $(this).siblings().hide();
        } else {
            $(this).siblings().show();
        }
    });
    $("select").change(function() {
        var pid = $(this).parent().attr("id");
        var odef = $(this).find("option[name='def']");
        var cval = $(this).find(":selected");
        pid = pid.split("_");
        xid = pid.join('-').split(' ').join('');
        if (cval.attr("value") != odef.attr("value")) {
            if (document.getElementById(xid) == null) {
                n = document.createElement("p");
                n.id = xid;
                document.getElementById('results').appendChild(n);
//                console.log("made new p tag, added to div")
            }
            var xxid = "#" + xid;
            $(xxid).text("Change dropdown at \"" + pid.join(" => ") + "\" from \"" + odef.text() + "\" to \"" + cval.text() + "\".");
//            console.log("set text in p tag")
        } else {
                var xxid = "#" + xid;
                $(xxid).text("");
                }
    });
    $("input[type='range']").on("mousedown mousemove change", function(e) {
        syncToText($(this).parent().attr("id"));
        pid = $(this).parent().attr("id").split(" ").join("_").split("_").join("-");
        if ($(this).val() != $(this).attr("data-default")) {
            if (document.getElementById(pid) == null) {
                n = document.createElement("p");
                n.id = pid;
                document.getElementById('results').appendChild(n);
            }
            var xxid = "#" + pid;
            $(xxid).text("Change slider at \"" + pid.split("-").join(" => ") + "\" from \"" + $(this).attr("data-default") + "\" to \"" + $(this).val() + "\".");
        } else {
                var xxid = "#" + pid;
                $(xxid).text("");
        }
    });
    $("input[type='number']").on("mousedown mousemove change", function(e) {
        syncToRange($(this).parent().attr("id"));
        pid = $(this).parent().attr("id").split(" ").join("_").split("_").join("-");
        if ($(this).val() != $(this).attr("data-default")) {
            if (document.getElementById(pid) == null) {
                n = document.createElement("p");
                n.id = pid;
                document.getElementById('results').appendChild(n);
            }
            var xxid = "#" + pid;
            $(xxid).text("Change slider at \"" + pid.split("-").join(" => ") + "\" from \"" + $(this).attr("data-default") + "\" to \"" + $(this).val() + "\".");
            console.log($(this).val());
        } else {
            var xxid = "#" + pid;
            $(xxid).text("");
        }
    });
});