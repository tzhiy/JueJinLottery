import React, { Component } from 'react'
import './index.css'

export default class Lottery extends Component {
    render() {
        return (
            <div className="lottery">
                <div className="turntable-box">
                    <div className="upper-border up-down"></div>
                    <div className="lower-border up-down"></div>
                    <div className="left-border left-right"></div>
                    <div className="right-border left-right"></div>
                    <div className="blocks">
                        <div className="item-container">
                            <div className="turnable-item lottery-item"></div>
                            <div className="turnable-item lottery-item"></div>
                            <div className="turnable-item lottery-item"></div>
                            <div className="turnable-item lottery-item"></div>
                            <div className="lottery-item lottery-start">
                                <div className="lottery-text">
                                    抽奖
                                </div>
                                <div className="text">
                                    200矿石/次
                                </div>
                            </div>
                            <div className="turnable-item lottery-item"></div>
                            <div className="turnable-item lottery-item"></div>
                            <div className="turnable-item lottery-item"></div>
                            <div className="turnable-item lottery-item"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
