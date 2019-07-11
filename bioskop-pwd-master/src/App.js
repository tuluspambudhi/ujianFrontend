import React from 'react';
import Header from './components/header'
import MovieList from './pages/movieList'
import Bebas from './pages/admin/manageMovie'
import MovieDetail from './pages/movieDetail'
import Register from './pages/register'
import SeatRes from './pages/seatReservation'
import PageNotFound from './pages/admin/PageNotFound'
import Cart from './pages/Cart'

import { Route } from 'react-router-dom'

import './App.css';
import Login from './pages/login';
import Axios from 'axios';
import { ApiUrl } from './supports/ApiURl'
import {OnRegisterSuccess} from './redux/actions'
import {connect} from 'react-redux'


class App extends React.Component {
  componentDidMount(){
    var username = localStorage.getItem('terserah')
    if(username !== null){
      Axios.get(ApiUrl + '/users?username=' + username)
      .then((res) => {
        // console.log(res.data)
        this.props.OnRegisterSuccess(res.data[0])
      })
    }
  }

  render(){
    if(this.props.user == '' && localStorage.getItem('terserah') !== null){
      return(<p>Loading..</p>)
    }
    return (
      <div>
        <Header/>
        <Route exact path='/' component= {MovieList} />
        <Route path='/manage' component={Bebas} />
        <Route path='/movie-detail' component={MovieDetail} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/order-seat' component={SeatRes} />
        <Route path='/not-found' component={PageNotFound} />
        <Route path='/cart' component={Cart} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user : state.user.username
  }
}

export default connect(mapStateToProps ,{OnRegisterSuccess} )(App);
