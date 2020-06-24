let direction = null;
let audio = document.getElementById("audio");
let startWindow = document.getElementById("startWindow");
let bStart = document.getElementById("startButton");
bStart.addEventListener("click", hideStart);
function hideStart(){
	startWindow.style.visibility = "hidden";
    audio.play();
    myMove();
    timer();
    window.setTimeout(function() {
        window.location.href = 'win.html';
    }, 61100);
}

function showStart(){
	startWindow.style.visibility="visibile";
}

function showGameOverWindow(){
	window.location.href = 'gameOver.html';
}

//player
let ship= null;
function init(){
    ship=document.getElementById("image1");				
    ship.style.position='absolute';
    ship.style.left='700px';
    ship.style.top='500px';
}
function getKeyAndMove(e){				
    let key_code=e.which||e.keyCode;
    switch(key_code){
        case 37: //left arrow key
            moveLeft();
            break;
        case 38: //Up arrow key
            moveUp();
            break;
        case 39: //right arrow key
            moveRight();
            break;
        case 40: //down arrow key
            moveDown();
            break;						
    }
}

let speed = 1;
function moveFast(){
    speed = 2.5;
    ship.style.background = "url(images/b2.gif) fixed center"
    ship.style.borderRadius = "25px"
    setTimeout(function(){
        speed = 1;
        ship.style.background = "none"
        ship.style.borderRadius = "0px"
    }, 5000)
}
function moveLeft(){
    ship.style.left=parseInt(ship.style.left)-25 * speed + 'px';
    ship.style.transform = "rotate(-90deg)"
    direction = 'left';
}



function moveUp(){
    ship.style.top=parseInt(ship.style.top)-25 * speed + 'px';
    ship.style.transform = "rotate(0deg)"
    direction = 'up';
}



function moveRight(){
    ship.style.left=parseInt(ship.style.left)+25 * speed + 'px';
    ship.style.transform = "rotate(90deg)"
    direction = 'right';
}



function moveDown(){
    ship.style.top=parseInt(ship.style.top)+25 * speed + 'px';
    ship.style.transform = "rotate(180deg)"
    direction = 'down';
}



function shoot() {
    //let laser = document.querySelector('.laser')
    let laser = document.createElement('div')
    laser.className = 'laser'
    document.querySelector('#enemy').append(laser)
    laser.style.left = Number(ship.style.left.replace('px', '')) + ship.width / 2 +'px'
    laser.style.top = Number(ship.style.top.replace('px', '')) + ship.height / 2 +'px'
    laser.style.transform = "rotate(1000deg)"
    laser.style.padding = "20px"
    laser.style.borderRadius = "18px"
    laser.style.background ="url(images/laser.gif)"
    setTimeout(function() {
        if(collision(laser,ship)) {
            showGameOverWindow();
        }
       laser.remove()
    }, 800);
}

function powerUp() {
    let powerup = document.createElement('div')
    powerup.className = 'powerup'
    document.querySelector('#enemy').append(powerup)
    powerup.style.left = Number(ship.style.left.replace('px', '')) + 4 + 'px'
    powerup.style.top = Number(ship.style.top.replace('px', '')) / + 4 +'px'
    powerup.style.visibility="visible"
    powerup.style.padding = "20px"
    powerup.style.borderRadius = "18px"
    powerup.style.background ="url(images/powerup.png)"


}

function checkPowerUp() {
    document.querySelectorAll('.powerup').forEach(pUp => {
        let collide = collision(pUp,ship)
       // console.log(collide, 'shit') 
        if(collision(pUp,ship)) {
            console.log('fuck')
            moveFast();
            pUp.remove()
        }
    })
}
setInterval(checkPowerUp,10)
//enemy
function myMove() {
    let container = document.getElementById("body");
    let enemy = document.getElementById("enemy");
    let maxDistToTravel = 1050;
    let pos = -800;
    let end = maxDistToTravel;
    let direction = 1;
    let f = 1;
    const frame = () => { 
        if (pos === end) {
            direction *= -1; // reverses current direction
            end = Math.abs(maxDistToTravel - end); 
        }
        // console.log(enemy, pos)
        pos += direction;

        f++;
        if(f % 100 === 0) {
            shoot();
        }
        
    }
    let id = setInterval(frame, 2);
  }

  window.onload = () => {
    init();
    showStart()
    setInterval(powerUp, 10000)
}

function collision(el1, el2) {
    var rect1 = el1.getBoundingClientRect();
    var rect2 = el2.getBoundingClientRect();
    return !(
      rect1.top > rect2.bottom ||
      rect1.right < rect2.left ||
      rect1.bottom < rect2.top ||
      rect1.left > rect2.right
    );
}

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

 function timer() {
    var oneMinute = 60 * 1,
        display = document.querySelector('#time');
    startTimer(oneMinute, display);
};

