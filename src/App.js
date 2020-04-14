import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './Components/NavBar';
import ProductList from './Components/ProductList';
import Details from './Components/Details';
import Cart from './Components/Cart';
import PageNotFound from './Components/PageNotFound';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { ProductProvider } from './Context';
import Modal from './Components/Modal';

function App() {
  return (
  <ProductProvider>
   <React.Fragment>
    <Router>
    <NavBar/>
    <Switch>
      <Route exact path = "/" component = {ProductList}/>
      <Route path = "/details"  component = {Details}/>
      <Route path = "/cart"  component = {Cart}/>
      <Route  component = {PageNotFound}/>
    </Switch>
    <Modal/>
    </Router>
   
    </React.Fragment>
   </ProductProvider>
  );
 
}

export default App;
