let ellipses = [];
let textFill = [];
let stage = 0;
let samsara = false;
let strokeValue = 1;
let start1;
let start2;
let start3;
let start4;
let start5;
let count1 = 0;
let indicator1 = 0;
let previousCount1 = 0;
let count2 = 0;
let count4 = 0;
let previousCount4 = 0;
let osc;
let sound = false;
let soundType = 0;
let refreshCount = 0;
let samsaraCount = 0;
// let rangeCount = 0;
let finalCount = 0;
let biggerRect = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  rectMode(CENTER);

  osc = new p5.Oscillator();
  osc.setType('sine');
  osc.freq(250);
  osc.amp(0);
  osc.start();
  for (let i = 0; i < 12; i++) {
    textFill.push(150);
  }
}

function draw() {
  background(230);
  textFont('Baloo');
  if (soundType == 0) {
    osc.freq(250);
  }else if (soundType == 1) {
    osc.freq(100);
  }else if (soundType == 2) {
    osc.freq(150);
  }else if (soundType == 3) {
    osc.freq(200);
  }else if (soundType > 3) {
    soundType = 0;
  }
  if (stage == 0) {
    stage0();
  }else if (stage == 1){
    stage1();
  }else if (stage == 2){
    stage2();
  }else if (stage == 3){
    stage3();
  }else if (stage == 4){
    stage4();
  }else if (stage == 5){
    stage5();
  }else if (stage == 6){
    samsara1();
  }
  if (samsara) {
    reset();
  }
}

function reset() {
  ellipses = [];
  stage = 1;
  samsara = false;
  frameCount = 0;
  start1 = frameCount;
  start2 = 0;
  start3 = 0;
  start4 = 0;
  start5 = 0;
  for (let i = 0; i < 12; i++) {
    textFill[i] = 150;
  }
  count1 = 0;
  indicator1 = 0;
  previousCount1 = 0;
  count2 = 0;
  count4 = 0;
  previousCount4 = 0;
  sound = false;
  soundType = 0;
  refreshCount = 0;
  samsaraCount = 0;
  // rangeCount = 0;
  finalCount = 0;
  biggerRect = 0;
  osc.freq(250);
}

function stage0() {
  background(230);
  textSize(100);
  fill(textFill[0]);
  textFill[0] -= 1;
  textAlign(CENTER);
  text("SPIN | TRACE | DECORATION", windowWidth/2, windowHeight/2 - 50);
  textSize(50);
  text("keyPress to start", windowWidth/2, windowHeight/2 + 150)
}

function stage1() {
  if (frameCount <= (start1 + 200)){
    textSize(100);
    fill(textFill[0]);
    if (textFill[0] <= 230) {
      textFill[0] += 2.3;
    }
    textAlign(CENTER);
    text("SPIN | TRACE | DECORATION", windowWidth/2, windowHeight/2 - 50);
  }else if ( (start1 + 200) <= frameCount && frameCount <= (start1 + 400)){
    drawRect();
    text1("First, spin the cubes", 1);
    textFill[1] -= 1;
  }else{
    drawRect();
    detectStage1();
    if ((start1 + 900) <= frameCount && frameCount <= (start1 + 1100)) {
      text1("Try to speed it up", 2);
      textFill[2] -= 1;
    }
  }
}

function detectStage1() {
  //base on the speed of spining (how many time your cursor pass the middleline for every 100 frameCount)
  if (indicator1 == 0 && abs(mouseX - windowWidth/2) <= 100) { //every time you pass the middleline
    count1 ++;
    indicator1 = 1; //prevent the counter constantly ++ when the cursor is near to the middleline
  }else if (indicator1 == 1 && abs(mouseX - windowWidth/2) >= 100) {
    indicator1 = 0; //reset the indicator
  }
  if (frameCount%100 == 0) { //every 100 frameCount
    if (count1 - previousCount1 >= 7) { //achieve the speed (the cursor past the middleline more than 5 times in 100 frameCount)
      stage ++; //go to next stage
      start2 = frameCount;
    }else{
      previousCount1 = count1; //refresh the previousCount (if didn't achieve the speed, prepare for the next comparision)
    }
  }
}

