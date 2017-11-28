//定义怪兽类
function Enemy(x, y){
  this.x = x;
  this.y = y;
  this.width = CONFIG.enemySize;
  this.height = CONFIG.enemySize;
}
Enemy.prototype.createEnemy = function(){
  context.drawImage(enemyImg, this.x, this.y, this.width, this.height);
}
Enemy.prototype.boom = function(){
    context.drawImage(boomImg, this.x, this.y, this.width, this.height);
}
//怪兽数组
function enenmyC(x, y){
  var enemy = new Enemy();
  enemy.x = x;
  enemy.y = y;
  enemyArr.push(enemy);
  for(var i = 0; i < CONFIG.numPerLine; i++){
    enemy1 = new Enemy();
    enemy1.x =  x;
    enemy1.x += (CONFIG.enemyGap + enemy1.width) * (i + 1);
    enemy1.y = y ; 
    enemyArr.push(enemy1);
  }
}
//怪兽右移
function moveRight(){
  if(enemyArr.length == 0){   //判断这一关是否通关
      CONFIG.status = 'success';
      return;
    }
	//判断是否需要右移   
  if(enemyArr[enemyArr.length - 1].x < canvas.width -  CONFIG.canvasPadding - CONFIG.enemySize){
    for(var j = 0; j < enemyArr.length;j++){
      enemyArr[j].x += CONFIG.enemySpeed; 
      enemyArr[j].createEnemy();
    }
  }
		//右移完成后将状态改为左移 并将怪兽下移
  if(enemyArr[enemyArr.length - 1].x == canvas.width -CONFIG.canvasPadding - CONFIG.enemySize){
    CONFIG.enemyDirection = 'left';
     for(var i = 0;i<enemyArr.length;i++){
      enemyArr[i].y += CONFIG.enemySize;
    }
  }  
}
// 怪兽左移
function moveLeft(){
  if(enemyArr.length == 0){
      CONFIG.status = 'success';
      return;
    }
  if(enemyArr[enemyArr.length - 1].x < canvas.width -CONFIG.canvasPadding - CONFIG.enemySize || enemyArr[enemyArr.length - 1].x == canvas.width - CONFIG.canvasPadding - CONFIG.enemySize){
    for(var i = 0;i<enemyArr.length;i++){
        enemyArr[i].x -= CONFIG.enemySpeed;
        enemyArr[i].createEnemy();
      }
  }
  if(enemyArr[0].x == CONFIG.canvasPadding){
    CONFIG.enemyDirection = 'right';
    for(var i = 0;i<enemyArr.length;i++){
      enemyArr[i].y += CONFIG.enemySize;
    }
  }
}
//排序函数 将怪兽按x轴坐标排序以方便判断是否需要左移右移
function sort(a , b){
    return a.x - b.x;
}
//判断是否打中飞机及更新游戏状态
function die() {
  for(var k = 0; k < enemyArr.length; k++){
			//检测怪兽是否碰到飞机
    if(enemyArr[k].y > canvas.height - CONFIG.canvasPadding - CONFIG.planeSize.height){
      CONFIG.status = 'failed';
      break;
    }		
    for(var j = 0; j < bulletArr.length; j++){
      if(bulletArr[j].x > enemyArr[k].x - 1 - CONFIG.enemySize /2 + CONFIG.enemySize / 11 * 2 && bulletArr[j].x < enemyArr[k].x + CONFIG.enemySize / 2 - CONFIG.enemySize / 11 * 2  && bulletArr[j].y < enemyArr[k].y + CONFIG.enemySize && bulletArr[j].y > enemyArr[k].y + bulletArr[j].size){          //检测子弹是否打中怪兽
          boom.x = enemyArr[k].x;  //爆炸怪兽
          boom.y = enemyArr[k].y;
          boomTime = 1;
        enemyArr.splice(k, 1);  //删除打到怪兽
        bulletArr.splice(j, 1);  //删除打到的子弹
        k--;
        j--;
        score += 1;
					//判断是否过关
        if(enemyArr.length == 0){
          CONFIG.status = 'success';
          level++;
          break;
        }
        break;
      }
    }
  }
}  
//初始化怪兽信息
var enemyImg = new Image();
enemyImg.src = CONFIG.enemyIcon;
var boomImg = new Image();
boomImg.src = CONFIG.enemyBoomIcon; 
var enemyArr = [];       //初始化怪兽数组
enemyImg.onload = function(){
  for(var i = 0;i < level;i++){
    enenmyC(CONFIG.canvasPadding , CONFIG.canvasPadding + i * CONFIG.enemySize);
  }
}