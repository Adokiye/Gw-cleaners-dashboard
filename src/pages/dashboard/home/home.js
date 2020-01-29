import React, { Component } from "react";
import "./styles/home.css";
import Calendar from 'react-calendar';
import Chart from "chart.js";
import { API_URL } from '../../../root.js'
import axios from "axios";
import { IconContext } from "react-icons";import Cookies from 'js-cookie'
import { MdViewQuilt } from "react-icons/md";
import { FaUsersCog, FaListAlt, FaUsers, FaMapMarkerAlt } from "react-icons/fa";
var moment = require('moment');


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        first_name: '', orders: [], users: [] };
  }

  chartRef = React.createRef();
    
  componentDidMount() {
      const myChartRef = this.chartRef.current.getContext("2d");
      new Chart(myChartRef, {
          type: "line",
          data: {
              //Bring in data
              labels: ["Jan", "Feb", "March"],
              datasets: [
                  {
                      label: "Orders",
                      data: [86, 67, 91],
                  }
              ]
          },
          options: {
              //Customize chart options
          }
      });
      this.getApiData();
  }

  getApiData(){
    console.log(this.props.token)
    if(!this.props.token){
      window.location.reload();
    }
    let token = Cookies.get('token') // => 'value'
let id = Cookies.get('id') // => 'value'
let role = Cookies.get('role')
    var config = {
        headers: {'Authorization': "Bearer " + token},
        timeout: 20000
    };
    axios
    .get(
      API_URL+"orders", config
    )
    .then(response => {
      console.log(response);
      if (response.data && response.data.length > 0) {
        console.log("response.data");
          console.log("here" + response.data);     
         if(response.data.message == 'Token is not valid'){
            this.props.history.push("/");
          }
          var len = response.data.length;
          this.setState({orders: [],})
          for (let i = 0; i < len; i++) {
            let row = response.data[i];
            this.setState(prevState => ({
                orders: [...prevState.orders, row]
              }));
          }
    }
      axios.get(API_URL+"users/" + this.props.id, config).then(response => {
        console.log(response);
        if(response.data.message == 'Token is not valid'){
            this.props.history.push("/");
        }
        this.setState({first_name: response.data.first_name})
        axios.get(API_URL+"users" , config).then(response => {
            console.log(response);
            if(response.data.message == 'Token is not valid'){
                this.props.history.push("/");
            }
            var len = response.data.length;
          this.setState({users: [],})
          for (let i = 0; i < len; i++) {
            let row = response.data[i];
            this.setState(prevState => ({
                users: [...prevState.users, row]
              }));
          }
          }).catch(error => {
        //    this.setState({regLoader: false})
          if(error.code == 'ECONNABORTED'){
       //     Toast.show('Connection TImeout')
        }else if(error.response.status == 404){
            this.props.history.push("/");
        }else{
       //   Toast.show(error.message)
          if(error.message == 'Token is not valid'){
            this.props.history.push("/");
          }
        }
          console.log(error);
        });
      }).catch(error => {
    //    this.setState({regLoader: false})
      if(error.code == 'ECONNABORTED'){
   //     Toast.show('Connection TImeout')
    }else if(error.response.status == 404){
        this.props.history.push("/");
    }else{
   //   Toast.show(error.message)
      if(error.message == 'Token is not valid'){
        this.props.history.push("/");
      }
    }
      console.log(error);
    });
    })
    .catch(error => {
        this.setState({regLoader: false})
      if(error.code == 'ECONNABORTED'){
   //     Toast.show('Connection TImeout')
    }else{
     //   Toast.show(error.message)
        if(error.message == 'Token is not valid'){
            this.props.history.push("/");
        }
    }
      console.log(error);
    });
  }

  render() {
    return (
      <div className="main-box">
      <p className="welcome-header">Hey {this.state.first_name && this.state.first_name}</p>
      <p className="date-text">
      {moment().format("dddd, MMMM Do YYYY")}
      </p>
      <div className="content-box">
      <div className="first-content-div">
          <div className="card-holder">
          <div className="card-div">
              <p className="total-text">TOTAL ORDERS</p>
              <p className="total-value">{this.state.orders.length}</p>             
          </div>
          <div className="card-div">
              <p className="total-text">TOTAL USERS</p>
              <p className="total-value">{this.state.users.length}</p>             
          </div>
          </div>
          <p className="daily-text">Daily Order Analysis</p>
          <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
      </div>
      <div className="first-content-div">
      <Calendar />
      <p className="daily-text">Order Counts</p>
      <div className="order-count-div">
      <p className="total-count-text">This year: {this.state.orders.length}</p>
      <p className="total-count-text">This month: **</p>
      </div>
      </div>
      </div>
      </div>
    );
  }
}

export default Home;
