import React, {useState, useEffect} from 'react'
import { Col, Row, Container, Form ,Button, Alert} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import FormComponent from '../components/Form'
import Loader from '../components/Loader'
import { PRODUCT_EDIT_RESET } from '../constants/productConstants'
import { editProduct, listProduct} from '../actions/productActions'

function AdminProductPage({history, location, match}) {
   //userid
  const productId = match.params.id

  //Setting up state
  const [name, setName] = useState('') 
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('') 
  const [brand, setBrand] = useState('') 
  const [price, setPrice] = useState('') 
  const [countInStock, setCountInStock] = useState('') 

  
  const userLogin = useSelector(state => state.userLogin)
  const { userDetail, error: productDetailError, loading: productDetailLoading} = userLogin

  const productDetail = useSelector(state => state.productDetail)
  const { product } = productDetail

  const productEdit = useSelector(state => state.productEdit)
  const {success: editSuccess, error : editError, loading: editLoading} = productEdit

  const dispatch = useDispatch()

  useEffect(()=> {
    //Admin view, normal user wont see this page
    if(!userDetail.is_staff){
        history.push('/login')
    }

    if(editSuccess){
        dispatch({
            type: PRODUCT_EDIT_RESET
        })
        history.push('/admin/products/')
    }

    if(!product || product._id !== Number(productId)){
        dispatch(listProduct(productId))
    }else{
        setName(product.name)
        setDescription(product.description)
        setBrand(product.brand)
        setCategory(product.category)
        setPrice(product.price)
        setCountInStock(product.countInStock)
        console.log('product name else:  ', product.name)
    }
    console.log('product name: ', product.name)
          
  },[history, dispatch, productId, product, editSuccess])


  const submit =  (e) => {
    console.log('edit')
    e.preventDefault()

    dispatch(editProduct({
        _id: productId,
        name,
        description,
        brand,
        category,
        price,
        countInStock,
    }))
  }

  return productDetailLoading ? 
    (<Loader/> )
  : productDetailError ? 
    (<Alert>{productDetailError}</Alert>)
  : (
    <FormComponent>
        <h1>
            Edit Product
        </h1>

        {/* {updateLoading && <Loader/>}
        {updateError && <Alert variant='danger'>{updateError}</Alert>} */}

        <Form onSubmit={submit}>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type='name' value={name}  onChange = {(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Brand</Form.Label>
                <Form.Control type='text' value = {brand} onChange = {(e) => setBrand(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control type='text' value={description}  onChange = {(e) => setDescription(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Control type='text' value = {category} onChange = {(e) => setCategory(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control type='number' value = {price} onChange = {(e) => setPrice(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Stock</Form.Label>
                <Form.Control type='number' value = {countInStock} onChange = {(e) => setCountInStock(e.target.value)}></Form.Control>
            </Form.Group>

            {/* <Form.Group>
                <Form.Label>Set Admin</Form.Label>
                <Form.Check type='checkbox'  onChange = {(e) => setDescription(e.target.checked)}></Form.Check>
            </Form.Group> */}

            <Button className = 'my-3' type = 'submit' margin='5' variant="secondary" size="md">Update</Button>
        </Form>
        
        
    </FormComponent>
  )
}

export default AdminProductPage