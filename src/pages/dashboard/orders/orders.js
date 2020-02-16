import React, { Component, Fragment } from "react";
import "./styles/orders.css";
import Calendar from "react-calendar";
import Chart from "chart.js";
import { IconContext } from "react-icons";
import { MdSettings, MdDeleteForever, MdEdit } from "react-icons/md";
import { FaMoneyCheckAlt, FaUserAlt, FaLock } from "react-icons/fa";
import DatePicker from 'react-date-picker';
import Cookies from 'js-cookie'
import { API_URL } from "../../../root.js";
import axios from "axios";
import ReactModal from 'react-modal';
var moment = require("moment");

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHideSidenav: "hidden",
      show: false,
      orders: [],
      toDelete: "",
      error_div: false,
      error: '',
      dropoff_date: new Date(),
      dropoff_time: '',
      pickup_date: '',
      pickup_time: '',
      preferences: '',
      createOrder: false,
      price: '',
      edit: false,
      id_to_edit: '',
      order_id: '',
      stage: '',
      preferences: '',
      price: '',
      description: '', orderId: '',
      type: '',
      locker_id: ''
    };
  }

  toggleSidenav() {
    console.log("dkdkd");
    var css = this.state.showHideSidenav === "hidden" ? "show" : "hidden";
    this.setState({ showHideSidenav: css });
  }

  showEditModal(id, type, orderId){
      this.setState({type});    
    this.setState({edit: true, id_to_edit: id, type, orderId})
  }

  hideEditModal(){
    this.setState({edit: false, })
  }
  async editOrder(e){
    e.preventDefault()
    this.setState({ error_div: false });
    if(this.state.type == 'charge'){
      var bodyParameters = {
        order_id: this.state.id_to_edit,
        price: Number(this.state.price),
   //     description: this.state.description,
      };
    }else{
          var bodyParameters = {
      order_id: this.state.id_to_edit,
      locker_id: this.state.locker_id,
    };
    }
    let token = await Cookies.get('token') 
    console.log(bodyParameters);
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000
    };
    axios
      .post(API_URL + "orders/adminCharge", bodyParameters, config)
      .then(response => {
        console.log(response);
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
        if (error.response.data) {
          if(error.response.data.message.includes('Invalid source_id')){
            this.setState({
              error: 'Customer Card is not valid, Pricing of order failed',
              error_div: true
            });
            console.log(JSON.stringify(error));
          }else{
                     this.setState({
            error: error.response.data.message,
            error_div: true
          });
          console.log(JSON.stringify(error)); 
          }

        }
      });
  }
onChangeDropoff= date => this.setState({dropoff_date: date })

onChangeTime(event){
  this.setState({
    dropoff_time: event.target.value
  })
 }

 onChangePickup= date => this.setState({pickup_date: date })

onChangeTimePickup(event){
  this.setState({
    pickup_time: event.target.value
  })
 }

