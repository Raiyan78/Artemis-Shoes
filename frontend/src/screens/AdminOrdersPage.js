import React, {useState, useEffect} from 'react'
import { Col, Row, Container, Form ,Button, Alert, Table} from 'react-bootstrap'
import {  LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import { viewOrders, setPaid, setDelivered } from '../actions/orderAction'
import { ORDER_DELIVERY_RESET, ORDER_PAY_RESET} from '../constants/orderConstants'

function AdminOrdersPage({history}) {

    const dispatch = useDispatch()

    const orderList = useSelector(state => state.orders)
    const { orders, loading, error } = orderList

    const userLogin = useSelector(state => state.userLogin)
    const {userDetail} = userLogin

    const delivered = useSelector(state => state.orderDelivery)
    const { success : deliverySuccess , error: deliveryError, loading : deliveryLoading} = delivered

    const paid = useSelector(state => state.orderPay)
    const { success: paySuccess, error: payError, loading: payLoading} = paid
 

    useEffect(()=>{
        if(!userDetail.is_staff){
            history.push('/login')
        }

        dispatch(viewOrders())

        if(deliverySuccess || paySuccess){
            dispatch({
                type: ORDER_DELIVERY_RESET
            })
            dispatch({
                type: ORDER_PAY_RESET
            })
        }
        

    }, [ dispatch, history, deliverySuccess, paySuccess])
    
    const deleteOrderHandler = (id) => {

    }

    const setDeliveredHandler = (id) => {
        dispatch(setDelivered(id))
        console.log('delivered : ', id)
    }

    const setPaidHandler = (id) => {
        dispatch(setPaid(id))
        console.log('paid : ' , id)
    }


    return loading 
    
    ? <Loader/>
    
    : error ? <Alert variant = 'danger'> {error} </Alert>

    : (
        <div>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Created At</th>
                        <th>Total Price</th>
                        
                        <th>Paid</th>
                        <th>Delivered</th>
                        <th>Set Delivered</th>
                        <th>Set Paid</th>
                        <th>Delete</th>
                    </tr>
                    
                </thead>

                <tbody>
                    {orders.slice(0).reverse().map(order => (
                        <tr key={order._id}>
                            <td>
                                <Link to = {`/order/${order._id}`}>
                                        {order._id}
                                </Link>
                            </td>
                            <td> {order.user && order.user.username} </td>
                            <td>{order.createdAt}</td>
                            <td> &#2547; {order.totalPrice}</td>
                            
                            <td>
                                {order.isPaid ? <i className='fas fa-check' style={{color: 'green'}}></i>
                                    : <i className='fas fa-check center' style={{color: 'red'}}></i>
                                }
                            </td>

                            <td>
                                {order.isDelivered ? <i className='fas fa-check' style={{color: 'green'}}></i>
                                    : <i className='fas fa-check center' style={{color: 'red'}}></i>
                                }
                            </td>

                            <td>
                                <Button active = {order.isDelivered} variant= 'success' onClick={(e) => setDeliveredHandler(order._id)}>
                                    Delivered?
                                </Button>
                            </td>

                            <td>
                                <Button active = {order.isPaid} variant= 'success' onClick={(e) => setPaidHandler(order._id)}>
                                    Paid?
                                </Button>
                            </td>
                                
                            <td>
                                <Button variant= 'danger' onClick={(e) => deleteOrderHandler(order._id)}>
                                    Remove Product
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default AdminOrdersPage