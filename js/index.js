class Bird{
  constructor(){
    this.y = height/2;
    this.x = 75;
    this.gravity = 0.6;
    this.force = -15;
    this.speed = 0;
  }

  show(){
    background(50,150,205)

    fill(255);
    noStroke();
    ellipse(this.x, this.y, 32, 32)
  }

  update(){
    if(!gameOver){
      this.y += this.speed;
      this.speed += this.gravity;
      this.speed *= 0.9;

      if(this.y > height){
        this.y = height;
        this.speed = 0
      }

      if(this.y < 0){
        this.y = 0;
        this.speed = 0
      }
    }
  }

  up(){
    this.speed += this.force;
  }

  collisionWithScreen(){
    if(this.y >= height){
      return true;
    }
  }
}

class Pipe {
  constructor(){
    if(height <= 600){
      this.top = random(100, height/2.80);
      this.bottom = random(100, height/2.80);
    }else {
    this.top = random(240, height/2.30);
    this.bottom = random(240, height/2.30);
    }
    this.x = width;
    this.speed = 3;
    this.w = random(40,60);
    this.collided = false;
    this.rectHeight = 40;
    this.rectWidth = 20;
  }

  offscreen(){
    if(this.x < - this.w){
      return true
    }else {
      return false;
    }
  }

  update(){
    if(!gameOver){
      this.x -= this.speed;
    }
  }

  collision(bird){
    let pillWidthCalc = floor(this.rectWidth/2);

    if(bird.y < this.top+19|| bird.y > height-(this.bottom+40)){
      if(bird.x >= (this.x-pillWidthCalc) && bird.x <= (this.x+pillWidthCalc) + this.w){
        this.collided = true;
        return true
      }
    }

    this.collided = false;
    return false;
  }

  show(){
    stroke(0)
    fill(100,255,100);

    if(this.collided){
      fill(255,0,0);
    }

    //rect of top
    rect(this.x, 0, this.w, this.top);
    rect(this.x-this.rectWidth/2, this.top-this.rectHeight, this.w+this.rectWidth, this.rectHeight);

    //rect of bottom
    rect(this.x, height-this.bottom, this.w, this.bottom);
    rect(this.x-this.rectWidth/2, height-this.bottom-this.rectHeight, this.w+this.rectWidth, this.rectHeight);
  }
}

let bird, pipes = [], gameOver;

function setup(){
  createCanvas(window.innerWidth, window.innerHeight);
  bird = new Bird();
}

function draw(){
  bird.update();
  bird.show();

  //		if(bird.collisionWithScreen()){
  //			gameOver = true;
  //		}

  if(frameCount % 100 == 0){
    pipes.push(new Pipe());
  }

  for(var i=pipes.length-1;i >= 0;i--){
    pipes[i].update();
    pipes[i].show();

    if(pipes[i].collision(bird)){
      gameOver = true;
    }

    if(pipes[i].offscreen()){
      pipes.splice(i,1);
    }
  }
}

function keyPressed(){
  bird.up()
}

function mousePressed(){
    bird.up()
}