createOrder(e){
  e.preventDefault();
  if (this.state.price && isNaN(this.state.price)) {
    this.setState({ error: "Price must be a number", error_div: true });
  } else if (isNaN(this.state.zip)) {
    this.setState({ error: "Invalid Zip code", error_div: true });
  }else{
    this.setState({error_div: false})

  } 
}

  handleShow(id) {
    this.setState({ show: true, toDelete: id });
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShowOrder() {
    this.setState({ createOrder: true,  });
  }

  handleCloseOrder() {
    this.setState({ createOrder: false });
  }

  async delete() {
    console.log(this.state.toDelete);
    let token = await Cookies.get('token') 
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000
    };
    axios
      .delete(API_URL + "orders/" + this.state.toDelete, config)
      .then(response => {
        console.log(response);
        window.location.reload();
      })
      .catch(error => {
        this.props.history.push("/");
        console.log(error);
      });
  }

  async componentDidMount() {
  //  console.log(this.props.token);
  let token = await Cookies.get('token') 
    var config = {
      headers: { Authorization: "Bearer " + token },
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
    let { showHideSidenav, createOrder } = this.state;
    
    const orders_data = this.state.orders.map(
      function(item, index) {
        return (
          <tr>
            <td>{item.order_id}</td>
            <td>{item.dropbox_id}</td>
            <td>{item.stage}</td>
            <td>{item.price ? "$" + item.price : "$0"}</td>
            <td>{item.user_name}</td>
            <td>{item.user_no}</td>
            <td>{moment(item.pickup_date).format("dddd, MMMM Do YYYY")}</td>
            <td>{moment(item.dropoff_date).format("dddd, MMMM Do YYYY")}</td>
            <td>
              <a
                href="#"
                onClick={this.handleShow.bind(this, item._id)}
                ref="btn"
              >
                <IconContext.Provider value={{ color: "#B1ADAD", size: 22 }}>
                  <MdDeleteForever />
                </IconContext.Provider>{" "}
              </a>
              {item.stage == 'pending' && !item.pickup &&!item.locker_id &&              
               <a
                href="#"
                alt='Generate Locker ID'
                onClick={this.showEditModal.bind(this, item._id, 'locker', item.order_id)}
                ref="btn"
              >
              <IconContext.Provider value={{ color: "#B1ADAD", size: 22 }}>
                <FaLock />
              </IconContext.Provider></a>}

              {item.pickup && item.stage == 'pending' &&               
              <a
                href="#"
                onClick={this.showEditModal.bind(this, item._id, 'charge', item.order_id)}
                ref="btn"
              >
              <IconContext.Provider value={{ color: "#B1ADAD", size: 22 }}>
                <FaMoneyCheckAlt />
              </IconContext.Provider></a>  }

            </td>
          </tr>
        );
      }.bind(this)
    );
    const ModalOrder = ({ handleClose, show, children }) => {
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
    const showHideClassNameOrder = createOrder
    ? "display-block"
    : "display-none";
    return (
      <div className="main-box">
      <ReactModal

isOpen={
  this.state.edit
/* Boolean describing if the modal should be shown or not. */}


closeTimeoutMS={
  0
/* Number indicating the milliseconds to wait before closing
   the modal. */}

style={
  { overlay: {}, content: {} }
/* Object indicating styles to be used for the modal.
   It has two keys, `overlay` and `content`.
   See the `Styles` section for more details. */}

contentLabel={
  "Example Modal"
/* String indicating how the content container should be announced
   to screenreaders */}


className={
  "ReactModal__Content"
/* String className to be applied to the modal content.
   See the `Styles` section for more details. */}

bodyOpenClassName={
  "ReactModal__Body--open"
/* String className to be applied to the document.body 
   (must be a constant string).
   This attribute when set as `null` doesn't add any class 
   to document.body.
   See the `Styles` section for more details. */}

htmlOpenClassName={
  "ReactModal__Html--open"
/* String className to be applied to the document.html
   (must be a constant string).
   This attribute is `null` by default.
   See the `Styles` section for more details. */}

shouldFocusAfterRender={
  true
/* Boolean indicating if the modal should be focused after render. */}

shouldCloseOnOverlayClick={
  true
/* Boolean indicating if the overlay should close the modal */}

shouldCloseOnEsc={
  true
/* Boolean indicating if pressing the esc key should close the modal
   Note: By disabling the esc key from closing the modal
   you may introduce an accessibility issue. */}

shouldReturnFocusAfterClose={
  true
/* Boolean indicating if the modal should restore focus to the element
   that had focus prior to its display. */}

role={
  "dialog"
/* String indicating the role of the modal, allowing the 'dialog' role
   to be applied if desired.
   This attribute is `dialog` by default. */}

parentSelector={
  () => document.body
/* Function that will be called to get the parent element
   that the modal will be attached to. */}

aria={
  {
    labelledby: "heading",
    describedby: "full_description"
  }
/* Additional aria attributes (optional). */}

data={
  { background: "green" }
/* Additional data attributes (optional). */}

>
  <div className="edit-modal">
  <p className="admin-header">Edit Order {this.state.orderId}</p>
          {this.state.error_div && (
            <div className="error">{this.state.error}</div>
          )}
          <form onSubmit={this.editOrder.bind(this)}>
            <div className="form-box">
            {/* <p className="label-text">Stage</p>
              <input
                  type="text"
                  value={this.state.stage}
                  onChange={event =>
                    this.setState({ stage: event.target.value })
                  }
                /> */}
              {/* <div className="input-row"> */}

       {/* <p className="label-text">Preferences:</p>
       <p className="label-text">{this.state.preferences?this.state.preferences:"No Preferences set"}</p> */}
              {/* </div> */}
              {/* <div className="input-row"> */}
              {this.state.type == 'charge' &&                <Fragment>
                <p className="label-text">Price</p>
                <input
                  type="text"
                  value={this.state.price}
                  onChange={event =>
                    this.setState({ price: event.target.value })
                  }
                />             
                 {/* <p className="label-text">Description(Breakdown of how the pricing was calculated)</p>
                <textarea
                  type="text"
                  value={this.state.description}
                  required
                  onChange={event =>
                    this.setState({ description: event.target.value })
                  }
                /> */}
                </Fragment>    }
                {this.state.type == 'locker' &&                <Fragment>
                <p className="label-text">Locker ID</p>
                <input
                  type="text"
                  value={this.state.locker_id}
                  onChange={event =>
                    this.setState({ locker_id: event.target.value })
                  }
                />           
                </Fragment>    }

                {/* <p className="label-text">Description(Breakdown of how the pricing was calculated)</p>
                <input
                  type="multiline"
                  value={this.state.description}
                  required
                  onChange={event =>
                    this.setState({ description: event.target.value })
                  }
                /> */}
              {/* </div> */}

            <div className="input-row">
              {/* <button onClick={this.createAdmin.bind(this)}>Create</button>{" "} */}
              <input type="submit" value="Edit" className="button" />
              <div
                className="button"
                onClick={this.hideEditModal.bind(this)}
              >
                Close
              </div>
            </div>
            </div>
          </form>
  </div>

</ReactModal>
        <ModalOrder
          show={this.state.show}
          handleClose={this.handleClose.bind(this)}
          delete={this.delete.bind(this)}
        >
          <p>Are you sure you want to delete this order</p>
        </ModalOrder>
        <p className="admin-header">Orders</p>
        <button onClick={this.handleShowOrder.bind(this)} className="order-button">
          <p>CREATE ORDER</p>
        </button>
        <div className={showHideClassNameOrder}>
          <p className="admin-header">Create Order</p>
          {this.state.error_div && (
            <div className="error">{this.state.error}</div>
          )}
          <form onSubmit={this.createOrder.bind(this)}>
            <div className="form-box">
              <div className="input-row">
              <p className="label-text">Dropoff date</p>
              <DatePicker
          onChange={this.onChangeDropoff}
          value={this.state.dropoff_date}
          minDate={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)}
          maxDate={new Date(new Date().getTime() + 72 * 60 * 60 * 1000)}
        />
                <p className="label-text">Dropoff time</p>
                <select required value={this.state.dropoff_time} onChange={this.onChangeTime} className="u-full-width">
                <option value="6am-8am">6am-8am</option>
                <option value="8am-10am">8am-10am</option>
                <option value="10am-12pm">10am-12pm</option>
                <option value="12pm-2pm">12pm-2pm</option>
                <option value="2pm-4pm">2pm-4pm</option>
                <option value="4pm-6pm">4pm-6pm</option>
                <option value="6pm-8pm">6pm-8pm</option>
                <option value="8pm-10pm">8pm-10pm</option>
                <option value="10pm-12am">10pm-12am</option>
                <option value="12am-6am">12am-6am</option>
              </select> 
              </div>
              <div className="input-row">
              <p className="label-text">Pickup date</p>
              <DatePicker
          onChange={this.onChangePickup}
          minDate={new Date(this.state.dropoff_date.getTime() + 24 * 60 * 60 * 1000)}
          maxDate={new Date(this.state.dropoff_date.getTime() + 72 * 60 * 60 * 1000)}
          value={this.state.pickup_date}
        />
                <p className="label-text">Pickup time</p>
                <select required value={this.state.pickup_time} onChange={this.onChangeTimePickup} className="u-full-width">
                <option value="6am-8am">6am-8am</option>
                <option value="8am-10am">8am-10am</option>
                <option value="10am-12pm">10am-12pm</option>
                <option value="12pm-2pm">12pm-2pm</option>
                <option value="2pm-4pm">2pm-4pm</option>
                <option value="4pm-6pm">4pm-6pm</option>
                <option value="6pm-8pm">6pm-8pm</option>
                <option value="8pm-10pm">8pm-10pm</option>
                <option value="10pm-12am">10pm-12am</option>
                <option value="12am-6am">12am-6am</option>
              </select> 
              </div>
              <div className="input-row">
                <p className="label-text">Price</p>
                <input
                  type="text"
                  value={this.state.price}
                  onChange={event =>
                    this.setState({ price: event.target.value })
                  }
                />
                <p className="label-text">Preferences</p>
                <input
                  type="text"
                  value={this.state.preferences}
                  required
                  onChange={event =>
                    this.setState({ preferences: event.target.value })
                  }
                />
              </div>
            <div className="input-row">
              {/* <button onClick={this.createAdmin.bind(this)}>Create</button>{" "} */}
              <input type="submit" value="Create" className="button" />
              <div
                className="button"
                onClick={this.handleCloseOrder.bind(this)}
              >
                Close
              </div>
            </div>
            </div>
          </form>
        </div>
        <div><table id="customers">
          <tbody>
            <tr>
              <th>Order Id</th>
              <th>Dropbox id</th>
              <th>Stage</th>
              <th>Price</th>
              <th>Customer Name</th>
              <th>Customer No</th>
              <th>Pickup Date</th>
              <th>Dropoff Date</th>
              <th>Action</th>
            </tr>
            {orders_data}
          </tbody>
        </table></div>
        
      </div>
    );
  }
}

export default Orders;
