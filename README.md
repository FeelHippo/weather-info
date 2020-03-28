This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Execute App

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.<br />

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
