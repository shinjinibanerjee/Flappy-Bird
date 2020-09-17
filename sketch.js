var bird,background,bImage;
var obstacleUp, obstacleDown,obstacleGroup;
var edges;
var score=0,highscore=0;
var gs,fc=0;

function preload(){
 //load your images here 
 bImage=loadImage("background0.png");
 
}

function setup() {
  createCanvas(600, 600);
  
  background=createSprite(0,0,600,600);  
  background.addImage(bImage);
  background.x=background.width/2;
  background.scale=3;
  
  //add code here
  bird=createSprite(30,300,30,30);
  bird.shapeColor=rgb(255, 217, 28);
  //bird.debug=true;
  
  
  obstacleGroup=new Group();
  
  edges=createEdgeSprites();
  
  gs=1;
}

function draw() {
  
  fill("black");
  
  if(gs===1){
    fc++;
  bird.visible=true;
  score=score+Math.round(fc/100);
  
  background.velocityX=-5;
  
  if(background.x<0){
    background.x=background.width/2;
  }
  
  if(keyDown("space")){
    bird.velocityY=-5;
  }
  
  bird.velocityY+=0.8;
  spawnObstacles(); 
  
     if(bird.isTouching(obstacleGroup)){
       gs=0;
     }
  
    
  }
  
  bird.bounceOff(edges[2]);
  bird.bounceOff(edges[3]); 
  
 
  
  
  //add code here
  drawSprites();
  
  if(gs===1){
    textSize(25);
  text("Score: "+score,430,50);
  }
  
 if(gs===0){
    obstacleGroup.destroyEach();
    background.setVelocity(0,0);
    bird.visible=false;
    textSize(50);
    text("Game Over!",170,250);
   textSize(30);
   text("Score: "+score,230,300);
   if(score>highscore)
     highscore=score;
   text("Highscore: "+highscore,200,350);
   text("Press R to restart...",190,400);
   
  
  }
  
   if(keyDown("r") && gs===0){
     gs=1;
     score=0;
     bird.x=30;
     bird.y=300;
     fc=0;
   }

  
  
  
}

function spawnObstacles(){
  
  if(frameCount%40===0)
  {
    
    obstacleUp=createSprite(600,100,20,260);
    obstacleDown=createSprite(600,500,20,260);
    
    var height1=Math.round(random(230,270));
    var height2=Math.round(random(230,270));
    
    obstacleUp.height=height1;
    obstacleUp.y=height1/2;
    
    obstacleDown.height=height2;
    obstacleDown.y=600-(height2/2);
    
    obstacleUp.velocityX=-5;
    obstacleDown.velocityX=-5;
    
    obstacleUp.shapeColor=rgb(196, 26, 119);
    obstacleDown.shapeColor=rgb(196, 26, 119);
    
    obstacleGroup.add(obstacleUp);
    obstacleGroup.add(obstacleDown);
    
    obstacleUp.lifetime=130;
    obstacleDown.lifetime=130;
  }
}
