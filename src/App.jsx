import { useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";

import "./App.css";

const products = [
  {
    id: 1,
    name: "Classic T-Shirt",
    price: 250,
    color: "Black",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
  },
  {
    id: 2,
    name: "Summer Hoodie",
    price: 450,
    color: "White",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600",
  },
  {
    id: 3,
    name: "Denim Jacket",
    price: 700,
    color: "Blue",
    image:
      "https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=600",
  },
];

function Home({ cart, addToCart, removeFromCart }) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="container">
      <h1>Style Store 🎀</h1>

      <p className="subtitle">
        Discover Your Favorite Clothes
      </p>

      <h2 className="cart-heading">
        🛍️ Your Cart ({cartCount})
      </h2>

      <div className="cart-box">
        {cart.length === 0 ? (
          <p>Your cart is empty 💗</p>
        ) : (
          <>
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-image"
                />

                <div className="cart-info">
                  <h3>{item.name}</h3>

                  <p>
                    {item.price} EGP × {item.quantity}
                  </p>

                  <button
                    className="btn remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <h3 className="cart-total">
              Total: {total} EGP
            </h3>
          </>
        )}
      </div>

      <h2 className="section-title">
        Our Products 👗
      </h2>

      <div className="products">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />

            <h2>{product.name}</h2>

            <p>Price: {product.price} EGP</p>

            <p>Color: {product.color}</p>

            <button
              className="btn"
              onClick={() => addToCart(product)}
            >
              Add to Cart 🛍️
            </button>

            <br />

            <Link
              to={`/products/${product.id}`}
              className="btn"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <div className="container">
        <h1>Product Not Found</h1>

        <button
          className="btn"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card details">
        <img
          src={product.image}
          alt={product.name}
          className="product-image details-image"
        />

        <h1>{product.name}</h1>

        <p>Product ID: {product.id}</p>

        <p>Price: {product.price} EGP</p>

        <p>Color: {product.color}</p>

        <button
          className="btn"
          onClick={() => addToCart(product)}
        >
          Add to Cart 🛍️
        </button>

        <br />

        <button
          className="btn"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

function App() {
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(productId) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId)
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          }
        />

        <Route
          path="/products/:id"
          element={
            <ProductDetails addToCart={addToCart} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;