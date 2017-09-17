// Create a new Phaser game object with a single state that has 3 functions
var game = new Phaser.Game(480, 640, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
});

var playerBet;
var computerBet;
var ball;

var computerBetSpeed = 190;
var ballSpeed = 300;



// Called after preload
function create() {
    game.add.tileSprite(0, 0, 480, 640, 'background');

    playerBet = createBet(game.world.centerX, 600);
    computerBet = createBet(game.world.centerX, 20);
    ball=createBall();
    game.input.onDown.add(releaseBall, this);
}


function preload() {
    game.load.image('bet', 'assets/bet.png');
    game.load.image('ball', 'assets/ball.png');
    game.load.image('background', 'assets/starfield.jpg');
}


// Called once every frame, ideally 60 times per second
function update() {
  //console.log(playerBet);
}

function createBet(x, y) {
    var bet = game.add.sprite(x, y, 'bet');
    bet.anchor.setTo(0.5, 0.5);
    //bet.body.collideWorldBounds = true;
    //bet.body.bounce.setTo(1, 1);
    //bet.body.immovable = true;

    return bet;
}

function createBall(){
    var ball = game.add.sprite(game.world.centerX, game.world.centerY, 'ball');
    ball.anchor.setTo(0.5, 0.5);
    //ball.body.collideWorldBounds = true;
    //ball.body.bounce.setTo(1, 1);

    return ball;
}

var ballReleased = false;

function releaseBall() {
    if (!ballReleased) {
        ball.body.velocity.x = ballSpeed;
        ball.body.velocity.y = -ballSpeed;
        ballReleased = true;
    }
}
