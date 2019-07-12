import React, { Component } from 'react'
import Axios from 'axios';
import { ApiUrl } from '../supports/ApiURl';
import {connect} from 'react-redux'
import {Table} from 'reactstrap'
import '../App.css'
import Numeral from 'numeral'
import {Redirect} from 'react-router-dom'


class Cart extends Component {
    state = {
        transaction: [],
        totalTrans: 0,
        toCheckout: false,
        toHome: false
    }
    componentDidMount = () => {
        Axios.get(ApiUrl + '/users/' + this.props.id)
        .then((res) => {
            this.setState({
                transaction: res.data.transaction, totalTrans : res.data.transaction.length
            })
        })
        .catch((err) => {

        })
    }
    movieTitle = (arr) => {
        var result = []
        arr.forEach(function (a) {
            if(!this[a.title]) {
                this[a.title] = {title: a.title, qty: 0, total: 0}
                result.push(this[a.title])
            }
                this[a.title].qty += a.qty;
                this[a.title].total += a.total;
        }, Object.create(null));

        var jsx = result.map(mv => {
            return(
                <tr>
                    <td>{mv.title}</td>
                    <td>{mv.qty}</td>
                    <td>{Numeral(mv.total).format(0,0)}</td>
                </tr>
            )
        })
        return jsx
    }
    noNameFunc = (arr) => {
        var result = []
        arr.forEach(function (a) {
            if(!this[a.name]) {
                this[a.name] = {total: 0}
                result.push(this[a.name])
            }
                this[a.name].total += a.total;
        }, Object.create(null));

        var jsx = result.map(tt => {
            return(
                <tr>
                    <td></td>
                    <td>Totale Boss</td>
                    <td>{tt.total}</td>
                </tr>
            )
        })

        return jsx
    }
    checkOutBtn = () => {
        this.setState({
            toCheckout: true
        })
    }
    backToHome = () => {
        this.setState({
            toHome: true
        })
    }

    render(){
        if(this.state.toCheckout === true){
            return (
                <Redirect to={{pathname: './History' , state: this.state.data}} />
            )
        }
        if(this.state.toHome === true){
            return (
                <Redirect to={{pathname: '/' , state: this.state.data}} />
            )
        }
        return (
            <div>
            <Table dark className='cartTable'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Qty</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {this.movieTitle(this.state.transaction)}
                    {this.noNameFunc(this.state.transaction)}
                </tbody>
            </Table>
                <button type='button' class="btn btn-primary" onClick={this.backToHome}>Beli Tiket Lagi</button>
                <button type="button" class="btn btn-success" onClick={this.checkOutBtn}>CheckOut</button>
            </div>
          )
    }
}

const mapStateToProps = (state) => {
    return{
        id : state.user.id,
        transaction : state.user.transaction
    }
}

export default connect(mapStateToProps)(Cart);