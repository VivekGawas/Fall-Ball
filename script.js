//when start/spacebar is clicked 
var clicked = document.querySelector(".btn");
clicked.addEventListener("click",start);
document.addEventListener("keyup",event=>{
    if(event.code=='Space'){
        start();
    }
});

function start(){
    clicked.style.visibility="hidden";
    var character = document.getElementById("character");
    var game = document.getElementById("game");

    var interval;
    var both = 0;
    var counter= 0;
    var currentBlocks=[];
    var highscore;

    //to move left
    function moveLeft(){
        left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
        //to restrict the ball inside the box
        if(left>0){
            character.style.left = left - 2 + "px"; 
        }
    }

    //to move right
    function moveRight(){
        left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));

        //to restrict the ball inside the box
        if(left<380){
            character.style.left = left + 2 + "px"; 
        }
    }

    //run when key is pressed
    document.addEventListener("keydown", event=>{
        if(both==0){
            both++;
            if(event.key=="ArrowLeft"){
                interval= setInterval(moveLeft, 1);
            }
            if(event.key=="ArrowRight"){
                interval= setInterval(moveRight, 1);
            }

        }
    });

    //to stop when key is unclicked
    document.addEventListener("keyup", event=>{
        clearInterval(interval);
        both=0;
    });
    
    //create hole and block at random position within the box
    var blocks = setInterval(function(){

        var blockLast = document.getElementById("block"+(counter-1));
        var holeLast = document.getElementById("hole"+(counter-1));

        if(counter>0){
                var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
                var holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"));
        }

        if(blockLastTop<400 || counter==0){
            var block = document.createElement("div");
            var hole = document.createElement("div");
            block.setAttribute("class", "block");
            hole.setAttribute("class", "hole");
            block.setAttribute("id", "block"+counter); //all blocks are different so different ids 
            hole.setAttribute("id", "hole"+counter);  //all holes are different so different ids 
            block.style.top = blockLastTop + 100 + "px";
            hole.style.top = holeLastTop + 100 + "px";

            var random = Math.floor(Math.random()*360);
            hole.style.left = random + "px";
            game.appendChild(block);
            game.appendChild(hole);
            currentBlocks.push(counter);
            counter++;
        }

        //to move character up and down
        var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
        var drop = 0;

        if(characterTop <= 0){
            // highscore=counter;
            alert("Game over. Your Score : "+(counter-9));
            clearInterval(blocks);
            location.reload();
        }

        //for moving the blocks and holes up
        for(var i = 0; i < currentBlocks.length; i++){
            let current = currentBlocks[i];
            let iblock = document.getElementById("block"+current);;
            let ihole = document.getElementById("hole"+current);
            let iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));
            let iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue("left"));


            //to increase speed of blocks after certain score
            if(counter>=0 && counter<=50){
                iblock.style.top = iblockTop - 0.5 + "px";
                ihole.style.top = iblockTop - 0.5 + "px";
            }
            else if(counter>50 && counter<=70){
                iblock.style.top = iblockTop - 0.6 + "px";
                ihole.style.top = iblockTop - 0.6 + "px";
            }
            else if(counter>70 && counter <= 90){
                iblock.style.top = iblockTop - 0.7 + "px";
                ihole.style.top = iblockTop - 0.7 + "px";
            }
            else if(counter>90 && counter <= 100){
                iblock.style.top = iblockTop - 0.8 + "px";
                ihole.style.top = iblockTop - 0.8 + "px";
            }
            else{
                iblock.style.top = iblockTop - 1 + "px";
                ihole.style.top = iblockTop - 1 + "px";

            }


            if(iblockTop < -20){
                currentBlocks.shift();
                iblock.remove();
                ihole.remove();
            }

            if(iblockTop-20 < characterTop && iblockTop > characterTop){
                drop++;
                if(iholeLeft<=characterLeft && iholeLeft+20>=characterLeft){
                    drop=0;
                }
            }
        }

        //to drop the ball
        if(drop==0){
            if(characterTop < 480){
                character.style.top = characterTop + 2 + "px";
            }
        }
        else{
            character.style.top = characterTop - 0.5 + "px";
        }

    }, 1);  

}