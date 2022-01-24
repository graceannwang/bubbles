/* global background, createCanvas, windowWidth, windowHeight, colorMode, HSB, color, fill, stroke,
mouseX, mouseY, mouseIsPressed, frameRate,
ellipse,
key,
random,

*/


/*version 0.2: improved simulation by starting off with bigger bubbles,
added ombre blue background,
add color to bubbles,
added bubble x offset upon generation
*/

let bubbleArray = [];
let timer;

//color stuff
let bgCol = 0;
let bgHue = 230;
let bgBrightness = 41;
let colIncrement = 0.1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 1);
  
  timer = new Timer();

}

function draw() {
  //colors
  bgCol  = color(bgHue, 100, bgBrightness, 1);
  background(bgCol);  
  if(bgBrightness >= 70) {
    colIncrement *= -1;
  } else if (bgBrightness <= 40) {
    colIncrement *= -1;
  }
  bgBrightness += colIncrement;
  
  //bubbles
  checkMousePressed();
  bubbles();
  
  //timer
  timer.update();
}

//bubble functions and classes-------------------------------------
function bubbles() {
  for(let i = 0; i < bubbleArray.length; i++) {
    let currBubble = bubbleArray[i];
    currBubble.update();
    currBubble.draw();
    if(currBubble.y < 0) {
      bubbleArray.splice(i, 1);
      i--;
    }
  }
}

class Bubble {
  constructor(x, y, diameter) {
    this.x = x;
    this.y = y;
    this.maxDiameter = 55;
    if(diameter > this.maxDiameter) {
      this.diameter = this.maxDiameter;
    } else {
      this.diameter = diameter;
    }
    
    this.dy = 6 - this.diameter/10;    
    
  }
  
  draw() {
    let bubbleFillCol = color(bgHue - 15, 100, 100, 0.7);
    let bubbleStrokeCol = color(bgHue - 15, 100, 60, 1);
    fill(bubbleFillCol);
    stroke(bubbleStrokeCol);
    ellipse(this.x, this.y, this.diameter);
  }
  
  update() {
    this.y -= this.dy;
  }  
  
}

function generateRandomDiameter(frames) {
  
  if(frames < 50) {
    return random(25, 44);
  } else if (frames < 100) {
    return random(20, 27);
  } else {
    return random(12, 25);
  }
  
}

//mouse interactivity-----------------------------------------------
function mousePressed() {
  timer.reset();
}

function checkMousePressed() {
let intervalMet = timer.frames(8);
  
  if(mouseIsPressed && intervalMet) {
    let randomD = generateRandomDiameter(timer.frameCounter);
    let randomXOffset = random(-22, 11);
    let newBubble = new Bubble(mouseX+randomXOffset, mouseY, randomD);
    bubbleArray.push(newBubble);
   
  }
  
}

//timer------------------------------------------------------------
class Timer {
  constructor() {
    this.frameCounter = 0;
  }
  
  update() {
    if(this.frameCounter === 600) {
      this.frameCounter = 0;
    } else {
      this.frameCounter++;
    }
  }
  
  reset() {
    this.frameCounter = 0;
  }
  
  frames(fr) {
    if(this.frameCounter%fr === 0) return true;
    return false;
  }
  
  
}

//testing
function keyPressed() {
  if(key === 'q') {
    // console.log(tBubble40.dy);
    // timer.reset();
    console.log(bubbleArray.length);
  }
  
}
