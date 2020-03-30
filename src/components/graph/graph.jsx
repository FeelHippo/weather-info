import React, { Component, Fragment } from 'react';
import MetricsGraphics from 'react-metrics-graphics';
import './metricsgraphics.css';

export default class Graph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            unit: '',
            min: 0,
            max: 0
        }
    }
    // a good old async await here seems to be fixing an issue I had with the data inflow
    // afterall the amount of data is consistent == 720 x 2 items each render
    async componentDidMount() {
        try {
            let today = new Date();            
            const data_formatted = [...this.props.data];

            if (this.props.unit === 'dK') {
                // note to self: forEach takes a second parameter which is the 'this' of the scope
                // this is necessary because data_formatted in this case is NOT the 'this' of the .forEach()
                // converted "degree Kelvin" into Celsius. "degree Kelvin" is now known as °K
                await data_formatted.forEach((el, index) => {
                    el.time = new Date( today.getFullYear(), 
                                        today.getMonth(),  
                                        today.getDate(), 
                                        `${el.time.split(':')[0]}`, 
                                        `${el.time.split(':')[1]}`, 
                                        `${el.time.split(':')[2]}`);
                    el.value = el.value - 273.15;
                }, data_formatted);

                // find min and max values within the current array, use it to define graph resolution
                const chunk_min = Math.min.apply(Math, data_formatted.map(function(o) { return o.value }));
                const chunk_max = Math.max.apply(Math, data_formatted.map(function(o) { return o.value }));
            
                this.setState(state => {
                    const data = [...data_formatted]
                    const unit = this.props.unit
                    const min = chunk_min
                    const max = chunk_max
                    return { data, unit, min, max }
                })
            } else if (this.props.unit === 'MW') {
                await data_formatted.forEach((el, index) => {
                    el.time = new Date( today.getFullYear(), 
                                        today.getMonth(),  
                                        today.getDate(), 
                                        `${el.time.split(':')[0]}`, 
                                        `${el.time.split(':')[1]}`, 
                                        `${el.time.split(':')[2]}`);
                    el.value = parseFloat(el.value) * 1000;
                }, data_formatted);

                // find min and max values within the current array, use it to define graph resolution
                const chunk_min = Math.min.apply(Math, data_formatted.map(function(o) { return o.value }));
                const chunk_max = Math.max.apply(Math, data_formatted.map(function(o) { return o.value }));
            
                this.setState(state => {
                    const data = [...data_formatted]
                    const unit = this.props.unit
                    const min = chunk_min
                    const max = chunk_max
                    return { data, unit, min, max }
                })
            }
            
        } catch (error) {
            console.log(error);
        }        
    }


    render() {
        const {data, unit, min, max} = this.state;
        
        return (
            <Fragment>
                {data ?
                    <div className='chart'>
                        <MetricsGraphics
                            title={ unit === 'dK' ? 'Temperature' : 'MegaWatts' }
                            data= { data }
                            width={600}
                            height={300}
                            x_accessor="time"
                            y_accessor="value"
                            min_y={ min }
                            max_y={ max }
                            animate_on_load={true}
                        />
                    </div>
                    :
                    ''
                }
                
            </Fragment>
        )
    }
}