
 var swordImage, sword;
 var fruitImage1, fruitImage2, fruitImage3, fruitImage4, fruit;
 var monsterImage;
 var fruit, monster;
 var direction, position;


 var PLAY = 1;
 var END = 0;
 var gameState = PLAY;

 var score = 0;

function preload()
{
  //load images of sprites
  swordImage = loadImage("sword.png");
  fruitImage1 = loadImage("fruit1.png");
  fruitImage2 = loadImage("fruit2.png");
  fruitImage3 = loadImage("fruit3.png");
  fruitImage4 = loadImage("fruit4.png");
  monsterImage = loadAnimation("alien1.png", "alien2.png");
  gameOverImage = loadImage("gameover.png");

  //load sounds
  song1 = loadSound("knifeSwooshSound.mp3");
  song2 = loadSound("gameover.mp3");
}

function setup()
{
  createCanvas(600, 400);

  //create sword
  sword = createSprite(40, 200, 20, 20);
  sword.addImage(swordImage);
  sword.scale = 0.4;

  //create groups of fruits and enemy
  fruitGroup = new Group();
  enemyGroup = new Group();
}

function draw()
{
  if (gameState === PLAY) {
    background("lightblue");

    fill("black");
    textSize(24);
    text("score:" + score, 485, 50);

    sword.x = World.mouseX;
    sword.y = World.mouseY;

    //set collider for sword
    sword.setCollider("rectangle", 0, 0, 40, 40);

    //if fruitGroup is touching sword
    if (fruitGroup.isTouching(sword)) {
      //destroy fruitGroup
      fruitGroup.destroyEach();
      //score increases by 2
      score = score + 2;
      //play song1
      song1.play();
    }

    if (enemyGroup.isTouching(sword)) {
      gameState = END;
      //play song2
      song2.play();
    }
    
    fruits();
    enemy();
  }

  if (gameState === END) {

    sword.addImage(gameOverImage);

    sword.scale = 2;

    sword.x = 300;
    sword.y = 250;
    //destroy groups
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
  }
  console.log(position);

  drawSprites();
}


function fruits() {
  //After every 75 frames, fruits should be displayed 
  if (World.frameCount % 75 === 0) {

    fruit = createSprite(380, 200, 20, 20);

    sf = Math.round(random(1, 4));

    if (sf === 1) {
      fruit.addImage(fruitImage1);
    } else if (sf === 2) {
      fruit.addImage(fruitImage2);
    } else if (sf === 3) {
      fruit.addImage(fruitImage3);
    } else {
      fruit.addImage(fruitImage4);
    }

    //random position for fruit
    direction = Math.round(random(1,2));
    
    if(direction === 1){

      fruit.x = 0;

      fruit.velocityX = (4+(score/4))
    }else if(direction === 2){

      fruit.x = 500;

      fruit.velocityX = -(4+score/4);
    }
    
    fruit.scale = 0.170;
    fruit.y = Math.round(random(50, 340));
    
    //set life time for fruit
    fruit.lifetime = 100;
    fruitGroup.add(fruit);
  }

}

function enemy() {
  if (World.frameCount % 200 === 0) {
    
    monster = createSprite(400, 200, 20, 20);
    
    monster.addAnimation("moving", monsterImage);
    
    //random position for monster
    position = Math.round(random(3,4));
    
    if(position === 3){
      monster.x = 0;
      
      monster.velocityX = (8+score/10);  
    } else if(position === 4){
      monster.x = 500;
      
      monster.velocityX = -(8+score/10);        
    }
    
    monster.y = Math.round(random(100, 300));
    
    //set life time for monster
    monster.lifetime = 50;
    
    enemyGroup.add(monster);
  }
}