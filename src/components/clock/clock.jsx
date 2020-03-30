import React, { Component, Fragment } from 'react';
import Graph from '../graph/graph';
import '../litView/litView.js';
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
        const { graph_view, temperature_chunk, temperature_unit, power_chunk, power_unit } = this.state
        return(
            <div className='home'>
                {graph_view && temperature_chunk[0] && power_chunk[0]?
                    <div className='graph_container'>
                        <section className='chart'>
                            <Graph data={ temperature_chunk } unit={ temperature_unit } />
                        </section>
                        <section className='chart'>
                            <Graph data={ power_chunk } unit={ power_unit } />
                        </section>
                    </div>                    
                    : <div className="lds-dual-ring graph_container"></div>
                }
                <div className='lit'>
                    {power_chunk ? 
                        <lit-view data={ power_chunk } unit={ power_unit } />
                        : <div className="lds-dual-ring canvas"></div>
                    }
                    
                </div>
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