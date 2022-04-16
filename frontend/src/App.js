import { BrowserRouter as Router,Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header.js'
import Footer from './components/Footer.js'
import HomePage from './screens/HomePage.js'
import CartPage from './screens/CartPage'
import LoginPage from './screens/LoginPage'
import ProductPage from './screens/ProductPage'
import RegisterPage from './screens/RegisterPage'
import UserProfilePage from './screens/UserProfilePage'
import ShippingPage from './screens/ShippingPage'
import PaymentPage from './screens/PaymentPage.js'
import OrderPage from './screens/OrderPage'
import OrderDetailPage from './screens/OrderDetailPage.js'
import UserListPage from './screens/UserListPage'
import UserProfileById from './screens/UserProfileById'
import AdminProductListpage from './screens/AdminProductListpage'
import AdminProductPage from './screens/AdminProductPage'
import AdminOrdersPage from './screens/AdminOrdersPage'

function App() {
  return (
    <Router>
      <Header/>
        
        <Switch>
          <main className="py-5">
            <Container>
                <Route exact path = "/" component = {HomePage}/>
                <Route path = '/product/:id' component = {ProductPage}/>
                <Route path = '/cart/:id?' component = {CartPage}/>
                <Route path = '/login' component = {LoginPage}/>
                <Route path = '/register' component = {RegisterPage}/>
                <Route path = '/profile' component = {UserProfilePage}/>
                <Route path = '/shipping' component = {ShippingPage}/>
                <Route path = '/payment' component = {PaymentPage}/>
                <Route path = '/placeorder' component = {OrderPage}/>
                <Route path = '/order/:id' component= {OrderDetailPage}/>

                <Route path = '/admin/orders/' component= {AdminOrdersPage}/>
                <Route path = '/admin/users/' component= {UserListPage}/>
                <Route path = '/admin/user/edit/:id' component= {UserProfileById}/>
                <Route path = '/admin/products/' component= {AdminProductListpage}/>
                <Route path = '/admin/product/edit/:id' component= {AdminProductPage}/>
                

                
            </Container>
          </main>
        </Switch>
      <Footer/>
    </Router>
  );
}

export default App;
