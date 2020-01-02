import React, { Component } from "react";
import "./styles/users.css";
import Calendar from "react-calendar";
import Chart from "chart.js";
import { IconContext } from "react-icons";
import { MdSettings, MdDeleteForever } from "react-icons/md";
import Button from "react-bootstrap/Button";
import { API_URL } from '../../../root.js';
import axios from "axios";
var moment = require("moment");
class Users extends Component {
  constructor(props) {
    super(props);
    this.state = { showHideSidenav: "hidden", show: false, users: [], toDelete: '' };
    this.toggleSidenav =  this.toggleSidenav.bind(this)
  }

  toggleSidenav() {
    var css = this.state.showHideSidenav === "hidden" ? "show" : "hidden";
    this.setState({ showHideSidenav: css });
  }

  handleShow(id) {
    console.log(id)
    this.setState({ show: true,toDelete: id });
  }

  handleClose() {
    this.setState({ show: false });
  }

  delete(){
    console.log(this.state.toDelete);
    var config = {
      headers: { Authorization: "Bearer " + this.props.token },
      timeout: 20000
    };
    axios
      .delete(API_URL + "users/"+this.state.toDelete, config)
      .then(response => {
        console.log(response);
        window.location.reload(); 
      })
      .catch(error => {
            this.props.history.push("/");
        console.log(error);
      });
  }

  componentDidMount() {
    console.log(this.props.token);
    var config = {
      headers: { Authorization: "Bearer " + this.props.token },
      timeout: 20000
    };
    axios
      .get(API_URL + "users", config)
      .then(response => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          this.props.history.push("/");
        }
        var len = response.data.length;
        this.setState({ users: [] });
        for (let i = 0; i < len; i++) {
          let row = response.data[i];
          this.setState(prevState => ({
            users: [...prevState.users, row]
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
    const users_data = this.state.users.map(function(item, index) {
      return (
        <tr>
          <td>{index+1}</td>
          <td>{item.first_name + " " + item.last_name}</td>
          <td>{item.email}</td>
          <td>N/A</td>
          <td>
            <a href="#" onClick={this.handleShow.bind(this, item._id)} ref="btn">
              <IconContext.Provider value={{ color: "#B1ADAD", size: 22 }}>
                <MdDeleteForever />
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

    const Modal = ({ handleClose, show, children }) => {
      const showHideClassName = show ? 'modal display-block' : 'modal display-none';
    
      return (
        <div className={showHideClassName}>
          <section className='modal-main'>
            {children}
            <div className="button-row">
            <button
              onClick={this.delete.bind(this)}
            >
              Yes
            </button>            <button
              onClick={handleClose}
            >
              Close
            </button></div>
          </section>
        </div>
      );
    };

    return (
      <div className="main-box">        
      <Modal show={this.state.show} handleClose={this.handleClose.bind(this)} delete={this.delete.bind(this)}>
          <p>Are you sure you want to delete this user</p>
        </Modal>
        <p className="admin-header">Users</p>

        <table id="customers">
        <tbody>
          <tr>
            <th>S/N</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
          {users_data}
          </tbody>
        </table>
      </div>
    );
  }
}



export default Users;
