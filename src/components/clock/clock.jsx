import React, { Component, Fragment } from 'react';
import Graph from '../graph/graph';
import '../litView/litView.js'
import updateTime from './clock-works.js'
import '../../style/clock-style.css'

export default class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date(),
            graph_view: false
        }
    }
    
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
        try {
            if(this.state.time.getSeconds() === 5) {
                
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { time, graph_view } = this.state
        return(
            <Fragment>
                {graph_view?
                    <Graph time={ time } />
                    : <lit-view time={ time } />
                }
                
                {this.state.time ?
                    <canvas id="canv"></canvas>
                    : <div>Loading</div>
                }
            </Fragment>
        )
    }
}