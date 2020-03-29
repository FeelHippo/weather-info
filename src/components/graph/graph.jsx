import React, { Component, Fragment } from 'react';

export default class Graph extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        console.log('Initialized Graph');
        
    }

    render() {
        return (
            <Fragment>
                <div>Current Reading</div>
            </Fragment>
        )
    }
}