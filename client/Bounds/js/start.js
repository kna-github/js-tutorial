// Create a new Phaser game object with a single state that has 3 functions
var game = new Phaser.Game(480, 640, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
});

var playerBet;
var computerBet;
var ball;

var computerBetSpeed = 300;
var ballSpeed = 300;



// Called after preload
function create() {
  game.add.tileSprite(0, 0, 480, 640, 'background');
  game.physics.startSystem(Phaser.Physics.ARCADE);

  playerBet = createBet(game.world.centerX, 620);
  computerBet = createBet(game.world.centerX, 20);
  ball=createBall();

  game.input.onDown.add(releaseBall, this);
}


function preload() {
  game.load.image('bet', '../assets/bet.png');
  game.load.image('ball', '../assets/ball.png');
  game.load.image('background', '../assets/starfield.jpg');
}


// Called once every frame, ideally 60 times per second
function update() {
  playerBet.x = game.input.x;
  var playerBetHalfWidth = playerBet.width / 2;
  if(playerBet.x < playerBetHalfWidth) {
    playerBet.x = playerBetHalfWidth;
  } else if(playerBet.x > game.width - playerBetHalfWidth) {
    playerBet.x = game.width - playerBetHalfWidth;
  }
  //рокетка компютера
  if(computerBet.x - ball.x < -15) {
    computerBet.body.velocity.x = computerBetSpeed;
  } else if(computerBet.x - ball.x > 15) {
    computerBet.body.velocity.x = -computerBetSpeed;
  } else {
    computerBet.body.velocity.x = 0;
  }

  //Проверяем и обрабатываем столкновения мячика и ракеток
  game.physics.arcade.collide(ball, playerBet, ballHitsBet, null, this);
  game.physics.arcade.collide(ball, computerBet, ballHitsBet, null, this);

}


function createBet(x, y) {
    var bet = game.add.sprite(x, y, 'bet');
    game.physics.arcade.enable(bet);
    bet.anchor.setTo(0.5, 0.5);
    bet.body.collideWorldBounds = true;
    bet.body.bounce.setTo(1, 1);
    bet.body.immovable = true;

    return bet;
}

function createBall(){
    var ball = game.add.sprite(game.world.centerX, game.world.centerY, 'ball');
    game.physics.arcade.enable(ball);
    ball.anchor.setTo(0.5, 0.5);
    ball.body.collideWorldBounds = true;
    ball.body.bounce.setTo(1, 1);

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

function ballHitsBet (_ball, _bet) {
  /*var diff = 0;

  if (_ball.x < _bet.x) {
    //  Шарик находится с левой стороны ракетки
    diff = _bet.x - _ball.x;
    _ball.body.velocity.x = (-10 * diff);
  }
  else if (_ball.x > _bet.x) {
    //  Шарик находится с правой стороны ракетки
    diff = _ball.x -_bet.x;
    _ball.body.velocity.x = (10 * diff);
  }
  else {
    //  Шарик попал в центр ракетки, добавляем немножко трагической случайности его движению
    _ball.body.velocity.x = 2 + Math.random() * 8;
  }*/
  
}
