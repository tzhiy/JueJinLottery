import React, { Component } from 'react'
import './index.css'
import Sidebar from '../Sidebar'
import RightWarp from '../RightWrap'

export default class MainContainer extends Component {
    render() {
        return (
            <main className="main-container">
                <Sidebar />
                <RightWarp />
            </main>
        )
    }
}
