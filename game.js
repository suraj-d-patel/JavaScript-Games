function loadImages() {
    playerImage = new Image;
    playerImage.src = "assets/playerImage.png";
    
    enemyImage = new Image;
    enemyImage.src = "assets/enemyImage.png";
    
    goalImage = new Image;
    goalImage.src = "assets/goalImage.png";
    
   // heart = new Image;
  //  heart.src = "assets/heart.png"
    var enemyNames = ["a","b","c","d"];
    enemyImages = [];
    for(var i=0;i<enemyNames.length;i++)
        {
            enemyIm = new Image;
            enemyIm.src="assets/"+enemyNames[i]+".png";
            enemyImages.push(enemyIm);
        }
}

function init(level=1) {
    console.log("in init");
    canvas = document.getElementById('mycanvas');
    pen = canvas.getContext('2d');
    
    W = canvas.width;
    H = canvas.height;
    GAME_OVER =false;
    Score=0;
    
    player={
        x : 0,
        y : H/2,
        w : 75,
        h : 75,
        speedX:0,
    };
    
    
    enemy1={
        x:250,
        y:200,
        w:80,
        h:80,
        speedY: 6,
        speedX: 10,
    };
    
    enemy2={
        x:350,
        y:400,
        w:80,
        h:80,
        speedY: -4,
        speedX: 10,
    };
    
    enemy3={
        x:550,
        y:100,
        w:80,
        h:80,
        speedY: 5,
        speedX: 10,
    };
    
    enemy4={
        x:140,
        y:165,
        w:80,
        h:80,
        speedY: -6,
        speedX: -14,
    };
    
    enemies=[];
    enemies.push(enemy1);
    enemies.push(enemy2);
    enemies.push(enemy3);
    enemies.push(enemy4);
    goal={
        x: W - 75,
        y: H/2,
        w: 75,
        h: 75
            };
    
    function movePlayer()
    {
        player.speedX = 5;
    }
    function stopPlayer()
    {
        player.speedX = 0;
    }
    
    canvas.addEventListener('mousedown' , movePlayer);
    canvas.addEventListener('mouseup' , stopPlayer);

}

function isColliding(r1,r2) {
  var firstCond = Math.abs(r1.x-r2.x) <= r1.w-40;
  var secondCond = Math.abs(r1.y-r2.y) <= r1.h-50;
  return firstCond && secondCond;
}

function draw() {
    pen.clearRect(0,0,W,H);
    
    //pen.fillStyle = "blue";
   for(var i=0;i<level;i++) {pen.drawImage(enemyImages[i],enemies[i].x,enemies[i].y,enemies[i].w,enemies[i].h);}
    
    //pen.fillStyle = "green";
    pen.drawImage(playerImage,player.x,player.y,player.w,player.h);
    
   // pen.fillStyle = "blue";
    pen.drawImage(goalImage,goal.x,goal.y,goal.w,goal.h);
   
    pen.font = "20px Arial";
    pen.fillStyle = "white";
    pen.fillText("Score: " + Score,20,20);
}

function update() {
    for(var i=0;i<enemies.length;i++)
    {enemies[i].y += enemies[i].speedY;}
    
    Score = Math.round(player.x/6.78);
    
    for(var i=0;i<enemies.length;i++)
    {if(enemies[i].y >= H - enemies[i].h || enemies[i].y<=0)
        {
            enemies[i].speedY = -1*enemies[i].speedY;
        }
    }
    player.x += player.speedX;
    
    for(var i=0;i<level;i++)
    {if(isColliding(player,enemies[i]))
        {
            alert("Go Home!! Your Parents are waiting");
            GAME_OVER =true;
            restartGame(level=1);
        }
    }
    if(isColliding(player,goal))
        {   
            //pen.drawImage(heart,W-100,(H/2)-60,75,75);
            alert("Congratulations!! You are qualified to next Level");
            if(level<enemies.length)
            {level = (level+1);}
            else 
                restartGame(level=1);
            GAME_OVER =true;
        }
    
}

function gameLoop() {
    draw();
    update();
    if(GAME_OVER ==false){ window.requestAnimationFrame(gameLoop);
                        
                         }
   else{choice = prompt("Do you want to play ???")
       if(choice=="Yes" ||choice=="Yes"||choice=="Y"||choice=="YES"||choice=="yes"||choice=="y")
           {
               restartGame(level+1);
           }
       else{alert("Thank You for Playing!!!");}
       } }

function restartGame(level) {
    init(level);
    gameLoop();
}

loadImages();
restartGame(level=1);