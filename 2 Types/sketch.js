var canvas;
var myVar = setInterval(myTimer, 1);

var speed1=1;
var mass1=20;
var numberOfBalls1=10;

var speed2=1;
var mass2=20;
var numberOfBalls2=10;


var position;
var velocity;
var mass = [0];
var temp1;
var temp2;
var Elastic = 1;

var Area;
var Density;
var Pressure;
var Temperature;

function myTimer() {
  Area =  windowWidth * (windowHeight-110);
  Density = 0;
  Temperature = 0;
  for(var s = 0; s<numberOfBalls1+numberOfBalls2; s++){
    Density += mass[s] / Area;
    Temperature += 0.5 * mass[s] / (numberOfBalls1+numberOfBalls2) * velocity[s].mag() * velocity[s].mag();
  }
  Pressure = (numberOfBalls1+numberOfBalls2) * Temperature / Area;

  document.getElementById("Area").innerHTML = "Area: "+ Area;
  document.getElementById("Density").innerHTML = "Density: "+ round(Density, 6);
  document.getElementById("Temperature").innerHTML = "Temperature: "+ round(Temperature, 2);
  document.getElementById("Pressure").innerHTML = "Pressure: "+ round(Pressure, 6);
}

function windowResized(){resizeCanvas(windowWidth, windowHeight-160); }

function setup() {
  canvas = createCanvas(windowWidth, windowHeight-160);
  canvas.position(0,100);
  canvas.style("z-index", "-1");
  Reset();
}

function draw() {
  background(0);
  fill(0, 0, 250);
  move();
}

function move(){
  for(var k = 0; k<numberOfBalls1+numberOfBalls2; k=k+1){
    ellipse(position[k].x, position[k].y, mass[k], mass[k]);
    if(position[k].y>=height){
      velocity[k].y*=-1;
      position[k] = createVector(position[k].x, height-mass[k]/2-1);
    }
    if(position[k].y<=mass[k]/2){
      velocity[k].y*=-1;
      position[k] = createVector(position[k].x, mass[k]/2+1);
    }
    if(position[k].x<=mass[k]/2){
      velocity[k].x*=-1;
      position[k] = createVector(mass[k]/2+1, position[k].y);
    }
    if(position[k].x>=width){
      velocity[k].x*=-1;
      position[k] = createVector(width-mass[k]/2-1, position[k].y);
    }
      for(var j = 0; j<numberOfBalls1+numberOfBalls2; j=j+1){
        if(j!=k && mass[k]/2+mass[j]/2 >= sqrt(abs(sq(position[k].y-position[j].y)) + abs(sq(position[k].x-position[j].x)) ) ){
            temp1 = velocity[k];
            temp2 = velocity[j];
            

            velocity[k].x = /*(mass[j]*(temp2.x-temp1.x)+mass[k]*temp1.x +mass[j]*temp2.x)/(mass[k]+mass[j]) */( (mass[k]-mass[j])/(mass[k]+mass[j])*temp1.x + (2*mass[j])/(mass[k]+mass[j])*temp2.x)*(1-Elastic) + quadratic( (mass[k]+sq(mass[k]) )/mass[j], -(2*mass[k]/mass[j]) * (mass[k]*temp1.x +mass[j]*temp2.x ), (sq(mass[k]*temp1.x +mass[j]*temp2.x )-(mass[k]*sq(temp1.x) +mass[j]*sq(temp2.x) ))/mass[j] )*Elastic;
            velocity[k].y = /*(mass[j]*(temp2.y-temp1.y)+mass[k]*temp1.y +mass[j]*temp2.y)/(mass[k]+mass[j]) */( (mass[k]-mass[j])/(mass[k]+mass[j])*temp1.y + (2*mass[j])/(mass[k]+mass[j])*temp2.y)*(1-Elastic) + quadratic( (mass[k]+sq(mass[k]) )/mass[j], -(2*mass[k]/mass[j]) * (mass[k]*temp1.y +mass[j]*temp2.y ), (sq(mass[k]*temp1.y +mass[j]*temp2.y )-(mass[k]*sq(temp1.y) +mass[j]*sq(temp2.y) ))/mass[j] )*Elastic;
            velocity[j].x = /*(mass[k]*(temp1.x-temp2.x)+mass[k]*temp1.x +mass[j]*temp2.x)/(mass[k]+mass[j]) */( (mass[k]-mass[j])/(mass[k]+mass[j])*temp2.x + (2*mass[j])/(mass[k]+mass[j])*temp1.x)*(1-Elastic) + quadratic( (mass[j]+sq(mass[j]) )/mass[k], -(2*mass[j]/mass[k]) * (mass[j]*temp1.x +mass[k]*temp2.x ), (sq(mass[j]*temp1.x +mass[k]*temp2.x )-(mass[j]*sq(temp1.x) +mass[k]*sq(temp2.x) ))/mass[k] )*Elastic;
            velocity[j].y = /*(mass[k]*(temp1.y-temp2.y)+mass[k]*temp1.x +mass[j]*temp2.x)/(mass[k]+mass[j]) */( (mass[k]-mass[j])/(mass[k]+mass[j])*temp2.y + (2*mass[j])/(mass[k]+mass[j])*temp1.y)*(1-Elastic) + quadratic( (mass[j]+sq(mass[j]) )/mass[k], -(2*mass[j]/mass[k]) * (mass[j]*temp1.y +mass[k]*temp2.y ), (sq(mass[j]*temp1.y +mass[k]*temp2.y )-(mass[j]*sq(temp1.y) +mass[k]*sq(temp2.y) ))/mass[k] )*Elastic;

            position[k].add(velocity[k]);
            position[j].add(velocity[j]);  
            j=numberOfBalls1+numberOfBalls2;
        }
      }
    position[k].add(velocity[k]);
  }
}

function quadratic(a, b, c){
  var x1;
  var x2;

  if(a==0){
    return -c / b;
  }
  console.log(b*b-4*a*c);
  if( (b*b-4*a*c) < 0){
    return 0;//-b/(2*a);
  }

  x1 = (-b+sqrt(b*b-4*a*c) ) / (2*a);
  x2 = (-b-sqrt(b*b-4*a*c) ) / (2*a);

  if(abs(x1) < abs(x2)){
    return x1;
  }
  if(abs(x2) < abs(x1)){
    return x2;
  }
  if( random(-1, 1) > 0){
    return x1;
  }
  return x2;
}

function Reset(){
  position = [createVector(0, 0)];
  velocity = [createVector(0, 0)];
  mass = [0];
  for(var i = 0; i < numberOfBalls1; i=i+1){
    position[i] = createVector(random(width), random(height));
    velocity[i] = createVector(random(-1, 1), random(-1, 1));
    velocity[i].mult(speed1);
    mass[i] = mass1;
  }
  for(var i = numberOfBalls1; i < numberOfBalls1+numberOfBalls2; i=i+1){
    position[i] = createVector(random(width), random(height));
    velocity[i] = createVector(random(-1, 1), random(-1, 1));
    velocity[i].mult(speed2);
    mass[i] = mass2;
  }
}
function Go1(){
  speed1 = int(document.getElementById("speed1").value);
  numberOfBalls1 = int(document.getElementById("numberOfBalls1").value);
  mass1 = int(document.getElementById("mass1").value);
  Elastic = int(document.getElementById("Elastic").value/100);
  Reset();
}

function Go2(){
  speed2 = int(document.getElementById("speed2").value);
  numberOfBalls2 = int(document.getElementById("numberOfBalls2").value);
  mass2 = int(document.getElementById("mass2").value);
  Reset();
}