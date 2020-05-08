async function load() {
    var loader_bar = document.getElementById("loader_bar");
    var loader_panel = document.getElementById("loader");
    var page_data = document.getElementById("data");
    var current = 0;
    var max = 100;

    while (current <= max) {
        var random = Math.random(0, 10);
        await sleep(50);
        for (var i = current; i < current + random; i++) {
            loader_bar.style.width = i + "%";
            await sleep(5);
        }
        if (current == max) break;
        current += random;
        if (current > max) current = max;
    }
    loader_panel.style.display = "none";
    page_data.style.display = "flex";
}
load();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}