window.addEventListener('load', function () {

    // 抽奖数据信息
    var mineral = 1200;
    var username = '掘金用户';
    // 奖品序列
    prizeList = ['掘金限量桌垫', '随机限量徽章', '掘金新款T恤', '乐高海洋巨轮', 'Switch', 'Yoyo抱枕', '掘金马克杯', 'Bug']
    // 奖品图片序列
    prizeImgList = ['1.awebp', '2.awebp', '3.awebp', '4.awebp', '5.awebp', '6.awebp', '7.awebp', '8.awebp']
    // 奖品抽奖权重序列
    prizeWeight = [30, 20, 20, 10, 5, 20, 20, 150]
    // 抽奖结果（奖品序列的下标，从 0 开始）
    drawConclusionList = []


    // 初始化界面
    class Init {
        constructor() {
            //转盘上顺时针展示奖品的序列号
            this.showPrize = [0, 7, 6, 1, 5, 2, 3, 4]
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
                img.src = 'prize/' + prizeImgList[this.showPrize[i]];
                console.log(img.src)
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
            this.content = document.querySelector('.content');
            this.start = document.querySelector('.lottery-start');
            this.draw();
        }
        // 点击抽奖
        draw() {
            this.start.addEventListener('click', function () {
                // 判断矿石是否足够
                if (mineral < 200) {
                    alert('矿石不足');
                    return;
                } else {
                    mineral -= 200;
                    init.showMineralNum();
                }
                // 点击开始后禁止再次点击
                this.start.className = 'lottery-item lottery-start clickban'
                // 首先得到结果
                this.drawConclusion();
                // 添加结果到抽奖结果序列中
                this.addDrawConclusion();
                // 播放动画后解除禁止点击效果
                this.drawAnimation()
            }.bind(this))
        }
        // 得出抽奖信息
        drawConclusion() {
            let prizeWeightSum = 0;
            for (var key in prizeWeight) {
                prizeWeightSum += prizeWeight[key];
            }
            // 返回小于权重之和的随机正数
            let random = Math.random() * prizeWeightSum;
            // 得到抽奖结果
            let preWeightSum = 0;
            for (var key in prizeWeight) {
                preWeightSum += prizeWeight[key];
                if (random < preWeightSum) {
                    this.current_prizekey = key;
                    return;
                }
            }
        }
        // 添加结果到抽奖结果序列中
        addDrawConclusion() {
            drawConclusionList.push(this.current_prizekey);
        }
        // 抽奖动画
        drawAnimation() {
            // 顺时针旋转的下标
            var drawSequence = [0, 3, 5, 6, 7, 4, 2, 1];
            var turnable_items = document.querySelectorAll('.turnable-item');
            // 先清除选中效果
            for (let i = 0; i < 8; i++) {
                turnable_items[i].className = 'turnable-item lottery-item';
            }
            // 旋转圈数，先转3圈，再转到指定奖品
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
                    // 动画结束后显示抽奖信息
                    this.showDrawInfo()
                    // 解除鼠标禁止点击开始抽奖的效果
                    this.start.className = 'lottery-item lottery-start'
                    clearInterval(timer);
                }
                turnable_items[drawSequence[i]].className = 'turnable-item lottery-item current-select';
            }.bind(this), 100)
        }
        // 抽奖信息显示到列表中
        showDrawInfo(current_prizekey) {
            var winning_item = document.createElement('div');
            winning_item.className = 'item';
            winning_item.innerHTML = '<p class="message">🎉 恭喜<span class="username"> ' + username + ' </span>抽中' + prizeList[this.current_prizekey] + '</p><p class="date">' + this.getCurrentDate() + '</p>'
            this.content.appendChild(winning_item);
            // 信息大于 5 条时显示滚动效果
            if (this.content.children.length > 5) {
                // 向上平移
                this.content.style.transform = 'translateY(-30px)'
                this.content.style.transition = '1s ease-in'
                setTimeout(function () {
                    // 平移完成后首先删掉第一个子节点
                    this.content.removeChild(this.content.children[0])
                    // 再立即将位置复原
                    this.content.style.transition = '0s'
                    this.content.style.transform = 'translateY(0)'
                }.bind(this), 1000)
            }
        }
        getCurrentDate() {
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            return year + '-' + month + '-' + day;
        }
    }

    var init = new Init();
    var prize = new Prize();
})