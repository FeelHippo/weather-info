import React, { Component, Fragment } from 'react';
import Graph from '../graph/graph';
import '../litView/litView.js'
import updateTime from './clock-works.js'
import '../../style/clock-style.css'
import api from '../../api/api'

const { get_temperature, get_power } = api(); 

export default class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date(),
            graph_view: true,
            temperature_chunk: [],
            temperature_unit: '',
            power_chunk: [],
            power_unit: ''
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
        // call to API, retrieve chunk of data
        if(this.state.time.getSeconds() % 5 === 0) {
                const { temperature_chunk, temperature_unit } = await get_temperature(this.state.time);
                const { power_chunk, power_unit } = await get_power(this.state.time);
                
                this.setState(state => {
                    return { temperature_chunk, temperature_unit, power_chunk, power_unit }
                })
        }
        
    }

    render() {
        const { time, graph_view, temperature_chunk, temperature_unit, power_chunk, power_unit } = this.state
        return(
            <Fragment>
                {graph_view?
                    <div>
                        <Graph data={ temperature_chunk } unit={ temperature_unit } />
                        <Graph data={ power_chunk } unit={ power_unit } />
                    </div>                    
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