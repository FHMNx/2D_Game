var runSound=new Audio("run.mp3");
runSound.loop=true;

var jumpsound=new Audio("jump.mp3");


var runimage=1;
var runworker=0;

function controller(event){

      if(event.key=="Enter"){

        if(runworker==0){
          run();
          runSound.play();
          moveBackground();
          updateScore();
          flameMarginLeftArray.forEach(createFlame);
          
        }
       
      }

      if(event.key==" "){
        if(jumpWorker==0){
          if(runworker!=0){
            clearInterval(runworker);
            runSound.pause();
            jump();
            jumpsound.play();

          }
      
        }

      }
}



function run(){

  runworker=setInterval(
    ()=>{

      runimage=runimage + 1;
      if(runimage==9){
          runimage=1;
      }
      
      document.getElementById("boy").src="run"+runimage+".png";
  
             
    },150
  );

}


var backgroundX=0;
var backgroundWorker=0;
function moveBackground(){

        backgroundWorker=setInterval(
          ()=>{

             backgroundX=backgroundX-20;
             document.getElementById("background").style.backgroundPositionX=backgroundX+"px";

          },100
        );
    }



    var score=0;
    var scoreWorker=0;
    function updateScore(){

      scoreWorker=setInterval(
        ()=>{
               
               score=score+10;
               document.getElementById("score").innerHTML=score;
                
               if(score==2000){
                alert("You won! Play Again");
                window.location.reload();

               }
        },100
      );
       
    }
    


    
    var jumpImage=1;
    var jumpWorker=0;
    var jumpMarginTop=340;
    function jump(){
       jumpWorker=setInterval(
        ()=>{
                jumpImage=jumpImage+1;     //2,3,4,5,6,7  /  8,9,10,11,12,13

                if(jumpImage<8){           //2,3,4,5,6,7 
                     jumpMarginTop=jumpMarginTop-20;
                     document.getElementById("boy").style.marginTop=jumpMarginTop+"px";
                }
                if(jumpImage>7){            //8,9,10,11,12,13
                     jumpMarginTop=jumpMarginTop+20;
                     document.getElementById("boy").style.marginTop=jumpMarginTop+"px";
                }

                 if(jumpImage==13){
                      jumpImage=1;
                      clearInterval(jumpWorker);
                      jumpWorker=0;
                      run();
                      runSound.play();
                 }

                 document.getElementById("boy").src="jump"+jumpImage+".png";
                   
        },100
       );

    }



//CREATE FLAME 

var flameMarginLeftArray=[750,1500,2000,2400,3000,3600,3900];
var flameWorker=0;
var gameOver=false;

function createFlame(x){
  
       var imgTag=document.createElement("img");
         imgTag.src="flame.gif";
         imgTag.style.height="150px";
         imgTag.style.marginTop="430px";
         imgTag.style.marginLeft= x+"px";
         imgTag.style.position="absolute";
         document.getElementById("background").appendChild(imgTag);
         

         flameWorker=setInterval(
          ()=>{
                 
             if(gameOver==false){
                    
                 x=x-10;
                 imgTag.style.marginLeft=x+"px"; 
                 
             }
                 
                         
                 if(x==140){
                  if(jumpWorker==0){

                    gameOver=true;
                    clearInterval(runworker);          //STOP RUNNING
                    runSound.pause();                  //STOP RUN SOUND
                    clearInterval(backgroundWorker);   //STOP BACKROUND MOVING
                    clearInterval(scoreWorker);        //STOP SCORING
                    clearInterval(flameWorker);        //STOP FLAME
                     
                    dead();
                    deadSound.play();
                  }
        
                 }
    
          },50
        );
 }

//DEAD ANIMATION
var deadSound=new Audio("dead.mp3");
var deadImage=1;
var deadWorker=0;

function dead(){
    deadWorker=setInterval(
          ()=>{
             deadImage=deadImage+1;
             if(deadImage==11){
                    
              clearInterval(deadImage);
              alert("Game Over! Try Again");

              //RESTART THE GAME
              window.location.reload();
                        
             }

             document.getElementById("boy").src="dead"+deadImage+".png";

      },100
    );
 }
  

