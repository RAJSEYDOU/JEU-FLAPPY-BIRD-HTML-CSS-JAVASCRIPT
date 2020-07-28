const background= document.querySelector('#Background')
const palmNord= document.querySelector('#PalmNord')
const palmSud= document.querySelector('#PalmSud')


const birdImage= document.querySelector('#bird')
const canvas=document.querySelector('#canvas')
const ctx=canvas.getContext('2d')





let bird={
  X:60,
  Y:50,
  W:20,
  H:20

}

let PALM=[];
PALM[0]={
  X:280,
  Y:-18,
  W:40,
  H:30
}
let USER={
  score:0,
  X:20,
  Y:40
}

function move(){
    ctx.drawImage(background,0,-150)
  
for (i=0;i<PALM.length;i++){
  // MOVING OUR TWO 2 PALM TROUGH PALM[I].X 
   
    PALM[i].X-=5;
     // DRAW BIRD IMAGE
    ctx.drawImage(birdImage,bird.X,bird.Y,bird.W,bird.H)

    // 
    // INITIALISATION OF OUR  TWO PIPES
    // THEY HAVE SAME X,Y,W,H PARAMS BUT AJUSTED AND ALSO A
    // DIFFERENT  IMAGE
    // 

 // PIPE SOUTH
   ctx.drawImage(palmSud,PALM[i].X,PALM[i].Y+80,PALM[i].W,PALM[i].H+70)
   // PIPE NORTH
   ctx.drawImage(palmNord,PALM[i].X,PALM[i].Y+10,PALM[i].W,PALM[i].H)
      
// SCORE ON SCREEN =0
drawtext("score",0,20,"white")
// USER SCORE ON INIT =0
increaseScore(USER.score,USER.X,USER.Y,"black")

// IF PALM[i].X==150
    if(PALM[i].X==150){
      //THEN ADD A ANOTHER POSITION
      PALM.push({
      // X=280 BECAUSE IT GONNA START ON X=280==CANVAS.WIDTH
        X:280,
        // Y IS A NEGATIF VALUE SPECIALY FOR PIPESOUTH
        Y:Math.floor(Math.random()*20)-30,
        W:40,
        H:30
      })
  
    }
    
       // CHECK IF  COLLISION BETWEEN BIRD AND SOUTHPIPE OR BIRD AND NORTHPIPE OR BIRD ON GROUND
      if(bird.X+bird.W>=PALM[i].X && bird.X<=PALM[i].X+PALM[i].W && bird.Y+bird.H>=PALM[i].Y+10 && bird.Y<=PALM[i].Y+10+PALM[i].H || bird.X+bird.W>=PALM[i].X && bird.X<=PALM[i].X+PALM[i].W && bird.Y+bird.H>=PALM[i].Y+80 && bird.Y<=PALM[i].Y+80+PALM[i].H||bird.Y+bird.H>=160 ){
      // THEN SHOW USER SCORE ON SCREEN
      increaseScore(USER.score,canvas.width/2,canvas.height/2,"black")
      // DRAW TEXT SCORE
      
      drawtext("score",canvas.width/2-10,canvas.height/2-40,"white")
      drawtext("TAP ENTER TO RESTART",canvas.width/2-80,canvas.height/2+40,"black")
      // STOP GAME
      clearInterval(cumulateur)

      document.addEventListener('keyup',function(){
        if(event.keyCode==13){
          // RELOAD PAGE
              location.reload()
        }
      })
      
      

    }
    // ELSE IF BIRD X>PALM[i].X SO BIRD SCORE SOULD BE INCREASE
    else if(bird.X+bird.W>PALM[i].X && bird.X>PALM[i].X+PALM[i].W || bird.X+bird.W>=PALM[i].X && bird.X<=PALM[i].X+PALM[i].W ){
          // USER SCORE ++
          USER.score++;
// UPDATE SCORE ON SCREEN
        
    }
    // 
  
}
    
     
// IF ANY TOUCH IS PRESSED A BIRD Y INCREASE WITCH MEAN BIRD A FALLEN
      bird.Y+=3

 
}

// LINK EVENT KEYUP TO SCREEN
document.addEventListener('keyup',moveup)

function moveup(e){
// IF KEYCODE==ESPACE
	if(e.keyCode==32){
    // THEN DECREASE BIRD POSITION WHICH MEAN BIRD IS GOING UP
           bird.Y-=10


	}


}

// FUNCTION INCREASESCORE
function increaseScore(score,x,y,color){
  ctx.fillStyle=color
  ctx.font="20px fantasy"
  ctx.fillText(score,x,y)
}
// FUNCTION DRAWTEXT
function drawtext(text,x,y,color){
  ctx.fillStyle=color
  ctx.fillText(text,x,y)
}

// GAME LAUNCHER
let cumulateur=setInterval(move,100)











