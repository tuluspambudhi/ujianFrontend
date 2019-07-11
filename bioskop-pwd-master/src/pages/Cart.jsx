import React, { Component } from 'react'
import Axios from 'axios';
import { ApiUrl } from '../supports/ApiURl';
import {connect} from 'react-redux'
import {Table} from 'reactstrap'
import '../App.css'


class Cart extends Component {
    state = {
        transaction: []
    }
    componentDidMount = () => {
        Axios.get(ApiUrl + '/users/' + this.props.id)
        .then((res) => {
            this.setState({
                transaction: res.data.transaction
            })
            // console.log(res.data.transaction)
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
                    <td>{mv.total}</td>
                </tr>
            )
        })

        return jsx
    }
    render(){
        return (
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
                </tbody>
            </Table>
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