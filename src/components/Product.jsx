import React from "react";

const Product = ({ product, cart, addToCart, removeFromCart }) => {
  return (
    <div className="flex justify-between items-center bg-white rounded-lg p-4 shadow-md mb-4">
      <div className="flex-grow">
        <span className="text-lg font-semibold">{product.name}</span>
        <span className="text-gray-500 ml-6">${product.price}</span>
      </div>
      <div className="flex">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => addToCart(product.id)}
        >
          Add to Cart
        </button>
        {cart[product.id] && (
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
            onClick={() => removeFromCart(product.id)}
          >
            Remove from Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;