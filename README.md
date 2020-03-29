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