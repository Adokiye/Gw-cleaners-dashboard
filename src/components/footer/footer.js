import React, { Component } from "react";
import "./styles/footer.css";

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }

    // callAPI() {
    //     fetch("http://localhost:9000/testAPI")
    //         .then(res => res.text())
    //         .then(res => this.setState({ apiResponse: res }))
    //         .catch(err => err);
    // }

    // componentDidMount() {
    //     this.callAPI();
    // }

    render() {
        return (
            <div className="footer">
                <p>copyright @ GWCleaners 2019</p>
            </div>
        );
    }
}

export default Footer;