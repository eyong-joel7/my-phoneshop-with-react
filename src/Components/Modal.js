import React, { Component } from 'react'
import styled from 'styled-components'
import {ProductConsumer} from '../Context'
import Button from '../Components/button'
import {Link} from 'react-router-dom'


export default class Modal extends Component {
    render() {
        return (
            <ProductConsumer>
                {
                    value=>{
                        const {modalOpen, closeModal} = value;
                        const {img, title, price} = value.modalProduct;
                        if(!modalOpen) return null
                        else{ return(
                           <ModalContainer>
                                <div className="container">
                                    <div className="row">
                                        <div id='modal' className="col-8 mx-auto col-md-6 col-lg-4 text-center text-capitalize">
                                            <h5>Item Added to the Card</h5>
                                            <img src={img} className="img-fluid" alt={title}/>
                                            <h5>{title}</h5>
                                            <h5 className="text-muted">${price}</h5>
                                            <Link to="/">
                                                <Button onClick={()=>closeModal()}>
                                                        Continue Shoping
                                                </Button>
                                            </Link>
                                            <Link to="/cart">
                                                <Button cart onClick={()=>closeModal()}>
                                                        Go to Cart
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                           </ModalContainer>
                        );
                        }
                     
                    }
                }
            </ProductConsumer>
        )
    }
}
const ModalContainer = styled.div`
position: fixed;
top: 0;
left:0;
bottom:0;
right: 0;
background: rgba(0,0,0,0.3);
display: flex;
align-items: center;
justify-content: center;
#modal{
    background: var(--mainWhite);
     padding: 5rem;
}
`;