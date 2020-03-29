import React, { Component, Fragment } from 'react';
import MetricsGraphics from 'react-metrics-graphics';
import './metricsgraphics.css';

export default class Graph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            unit: ''
        }
    }

    componentDidMount() {
        try {
            let today = new Date();
            const data_formatted = [...this.props.data];
            // note to self: forEach takes a second parameter which is the 'this' of the scope
            // this is necessary because data_formatted in this case is NOT the 'this' of the .forEach()
            data_formatted.forEach((el, index) => {
                el.time = new Date( today.getFullYear(), 
                                    today.getMonth(),  
                                    today.getDate(), 
                                    `${el.time.split(':')[0]}`, 
                                    `${el.time.split(':')[1]}`, 
                                    `${el.time.split(':')[2]}`);
            }, data_formatted);
            
            console.log(data_formatted);
        
            this.setState(state => {
                const data = [...data_formatted]
                const unit = this.props.unit
                return { data, unit }
            })
        } catch (error) {
            console.log(error);
        }        
    }

    render() {
        const {data, unit} = this.state;
        console.log(data);
        
        return (
            <Fragment>
                {data ?
                    <div>
                        <MetricsGraphics
                            title={ unit === 'dK' ? 'Temperature' : 'kWh' }
                            description="Temperature over the past hour."
                            data= { data }
                            width={400}
                            height={250}
                            x_accessor="time"
                            y_accessor="value"
                        />
                    </div>
                    :
                    ''
                }
                
            </Fragment>
        )
    }
}