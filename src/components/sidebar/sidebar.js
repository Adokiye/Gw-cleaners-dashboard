import React, { Component } from "react";
import "./styles/sidebar.css";
import { IconContext } from "react-icons";
import { MdViewQuilt } from "react-icons/md";
import { FaUsersCog, FaListAlt, FaUsers, FaMapMarkerAlt } from "react-icons/fa";
import { IoIosPricetags } from "react-icons/io";
import { Link, withRouter } from 'react-router-dom';



class SomeComponent extends Component {
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

press(value){
  const {pathname} = this.props.location;
if(value != pathname){
  this.props.history.push(value);
}
}

  render() {
    const {pathname} = this.props.location;
    console.log(pathname+"   k")
     return (
      <div className="main-box-sidebar">
        <img src={require("../../images/logo.png")} className="logo-image" />
        <div className="line-div" />
        <button 
        onClick={this.press.bind(this, '/dashboard')}
      //  to="/dashboard" 
        className={pathname === '/dashboard' ? "route active-route" : "route inactive-route"}>
        {/* <button className={pathname === '/dashboard' ? "route active-route" : "route inactive-route"}> */}
        {pathname === '/dashboard' ? 
          <IconContext.Provider value={{ color: "#1bc47d", size: 22 }}>
            <MdViewQuilt />
          </IconContext.Provider>
         :
         <IconContext.Provider value={{ color: "#757575", size: 22 }}>
            <MdViewQuilt />
          </IconContext.Provider>}
          
          <p className={pathname === '/dashboard' ? "active-text" : "inactive-text"}>Dashboard</p>
        {/* </button> */}
        </button>
        <button 
        onClick={this.press.bind(this, '/admins')} 
        //to="/admins" 
        className={pathname === '/admins' ? "route active-route" : "route inactive-route"}>
        
        {pathname === '/admins' ? <IconContext.Provider value={{ color: "#1bc47d", size: 22 }}>
            <FaUsersCog />
          </IconContext.Provider> :<IconContext.Provider value={{ color: "#757575", size: 22 }}>
            <FaUsersCog />
          </IconContext.Provider>}
          <p className={pathname === '/admins' ? "active-text" : "inactive-text"}>Admins</p>
        </button>
        <button 
        onClick={this.press.bind(this, '/orders')} 
     //   to="/orders"
         className={pathname === '/orders' ? "route active-route" : "route inactive-route"}>
        {pathname === '/orders' ?           <IconContext.Provider value={{ color: "#1bc47d", size: 22 }}>
            <FaListAlt />
          </IconContext.Provider> :           <IconContext.Provider value={{ color: "#757575", size: 22 }}>
            <FaListAlt />
          </IconContext.Provider>}
          <p className={pathname === '/orders' ? "active-text" : "inactive-text"}>Orders</p>
        </button>
        <button 
        onClick={this.press.bind(this, '/users')} 
        className={pathname === '/users' ? "route active-route" : "route inactive-route"}>
        {pathname === '/users' ?           <IconContext.Provider value={{ color: "#1bc47d", size: 22 }}>
            <FaUsers />
          </IconContext.Provider> :           <IconContext.Provider value={{ color: "#757575", size: 22, marginRight:10 }}>
            <FaUsers />
          </IconContext.Provider>}
          <p className={pathname === '/users' ? "active-text" : "inactive-text"}>Users</p>
        </button>
        <button 
        onClick={this.press.bind(this, '/dropbox')} 
        className={pathname === '/dropbox' ? "route active-route" : "route inactive-route"}>
        {pathname === '/dropbox' ?           <IconContext.Provider value={{ color: "#1bc47d", size: 22 }}>
        <FaMapMarkerAlt />
          </IconContext.Provider> :           <IconContext.Provider value={{ color: "#757575", size: 22 }}>
          <FaMapMarkerAlt />
          </IconContext.Provider>}
          <p className={pathname === '/dropbox' ? "active-text" : "inactive-text"}>Dropboxes</p>
        </button>
        <button 
        onClick={this.press.bind(this, '/pricelist')} 
        className={pathname === '/pricelist' ? "route active-route" : "route inactive-route"}>
        {pathname === '/pricelist' ?           <IconContext.Provider value={{ color: "#1bc47d", size: 22 }}>
        <IoIosPricetags />
          </IconContext.Provider> :           <IconContext.Provider value={{ color: "#757575", size: 22 }}>
          <IoIosPricetags />
          </IconContext.Provider>}
          <p className={pathname === '/pricelist' ? "active-text" : "inactive-text"}>Pricelist</p>
        </button>
      </div>
    );
  }
}

const Sidebar = withRouter(props => <SomeComponent {...props}/>);
export default Sidebar;
