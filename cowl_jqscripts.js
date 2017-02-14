$(document).ready(function() {
    $("legend").click(function() {
        if ($(this).next().css("display") != "none") {
            $(this).siblings().hide();
            $(this).css("color", "black");

        } else {
            $(this).siblings().show();
            $(this).css("color", "blue");
        }
    });

    $("select").change(function() {
        var odef = $(this).find("option[name='def']").val();
        var cval = $(this).find(":selected").val();
        setChangesText($(this), cval != odef, "Change dropdown at \"*\" from \"" + odef + "\" to \"*\"");
    });


    $("input[type='range']").on("mousedown mousemove change", function(e) {
        syncToText($(this).parent().attr("id"));
        setChangesText($(this), $(this).val() != $(this).attr("data-default"), "Change slider at \"*\" from \"" + $(this).attr("data-default") + "\" to \"*\"");
    });


    $("input[type='number']").on("mousedown mousemove change", function(e) {
        syncToRange($(this).parent().attr("id"));
        setChangesText($(this), $(this).val() != $(this).attr("data-default"), "Change slider at \"*\" from \"" + $(this).attr("data-default") + "\" to \"*\".");
    });


    function setChangesText(t, test, text) {
        var pid = t.parent().attr("id").split("_").join("-");
        var xid = pid.split(" ").join("_");
        var xxid = "#" + pid.split(" ").join("_");
        if (test) {
            if (document.getElementById(xid) == null) {
                n = document.createElement("p");
                n.id = xid;
                document.getElementById('results').appendChild(n);
            }
            txtarr = text.split("*");
            $(xxid).text(txtarr[0] + pid.split("-").join(" => ") + txtarr[1] + t.val() + "\".");
        } else {
            $(xxid).text("");
        }


    }
});