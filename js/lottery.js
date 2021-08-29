window.addEventListener('load', function () {

    // 抽奖数据信息
    var mineral = 1000;
    var username = '掘金用户';
    // 奖品序列
    prizeList = ['奖品1', '奖品2', '奖品3', '奖品4', '奖品5', '奖品6', '奖品7', '奖品8']
    prizeImgList = ['images/prize/kuangshi.awebp', 'images/prize/kuangshi.awebp', 'images/prize/kuangshi.awebp', 'images/prize/kuangshi.awebp', 'images/prize/kuangshi.awebp', 'images/prize/kuangshi.awebp', 'images/prize/kuangshi.awebp', 'images/prize/kuangshi.awebp',]
    // 抽奖结果
    drawConclusionList = []


    // 初始化界面
    class Init {
        constructor() {
            //转盘上顺时针展示奖品的序列号
            this.showPrize = [0, 7, 6, 1, 5, 3, 2, 4]
            this.value = document.querySelector('.value');
            this.initGetMineral();
            this.initPrizeInfo();
        }
        // 刷新矿石数量
        showMineralNum() {
            if (this.value.innerHTML != null)
                this.value.innerHTML = mineral;
        }
        // 初始化获取矿石按钮
        initGetMineral() {
            this.showMineralNum();
            var tosignin = document.querySelector('.tosignin');
            tosignin.addEventListener('click', function () {
                // 防止点击过快，间隔 200ms
                tosignin.className = 'tosignin clickban';
                mineral += 1000;
                this.showMineralNum();
                setTimeout(function () {
                    tosignin.className = 'tosignin';
                }, 200);
            }.bind(this))
        }
        // 向转盘中填入奖品信息
        initPrizeInfo() {
            var turnable_items = document.querySelectorAll('.turnable-item');
            for (let i = 0; i < 8; i++) {
                //创建图片节点
                var image = document.createElement('div');
                image.className = 'image';
                var img = document.createElement('img');
                image.appendChild(img);
                //创建文字节点
                var text = document.createElement('div');
                text.className = 'text';
                //填入图片和文字信息
                img.src = prizeImgList[this.showPrize[i]];
                text.innerHTML = prizeList[this.showPrize[i]];
                //添加节点
                turnable_items[i].appendChild(image);
                turnable_items[i].appendChild(text);
            }
        }
    }

    // 抽奖
    class Prize {
        constructor() {
            // 抽到的奖品编号
            this.current_prizekey = -1;
            this.draw();
            this.winning_list = document.querySelector('.winning-list');
        }
        // 点击抽奖
        draw() {
            var start = document.querySelector('.lottery-start');
            start.addEventListener('click', function () {
                // 判断矿石是否足够
                if (mineral < 200) {
                    alert('矿石不足');
                    return;
                } else {
                    mineral -= 200;
                    init.showMineralNum();
                }
                // 点击开始后禁止再次点击
                start.className = 'lottery-item lottery-start clickban'
                // 首先得到结果
                this.drawConclusion();
                // 添加结果到抽奖结果序列中
                this.addDrawConclusion();
                // 播放动画
                this.drawAnimation()
                // 4 秒后解除禁止点击效果
                setTimeout(function () {
                    start.className = 'lottery-item lottery-start'
                }, 4000)
            }.bind(this))
        }
        // 得出抽奖信息
        drawConclusion() {
            // 返回 1 - 8 之间的随机整数
            this.current_prizekey = Math.floor(Math.random() * 7);
        }
        // 添加结果到抽奖结果序列中
        addDrawConclusion() {
            drawConclusionList.push(this.current_prizekey);
        }
        // 抽奖动画
        drawAnimation() {
            //顺时针旋转的下标
            var drawSequence = [0, 3, 5, 6, 7, 4, 2, 1];
            var turnable_items = document.querySelectorAll('.turnable-item');
            //先清除选中效果
            for (let i = 0; i < 8; i++) {
                turnable_items[i].className = 'turnable-item lottery-item';
            }
            //旋转圈数，先转3圈，再转到指定奖品
            let flag = 3;
            let i = 0;
            turnable_items[drawSequence[i]].className = 'turnable-item lottery-item current-select';
            var timer = setInterval(function () {
                turnable_items[drawSequence[i]].className = 'turnable-item lottery-item';
                i = i + 1;
                if (i == 8) {
                    i = 0;
                    flag--;
                }
                if (flag <= 0 && i == this.current_prizekey) {
                    //动画结束后显示抽奖信息
                    this.showDrawInfo()
                    clearInterval(timer);
                }
                turnable_items[drawSequence[i]].className = 'turnable-item lottery-item current-select';
            }.bind(this), 100)
        }
        // 抽奖信息显示到列表中
        showDrawInfo(current_prizekey) {
            var winning_item = document.createElement('div');
            winning_item.className = 'item';
            winning_item.innerHTML = '<p class="message">🎉 恭喜<span class="username"> ' + username + ' </span>抽中' + prizeList[this.current_prizekey] + '</p><p class="date">2021-8-28</p>'
            this.winning_list.appendChild(winning_item);
        }
    }


    var init = new Init();
    var prize = new Prize();
})