import React, { Component } from 'react';

class Datamodel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            video: "",
            status: ""
        }
    }

    componentDidMount = () => {
        this.userData();
    }
    

    userData = () => {
        this.setState({ video: "https://www.youtube.com/embed/t_HIcjti_no?autoplay=1"});
    }

    render = () => {
        return (
            <div>
                <iframe width="1400" height="800" src={this.state.video} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
        );
    }
}

export default Datamodel;