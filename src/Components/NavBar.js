import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../src/logo.svg'
import styled from 'styled-components'
import Button from './button.js'
export default class NavBar extends Component {
    render() {
        return (
            <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
               
              {/* {https://cdn2.iconfinder.com/data/icons/business-office-icons/256/Telephone-512.png} */}
               <Link to="/">
                   <img src={logo} alt = "store" className="navbar-brand"/>
               </Link>
               <ul className="navbar-nav align-items-center">
                   <li className = "nav-item ml-5">
                      <Link to="/"  className = "nav-link">
                          Products
                      </Link>
                   </li>
               </ul>
               <Link to="/cart" className = "ml-auto">
                   <Button>
                       <span className = "mr-2">
                         <i className="fas fa-cart-plus"/>
                       </span>
                        My cart
                   </Button>
               </Link>
            </NavWrapper>
        )
    }
}

const NavWrapper = styled.nav `
background: var(--mainBlue);
.nav-link{
    color:var(--mainWhite) !important;
    font-size: 1.3rem;
    text-transform: capitalize;
}

`