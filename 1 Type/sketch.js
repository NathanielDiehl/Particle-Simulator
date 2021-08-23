var canvas;
var myVar = setInterval(myTimer, 1);

var speed = 9;
var position;
var velocity;
var numberOfBalls = 30;
var mass = 10;
var temp;
var Elastic = 1;

var Area;
var Density;
var Pressure;
var Temperature;
function myTimer() {
  Area =  windowWidth * (windowHeight-110);
  Density = numberOfBalls * mass / Area;
  Temperature = 0;
  for(var s = 0; s<numberOfBalls; s++){
    Temperature += 0.5 * mass / numberOfBalls * velocity[s].mag() * velocity[s].mag();
  }
  Pressure = numberOfBalls * Temperature / Area;

  document.getElementById("Area").innerHTML = "Area: "+ Area; //Math.round();
  document.getElementById("Density").innerHTML = "Density: "+ round(Density, 6);
  document.getElementById("Temperature").innerHTML = "Temperature: "+ round(Temperature, 2);
  document.getElementById("Pressure").innerHTML = "Pressure: "+ round(Pressure, 6);
}

function windowResized(){resizeCanvas(windowWidth, windowHeight-110); }
function setup() {
  canvas = createCanvas(windowWidth, windowHeight-110);
  canvas.position(0,50);
  canvas.style("z-index", "-1");

  Reset();
}

function draw() {
  background(0);
  fill(0, 0, 250);
  move();
}

function move(){
  for(var k = 0; k<numberOfBalls; k=k+1){
    ellipse(position[k].x, position[k].y, mass, mass);
    if(position[k].y>=height){
      velocity[k].y*=-1;
      position[k] = createVector(position[k].x, height-mass/2-1);
    }
    if(position[k].y<=mass/2){
      velocity[k].y*=-1;
      position[k] = createVector(position[k].x, mass/2+1);
    }
    if(position[k].x<=mass/2){
      velocity[k].x*=-1;
      position[k] = createVector(mass/2+1, position[k].y);
    }
    if(position[k].x>=width){
      velocity[k].x*=-1;
      position[k] = createVector(width-mass/2-1, position[k].y);
    }
      for(var j = 0; j<numberOfBalls; j=j+1){
        if(j!=k && mass >= sqrt(abs(sq(position[k].y-position[j].y)) + abs(sq(position[k].x-position[j].x)) ) ){
            temp = velocity[k];
            velocity[k].x = velocity[j].x*Elastic + (velocity[j].x+temp.x)/2*(1-Elastic);
            velocity[k].y = velocity[j].y*Elastic + (velocity[j].y+temp.y)/2*(1-Elastic);
            velocity[j].x = temp.x*Elastic + (velocity[j].x+temp.x)/2*(1-Elastic);
            velocity[j].y = temp.y*Elastic + (velocity[j].y+temp.y)/2*(1-Elastic);

            position[k].add(velocity[k]);
            position[j].add(velocity[j]);  
            j=numberOfBalls;
        }
      }
    position[k].add(velocity[k]);
  }
}

function Reset(){
  position = [createVector(0, 0)];
  velocity = [createVector(0, 0)];
  for(var i = 0; i < numberOfBalls; i=i+1){
    position[i] = createVector(random(width), random(height));
    velocity[i] = createVector(random(-1, 1), random(-1, 1));
    velocity[i].mult(speed);
  }
}
function Go(){
  speed = document.getElementById("speed").value;
  numberOfBalls = document.getElementById("numberOfBalls").value;
  mass = document.getElementById("mass").value;
  Elastic = document.getElementById("Elastic").value/100;
}