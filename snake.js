function init(){
    canvas = document.getElementById('mycanvas');
    pen = canvas.getContext('2d');
    W= canvas.width;
    H= canvas.height;
    game_over =false;

    score = 0; 
    snake = {
    	length:5,
    	color: "voilet",
    	cells:[],
    	direction:"right",
    	createSnake: function(){
    		for (var i = this.length - 1; i >= 0; i--) { this.cells.push({x:i,y:0});}
    	},
    	drawSnake:function(){
    		for (var i = 0; i <this.cells.length ; i++) {
    			pen.fillStyle = this.color;
    			pen.lineWidth = 5;
               pen.strokeStyle="white";
                pen.strokeRect(this.cells[i].x*20,this.cells[i].y*20,20,20);
    			pen.fillRect(this.cells[i].x*20,this.cells[i].y*20,20,20);
    		}
    	},
        updateSnake:function(){
            var headX = this.cells[0].x;
             var headY = this.cells[0].y;
            
            if(headX==food.x && headY ==food.y){
                food = getRandomFood();
                score=score+100;
            }
            else {this.cells.pop();}
            if(this.direction=="right"){
                 nextX = headX+1;
                 nextY = headY;
            }
            else if(this.direction=="left"){
                 nextX = headX-1;
                 nextY = headY;
            }
            else if(this.direction=="up"){
                 nextX = headX;
                 nextY = headY-1;
            }
            else if(this.direction=="down"){
                 nextX = headX;
                 nextY = headY+1;
            }
                //this.cells.pop();
                
                this.cells.unshift({x:nextX,y:nextY});
                var x_cells = Math.round(W/20);
            var y_cells = Math.round(H/20);
            if(this.cells[0].x<0 ||this.cells[0].x>x_cells||this.cells[0].y<0 ||this.cells[0].y>y_cells)
                {
                    alert("Game Over");
                    
                    game_over = true;
                    x=confirm("Play Again");
                    if(x==true){
                        startGame();
                       
                    }
                    else {alert("Thank you!! You Played well...");}
                }
            
        }
    }
    snake.createSnake();
    food = getRandomFood();
    
    function KeyPressed(e){
        if(e.key=="ArrowRight"){
            snake.direction="right";
        }
        else if(e.key=="ArrowLeft"){
            snake.direction="left";
        }
        else if(e.key=="ArrowDown"){
            snake.direction="down";
        }
        else if(e.key=="ArrowUp"){
            snake.direction="up";
        }
     
    }
    document.addEventListener('keydown',KeyPressed);
}

function draw(){
    pen.clearRect(0,0,W,H);
    snake.drawSnake();
    pen.fillStyle="blue";
    pen.fillRect(food.x*20,food.y*20,20,20);
    pen.fillStyle="Green";
    pen.font="14px Arial";
    pen.fillText("Score :" +score,10,10);
}

function update(){
    snake.updateSnake();
    
}

function getRandomFood(){
    var foodX=Math.round(Math.random()*(W-20)/20);
    var foodY=Math.round(Math.random()*(H-20)/20);
    return {x:foodX,y:foodY};
}
function gameLoop(){
    console.log("In GameLoop");
    draw();
    update();
    if(game_over==true){
    clearInterval(f);
}
}

function startGame()
{
    init();
    game_over = false;
    f=setInterval(gameLoop,180);
    
}

startGame();