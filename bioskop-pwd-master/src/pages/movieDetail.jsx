import React from 'react'
import Axios from 'axios';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
    // Dari Movie List kirim Id Ke Movie Detail
    // Di Movie Detail kita get movie berdasarkan ID
    // Dapet Data, kemudian taruh di state
    // Lalu State di render
class MovieDetail extends React.Component{
    state = { 
        data : null , 
        login : null }
    componentDidMount(){
        var id = this.props.location.search.split('=')[1]
        Axios.get('http://localhost:2000/movies/' + id)
        .then((res) => {
            this.setState({data : res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onBuyTicketClick = () => {
        if(this.props.user.id === 0){
            this.setState({login : false})
        }else {
            this.setState({login : true})
        }
    }
    render(){
        if(this.state.login === false){
            return(
                <Redirect to='/login' />
            )
        }
        if(this.state.login === true){
            return(
            <Redirect to={{pathname: './order-seat' , state: this.state.data}} />
            )
        }
        if(this.state.data === null){
            return (<p> Loading ... </p>)
        }
        return(
            <div className='container mt-5 mb-5'>
                <div className='row'>
                    <div className='col-md-4'>
                        <img height='430px' src={this.state.data.image} />
                    </div>
                    <div className='col-md-8'>
                        <h1>{this.state.data.title}</h1>
                        <p>{this.state.data.genre}</p>
                        <h5>{this.state.data.sutradara}</h5> 
                        <p>{this.state.data.duration} Minutes </p> 
                        <p> Playing At : {this.state.data.playingAt.join(',')} </p> 
                        <p style={{fontStyle:'italic'}}> {this.state.data.sinopsis} </p> 
                        <input onClick={this.onBuyTicketClick} type='button' className='btn btn-outline-success' value='Buy Ticket' />
                    </div>
                </div>    
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        user : state.user
    }
}

export default connect(mapStateToProps)(MovieDetail)

//Cart -> Checkout
//History Transaksi
//Proteksi Manage (hanya admin)
//Tambah keranjang di heaader