import React, { Component } from "react";
import "./App.css";
import Login from './pages/authentication/login.js'
import Footer from './components/footer/footer.js'
import Cookies from 'js-cookie'
import { Switch, Route, Link, Redirect, BrowserRouter, withRouter } from "react-router-dom";
import Sidebar from './components/sidebar/sidebar.js';
import Home from './pages/dashboard/home/home.js'
import Orders from './pages/dashboard/orders/orders.js';
import Users from './pages/dashboard/users/users.js';
import Admins from './pages/dashboard/admins/admins.js'
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

    componentDidMount() {
       let token = Cookies.get('token') // => 'value'
       let id = Cookies.get('id') // => 'value'
       if(token && id){
          this.setState({loggedIn: true, token: token, id: id})
       }
    }


    setLog(){
        this.setState({loggedIn:true})
    }

    render() {
        return (
            <div className="App-body">
            <BrowserRouter>
                      <Switch>
            <Route path="/" exact 
            render={(props) => <Login {...props} setLog={this.setLog.bind(this)} />} />
            <ProtectedRoute exact path="/dashboard" loggedIn={token && true} component={Home} />
            <ProtectedRoute path="/orders" loggedIn={token && true} component={Orders} />
            <ProtectedRoute path="/users" loggedIn={token && true} component={Users} />
            <ProtectedRoute path="/admins" loggedIn={token && true} component={Admins} />
          </Switch></BrowserRouter>
{/* <Sidebar />
<Admins /> */}
</div>
        );
    }
}

export default App;