//定义飞机类
function Plane(x, y){
  this.x = x;
  this.y = y;
  this.width = CONFIG.planeSize.width;
  this.height = CONFIG.planeSize.height;
  this.speed = CONFIG.planeSpeed;
}
Plane.prototype.createPlane = function(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(planeImg, this.x, this.y, this.width, this.height);
};
//飞机图片
var planeImg = new Image();  
planeImg.src = CONFIG.planeIcon;

//初始化飞机位置
var plane = new Plane();
plane.x = 350;
plane.y = 470;
planeImg.onload = function(){
	plane.createPlane();
};