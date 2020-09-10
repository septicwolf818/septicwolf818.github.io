let numbers = [] //numbers to sort
let barWidth = undefined //width of one of the visualization bars
let count = 36; //numbers count
let direction = -1; //sorting direction



function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    barWidth = (width / count); //calculate bar width

    for (var i = 0; i < count; i++) { //generate random numbers
        numbers.push(Math.random() * 100);
    }

    let m = max(numbers);
    for (var i = 0; i < numbers.length; i++) { //map numbers to screen height
        numbers[i] = map(numbers[i], 0, m, 0, height);
    }

    //variables for bubble sort
    x = 0;
    y = numbers.length;

    colorMode(HSB); //color mode for rainbow effect
    frameRate(60); //animation speed
}

function draw() {
    background(0, 0, 0); //black background in HSB mode
    noStroke(); //remove border from bars
    for (var i = 0; i < numbers.length; i++) { //draw bars on screen
        fill(map(numbers[i], 0, height, 0, 360), 100, 100); //set bar's color using its value
        rect((i * barWidth), height - numbers[i], barWidth, numbers[i]); //draw bar on screen
    }


    // BUBBLE SORT

    // > from the smallest to the biggest
    // < from the biggest to the smallest

    if (direction == -1)
        if (numbers[x] < numbers[x + 1]) {
            var temp = numbers[x];
            numbers[x] = numbers[x + 1];
            numbers[x + 1] = temp;
        }
    if (direction == 1)
        if (numbers[x] > numbers[x + 1]) {
            var temp = numbers[x];
            numbers[x] = numbers[x + 1];
            numbers[x + 1] = temp;
        }
    x++;
    if (x > y) {
        x = 0;
        y--;
    }

    if (x == 0 && y == 0) {
        count = parseInt(Math.random() * 34) + 2;
        barWidth = (width / count); //calculate new bar width
        numbers = [];
        direction *= -1;
        for (var i = 0; i < count; i++) { //generate random numbers
            numbers.push(Math.random() * 100);
        }

        for (var i = 0; i < numbers.length; i++) { //map numbers to screen height
            numbers[i] = parseInt(map(numbers[i], 0, 100, 0, height));
        }

        //variables for bubble sort
        x = 0;
        y = numbers.length;
    }




}