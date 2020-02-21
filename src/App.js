import React, { Component } from "react";
import "./App.css";
import Login from './pages/authentication/login.js'
import Footer from './components/footer/footer.js'
import Cookies from 'js-cookie'
import { Switch, Route, Link, Redirect, BrowserRouter, withRouter } from "react-router-dom";
import Sidebar from './components/sidebar/sidebar.js';
import Home from './pages/dashboard/home/home.js'
import Pricelist from './pages/dashboard/pricelist/pricelist.js'
import FirstPage from './pages/index'
import Orders from './pages/dashboard/orders/orders.js';
import Users from './pages/dashboard/users/users.js';
import Admins from './pages/dashboard/admins/admins.js'
import Dropbox from './pages/dashboard/dropbox/dropbox'
//import { messaging } from './push-notification';
let token = Cookies.get('token') // => 'value'
let id = Cookies.get('id') // => 'value'
let role = Cookies.get('role')

const ProtectedRoute = ({ component: Comp, loggedIn, path, ...rest }) => {
    return (
      <Route
        path={path}
        
        {...rest}
        render={(props) => {
          return loggedIn ? (
            <div className="App-body">
            <Sidebar {...props} role={role}  />
            <Comp {...props} token={token} id={id} role={role}/>
            </div>
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  prevLocation: path,
                  error: "You need to login first!",
                },
              }}
            />
          );
        }}
      />
    );
  };

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "", loggedIn: false, token: '', id: '' };
    }

    async componentDidMount() {
       let token = await Cookies.get('token') // => 'value'
       let id = Cookies.get('id') // => 'value'
       if(token && id){
          this.setState({loggedIn: true, token: token, id: id})
       }
    }


    setLog(){
        this.setState({loggedIn:true, })
    }

    render() {
        return (
            <div className="App-body">
            <BrowserRouter>
                      <Switch>
            <Route path="/login" 
            render={(props) => <Login {...props} setLog={this.setLog.bind(this)} />} />
                        <Route path="/" exact 
            render={(props) => <FirstPage {...props} />} />
            <ProtectedRoute exact path="/dashboard" loggedIn={this.state.token && true} component={Home} />
            <ProtectedRoute path="/orders" loggedIn={this.state.token && true} component={Orders} />
            <ProtectedRoute path="/users" loggedIn={this.state.token && true} component={Users} />
            <ProtectedRoute path="/admins" loggedIn={this.state.token && true} component={Admins} />
            <ProtectedRoute path="/dropbox" loggedIn={this.state.token && true} component={Dropbox} />
            {/* <ProtectedRoute path="/pricelist" loggedIn={this.state.token && true} component={Pricelist} /> */}
          </Switch></BrowserRouter>
{/* <Sidebar />
<Admins /> */}
</div>
        );
    }
}

export default App;