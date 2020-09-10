function openSection(caller) {
    for (s of document.querySelectorAll(".section")) {
        s.style.display = "none";
    }
    for (mi of document.querySelectorAll(".menu-item")) {
        mi.classList.remove("active");
    }
    caller.classList.add("active");
    var section = String(caller.id).split("-")[2];
    document.querySelector("#" + section).style.display = "block";
    if (document.body.clientWidth <= 600) {
        document.querySelector("#menu-items-wrapper").style.display = "none";

    }
}

function toggleMenu() {
    let menuItemsWrapper = document.querySelector("#menu-items-wrapper");
    if (["none",""].includes(menuItemsWrapper.style.display)) {
        menuItemsWrapper.style.display = "block";
    } else {
        menuItemsWrapper.style.display = "none";
    }
}

window.addEventListener('resize', () => {
    if (document.body.clientWidth >= 600) {
        console.log("show menu");
        document.querySelector("#menu-items-wrapper").style.display = "block";

    } else {
        document.querySelector("#menu-items-wrapper").style.display = "none";
    }
});