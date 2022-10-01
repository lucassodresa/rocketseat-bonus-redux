import { useSelector } from "react-redux"
import { IState } from "../store"
import { ICartItem } from "../store/modules/cart/types"

const Cart = () => {

  const cart = useSelector<IState, ICartItem[]>(state =>  state.cart.items )
  console.log("🚀 ~ file: Cart.tsx ~ line 8 ~ Cart ~ cart", cart)
 
  return (
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Subtotal</th>
        </tr>
      </thead>
        <tbody>
          {cart.map(({product, quantity}) =>(
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{quantity}</td>
              <td>{(product.price * quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
    </table>
  )
}

export default Cart