function stage2() {
  drawEllipse();
  drawRect();
  if (frameCount <= (start2 + 200)) {
    text1("Trace your track", 3);
    textFill[3] -= 1;
  }else{
    detectStage2();
    if ((start2 + 700) <= frameCount && frameCount <= (start2 + 900)) {
      text1("Try to move more distance", 4);
      textFill[4] -= 1;
    }
  }
}

function detectStage2() {
  //base on the distance you past
  count2 += abs((mouseX-pmouseX) + (mouseY-pmouseY)); //the counter becomes larger while the distance of cursor becomes larger.
  if (count2 >= 40000) {
    stage ++;
    start3 = frameCount;
  }
}

function stage3() {
  if (frameCount <= (start3 + 300)) {
    for (let i = 0; i < ellipses.length; i++) {
      stroke(abs(mouseX - pmouseX) + abs(mouseY - pmouseY));
      ellipses[i].update();
      ellipses[i].display();
    }
    drawRect();
    text1("Your past has become your decoration", 5);
    textFill[5] -= 1;
  }else{
    drawEllipse();
    drawRect();
    if ((start3 + 700) <= frameCount && frameCount <= (start3 + 900)) {
      text1("Hey, keyPress to make it cooler", 6);
      textFill[6] -= 1;
    }
  }
}

function stage4() {
  ellipses.push(new Ellipse());
  for (let i = 0; i < ellipses.length; i++) {
    ellipses[i].update();
    ellipses[i].stageDown();
    ellipses[i].display();
  }
  if (biggerRect > 0) {
    biggerRect -= 10;
  }
  drawRect();
  if (frameCount <= (start4 + 200)) {
    text1("That's it!", 7);
    textFill[7] -= 1;
  }
  if ((start4 + 400) <= frameCount && frameCount <= (start4 + 500)) {
    text1("Want some sound?", 8);
    textFill[8] -= 1;
  }
  if ((start4 + 700) <= frameCount && frameCount <= (start4 + 800)) {
    text1("Let's GO CRAZYYY", 9);
    textFill[9] -= 1;
  }
  if ((start4 + 400) <= frameCount) {
    sound = true; // activate the sound
  }
  if ((start4 + 700) <= frameCount) {
    if (frameCount%50 == 0) {
      if (count4 - previousCount4 >= 20) {
        stage ++;
        start5 = frameCount;
      }else{
        previousCount4 = count4;
      }
    }
  }
}

function stage5() {
  ellipses.push(new Ellipse());
  for (let i = 0; i < ellipses.length; i++) {
    ellipses[i].update();
    ellipses[i].stageDown();
    ellipses[i].display2();
  }
  if (biggerRect > 0) {
    biggerRect -= 10;
  }
  drawRect();
  if (frameCount <= (start5 + 200)) {
    text1("Boom!!!!!", 10);
    textFill[10] -= 1;
  }
  // if (frameCount >= (start5 + 300)) {
  //   rangeCount = 0;
  //   for (let i = 0; i < ellipses.length; i++) {
  //     ellipses[i].countRange();
  //   }
  //   if (rangeCount >= 160) {
  //     finalCount ++;
  //     if (finalCount >= 90) {
  //       samsaraCount = frameCount;
  //       stage ++;
  //     }
  //   }
  //   if (frameCount%100 == 0) {
  //     finalCount = 0;
  //   }
  // }
}

function samsara1() {
  if (frameCount <= (samsaraCount + 200)) {
    text1("Oops, that's too much", 11);
    textFill[11] -= 1;
  }else{
    samsara = true;
  }
}

function keyPressed() {
  if (stage == 0) {
    stage ++;
    start1 = frameCount;
  }
  if (stage == 3) {
    stage ++;
    start4 = frameCount;
  }
  if (stage == 4) {
    for (let i = 0; i < ellipses.length; i++) {
      ellipses[i].stage4();
    }
    biggerRect = 200;
  }
  if (stage == 5) {
    for (let i = 0; i < ellipses.length; i++) {
      ellipses[i].stage5();
    }
    biggerRect = 200;
    if (frameCount >= (start5 + 300)) {
      finalCount ++;
    }
    if (finalCount >= 100) {
      samsaraCount = frameCount;
      stage ++;
    }
  }
  if (sound) {
    osc.amp(0.5, 0);
    osc.fade(0, 0.1);
    if (stage == 5) {
      soundType ++;
    }
  }
}

function keyReleased() {
  if (stage == 4 && (start4 + 700) <= frameCount) {
    count4 ++;
  }
  finalCount = 0;
}

