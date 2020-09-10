document.addEventListener("DOMContentLoaded", function() {
    var poweredOn = false;
    var result = null,
        first = null,
        second = null,
        dotAdded = false,
        task = null,
        err = false,
        screenCleared = false,
        firstSolve = true,
        memory = 0,
        mrcClicked = false;
    var screen = document.getElementById("calculator-screen");
    var buttons = document.getElementsByClassName("calculator-button");
    var numbers = document.getElementsByClassName("number");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onmousedown = function() {
            this.classList.add("calculator-button-clicked")
        };
        buttons[i].onmouseup = function() {
            this.classList.remove("calculator-button-clicked")
        };
        buttons[i].onmouseout = function() {
            this.classList.remove("calculator-button-clicked")
        };
    }
    for (var i = 0; i < numbers.length; i++) {
        numbers[i].onclick = function() {
            if (poweredOn) {
                mrcClicked = false;
                if (!err) {
                    if (task != null && !screenCleared) {
                        screenCleared = true;
                        screen.innerHTML = "0";
                    }
                    if (screen.innerHTML == "0") screen.innerHTML = this.innerHTML;
                    else screen.innerHTML = screen.innerHTML + this.innerHTML;
                } else {
                    screen.innerHTML = "ERR";
                    err = true;
                }
            }
        }
    }
    document.getElementsByClassName("dot")[0].onclick = function() {
        if (poweredOn) {
            if (!err && !dotAdded) {
                if (task != null && !screenCleared) {
                    screenCleared = true;
                    screen.innerHTML = "0";
                }
                mrcClicked = false;
                screen.innerHTML = screen.innerHTML + this.innerHTML;
                dotAdded = true;
            }
        }
    }
    document.getElementsByClassName("sqrt")[0].onclick = function() {
        if (poweredOn) {
            if (!err) {
                mrcClicked = false;
                if (parseFloat(screen.innerHTML) < 0) {
                    screen.innerHTML = "ERR";
                    err = true;
                } else {
                    screen.innerHTML = Math.sqrt(parseFloat(screen.innerHTML));
                }
            }
        }
    }
    document.getElementsByClassName("pm")[0].onclick = function() {
        if (poweredOn) {
            if (!err) {
                mrcClicked = false;
                screen.innerHTML = parseFloat(screen.innerHTML) * -1;
            }
        }
    }
    document.getElementsByClassName("plus")[0].onclick = function() {
        if (poweredOn) {
            if (!err) {
                mrcClicked = false;
                first = parseFloat(screen.innerHTML);
                task = "plus";
                firstSolve = true;
                screenCleared = false;
                dotAdded = false;
            }
        }
    }
    document.getElementsByClassName("minus")[0].onclick = function() {
        if (poweredOn) {
            if (!err) {
                mrcClicked = false;
                first = parseFloat(screen.innerHTML);
                task = "minus";
                firstSolve = true;
                screenCleared = false;
                dotAdded = false;
            }
        }
    }
    document.getElementsByClassName("div")[0].onclick = function() {
        if (poweredOn) {
            if (!err) {
                mrcClicked = false;
                first = parseFloat(screen.innerHTML);
                task = "div";
                firstSolve = true;
                screenCleared = false;
                dotAdded = false;
            }
        }
    }
    document.getElementsByClassName("mult")[0].onclick = function() {
        if (poweredOn) {
            if (!err) {
                mrcClicked = false;
                first = parseFloat(screen.innerHTML);
                task = "mult";
                firstSolve = true;
                screenCleared = false;
                dotAdded = false;
            }
        }
    }
    document.getElementsByClassName("solve")[0].onclick = function() {
        if (poweredOn) {
            if (!err) {
                mrcClicked = false;
                if (firstSolve) second = parseFloat(screen.innerHTML);
                switch (task) {
                    case "plus":
                        if (firstSolve) screen.innerHTML = first + second;
                        else screen.innerHTML = parseFloat(screen.innerHTML) + second;
                        break;
                    case "minus":
                        if (firstSolve) screen.innerHTML = first - second;
                        else screen.innerHTML = parseFloat(screen.innerHTML) - second;
                        break;
                    case "div":
                        if (second == 0) {
                            screen.innerHTML = "ERR";
                            err = true;
                        } else {
                            if (firstSolve) screen.innerHTML = first / second;
                            else screen.innerHTML = parseFloat(screen.innerHTML) / second;
                        }
                        break;
                    case "mult":
                        if (firstSolve) screen.innerHTML = first * second;
                        else screen.innerHTML = parseFloat(screen.innerHTML) * second;
                        break;
                }
                screenCleared = false;
                firstSolve = false;
                dotAdded = false;
            }
        }
    }
    document.getElementsByClassName("clear")[0].onclick = function() {
        if (!poweredOn) {
            poweredOn = true;
            screen.innerHTML = 0;
        } else
        if (!err) {
            screen.innerHTML = 0;
        }
    }
    document.getElementsByClassName("clear-everything")[0].onclick = function() {
        if (poweredOn) {
            mrcClicked = false;
            screen.innerHTML = 0;
            result = null, first = null, second = null, dotAdded = false, task = null, err = false, screenCleared = false, firstSolve = true, memory = 0, mrcClicked = false;
        }
    }
    document.getElementsByClassName("memplus")[0].onclick = function() {
        if (poweredOn) {
            if (!err) {
                memory += parseFloat(screen.innerHTML);
                mrcClicked = false;
            }
        }
    }
    document.getElementsByClassName("memminus")[0].onclick = function() {
        if (poweredOn) {
            if (!err) {
                memory -= parseFloat(screen.innerHTML);
                mrcClicked = false;
            }
        }
    }
    document.getElementsByClassName("memrestclear")[0].onclick = function() {
        if (poweredOn) {
            if (!err) {
                screen.innerHTML = memory;
                if (mrcClicked) {
                    mrcClicked = false;
                    memory = 0;
                }
                mrcClicked = true;
            }
        }
    }
    document.getElementsByClassName("percent")[0].onclick = function() {
        if (poweredOn) {
            if (!err) {
                screen.innerHTML = parseFloat(screen.innerHTML) / 100;
                mrcClicked = false;
            }
        }
    }
});