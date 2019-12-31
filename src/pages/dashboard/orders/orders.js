import React, { Component } from "react";
import "./styles/orders.css";
import Calendar from "react-calendar";
import Chart from "chart.js";
import { IconContext } from "react-icons";
import { MdSettings } from "react-icons/md";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { API_URL } from '../../../root.js';
import axios from "axios";
var moment = require("moment");
class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = { showHideSidenav: "hidden", show: false, orders: [] };
  }

  toggleSidenav() {
    console.log("dkdkd")
    var css = this.state.showHideSidenav === "hidden" ? "show" : "hidden";
    this.setState({ showHideSidenav: css });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleClose() {
    this.setState({ show: false });
  }

  componentDidMount() {
    console.log(this.props.token);
    var config = {
      headers: { Authorization: "Bearer " + this.props.token },
      timeout: 20000
    };
    axios
      .get(API_URL + "orders", config)
      .then(response => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          this.props.history.push("/");
        }
        var len = response.data.length;
        this.setState({ orders: [] });
        for (let i = 0; i < len; i++) {
          let row = response.data[i];
          this.setState(prevState => ({
            orders: [...prevState.orders, row]
          }));
        }
      })
      .catch(error => {
        this.props.history.push("/");
    console.log(error);
  });
  }

  render() {
    let {showHideSidenav} = this.state
    const orders_data = this.state.orders.map(function(item, index) {
      return (
        <tr>
          <td>{item.order_id}</td>
          <td>{item.dropbox_id}</td>
          <td>{item.stage}</td>
          <td>{item.user_name}</td>
          <td>{item.user_no}</td>
          <td>{moment(item.pickup_date).format("dddd, MMMM Do YYYY")}</td>
          <td>{moment(item.dropoff_date).format("dddd, MMMM Do YYYY")}</td>
          <td>
            <a href="#" onClick={()=>this.toggleSidenav.bind(this)} ref="btn">
              <IconContext.Provider value={{ color: "#B1ADAD", size: 22 }}>
                <MdSettings />
              </IconContext.Provider>
            </a>
            <div className={showHideSidenav}>
              <p className="block-text">Block</p>
              <p className="suspend-text">Generate Invoice</p>
              <p className="suspend-text">Delete</p>
            </div>
          </td>
        </tr>
      );
    }.bind(this));
    return (
      <div className="main-box">
        <p className="admin-header">Admin</p>
        <button onClick={this.handleShow.bind(this)} className="order-button">
          <p>CREATE ORDER</p>
        </button>
        <table id="customers">
        <tbody>
          <tr>
            <th>Order Id</th>
            <th>Dropbox id</th>
            <th>Stage</th>
            <th>Customer Name</th>
            <th>Customer No</th>
            <th>Pickup Date</th>
            <th>Dropoff Date</th>
            <th>Action</th>
          </tr>
          {orders_data}
          </tbody>
        </table>

        <Modal
          show={this.state.show}
          onHide={this.handleClose.bind(this)}
          animation={true}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose.bind(this)}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleClose.bind(this)}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Orders;
