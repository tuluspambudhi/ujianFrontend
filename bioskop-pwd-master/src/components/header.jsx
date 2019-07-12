import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import {connect} from 'react-redux'
import {onLogout} from './../redux/actions'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'


class Example extends React.Component {
  state = {
      isOpen : false,
      toHome : false 
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  onBtnLogoutClick = () => {
    this.props.onLogout()
    localStorage.removeItem('terserah')
    this.setState({
      toHome: true
    })
  }
  render() {
    if(this.state.toHome === true){
      return (
          <Redirect to={{pathname: '/' , state: this.state.data}} />
      )
    }
    return (
      <div>
        <Navbar expand="md">
          <Link to='/'> <NavbarBrand>MoviePass</NavbarBrand> </Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              { this.props.name !== "" ? 
              <NavItem>
                <Link to='/cart'> <NavLink>Cart {this.props.transaction.length}</NavLink></Link>
              </NavItem> : null
              }
              {
                this.props.name === "" ?
                <NavItem>
                  <Link to='/register'> <NavLink>JOIN NOW</NavLink></Link>
                </NavItem> : null
              }
              
              {
              this.props.name !== ""
              ?
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {this.props.name}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={this.onBtnLogoutClick}>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              :
              null
            }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    name : state.user.username,
    transaction: state.user.transaction
  }
}

export default connect(mapStateToProps , {onLogout})(Example)