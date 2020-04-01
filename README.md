This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Execute App

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000)<br />

Please note, this command simultaneously executes the following command: <br />
```javascript
yaml2json data.yml > data.json
```
[This the NPM resource](https://github.com/jeremyfa/yaml.js) <br />
This is the easiest was I could figure out to convert a rather unhandy .yml file into a common .json, so as to simulate an API request


## Clock Component

This is where I keep track of time, and update the app's internal clock, so to speak. 

[a big thanks to Tiffany Rayside for this cool looking watch](https://codepen.io/tmrDevelops/pen/VYKyge/?editors=0010)

I am not using this.state here because, according to the official documentation:<br />
"If you don't use something in render(), it shouldn't be in the state"

```javascript
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
```
## API 

I have simulated a call to an API, see ./api/api.js<br />
Every 5 seconds the API will retrieve 720 samples from the .yml file.<br />
This is to have 1 hour worth of data on the front end.<br />
I decided to divide the data in two chunks, one for the temperature, and the other, of course, for the power. <br />
I then implement two separate graphs, one for each chunk, so as to have different views at my disposal.<br />

## Graph component

I decided to rely on [MetricsGraphics.js](https://github.com/metricsgraphics/metrics-graphics#resources) to display the data from the API. 
So as to be able to use jQuery with ReactJS, I had to create a loader.<br />
See ./src.loader.js, which I imported in App.js so as to apply it globally: 

```javascript
window.$ = window.jQuery = require('jquery')
```

This allowed me to use [MetricsGraphics React Component](https://github.com/metricsgraphics/react-metrics-graphics), which is a React extension.
This way, I can use the same component, graph.jsx, to display two separate graphs, one dedicated to temperatures, and the other to power. 

See the componente for how I converted dK to Celsius, and MW to kWh

## Gauge

After experimenting with Polymer components a bit, I've come to the conclusion that React is not fully compatible, and it would be counter-productive to integrate a single component into my app.<br />
I then opted for one of Google's Charts. [A gauge with a dial, rendered within the browser using SVG or VML](https://developers.google.com/chart/interactive/docs/gallery/gauge).
Every single time it is rendered, the gauge will use the minimum kWh figure as its minimum, and vice versa max kWh from the same data sample to determine its max.

## NavBar

I have adapted a navigation bar that I regularly use in my personal project, nothing fancy, but quite effective. 

