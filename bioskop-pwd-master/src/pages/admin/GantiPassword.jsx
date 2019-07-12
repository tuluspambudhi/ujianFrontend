import React, { Component } from 'react'
import Axios from 'axios'

class GantiPassword extends Component {
    changePass = () => {
        var currPass = this.refs.currPass.value
        var newPass = this.refs.newPass.value

        var data = {
            currPass:currPass,
            newPass:newPass
        }
        
        if(currPass !== '' && newPass !== '')
        {
            Axios.post('http://localhost:2000/users' , data )
            .then((res) => {
                alert('Change Pass Success')
                var currPass = this.state.password
                newPass.push(res.data.password)
                this.setState({data : newPass , modalOpen : false}) 
            })
            .catch((err) => {
                console.log(err)
            })
        }else{
            alert('Semua Form Harus Diisi')
        }
    }
    render() {
        return (
            <div>
                <form>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Password Sekarang</label>
                        <input ref='currPass' type="text" class="form-control"  aria-describedby="emailHelp" placeholder="Current Password" />
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">New Password</label>
                        <input ref='newPass'type="text" class="form-control" placeholder="New Password"/>
                    </div>
                    <button type="submit" class="btn btn-primary" onClick={this.changePass}>Change Password</button>
                </form>
            </div>
        )
    }
}

export default GantiPassword;
