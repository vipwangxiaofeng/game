//画子弹函数
function darwLine(x, y){
  context.beginPath();
  context.lineWidth = 1;
  context.strokeStyle = "#fff";
  context.moveTo(x + CONFIG.planeSize.width / 2, y - CONFIG.bulletSize);
  context.lineTo(x + CONFIG.planeSize.width / 2, y);
  context.closePath();
  context.stroke();
}
//定义子弹类
function Bullet(x, y){
  this.x = x;
  this.y = y;
  this.size = CONFIG.bulletSize;
  this.speed = CONFIG.bulletSpeed;
}
Bullet.prototype.createBullet = function(){
  darwLine(this.x, this.y);
}
var bulletArr = [];      //子弹数组
var bulletNum = 0;       //初始化子弹数量