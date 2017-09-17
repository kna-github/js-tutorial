// Create a new Phaser game object with a single state that has 3 functions
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'ananas', {
    preload: preload,
    create: create
});

var pineapples;

function preload() {
    game.load.image('ball', 'assets/ball.png');
}

// Called after preload
function create() {
   pineapples = game.add.group();
   pineapples.enableBody = true;
   pineapples.physicsBodyType = Phaser.Physics.ARCADE;

   for (var i = 0; i < 10; i++) {
     var pineapple = pineapples.create(200 +i *48,50, 'ball');

     pineapple.body.collideWorldBounds=true
     pineapple.body.gravity.x = game.rnd.integerInRange(-50, 50);
     pineapple.body.gravity.y = 100 + Math.random() * 100;
     pineapple.body.bounce.setTo(0.9, 0.9);
   }
 }
