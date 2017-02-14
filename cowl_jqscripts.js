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
        var odef = $(this).find("option[name='def']").text();
        var cval = $(this).find(":selected").text();
        setChangesText($(this), cval != odef, "Change dropdown at \"*\" from \"" + odef + "\" to \"*\"");
        setIOText($(this), cval != odef);
    });


    $("input[type='range']").on("mousedown mousemove change", function(e) {
        if ($(this).val() != $(this).siblings().val()) {
            syncToText($(this).parent().attr("id"));
            setChangesText($(this), $(this).val() != $(this).attr("data-default"), "Change slider at \"*\" from \"" + $(this).attr("data-default") + "\" to \"*\"");
            setIOText($(this), $(this).val() != $(this).attr("data-default"));
        }
    });


    $("input[type='number']").on("mousedown mousemove change", function(e) {
        if ($(this).val() != $(this).siblings().val()) {
            syncToRange($(this).parent().attr("id"));
            setChangesText($(this), $(this).val() != $(this).attr("data-default"), "Change slider at \"*\" from \"" + $(this).attr("data-default") + "\" to \"*\".");
            setIOText($(this), $(this).val() != $(this).attr("data-default"));
        }
    });

    $("#advio").change(function(){
        getIOText($(this));
    });

    function getIOText(ta) {
        try {
            j = JSON.parse(ta.val());
            for(key in j) {
                id = "[id='"+ key;
                if($(id + "']").find("select").length == 1) {
                    $(id + "']").find("select").val(j[key]);
                } else if($(id + "']").find(id + "-range']").length == 1) {
                    $(id + "']").find(id + "-range']").val(j[key]);
                    syncToText(key)
                }

            }
            } catch(e) {
//            TODO: ALERT TO MALFORMED JSON
        }
    }

    function setIOText(t, test) {
        ta = $("#advio");
        out = JSON.parse(ta.val());
        if (test){
            out[t.parent().attr("id")] = t.val();
            ta.val(JSON.stringify(out));
        } else {
        delete out[t.parent().attr("id")];
        ta.val(JSON.stringify(out));

        }
    }

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