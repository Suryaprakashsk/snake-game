const gameboard=document.getElementById('gameboard'); //1
const context=gameboard.getContext('2d');  //2
const width=gameboard.width;//3
const height=gameboard.height;//4
const unit=25; //6 size of food
const scoretext=document.querySelector('#scoreval'); //19

let foodX;//6
let foodY;//7
let Xvel=25;//12
let Yvel=0;//13
let score=0;//20
let active=true;//23
let started=false;

let snake=[  //10
    {x:unit*3,y:0},
    {x:unit*2,y:0},
    {x:unit,y:0},
    {x:0,y:0}
]

window.addEventListener('keydown',keypress)//15




startgame();

function startgame(){  //5

    context.fillStyle='#212121'; //color we want
    context.fillRect(0,0,width,height) //background black clr
    createfood();
    displayfood();
    drawsnake();
    // movesnake();
    // drawsnake();
    // clearboard();
    // drawsnake();
    
}

function clearboard(){ //15
    context.fillStyle='#212121';
    context.fillRect(0,0,width,height);
}

function createfood(){ //9
    foodX=Math.floor(Math.random()*width/unit)*unit;
    foodY=Math.floor(Math.random()*height/unit)*unit;

}
function displayfood(){ //8
           context.fillStyle='red';
           context.fillRect(foodX,foodY,unit,unit)

}
function drawsnake(){  //11
    context.fillStyle='aqua';
    context.strokeStyle='black';
    snake.forEach((snakepart)=>{
        context.fillRect(snakepart.x,snakepart.y,unit,unit)
        context.strokeRect(snakepart.x,snakepart.y,unit,unit)


    })
}

function movesnake(){ //14
    const head={x:snake[0].x+Xvel,y:snake[0].y+Yvel}
    snake.unshift(head)
    if (snake[0].x==foodX && snake[0].y==foodY){//18
        score +=1 //21
        scoretext.textContent=score;
        createfood();
    }
    else
       snake.pop()

}
function nexttick(){  //15
    if(active){ //27
    setTimeout(()=>{
        clearboard();
        displayfood();
        movesnake();
        drawsnake();
        checkgameover();
        nexttick();

    },200)
}
    else{
        clearboard();
        context.font='bold 50px serif';
        context.fillStyle='white';
        context.textAlign='center';
        context.fillText('Game over',width/2,height/2)
    }
}

function keypress(event){ //17
    if(!started){
        started=true;
        nexttick();
    } //25
    const left=37; //these nums are keycodes search it in google
    const up=38;
    const right=39;
    const down=40;
    
    switch(true){
        case(event.keyCode==left && Xvel!==unit):
           Xvel=-unit;
           Yvel=0;
           break;
        
        case(event.keyCode==right && Xvel!==-unit):
           Xvel=unit;
           Yvel=0;  
           break;
           
        case(event.keyCode==up && Yvel!==unit):
           Xvel=0;
           Yvel=-unit;  
           break; 

        case(event.keyCode==down && Yvel!==-unit):
           Xvel=-0;
           Yvel=unit;   
           break;

    }
}
function checkgameover(){
    switch (true){
        case(snake[0].x<0):
        case(snake[0].x>=width):
        case(snake[0].y<0):
        case(snake[0].y>=height):
        active=false;
        break;

    }
}