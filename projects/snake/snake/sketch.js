//global settings

var tileSize = 70;
var mapSize = 10;
var snakeBody = [];
var snakeHead;
var points = 0;
var defaultframerate = 5;
var framerate = defaultframerate;
var chromeMode = false; //Yeah, there is plenty of RAM! Eat it all!
var directionChanged = false;
var gamestate = "play";
var fruit;

var bodyTexture;

//END - global settings

function setup() {

  createCanvas(mapSize * tileSize, mapSize * tileSize);
  background(51);
  snakeBody.push(new tail(1, 1));
  snakeBody[0].setAsHead();
  snakeHead = snakeBody[0];
  noSmooth();
  snB = loadImage("textures/bodyB.png"); //body bottom
  snU = loadImage("textures/bodyU.png"); //body up
  snL = loadImage("textures/bodyL.png"); //body left
  snR = loadImage("textures/bodyR.png"); //body right
  snX = loadImage("textures/bodyX.png"); //body corner
  frX = loadImage("textures/fruitX.png"); //fruit
  frXX = loadImage("textures/fruitXX.png"); //fruit for chrome mode
  shXX = loadImage("textures/headXX.png"); // head for chrome mode
  sbXX = loadImage("textures/bodyXX.png"); //body for chrome mode


  fruit = new fruit();
  fruit.generateNew();

}

function draw() {

  frameRate(framerate);
  background(51);
  stroke(0);
  for (var i = 0; i < snakeBody.length; i++) {
    if (snakeBody[i].isSnakeHead()) {
      switch (snakeBody[i].getDirection()) {
        case "right":
          snakeBody[i].move(1, 0);
          break;
        case "left":
          snakeBody[i].move(-1, 0);
          break;
        case "up":
          snakeBody[i].move(0, -1);
          break;
        case "bottom":
          snakeBody[i].move(0, 1);
          break;
      }

      if (snakeHead.getX() < 0) snakeHead.x = mapSize - 1;
      if (snakeHead.getX() >= mapSize) snakeHead.x = 0;
      if (snakeHead.getY() < 0) snakeHead.y = mapSize - 1;
      if (snakeHead.getY() >= mapSize) snakeHead.y = 0;

      for (var j = i + 1; j < snakeBody.length; j++) {
        if (snakeBody[i].getX() == snakeBody[j].getX() && snakeBody[i].getY() == snakeBody[j].getY()) newGame();
      }

    } else {
      if (snakeBody[i - 1].getX() != snakeBody[i].getX() && snakeBody[i - 1].getY() != snakeBody[i].getY()) snakeBody[i].tdir = true;
      else snakeBody[i].tdir = false;
      snakeBody[i].moveTail(snakeBody[i - 1])
    };
  }

  fruit.show();

  for (var i = 0; i < snakeBody.length; i++) {
    snakeBody[i].show();
  }

  if ((snakeHead.getX() == fruit.getX()) && (snakeHead.getY() == fruit.getY())) {
    if (chromeMode)
      points += 8;
    else
      points += 10;
    fruit.generateNew();

    snakeBody.push(new tail(snakeBody[snakeBody.length - 1].getLastX(), snakeBody[snakeBody.length - 1].getLastY()));
  }
  stroke(0);
  textSize(32);
  fill(255, 15, 15);
  if (chromeMode)
    if (points < 1024) text('RAM usage: ' + points + " MB", 10, 30);
    else text('RAM usage: ' + points / 1024 + " GB", 10, 30);
  else text('Points: ' + points, 10, 30);

  directionChanged = false;

}

function newGame() {
  snakeBody = [];
  snakeBody.push(new tail(1, 1));
  snakeBody[0].setAsHead();
  snakeHead = snakeBody[0];
  points = 0;
  framerate = defaultframerate;
  fruit.generateNew();
}

function tail(x, y) {

  this.x = x;
  this.y = y;

  this.head = false;

  this.tdir = false;

  this.dir = null;

  this.lastX;
  this.lastY;


  this.show = function () {
    // fill(255);
    // rect(this.x * tileSize, this.y * tileSize, tileSize, tileSize);
    if (chromeMode) {
      if (this.isSnakeHead()) image(shXX, this.x * tileSize, this.y * tileSize, tileSize, tileSize);
      else image(sbXX, this.x * tileSize, this.y * tileSize, tileSize, tileSize);
    } else {
      if (this.tdir) image(snX, this.x * tileSize, this.y * tileSize, tileSize, tileSize);
      else if (this.x < this.lastX && this.y == this.lastY) image(snL, this.x * tileSize, this.y * tileSize, tileSize, tileSize);
      else if (this.x > this.lastX && this.y == this.lastY) image(snR, this.x * tileSize, this.y * tileSize, tileSize, tileSize);
      else if (this.y > this.lastY && this.x == this.lastX) image(snB, this.x * tileSize, this.y * tileSize, tileSize, tileSize);
      else if (this.y < this.lastY && this.x == this.lastX) image(snU, this.x * tileSize, this.y * tileSize, tileSize, tileSize);
    }

  }

  this.setLastCoordinates = function () {

    this.lastX = this.x;
    this.lastY = this.y;

  }

  this.moveTail = function (prevTail) {

    this.setLastCoordinates();

    this.x = prevTail.lastX;
    this.y = prevTail.lastY;

  }

  this.move = function (x, y) {

    this.setLastCoordinates();

    this.x += x;
    this.y += y;

  }

  this.getX = function () {
    return this.x;

  }

  this.getY = function () {

    return this.y;
  }

  this.getLastX = function () {
    return this.lastX;

  }

  this.getLastY = function () {

    return this.lastY;
  }

  this.isSnakeHead = function () {
    return this.head;
  }

  this.setAsHead = function () {

    this.head = true;
  }

  this.getDirection = function () {

    return this.dir;

  }

  this.setDirection = function (dir) {
    this.dir = dir;

  }
}

function fruit() {


  this.x;
  this.y;

  this.getX = function () {
    return this.x;

  }

  this.getY = function () {

    return this.y;
  }

  this.generateNew = function () {

    this.x = Math.floor(Math.random() * mapSize);
    this.y = Math.floor(Math.random() * mapSize);
    console.log("New fruit generated!");

  }

  this.show = function () {
    //fill(255, 0, 0);
    //rect(this.x * tileSize, this.y * tileSize, tileSize, tileSize);
    if (chromeMode)
      image(frXX, this.x * tileSize, this.y * tileSize, tileSize, tileSize);
    else image(frX, this.x * tileSize, this.y * tileSize, tileSize, tileSize);

  }

}

function changeSpeed(val) {

  framerate += val;

  frameRate(framerate);

}

function keyReleased() {
  if (!directionChanged)
    switch (keyCode) {

      case 37:
        if (snakeHead.getDirection() != "right") snakeHead.setDirection("left");
        directionChanged = true;
        break;
      case 39:
        if (snakeHead.getDirection() != "left") snakeHead.setDirection("right");
        directionChanged = true;
        break;
      case 38:
        if (snakeHead.getDirection() != "bottom") snakeHead.setDirection("up");
        directionChanged = true;
        break;
      case 40:
        if (snakeHead.getDirection() != "up") snakeHead.setDirection("bottom");
        directionChanged = true;
        break;
      case 107:
        changeSpeed(1);
        break;
      case 109:
        changeSpeed(-1);
        break;
    }

}
