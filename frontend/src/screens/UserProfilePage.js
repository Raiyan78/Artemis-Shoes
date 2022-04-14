import React, {useState, useEffect} from 'react'
import { Col, Row, Container, Form ,Button, Alert, ListGroup} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserDetail, editProfile } from '../actions/userAction'
import { viewMyOrderList } from '../actions/orderAction'
import {USER_PROFILE_CHANGE_RESET} from '../constants/userConstants'
import Loader from '../components/Loader'

function UserProfilePage({history}) {
    const [username, setUsername] = useState('')  
    const [password, setPassword] = useState('') 
    const [email, setEmail] = useState('') 
    const dispatch = useDispatch() 

    const userDetails = useSelector(state => state.userDetails)
    const {error, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userDetail} = userLogin

    const userEditProfile = useSelector(state => state.userEditProfile)
    const {success} = userEditProfile

    const orderList = useSelector(state => state.orderList)
    const {orders, loading} = orderList

    useEffect(()=> {
      //load order list
      dispatch(viewMyOrderList())
      if(!userDetail){                    //if user not logged in, redirect to login page
          history.push('/login')
      }
      else{
        if(!user || !user.username || success || user.id !== userDetail.id){   //if user information state is loaded
          dispatch({
            type: USER_PROFILE_CHANGE_RESET,
          })       
          dispatch(getUserDetail('profile'))
          // dispatch(viewMyOrderList())
        }
        else{
          setEmail(user.email)
          setPassword(user.password)
        }
      }
    },[dispatch, user, history, userDetail, success])

    

    const submit = (e) =>{
      //console.log('submitted')
      e.preventDefault()

      dispatch(editProfile({
        'id' : user._id,
        'username' : user.username,
        'email' : email,
        'password' : password
        }
      ))
    }

    return loading ? (<Loader/>)
    : (
      <Row>
        <Col md='4'>
          <h2>Profile</h2>
          {success ? 
            <Alert variant='success'>
              Successfully changed
            </Alert>
            : null
          }
          <Form onSubmit={submit}>
              <Form.Group className='py-3'>
                  <Form.Label>Change Email</Form.Label>
                  <Form.Control value= {email} onChange ={(e) => setEmail(e.target.value)} type='email'  ></Form.Control>
              </Form.Group>

              <Form.Group className='pb-3 '>
                  <Form.Label>Change Password/Old Password</Form.Label>
                  <Form.Control required value= {password} type='password' onChange ={(e) => setPassword(e.target.value)}></Form.Control>
              </Form.Group>

              <Button className='py-3' type = 'submit' margin='5' variant="secondary" size="md">Update</Button>
          </Form> 
        </Col>

        <Col md='8'>
          <h2>Previous Orders</h2>
          {orders.slice(0).reverse().map(item => (
            <ListGroup key={item._id}>
              <ListGroup.Item variant= 'flush'>   
                <h3>
                  <strong>Order id: </strong>{item._id} 
                </h3>

                <Link to = {`order/${item._id}`}>
                  <h5  className='mb-3'>
                    {item.createdAt}
                  </h5> 
                </Link>

              </ListGroup.Item>
            </ListGroup>
          )

          )}
        </Col>
      </Row>
    )
}

export default UserProfilePage