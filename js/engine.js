var moveleft = false;    //飞机左移
var moveright = false;   //飞机右移
var cancle;              //reustAnimationFrame
var level = 1;           //游戏等级
var score = 0;           //分数
var boom = new Enemy();  //爆炸怪兽
var boomTime;            //爆炸帧
/*
  按键监控
   */
document.onkeydown = function(e){
	var key  = e.keyCode || e.which || e.charCode;
	switch(key){
	case 37:  //向左移动
	moveleft = true;
	break;
	case 39:   //向右移动
	moveright = true;
	break;
	case 32:    //空格  按下空格生成子弹
	shot = true;
	var bullet1 = new Bullet();
			bullet1.x = plane.x;
			bullet1.y = plane.y;
			bulletArr.push(bullet1);
			bulletNum ++;
	break;
	}
};
document.onkeyup = function(e){
  var key  = e.keyCode || e.which || e.charCode;
  switch(key){
  case 37:
  moveleft = false;
  break;
  case 39:
  moveright = false;
  break;
  case 32:
  shot = false;
  break;
  }
};
//游戏控制函数    
function play(){
	if(bulletNum > 1800){bulletNum = 0;} //防止子弹过多  
  if(level > CONFIG.totalLevel){
    CONFIG.status = 'all-success';
		GAME.all_success();
    cancelAnimationFrame(cancle);
  }
  if(CONFIG.status == 'failed'){
    GAME.failed();
  }
  if(CONFIG.status == 'success'){
    GAME.success();
  }
 //如果游戏状态为playing开始游戏
  if(CONFIG.status = 'playing'){
    //获取飞机位置
    if(moveleft){
      if(plane.x <= 35){
          plane.x = 35;
      }
      plane.x -= 5;
    }
    if(moveright){
      if(plane.x > 615){
        plane.x = 615;
      }
      plane.x += 5;
    }
		//绘制飞机
    plane.createPlane();
//		将怪兽按x轴坐标排序以方便判断是否需要左移右移 以及是否触碰边界
		enemyArr.sort(sort);
		//绘制怪兽 
    if(CONFIG.enemyDirection == 'left'){
      moveLeft();
    }
    if(CONFIG.enemyDirection == 'right'){
      moveRight();
    }
		//绘制子弹
    for(var i = 0; i < bulletArr.length; i++){
      bulletArr[i].y -= bulletArr[i].speed;
        if(bulletArr[i].y < 0){  //删除出界子弹
          bulletArr.splice(i,1);
          i--;
          continue;
        }
        bulletArr[i].createBullet(); 
    } 
		//检测是否打到飞机 或飞机出界
    die();
    if(boomTime < 4){
        boom.boom();
        boomTime++;
    }
		//绘制分数
    createScore();
    cancle = requestAnimationFrame(play);
  }
}