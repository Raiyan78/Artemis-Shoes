import React, {useState, useEffect} from 'react'
import { Col, Row, Container, Form ,Button, Alert, Table} from 'react-bootstrap'
import {  LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserList } from '../actions/userAction'
import Loader from '../components/Loader'
import { listProducts, deleteProduct, createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

function AdminProductListpage({history}) {
    const  dispatch = useDispatch()

    //read users state
    const productsList = useSelector(state => state.productList)
    const {products, error, loading} = productsList

    const delProduct = useSelector(state => state.productDelete)
    const {success: deleteSuccess, loading: deleteLoading, error: deleteError} = delProduct

    const addProduct = useSelector(state => state.productCreate)
    const {product: createdProduct, success: createSuccess, loading: createLoading, error: createError} = addProduct


    const userLogin = useSelector(state => state.userLogin)
    const {userDetail} = userLogin
 

    useEffect(()=>{
        if(!userDetail.is_staff){
            history.push('/login')
        }

        dispatch({
            type: PRODUCT_CREATE_RESET
        })

        if(createSuccess){
            history.push(`/admin/product/edit/${createdProduct._id}`)
        }
        dispatch(listProducts())
    }, [ dispatch, deleteSuccess, history, createSuccess ])

    const deleteProductHandler = (id) =>{
        if(window.confirm('Are you sure?')){
            dispatch(deleteProduct(id))
        }
    }
    
    const createProductHandler = () =>{
        console.log('create product')
        dispatch(createProduct())
    }      



    return loading ? (<Loader/> )
        : error ? (<Alert variant = 'danger'> Unauthorized </Alert>)
        : (
        <div>

            <Button className='mb-2 text-blue' variant='info' onClick={(e) => createProductHandler()}>
                Add Product
            </Button>
            
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <td>Brand</td>
                        
                        <td>Rating</td>
                        <td>Price</td>
                        <td>Edit</td>
                        <td>Delete</td>
                    </tr>
                    
                </thead>

                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.brand}</td>
                            
                            <td>
                                {product.rating}
                            </td>
                            <td>
                                &#2547; {product.price}
                            </td>
                            <td>
                                <LinkContainer to ={`/admin/product/edit/${product._id}`}>
                                    <Button variant = 'light'> 
                                        edit
                                    </Button>
                                </LinkContainer>    
                            </td>
                            <td>
                                <Button variant= 'danger' onClick={(e) => deleteProductHandler(product._id)}>
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
export default AdminProductListpage