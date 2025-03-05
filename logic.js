let gameSeq = [];
let userSeq = [];
let btns = ['yellow','blue','red','green'];

let level = 0 ;
let started = false; 
let highestScore  = 0;
let p = document.querySelector('p');

// starting game

document.addEventListener('keypress',function(){
    if (started == false){
        console.log("Game started");
        started = true;

        levelup();
    }
});

let h3 = document.querySelector('h3'); 

function gameflash (btn){
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove('flash');
    }, 300)    
};

function userflash (btn){
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove('userflash');
    }, 250)    
};

// callback function 

function levelup (){
       userSeq = [];
       level++;
       h3.innerText = `level ${level}`;

       let randIdx = Math.floor( Math.random() * 3 ); 
       let randColor = btns[randIdx];
       let randBtn = document.querySelector(`.${randColor}`);

       gameSeq.push(randColor);
       console.log(gameSeq);
       gameflash(randBtn);

       if(level > highestScore){
        highestScore = level ; 
        p.innerHTML = `HIGHEST SCORE : ${highestScore}`;
       }
};

function checkAns (idx){
    if( gameSeq[idx] === userSeq[idx] ){
       if(userSeq.length == gameSeq.length){
        setTimeout(levelup , 1000)
       }
    }else {
        h3.innerHTML = `Game Over! Your Score was <b>${level}</b> <br> press any Key to Start`;
        document.querySelector('body').style.backgroundColor = 'red';
        setTimeout(function(){
            document.querySelector('body').style.backgroundColor = 'white';
        },180)
        reset();
    }
}

//main function

function btnPress (){
    let btn = this; 
    console.log(this);
    userflash(btn);
    
    let userColor = btn.getAttribute('id');
    userSeq.push(userColor);
    console.log(userColor) ;

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll('.btn');
for (btn of allBtns){
    btn.addEventListener('click',btnPress);
}

function reset(){
   started = false ; 
   level = 0 ;
   gameSeq = [];
   userSeq = []; 
}