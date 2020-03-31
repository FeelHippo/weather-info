import React, { Component } from 'react';
import { Chart } from 'react-google-charts';
import '../../style/home.css';


export default class Gauge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            energy_kWh: 0,
            min: 0,
            max: 0
        }
        this.options = {
            width: 600,
            height: 220,
            redFrom: 40500000,
            redTo: 41000000,
            yellowFrom: 40000000,
            yellowTo: 40499999,
            greenFrom: 39000000,
            greenTo: 39500000,
            minorTicks: 5,
            max: 41000000,
            min: 39000000,
            forceIFrame: true
        }
    }

    componentDidMount() {
        let initialValue = 0;
        const energy_kWh = this.props.data.reduce((acc, curr) => acc + parseFloat(curr.value), initialValue) * 1000;
        // find min and max values within the current array, use it to define graph resolution, same as graph.jsx
        // here I select the kWh considering the lowest sample within 60 minutes, and the highest, so as to set the gauge
        const min = Math.min.apply(Math, this.props.data.map(function(o) { return o.value })) * 1000 * 720;
        const max = Math.max.apply(Math, this.props.data.map(function(o) { return o.value })) * 1000 * 720;
        
        this.setState(state => {
            return { energy_kWh, min, max }
        })
    }

    getData = () => {
        return [
          ["Label", "Value"],
          ["kWh", this.state.energy_kWh]
        ];
      };

    render() {
        return (
            <div>
                {this.state.energy_kWh && this.options ?
                    <Chart
                    chartType="Gauge"
                    width="100%"
                    height="400px"
                    data={this.getData()}
                    options={this.options}
                  />
                    : <div className="lds-dual-ring canvas"></div>
                }
            </div>
        )
    }
}