// 元素
var container = document.getElementById('game');
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // name has changed in Webkit
                                      window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());    
/**
 * 整个游戏对象
 */
var GAME = {
  /**
   * 初始化函数,这个函数只执行一次
   * @param  {object} opts 
   * @return {[type]}      [description]
   */
  init: function(opts) {
    this.status = 'start';
    this.bindEvent();
  },
  bindEvent: function() {
    var self = this;
    var playBtn = document.querySelector('.js-play');
    // 开始游戏按钮绑定
    playBtn.onclick = function() {
      self.playing();   
    };
  },
	//下一关控制函数
  nextplay:function(){       
    var self = this;
    var nextgame = document.querySelector('.js-next');
      nextgame.addEventListener('click',function(e){
				var target = e.target;
				plane.x = 350;
				plane.y = 470;
				enemyArr = []; 
				bulletArr = [];      //子弹数组
				moveleft = false;    //飞机左移
				moveright = false;   //飞机右移
				bulletNum = 0;       //初始化子弹数量
				CONFIG.enemyDirection = 'right';  //初始化怪兽移动方向
				for(var i = 0;i < level;i++){     //初始化怪兽数组
					enenmyC(CONFIG.canvasPadding , CONFIG.canvasPadding + i * CONFIG.enemySize);
				}
				CONFIG.status = 'plsying';        //改变游戏状态
				self.setStatus('playing');        //改变页面显示
      })
  },
	//重新游戏控制函数
  replay:function(){     
    cancelAnimationFrame(cancle);
    var self = this;
    var replayBtn = document.querySelectorAll('.js-replay');
    for(var i = 0;i < replayBtn.length;i++){
        replayBtn[i].addEventListener('click',function(e){
          var target = e.target;
          plane.x = 350;
          plane.y = 470;
          enemyArr = []; 
          bulletArr = [];      //子弹数组
          moveleft = false;    //飞机左移
          moveright = false;   //飞机右移
          bulletNum = 0;       //初始化子弹数量
          score = 0;           //初始化分数
          level = 1;           //初始化等级
          CONFIG.enemyDirection = 'right';  //初始化怪兽移动方向
          for(var i = 0;i < level;i++){     //初始化怪兽数组
             enenmyC(CONFIG.canvasPadding , CONFIG.canvasPadding + i * CONFIG.enemySize);
          }
          CONFIG.status = 'start';          //改变游戏状态
          self.setStatus('playing');        //改变页面显示
        })
    }
  },
  /**
   * 更新游戏状态，分别有以下几种状态：
   * start  游戏前
   * playing 游戏中
   * failed 游戏失败
   * success 游戏成功
   * all-success 游戏通过
   * stop 游戏暂停（可选）
   */
  setStatus: function(status) {
    this.status = status;
    container.setAttribute("data-status", status);
  },
  playing: function() {
    this.setStatus('playing');
    CONFIG.status = 'playing';
    play();
  },
  all_success: function(){
    this.setStatus('all-success');
    this.replay();
  },
  failed:function(){
    document.querySelector('.score').innerText = score;
    this.setStatus('failed');
    this.replay();
  },
  success:function(){
    document.querySelector('.game-next-level').innerText = "第" + level + "关";
    this.setStatus('success');
    this.nextplay();
  }
};
// 初始化
GAME.init();

