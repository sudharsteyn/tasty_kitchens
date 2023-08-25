import React from 'react'

const TastyKitchensContext = React.createContext({
  cartItem: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  increaseItem: () => {},
  decreaseItem: () => {},
  clearCart: () => {},
})

export default TastyKitchensContext
