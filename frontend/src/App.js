import { BrowserRouter as Router,Route } from 'react-router-dom'
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


function App() {
  return (
    <Router>
      <Header/>
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
        </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
