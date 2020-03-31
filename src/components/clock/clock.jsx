import React, { Component } from 'react';
import Graph from '../graph/graph';
import Gauge from '../litView/litView'
import updateTime from './clock-works.js';
import '../../style/home.css'
import '../../style/clock-style.css';
import api from '../../api/api';

const { get_temperature, get_power } = api(); 

export default class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date(),
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
        // call to API, retrieve chunk of data
        if(this.state.time.getSeconds() % 5 === 0) {
            const { temperature_chunk, temperature_unit } = await get_temperature(this.state.time);
            const { power_chunk, power_unit } = await get_power(this.state.time);
            
            this.setState({
                temperature_chunk: temperature_chunk, 
                temperature_unit: temperature_unit, 
                power_chunk: power_chunk, 
                power_unit: power_unit 
            })

        }
        await updateTime(this.state.time);
        this.setState({
            time: new Date()
        })      
    }

    render() {
        const { temperature_chunk, temperature_unit, power_chunk, power_unit } = this.state
        return(
            <div className='home'>
                {temperature_chunk[0] && power_chunk[0] ?
                    <div className='graph_container'>
                        <section className='chart'>
                            <Graph data={ temperature_chunk } unit={ temperature_unit } />
                        </section>
                        <section className='chart'>
                            <Graph data={ power_chunk } unit={ power_unit } />
                        </section>
                        <div className='lit'>
                            <Gauge data={ power_chunk } />
                        </div>
                    </div>                    
                    : <div className="lds-dual-ring graph_container"></div>
                }
                {this.state.time ?
                    <div className='canvas'>
                        <canvas id="canv" width={500} height={500}></canvas>
                    </div>
                    : <div className="lds-dual-ring canvas"></div>
                }
            </div>
        )
    }
}