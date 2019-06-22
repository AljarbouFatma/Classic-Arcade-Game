// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // The current location for our enemies, represented as x-y coordinates
    this.x = columnToX(-1);  // just before column 0
    this.y = rowToY(randInt(1, 4));
    // The speed for our enemies, each enemy is moving horizontally with different speed.
    this.speed = 200 + Math.random() * 300;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // Enemy moves along x-axis at its speed
    this.x += this.speed * dt;
    if (this.x > columnToX(5)) {
      // Enemy moves beyond the canvas, replace it with a new enemy
      var idx = allEnemies.indexOf(this);
      allEnemies[idx] = new Enemy();
    }

    // Test collision with the player:
    var col = xToColumn(this.x);
    var row = yToRow(this.y);
    if (col == player.col && row == player.row) {
      // Reduce player's score
      player.scores--;
      player.reset();
    }
  };
  // Draw the enemy on the screen, required method for game
  Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
  // Now write your own player class
  // This class requires an update(), render() and
  // a handleInput() method.
  var Player = function() {
    // Use an image as player's sprite
    this.sprite = 'images/char-boy.png';
    // Player's scores:
    this.scores = 3;
    // Count collectible items
    this.itemCount = 0;
    // Call reset to set player's position for a new game
    this.reset();
};

Player.prototype.update = function() {
};

// Reset player's position
Player.prototype.reset = function() {
    this.row = 5;
    this.col = 4;
};
// Draw the player on the screen, required method for game
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite),
  columnToX(this.col), rowToY(this.row) - 20);


      // Draw player's scores
      ctx.font = '22px Arial';
      ctx.fillStyle = '#E4F204';
      ctx.fillText('Scores: ' + this.scores, 20, 581);
  };
  // Handle user input a key to control the player:
  Player.prototype.handleInput = function(key) {
    // Move the player up/down/left/right corresponding to the key pressed,
    if (key == 'left' && this.col > 0) {
        this.col--;
    }
    if (key == 'right' && this.col < 4) {
        this.col++;
    }
    if (key == 'up' && this.row > 0) {
        this.row--;
        // Check if the player reaches the top row,
        // then increase the score and reset for a new game
        if (this.row == 0) {
            this.scores++;
            this.reset();
        }
    }
    if (key == 'down' && this.row < 5) {
        this.row++;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];
// Place the player object in a variable called player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Convert column-row position into x-y coordinates, and vice versa

// Return the x-coordinate starting the given column.
function columnToX(col) {
    return col * 101;
}
// Return the y-coordinate starting the given row.
function rowToY(row) {
    // Minus an offset where an enemy or player's sprite should be drawn
    return row * 83 - 20;
   // return row * 83 ;
}
// Return the column where the given x-coordinate lies on
function xToColumn(x) {
    return Math.floor(x / 101);
}
// Return the row where the given y-coordinate lies on
function yToRow(y) {
    return Math.floor((y + 20) / 83);
   // return Math.floor(y  / 83);
}

// Return a random integer between a (inclusive) and b (exclusive)
function randInt(a, b) {
    return a + Math.floor(Math.random() * (b - a));
}
