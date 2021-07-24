// setup canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

function Shape (x, y, velX, velY,exists) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists = exists;
   
  }
  function EvilCircle(x,y,velX,velY,exists){
    Shape.call(this,x,y,20,20,exists);
    this.size = 10;
    this.color = 'white';
  }
  EvilCircle.prototype = Object.create(Shape);
  EvilCircle.prototype.constructor = EvilCircle;
  EvilCircle.prototype.draw = function()
  {
    ctx.beginPath(); 
    ctx.strokeStyle = this.color; 
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); 
    ctx.stroke();
    ctx.lineWidth = 3;
  }
  EvilCircle.prototype.checkBounds = function()
  { if(this.size <= 1)
    {
      this.exists = false;
    }
    if ((this.x + this.size) >= width) {
      this.x -=5;
      this.size -=0.8;
        
      }
    
      if ((this.x - this.size) <= 0) {
        this.x +=5;
        this.size -=0.8;
      }
    
      if ((this.y + this.size) >= height) {
        this.y -=5;
        this.size -=0.8;
      }
    
      if ((this.y - this.size) <= 0) {
        this.y +=5;
        this.size -=0.8;
      }
      
  }
  EvilCircle.prototype.setControls = function()
  {
    let _this = this;
window.onkeydown = function(e) {
    if (e.key === 'a') {
      _this.x -= _this.velX;
    } else if (e.key === 'd') {
      _this.x += _this.velX;
    } else if (e.key === 'w') {
      _this.y -= _this.velY;
    } else if (e.key === 's') {
      _this.y += _this.velY;
    }
  }
  }
  EvilCircle.prototype.collisionDetect = function() {
    for (let j = 0; j < balls.length; j++) {
      if(balls[j].exists){
        const dx = this.x - balls[j].x;
        const dy = this.y - balls[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < this.size + balls[j].size) {
          balls[j].exists = false;
        }
      }
    }
  }
  
  function Ball (x, y, velX, velY,color, size,exists) {
   Shape.call(this,x,y,velX,velY,exists);
   this.color = color;
   this.size = size;
  }
  Ball.prototype = Object.create(Shape);
  Ball.prototype.constructor = Ball;
  Ball.prototype.draw = function()
  {
    ctx.beginPath(); //To state that we want to start drawing a shape to paper
    ctx.fillStyle = this.color; //define what color we want the shape to be
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); //(x,y) center size = radius, starting angle = 0 and ending angle = 360
    ctx.fill();//finish drawing that we started with beginPath and color it with fillStyle color
  }
  

  let balls = [];
  let evil = new EvilCircle(20,20,20,20,true);
while (balls.length < 25) {
  let size = random(10,20);
  let ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size,width - size),
    random(0 + size,height - size),
    random(-7,7),
    random(-7,7),
    'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    size,
    true
  );

  balls.push(ball);
}
Ball.prototype.update = function()
  { 
    if ((this.x + this.size) >= width) {
        this.velX = -(this.velX);
      }
    
      if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
      }
    
      if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
      }
    
      if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
      }
    
      this.x += this.velX;
      this.y += this.velY;
      
  }
  Ball.prototype.collisionDetect = function() {
    for (let j = 0; j < balls.length; j++) {
      if (!(this === balls[j])) {
        const dx = this.x - balls[j].x;
        const dy = this.y - balls[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < this.size + balls[j].size) {
          balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
        }
      }
    }
  }
function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, width, height);
  
    for (let i = 0; i < balls.length; i++) {
      if(balls[i].exists)
      {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
      }
    
    }

    if(evil.exists){
      evil.draw();
      evil.checkBounds();
      evil.setControls();
      evil.collisionDetect();
    }
    else{
      evil.size = 10;
      evil.exists = true;
      evil.x = 11;
      evil.y = 11;
    }

    requestAnimationFrame(loop);
    console.log('running');
  }

loop();

 /**/
    /**/

    /**/