import React, { Component } from 'react'
import './index.css'
import Lottery from '../Lottery'

import lottery_background from '../../common/images/background/lottery_background.png'
import lottery_title from '../../common/images/background/lottery_title.png'

export default class LotteryContainer extends Component {
    render() {
        return (
            <div className="lottery-container">
                <img className='bg-img' src={lottery_background} alt="" />
                <div className="title-box">
                    <img src={lottery_title} alt="" />
                </div>
                <div className="main">
                    <p className="title">幸运抽奖</p>
                    <div className="lottery-box">
                        <div className="left-part">
                            <div className="left-part-header">
                                <p className="current_value">
                                    当前矿石数：
                                    <span className="value">-1</span>
                                </p>
                                <span className="tosignin">我要矿石</span>
                            </div>
                            <Lottery />
                        </div>
                        <div className="right-part">
                            <p className="title lottery-title">
                                获奖记录
                            </p>
                            <div className="winning-list">
                                <div className="content"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