function drawEllipse() {
  ellipses.push(new Ellipse());
  for (let i = 0; i < ellipses.length; i++) {
    ellipses[i].update();
    ellipses[i].display();
  }
}

function drawRect() {
  noStroke();
  if (mouseY <= windowHeight/2) {
    fill(254,165,255,200);
    rect(mouseX, height / 2, mouseY / 2 + biggerRect, mouseY / 2 + biggerRect);
    fill(255,0,244,200);
    let inverseX = width - mouseX;
    let inverseY = height - mouseY;
    rect(inverseX, height / 2, inverseY / 2 + biggerRect, inverseY / 2 + biggerRect);

  }else{
    fill(255,0,244,200);
    let inverseX = width - mouseX;
    let inverseY = height - mouseY;
    rect(inverseX, height / 2, inverseY / 2 + biggerRect, inverseY / 2 + biggerRect);
    fill(254,165,255,200);
    rect(mouseX, height / 2, mouseY / 2 + biggerRect, mouseY / 2 + biggerRect);
  }
}

function text1(text1, i) {
  textSize(50);
  stroke(254,165,255,200);
  strokeWeight(5);
  fill(textFill[i]);
  textAlign(CENTER);
  text(text1, windowWidth/2, windowHeight/2);
}

class Ellipse {

  constructor() {
    this.lifespan = 255;
    this.x = mouseX;
    this.y = mouseY;
    this.px = pmouseX;
    this.py = pmouseY;
    this.moveSpeedX = (this.x - this.px)*0.05;
    this.moveSpeedY = (this.y - this.py)*0.05;
    this.speed = abs(this.x - this.px) + abs(this.y - this.py);
    this.speedPlus = this.speed
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
    if (abs(mouseX - pmouseX) + abs(mouseY - pmouseY) != 0) {
      if (abs(mouseX - pmouseX) + abs(mouseY - pmouseY) >= 200) {
        strokeValue = 200;
      }else{
        strokeValue = abs(mouseX - pmouseX) + abs(mouseY - pmouseY);
      }
      refreshCount = frameCount;
    }else if (strokeValue < 230) {
      if (frameCount >= refreshCount + 2000) {
        strokeValue += 1;
      }else{
        strokeValue = 0;
      }
    }else{
      samsara = true;
    }
    stroke(strokeValue);
  }

  update() {
    this.moveSpeedX*=0.99;
    this.moveSpeedY*=0.99;
    this.x += this.moveSpeedX;
    this.y += this.moveSpeedY;
    if (stage == 3 || stage == 4) {
      this.lifespan --;
    }
    if (stage == 5) {
      this.lifespan -= 2;
    }
  }

  stage4() {
    this.speed = this.speedPlus + 50;
  }

  stage5() {
    this.speed += 50;
  }

  stageDown() {
    if (this.speed >= this.speedPlus) {
      this.speed -= 2;
    }
  }

  display() {
    fill(0, this.lifespan/2);
    if (ellipses.length >= 1000) {
      ellipses.splice(0, 1);
    }
    if (this.px != 0 || this.py != 0) {
      ellipse(this.x, this.y, this.speed, this.speed);
      for (let i = 0; i < ellipses.length; i++) {
        if (0 - ellipses[i].speed >= ellipses[i].x
          || ellipses[i].x >= windowWidth + ellipses[i].speed
          || 0 - ellipses[i].speed >= ellipses[i].y
          || ellipses[i].y >= windowHeight + ellipses[i].speed) {
          ellipses.splice(i, 1); // delete the ellipses that are already out of range
        }
      }
    }
  }

  display2() {
    fill(0, this.g, this.b, this.lifespan/2);
    if (ellipses.length >= 50) {
      ellipses.splice(0, 1);
    }
    if (this.px != 0 || this.py != 0) {
      ellipse(this.x, this.y, this.speed, this.speed);
    }
  }

  // countRange() {
  //   if (this.speed >= windowWidth/2) {
  //     rangeCount ++;
  //   }
  // }

}

// Reference:
// [rect] https://p5js.org/examples/input-mouse-2d.html
// [pattern] https://p5js.org/examples/drawing-patterns.html
// [acceleration] https://p5js.org/examples/hello-p5-drawing.html
// [oscillator] https://p5js.org/examples/hello-p5-song.html
