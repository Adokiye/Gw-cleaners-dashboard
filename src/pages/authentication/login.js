import React, { Component } from "react";
import "./styles/login.css";
import Cookies from "js-cookie";
import { API_URL } from "../../root.js";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: "",
      email: "",
      password: "",
      error: "",
      error_div: false
    };
  }
  log() {
    //    console.log("djdjd")
    const { state = {} } = this.props.location;
    const { prevLocation } = state;
    let regg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (regg.test(this.state.email) === false) {
      this.setState({ error: "Incorrect Credentials", error_div: true });
    } else if (this.state.password.length < 1 || this.state.email.length < 1) {
      this.setState({
        error: "Please fill all required fields",
        error_div: true
      });
    } else {
      this.setState({ error_div: false });
      var bodyParameters = {
        email: this.state.email,
        password: this.state.password
      };
      axios
        .post(API_URL + "login_admin", bodyParameters, {
          timeout: 20000
        })
        .then(response => {
          console.log(response);
          let id = response.data.data._id;
          let token = response.data.token;
          let role = response.data.role;
          Cookies.set("token", token, { expires: 14 });
          Cookies.set("id", id, { expires: 14 });
          Cookies.set("role", role, { expires: 14 });
          // this.props.setToken(token);
          // this.props.setId(id);
          //      Toast.show('Sign in successful');
          this.props.setLog();
          if (prevLocation !== "/") {
            this.props.history.push("/dashboard");
          } else {
            this.props.history.push("/dashboard");
          }

          //           this.props.navigation.navigate("Dashboard", {});
        })
        .catch(error => {
          console.log(error);
          //       Toast.show(JSON.stringify(error.message),)
          this.setState({
            error: JSON.stringify(error.message),
            error_div: true
          });
          //             this.setState({ regLoader: false });
          if (error.response) {
            this.setState({
              error: JSON.stringify(error.response.message),
              error_div: true
            });
            console.log(JSON.stringify(error));
          }
        });
    }
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
      <div className="middle-box">
        <p className="login-text">Log In</p>
        <p className="sub-text">Welcome! Fill details below to login</p>
        {this.state.error_div && (
          <div className="error">{this.state.error}</div>
        )}
        <div className="form-box">
          <p className="label-text">Email</p>
          <input
            type="email"
            value={this.state.email}
            onChange={event => this.setState({ email: event.target.value })}
          />
          <p className="label-text">Password</p>
          <input
            type="password"
            value={this.state.password}
            onChange={event => this.setState({ password: event.target.value })}
          />
        </div>
        <button className="button" onClick={this.log.bind(this)}>
          Sign in
        </button>
        {/* <a href=""><p className="forgot-text">Forgot Password</p></a> */}
      </div>
    );
  }
}

export default Login;
