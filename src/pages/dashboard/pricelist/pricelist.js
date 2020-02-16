import React, { Component } from "react";
import "./styles/pricelist.css";
import { IconContext } from "react-icons";
import { MdSettings, MdDeleteForever } from "react-icons/md";
import { FaMoneyCheckAlt, FaUserAlt } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import { API_URL } from "../../../root.js";
import axios from "axios";import Cookies from 'js-cookie'
var moment = require("moment");

class Pricelist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHideSidenav: "hidden",
      show: false,
      pricelist: [],
      toDelete: "",
      showCreate: false,
      number: "",
      first_name: "",
      last_name: "",
      price: "",
      name: '',
      zip: "",
      email: "",
      password: "",
      error_div: false,
      error: ""
    };
  }

  toggleSidenav() {
    var css = this.state.showHideSidenav === "hidden" ? "show" : "hidden";
    this.setState({ showHideSidenav: css });
  }

  handleShow(id) {
    this.setState({ show: true, toDelete: id });
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShowCreate() {
    this.setState({ showCreate: true });
  }

  handleCloseCreate() {
    this.setState({ showCreate: false });
  }
  handleNumber(e) {
    this.setState({ number: e.target.value });
  }

  async componentDidMount() {
  //  console.log(this.props.token);
    let token = await Cookies.get('token') 
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000
    };
    axios
      .get(API_URL + "pricelist", config)
      .then(response => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          this.props.history.push("/login");
        }
        var len = response.data.length;
        this.setState({ pricelist: [] });
        for (let i = 0; i < len; i++) {
          let row = response.data[i];
          this.setState(prevState => ({
            pricelist: [...prevState.pricelist, row]
          }));
        }
      })
      .catch(error => {
        this.props.history.push("/login");
        console.log(error);
      });
  }

  async  delete() {
    console.log(this.state.toDelete);
    let token = await Cookies.get('token') 
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000
    };
    axios
      .delete(API_URL + "pricelist/" + this.state.toDelete, config)
      .then(response => {
        console.log(response);
        window.location.reload();
      })
      .catch(error => {
        this.props.history.push("/login");
        console.log(error);
      });
  }
  createPricelist(e) {
    e.preventDefault();
    var config = {
        headers: { Authorization: "Bearer " + this.props.token },
        timeout: 20000
      };
      if (!this.state.name) {
        this.setState({ error: "Name field is required", error_div: true });
      }else if (!this.state.price) {
      this.setState({ error: "Price field is required", error_div: true });
    } else {
      this.setState({ error_div: false });
      var bodyParameters = {
        name: this.state.name,
        price: this.state.price
      };
      console.log(bodyParameters);
      axios
        .post(API_URL + "pricelist", bodyParameters, config,)
        .then(response => {
          console.log(response);
          window.location.reload();
        })
        .catch(error => {
          console.log(error);
          if (error.message) {
            this.setState({
              error: error.message,
              error_div: true
            });
            console.log(JSON.stringify(error));
          }
        });
    }
  }

  render() {
    let { showHideSidenav, showCreate } = this.state;
    const pricelist_data = this.state.pricelist.map(
      function(item, index) {
        return (
          <tr>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>
              <a
                href="#"
                onClick={this.handleShow.bind(this, item._id)}
                ref="btn"
                
              >
                <IconContext.Provider value={{ color: "#B1ADAD", size: 22 }}>
                  <MdDeleteForever/>
                </IconContext.Provider>
              </a>
            </td>
          </tr>
        );
      }.bind(this)
    );

    const ModalAdmin = ({ handleClose, show, children }) => {
      const showHideClassName = show
        ? "modal display-block"
        : "modal display-none";

      return (
        <div className={showHideClassName}>
          <section className="modal-main">
            {children}
            <div className="button-row">
              <button onClick={this.delete.bind(this)}>Yes</button>{" "}
              <button onClick={handleClose}>Close</button>
            </div>
          </section>
        </div>
      );
    };
    const showHideClassNameCreate = showCreate
      ? "display-block"
      : "display-none";

    return (
      <div className="main-box">
        <ModalAdmin
          show={this.state.show}
          handleClose={this.handleClose.bind(this)}
          delete={this.delete.bind(this)}
        >
          <p>Are you sure you want to delete this item</p>
        </ModalAdmin>
        <p className="admin-header">Pricelist</p>
        <button
          className="admin-button"
          onClick={this.handleShowCreate.bind(this)}
        >
          <p>ADD ITEM</p>
        </button>
        <div className={showHideClassNameCreate}>
          <p className="admin-header">Add Item</p>
          {this.state.error_div && (
            <div className="error">{this.state.error}</div>
          )}
          <form onSubmit={this.createPricelist.bind(this)}>
            {/* <div className="form-box">
            </div> */}
            <p className="label-text">Name</p>
            <input
              type="text"
              value={this.state.name}
              required
              onChange={event => this.setState({ name: event.target.value })}
            />
                        <p className="label-text">Price</p>
            <input
              type="text"
              value={this.state.price}
              required
              onChange={event => this.setState({ price: event.target.value })}
            />
            <div className="input-row">
              {/* <button onClick={this.createAdmin.bind(this)}>Create</button>{" "} */}
              <input type="submit" value="Add" className="button" />
              <div
                className="button"
                onClick={this.handleCloseCreate.bind(this)}
              >
                Close
              </div>
            </div>
          </form>
        </div>
        <table id="customers">
          <tbody>
            <tr>
              <th>S/N</th>
              <th>Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
            {pricelist_data}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Pricelist;
