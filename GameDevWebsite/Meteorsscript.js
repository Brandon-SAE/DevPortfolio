const menu = document.querySelector('#mobile-menu')
const menuLinks = document.querySelector('.navbar__menu')

menu.addEventListener('click', function(){
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});

let character = document.getElementById("character");
var game = document.getElementById("game");
var interval;
var both = 0;
var counter = 0;
var currentMeteors = [];
var score = 0;
var speed = 0.75;

function moveLeft(){
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if(left>100){
        character.style.left = left - 1 + "px";//moves the character div 1px to the left if the div is greater than 100px from the left.
    }
}
function moveRight(){
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if(left<400){
        character.style.left = left + 1 + "px";//moves the character div -1px to the left if the div is less than 400px from the left.
    }
}

document.addEventListener("keydown", event =>{ //Keydown event Listener
    if(both==0){ //makes it so that the events within cannot be activated unless var both =0
        both++; //When any key in this Event listener is down, 1 is added to var both
        if(event.key==="ArrowLeft"){
            interval = setInterval(moveLeft, 1); //calls move left when the left arrow key is down
        }
        if(event.key==="ArrowRight"){
            interval = setInterval(moveRight, 1); //calls move right when the right arrow key is down
        }
    }
});
document.addEventListener("keyup", event => { //Keyup event Listener
    if(event.key==="ArrowLeft"){
        clearInterval(interval); //When Left arrow is released var interval is cleared and both is set to 0 
        both=0;
    }
    if(event.key==="ArrowRight"){
        clearInterval(interval); //When Right arrow is released var interval is cleared and both is set to 0
        both=0;
    }
});

var meteors = setInterval(function(){
    var meteorLast = document.getElementById("meteor"+(counter-1));
    if(counter>0){
        var meteorLastTop = parseInt(window.getComputedStyle(meteorLast).getPropertyValue("top"));
    }
    if(meteorLastTop>0||counter==0){
        var meteor = document.createElement("div"); //creates a new div called meteor
        meteor.setAttribute("class", "meteor");
        meteor.setAttribute("id", "meteor"+counter);
        meteor.style.top = meteorLastTop - 450 + "px";
        var randomx = Math.floor(Math.random() * 350);
        meteor.style.left = 85 + randomx + "px";//set random position for meteor
        game.appendChild(meteor);
        currentMeteors.push(counter);
        counter++;
    }
    var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
        
    for(var i = 0; i < currentMeteors.length;i++){
        let current = currentMeteors[i];
        let imeteor = document.getElementById("meteor"+current);//creates a new div imeteor by cloning div meteor and adds current so that its a seprate entity. 
        let imeteorTop = parseFloat(window.getComputedStyle(imeteor).getPropertyValue("top"));
        let imeteorLeft = parseInt(window.getComputedStyle(imeteor).getPropertyValue("left"));
        imeteor.style.top = imeteorTop + speed + "px"; //changes the meteors location down based on var speed.
        if(characterLeft>imeteorLeft-85 && characterLeft<imeteorLeft+75 && imeteorTop+150>=350){ //set the collision between the meteors and the player.
            clearInterval(meteors);//clears the interval meteors however this does not work correctly as it is located in the for loop and need to be moved out.
            location.reload;//sets the player back to their original location when the page is refreshed.
            alert("Game Over You Scored " + score + " points. Please refesh to start again");//creates an alert that states game over and shows you score for that run.
        }
        if(imeteorTop+60 > 390){ //states that if the meteors top + 60 (so the bottom) is greater than 30 the below happens
            currentMeteors.shift();
            imeteor.remove();//removes the div blocks if they reach 1140
            score++ //icreases the score each time a meteor reaches the floor
            speed = speed + 0.025; //oncreases the meteors speed each time a meteor reaches the ground
        }
    }
},5);

