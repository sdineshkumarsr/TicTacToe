let boxes=document.querySelectorAll(".box");
let player=document.querySelector(".playerDis");
let winDis=document.querySelector(".leftC");
let newGame=document.querySelector(".again");
let msg=document.querySelector(".msg");
let reseting=document.querySelector("#reset");
let turn=true; // 0 is default, Player 1, Player 2.
let count =0;

const possible=[ [0,1,2], [3,4,5],[6,7,8],// horizontal
                 [0,3,6], [1,4,7],[2,5,8],// Verticle
                 [0,4,8], [2,4,6]]; // Diagonal

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turn){
            box.innerText="O";
            player.innerText="Player 2";
            turn=false
        }
        else{
            box.innerText="X";
            player.innerText="Player 1";
            turn=true;
        }
        box.disabled= true;
        
        count++;
        let winner= result();

        if(count==9 && !winner){
            drawMatch();
        }
        if(count==9){
            player.innerText="Player 1";
        }
    })
});
const resetGame=()=>{
    turn=true;
    count=0;
    setBoxes();
    winDis.classList.add("hide");
};

const setBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
        player.innerText="Player 1";
    }
};

const drawMatch=()=>{
    msg.innerText=`Its a Draw !!!`;
    winDis.classList.remove("hide");
    disableBox();
};

const disableBox=()=>{
    for(box of boxes){
        box.disabled=true;
    }
};

const result=()=>{
    for(let pattern of possible){
        let val1=boxes[pattern[0]].innerText;
        let val2=boxes[pattern[1]].innerText;
        let val3=boxes[pattern[2]].innerText;

        if(val1 !="" && val2 !="" && val3 !=""){
            if(val1===val2 && val2==val3){
                showWinner(val1);
                return true;
            }
        }
    }
}

const showWinner=(winner)=>{
    let cup="";
    if(winner=="O"){
        cup="Player 1";
    }else{
        cup="Player 2"
    }

    msg.innerText=`Hurray !! Winner is ${cup}`;
    winDis.classList.remove("hide");
    disableBox();
}

reseting.addEventListener("click", resetGame);
newGame.addEventListener("click", resetGame);