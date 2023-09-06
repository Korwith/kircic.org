function setText() {
    function getelement(element) {
        return document.getElementById(element);
    }

    var data = {
        toptext:'welcome to kirhub',
        p1:"",
        p2:"hey i'm kir!\n\ni can code in lua, html, css, js, which is one of my favorite hobbies.\n\ni also play an extreme amount of minecraft, on one long term survival world.\n\n2048, minesweeper, and monkeytype gremlin",
        p3:''
    }

    for (var index in data) {
        var value = data[index];
        var element = getelement(index);
        var formatted = value.replace(/\n/g, "<br>");
        element.innerHTML = formatted;
    }
}

setText();