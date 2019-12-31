import React, { Component } from "react";
import "./styles/admins.css";
import Calendar from "react-calendar";
import Chart from "chart.js";
import { IconContext } from "react-icons";
import { MdSettings } from "react-icons/md";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { API_URL } from '../../../root.js'
import axios from "axios";
var moment = require("moment");
class Admins extends Component {
  constructor(props) {
    super(props);
    this.state = { showHideSidenav: "hidden", show: false, admins: [] };
  }

  toggleSidenav() {
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
      .get(API_URL + "admins", config)
      .then(response => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          this.props.history.push("/");
        }
        var len = response.data.length;
        this.setState({ admins: [] });
        for (let i = 0; i < len; i++) {
          let row = response.data[i];
          this.setState(prevState => ({
            admins: [...prevState.admins, row]
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
    const admin_data = this.state.admins.map(function(item, index) {
      return (
        <tr>
          <td>{index+1}</td>
          <td>{item.first_name + " " + item.last_name}</td>
          <td>{item.email}</td>
          <td>{item.role}</td>
          <td>
            <a href="#" onClick={()=>this.toggleSidenav.bind(this)} ref="btn">
              <IconContext.Provider value={{ color: "#B1ADAD", size: 22 }}>
                <MdSettings />
              </IconContext.Provider>
            </a>
            <div className={showHideSidenav}>
              <p className="block-text">Block</p>
              <p className="suspend-text">Suspend</p>
            </div>
          </td>
        </tr>
      );
    }.bind(this));
    return (
      <div className="main-box">
        <p className="admin-header">Admin</p>
        <button className="admin-button">
          <p>ADD ADMIN</p>
        </button>
        <table id="customers">
        <tbody>
          <tr>
            <th>S/N</th>
            <th>Admin name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
          {admin_data}
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

export default Admins;
