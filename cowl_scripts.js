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

/*
No idea why I even keep this file around. I'll probably remove it later.
*/