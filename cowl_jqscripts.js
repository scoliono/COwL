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
        console.log(pid);
        var odef = $(this).find("option[name='def']");
        var cval = $(this).find(":selected");
        if (cval.attr("value") != odef.attr("value")) {
            pid = pid.split("_");
            xid = pid.join('-').replace(' ', '');
            if (document.getElementById(xid) == null) {
                n = document.createElement("p");
                n.id = xid;
                document.getElementById('results').appendChild(n);
            }
            var xxid = "#" + xid;
            $(xxid).text("Change dropdown at \"" + pid.join(" => ") + "\" from \"" + odef.text() + "\" to \"" + cval.text() + "\".");
            console.log(xid)
        }
    });
});