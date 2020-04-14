import React, { Component } from 'react'
import Title from './Title'
import { ProductConsumer } from '../Context';
import Product from './Product';

export default class ProductList extends Component {

    render() { 
       
        return (
            <React.Fragment>
              <div className="py-4">
                 <div className="container">
                    <Title name = "Our" title = "Products"/>
                    <div className="row">
                    <ProductConsumer>
                        {
                         value =>{
                          return value.products.map(product =>{
                            return <Product key = {product.id} product = {product}/>
                          })
                         }   
                        }
    
                    </ProductConsumer> 
                    </div>
              
                    
                </div>
              </div>
            </React.Fragment>
        )
    }
}
