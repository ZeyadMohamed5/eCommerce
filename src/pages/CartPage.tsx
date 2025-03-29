import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getProductById } from "../Api/Products";
import { Link } from "react-router-dom";
import { MdOutlineDeleteOutline } from "react-icons/md";

const CartPage = () => {
  const { currentUser, updateCart, removeFromCart } = useAuth();
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!currentUser?.cart) return;

      try {
        const products = await Promise.all(
          currentUser.cart.map(async (cartItem) => {
            const product = await getProductById(cartItem.id);
            return { ...product, quantity: cartItem.quantity };
          })
        );
        setCartItems(products);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [currentUser?.cart]);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="py-10">
      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr className="shadow-md ">
            <th className="font-normal px-4 py-3 text-center">Product</th>
            <th className="font-normal px-4 py-3 text-center hidden sm:table-cell">
              Price
            </th>
            <th className="font-normal px-4 py-3 text-center  hidden sm:table-cell">
              Quantity
            </th>
            <th className="font-normal px-4 py-3 text-center hidden sm:table-cell">
              Subtotal
            </th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(({ thumbnail, title, id, price, quantity }) => (
            <tr key={id} className="shadow-md">
              <td className="px-4 py-3 flex items-center">
                <span
                  className=" text-accent-clr rounded-full cursor-pointer"
                  onClick={() => removeFromCart(id)}
                >
                  <MdOutlineDeleteOutline size={20} />
                </span>
                <img
                  className="w-30 h-30 object-cover rounded"
                  src={thumbnail}
                  alt={title}
                />
                <h5 className="text-sm ">{title}</h5>
              </td>

              <td className="text-center px-4 py-3 hidden sm:table-cell">
                {price}$
              </td>
              <td className="text-center px-4 py-3 hidden sm:table-cell">
                <div className="flex justify-between items-center border rounded w-[100px] mx-auto text-center">
                  <button
                    onClick={() => updateCart(id, -1)}
                    className="border-r px-2"
                  >
                    -
                  </button>
                  <div className="px-3">{quantity}</div>
                  <button
                    className="border-l px-2"
                    onClick={() => updateCart(id, 1)}
                  >
                    +
                  </button>
                </div>
              </td>
              <td className="text-center px-4 py-3 hidden sm:table-cell">
                {(price * quantity).toFixed(2)}$
              </td>

              <td className="block px-4 py-2 space-y-2 sm:hidden">
                <div className="flex justify-between items-center ">
                  <span>price:</span>
                  <span>{price}</span>
                </div>
                <div className="flex justify-between items-center ">
                  <span>quantity:</span>
                  <div className="flex border rounded text-center">
                    <button
                      onClick={() => updateCart(id, -1)}
                      className="border-r px-2"
                    >
                      -
                    </button>
                    <div className="px-3">{quantity}</div>
                    <button
                      className="border-l px-2"
                      onClick={() => updateCart(id, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Subtotal:</span>
                  <span>{(price * quantity).toFixed(2)}$</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="bg-white border-1 border-gray-300 rounded mt-5 px-8 py-3">
        <Link to={"/products"}>Return to products</Link>
      </button>
      <div className="flex flex-col space-y-8 items-center justify-between md:flex-row md:items-baseline">
        <form className="flex flex-wrap gap-2 justify-center mx-auto space-x-3 mt-6 max-w-full md:m-0">
          <input
            type="text"
            className="border-1 border-black outline-none ps-4 py-3 rounded"
            placeholder="Coupon Code"
          />
          <button className="themeButton px-8 py-3">Apply Code</button>
        </form>
        <div className="border-1 rounded text-center w-full p-6 md:w-[400px]">
          <h5 className="font-semibold text-left">Cart Total</h5>
          <div className="flex justify-between items-center border-b border-gray-500 py-3">
            <p>Products total:</p>
            <p>{totalPrice.toFixed(2)}$</p>
          </div>
          <div className="flex justify-between items-center border-b border-gray-500 py-3">
            <p>Shipping:</p>
            <p>Free</p>
          </div>
          <div className="flex justify-between items-center py-3">
            <p>Total:</p>
            <p>{totalPrice.toFixed(2)}$</p>
          </div>
          <button className="themeButton px-3 py-3">Procced to checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
