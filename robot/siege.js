(function(){
  var MyRobot, tr;
  importScripts('../base-robot.js');
  MyRobot = (function(superclass){
    var prototype = extend$((import$(MyRobot, superclass).displayName = 'MyRobot', MyRobot), superclass).prototype, constructor = MyRobot;

    prototype.onIdle = function(){
      var myAngle, forward, tinyMove, tinyShoot, leftDist, rightDist;
      myAngle = this.me.angle % 360;
      if (this.myVarEnemy) {
        forward = false;
        tinyMove = 20;
        tinyShoot = 5;
        leftDist = myAngle + 360 - this.myVarEnemy[0].angle;
        if (leftDist > 360) {
          leftDist = leftDist - 360;
        }
        rightDist = this.myVarEnemy[0].angle - myAngle;
        if (rightDist < 0) {
          rightDist = 360 + rightDist;
        }
        if (leftDist !== rightDist) {
          if (Math.random() > 0.5) {
            forward = true;
          }
          if (leftDist > rightDist) {
            this.turn_turret_right(rightDist + tinyShoot);
          } else {
            this.turn_turret_left(leftDist + tinyShoot + 30);
          }
          if (forward) {
            this.move_forwards(tinyMove);
          } else {
            this.move_backwards(tinyMove);
          }
        } else {
          this.shoot();
        }
        this.myVarEnemy = undefined;
      }
      else {
        this.turn_turret_left(15);
        this.turn_left(45);
        this.move_forwards(50);
      }
    };
    prototype.onWallCollide = function(){
      this.move_opposide(10);
      this.turn_left(90);
      this.move_forwards(30);
    };
    prototype.onHit = function(){
    };
    prototype.onEnemySpot = function(){
      this.myVarEnemy = this.enemySpot;
      this.shoot();
    };
    function MyRobot(){
      MyRobot.superclass.apply(this, arguments);
    }
    return MyRobot;
  }(BaseRobot));
  tr = new MyRobot("MyRobot");
  function extend$(sub, sup){
    function fun(){} fun.prototype = (sub.superclass = sup).prototype;
    (sub.prototype = new fun).constructor = sub;
    if (typeof sup.extended == 'function') sup.extended(sub);
    return sub;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
