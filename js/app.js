"use strict";
// Enemies our player must avoid
//The x and y co=ordinates along with the speed of the enemy initially are passed.
class Enemy {
    constructor(x,y,speed) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.x=x;
        this.y=y;
        this.speed=speed;
        this.sprite = 'images/enemy-bug.png';
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += dt * this.speed;
        //Once Enemy is beyond the screen, it returns back with random speed to make the game
        if(this.x >= 550){
          this.speed=Math.random() % 5 * 1000 + 100;
          this.x=-10;
        }
        //Checking for collision by checking if player is in the the appropriate radius of the bug
        if (this.x < player.x + 60 && this.x + 60 > player.x && this.y < player.y + 60 && this.y + 60 > player.y){
                alert("You lose!!")
                player.x = 200;
                player.y = 385;
        };
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
//The x and y co=ordinates along with the character initially are passed.
class Player{
  constructor(x,y,sprite='images/char-cat-girl.png'){
    this.x=x;
    this.y=y;
    this.sprite = sprite;
  }

  update(){
  }
  //Updates character if clicked
  updateSprite(Sprite){
    this.sprite=Sprite;
  }
  //Updates position based on movement using arrow keys
  updatePosition(x,y){
      this.x+=x;
      this.y+=y;
  }
  render(){
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  //Using the eventlistener declared below, it changes the position of the character accordingly
  handleInput(code){
    if(code=='left' && this.x>0)
      this.updatePosition(-103,0);
    if(code=='right' && this.x<400)
      this.updatePosition(103,0);
    if(code=='up' && this.y>=53)
      this.updatePosition(0,-83);
    if(code=='down' && this.y<385)
      this.updatePosition(0,83);
    //Player wins if they reach the water
    if(this.y==-30){
      setTimeout(()=>{this.x=200;this.y=385;alert(`


                ~~~~~~~~~~~~~~~~~~YOU~~~~~~~~~~~~~~~~~
                ~~~~~~~~~~~~~~~~~~WIN~~~~~~~~~~~~~~~~~`) },100);
    }
  }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
//4 bugs are created along with the main character
const allEnemies=[new Enemy(-200,60,300),new Enemy(-150,140,300),new Enemy(-500,230,300),new Enemy(503,310,300)];
const player= new Player(200,385);
//Click event is added to each character to be able to use them
let character = $('.Img');
let Sprite='images/char-girl.png';
character.click((e)=>{
                        Sprite =e.target.getAttribute('src');
                        player.updateSprite(Sprite);
                      });
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', e => {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
