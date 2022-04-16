import React from 'react'
import { Navbar, Nav, Container, Row, Dropdown, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'

import { logout } from '../actions/userAction'


function Header() {
  const user = useSelector(state => state.userLogin)

  const {userDetail, loading} = user

  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }

  return loading ? (<Loader/>) :(
    <header>
      <Navbar bg="light" expand="lg" className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand href="#home">Artemis Shoes</Navbar.Brand>
          </LinkContainer>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">

              <Nav className="me-auto">

                <LinkContainer to='/cart'>
                  <Nav.Link><i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
                </LinkContainer>
                
                

                {userDetail ? 
                <LinkContainer to='/profile'>
                    <Nav.Link><i  className='fas fa-user'></i>Profile</Nav.Link>
                </LinkContainer>
                  : 
                    null
                }

               

                {userDetail ? 
                  <LinkContainer to='/'>
                    <Nav.Link onClick={logoutHandler} to='/'><i className='fas fa-sign-out'></i> Logout</Nav.Link> 
                  </LinkContainer>
                  :
                  <LinkContainer to='/login'>
                  <Nav.Link><i className='fas fa-user'></i> Login</Nav.Link> 
                </LinkContainer>
                
                } 

                {/* <LinkContainer to='/login'>
                  <Nav.Link><i className='fas fa-user'></i> Login</Nav.Link> 
                </LinkContainer> */}

              </Nav>
         </Navbar.Collapse>

         {userDetail && userDetail.is_staff ? 
                  // <LinkContainer to='/profile'>
                  //     <Nav.Link><i  className='fas fa-user'></i>Profile</Nav.Link>
                  // </LinkContainer>
                  <NavDropdown title ='Admin Actions' variant= 'dark'>

                    <LinkContainer to='/admin/users/'>
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer to='/admin/products/'>
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer to='/admin/orders/'>
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>

                  </NavDropdown>
                    : 
                      null
                }

        {userDetail ? 
          <LinkContainer to='/'>
            <Nav.Item>Welcome aboard, {userDetail.username}</Nav.Item>
          </LinkContainer>
          : 
          null
        } 
         

        </Container>
      </Navbar>
    </header>
  )
}

export default Header