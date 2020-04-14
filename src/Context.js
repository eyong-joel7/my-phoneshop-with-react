import React, { Component } from 'react'
import {storeProducts, detailProduct} from '../src/data'



const ProductContext = React.createContext();

class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct: detailProduct,
        cart: [],
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubTotal:0,
        cartTax:0,
        cartTotal:0,
    }
    componentDidMount(){
        this.setProducts();
    
    }
    setProducts = ()=>{
        let tempProducts = [];
        storeProducts.forEach(item=>{
            const singleItem = {...item};
            tempProducts = [...tempProducts, singleItem];
            this.setState(()=>{
                return{
                    products: tempProducts
                }
            })
        })
    }
    increment = (id)=>{
     let tempCart = Object.assign(this.state.cart);
     const selectedProduct = tempCart.find(item=>item.id===id);
     //in order not to mutate the item , we are going to work with the index of the item to maintain its position
     const index = tempCart.indexOf(selectedProduct);
     const product = tempCart[index];

     product.count = product.count+1;
     product.total = product.count*product.price;
     this.setState(()=>{
 return{
       cart: [...tempCart]
    }
     }
         ,()=>{
       this.addToTotal()
     })
    

    }
    decrement = (id)=>{
        let tempCart = Object.assign(this.state.cart);
        const selectedProduct = tempCart.find(item=>item.id===id);
        //in order not to mutate the item , we are going to work with the index of the item to maintain its position
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        if(product.count>=1){
            product.count = product.count - 1;
            product.total = product.count*product.price;
            this.setState(()=>{
        return{
              cart: [...tempCart]
           }
            }
                ,()=>{
              this.addToTotal()
            })
        }
        else{
            this.removeItem(id);
        }
     
       
       }
    removeItem = (id)=>{
       let tempProducts =  Object.assign(this.state.products);//works same as this below
       let tempCart = [...this.state.cart]; //destructure the items from that array and add them in this new array
       

       tempCart = tempCart.filter(item =>
           item.id!==id);
    const index = tempProducts.indexOf(this.getItem(id));
    let removeProduct = tempProducts[index];
    removeProduct.inCart = false;
    removeProduct.count = 0;
    removeProduct.total = 0;
    this.setState(()=>{
        return{
            cart: [...tempCart],
            products:[...tempProducts]
        }
    },()=> this.addToTotal())
    }
    addToTotal = ()=>{
        let subTotal = 0;
        this.state.cart.map(item =>{
            subTotal+=item.total;
        });
        const tempTax = subTotal*0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total  = subTotal + tax;
        this.setState(()=>{
            return{
                cartSubTotal: subTotal,
                cartTax: tax,
                cartTotal: total
            }
        })
    }
    clearCart = ()=>{
        this.setState(()=>{
            return{
                cart: []
            }
        },()=>{
            this.setProducts();
            this.addToTotal()

        }
        )
    }
     getItem = id=>{
         const product = this.state.products.find(item => item.id==id)
          return product;
        }

    handleDetail = (id)=>{
      const product = this.getItem(id);
      this.setState(()=>{
          return {
              detailProduct: product
          }
      })
    }
    addToCart = (id)=>{
      let tempProducts = [...this.state.products]; 
      //const index = tempProducts.indexOf(this.getItem(id));
      //const product = tempProducts[index];
      const product = this.getItem(id);
      product.inCart = true;
      product.count = 1;
    const price = product.price;
     product.total = price;
     this.setState(()=>{
         return{
             products: tempProducts,
             cart: [...this.state.cart, product]
         }
     }, ()=> this.addToTotal())
    }
    openModal = (id)=>{
        const product = this.getItem(id);
        this.setState(()=>{
            return {
                modalProduct: product,
                modalOpen:true
            }
        })
    }
    closeModal = ()=>{
        this.setState(()=>{
            return {
                modalOpen:false
            }
        })
    }
    render() {
        return (
           <ProductContext.Provider value={{
             ...this.state,
             handleDetail: this.handleDetail,
             addToCart: this.addToCart,
             openModal: this.openModal,
             closeModal: this.closeModal,
             increment: this.increment,
             decrement: this.decrement,
             clearCart: this.clearCart,
             removeItem: this.removeItem
           }}>
               {
                   this.props.children
               }
           </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;
export {ProductProvider, ProductConsumer};


//3:25:15