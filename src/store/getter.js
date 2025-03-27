const getters = {
  products: state => state.filteredProducts.length ? state.filteredProducts : state.products,
    cart: (state) => state.cart,
    totalPrice: (state) => state.cart.reduce((total, item) => total + item.price * item.quantity, 0),
    totalQuantity: (state) => state.cart.reduce((total, item) => total + item.quantity, 0),
    
  };
  
  export default getters;
  