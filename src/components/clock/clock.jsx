import React, { Component, Fragment } from 'react';
import updateTime from './clock-works.js'
import '../../style/clock-style.css'

export default class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date()
        }
    }
    // I am not using this.state here because, according to the official documentation:
    // "If you don't use something in render(), it shouldn't be in the state"
    componentDidMount() {
        this.intervalID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.intervalID)
    }

    async tick() {
        this.setState({
            time: new Date()
        });
        await updateTime(this.state.time)
    }

    render() {
        const { time } = this.state
        return(
            <Fragment>
                {this.state.time ?
                    <canvas id="canv"></canvas>
                    : <div>Loading</div>
                }
                
            </Fragment>
        )
    }
}