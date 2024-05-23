import React, { useState, useEffect } from "react";
import Product from "./components/Product";

const Products = [
  { id: 1, name: "Product-1", price: 100 },
  { id: 2, name: "Product-2", price: 200 },
  { id: 3, name: "Product-3", price: 300 },
];

const App = () => {
  const [cart, setCart] = useState({});

  useEffect(() => {
    renderCart();
  }, [cart]);

  const addToCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      updatedCart[productId] = (updatedCart[productId] || 0) + 1;
      return updatedCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[productId] && updatedCart[productId] > 0) {
        updatedCart[productId]--;
        if (updatedCart[productId] === 0) {
          delete updatedCart[productId];
        }
      }
      return updatedCart;
    });
  };

  const renderCart = () => {
    const cartList = document.getElementById("cartList");
    const totalPriceDiv = document.getElementById("cartTotal");
    cartList.innerHTML = "";
    let totalPrice = 0;

    for (const productId in cart) {
      const product = Products.find((p) => p.id === parseInt(productId));
      const productTotalPrice = product.price * cart[productId];
      totalPrice += productTotalPrice;

      const li = document.createElement("li");
      li.className = "flex justify-between items-center p-2 border-b border-gray-300";
      li.innerHTML = `
        <span>${product.name}</span>
        <span>${cart[productId]} x ${product.price}</span>
      `;
      cartList.appendChild(li);
    }

    if (totalPrice === 0) {
      cartList.innerHTML = '<span style="margin-bottom: 1rem;">No Product added to the cart</span>';
      totalPriceDiv.innerHTML = '';
    } else {
      totalPriceDiv.innerHTML = `<strong>Total Price: ${totalPrice}</strong>`;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="w-full max-w-2xl p-8 m-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-5xl font-bold text-center mb-8 text-gray-800">
          Cartify: Simplify Your Shopping
        </h1>
        <div className="mb-6">
          {Products.map((product) => (
            <Product
              key={product.id}
              product={product}
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          ))}
        </div>
        <div id="cartList" className="mt-8"></div>
        <p id="cartTotal" className="cart-total mt-2 text-2xl text-right font-semibold text-gray-800"></p>
      </div>
    </div>
  );
};

export default App;
