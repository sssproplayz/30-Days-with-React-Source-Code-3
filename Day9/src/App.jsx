import React, { useEffect, useMemo, useState } from "react";

function App() {
  // ============================================================
  // PRODUCT DATA
  // ============================================================

  const products = [
    {
      id: 1,
      name: "Pink Notebook",
      price: 120,
      category: "Stationery",
      rating: 4.8,
      reviews: 124,
      emoji: "📓",
      color: "#ffd6e7",
      description: "A cute pastel notebook perfect for notes and journaling.",
      stock: 15,
      badge: "Bestseller"
    },
    {
      id: 2,
      name: "Cherry Gel Pen",
      price: 45,
      category: "Stationery",
      rating: 4.7,
      reviews: 98,
      emoji: "🖊️",
      color: "#ffe0eb",
      description: "Smooth-writing gel pen with a pretty cherry design.",
      stock: 30,
      badge: "Popular"
    },
    {
      id: 3,
      name: "Pink Shoulder Bag",
      price: 899,
      category: "Bags",
      rating: 4.9,
      reviews: 213,
      emoji: "👜",
      color: "#ffc9df",
      description: "A stylish everyday shoulder bag with a soft pink finish.",
      stock: 8,
      badge: "Trending"
    },
    {
      id: 4,
      name: "Ribbon Hair Bow",
      price: 199,
      category: "Accessories",
      rating: 4.6,
      reviews: 76,
      emoji: "🎀",
      color: "#ffdbea",
      description: "A cute satin ribbon bow for your everyday outfits.",
      stock: 20,
      badge: "Cute"
    },
    {
      id: 5,
      name: "Heart Water Bottle",
      price: 499,
      category: "Lifestyle",
      rating: 4.8,
      reviews: 154,
      emoji: "🥤",
      color: "#ffe4ef",
      description: "Reusable water bottle with an adorable heart design.",
      stock: 12,
      badge: "New"
    },
    {
      id: 6,
      name: "Mini Makeup Pouch",
      price: 349,
      category: "Beauty",
      rating: 4.7,
      reviews: 87,
      emoji: "👝",
      color: "#ffd0e3",
      description: "Compact pouch for makeup, skincare and tiny essentials.",
      stock: 14,
      badge: "Popular"
    },
    {
      id: 7,
      name: "Pearl Bracelet",
      price: 299,
      category: "Accessories",
      rating: 4.9,
      reviews: 189,
      emoji: "📿",
      color: "#fff1f7",
      description: "Elegant pearl bracelet with a delicate feminine look.",
      stock: 10,
      badge: "Bestseller"
    },
    {
      id: 8,
      name: "Pink Headphones",
      price: 1299,
      category: "Electronics",
      rating: 4.6,
      reviews: 201,
      emoji: "🎧",
      color: "#ffd9e9",
      description: "Comfortable wireless headphones in pastel pink.",
      stock: 6,
      badge: "Limited"
    },
    {
      id: 9,
      name: "Cute Desk Lamp",
      price: 799,
      category: "Lifestyle",
      rating: 4.5,
      reviews: 65,
      emoji: "💡",
      color: "#ffe9f1",
      description: "Soft glowing desk lamp for studying or late-night work.",
      stock: 9,
      badge: "New"
    },
    {
      id: 10,
      name: "Cherry Phone Case",
      price: 399,
      category: "Accessories",
      rating: 4.8,
      reviews: 143,
      emoji: "📱",
      color: "#ffd4e5",
      description: "Protective phone case with a cute cherry pattern.",
      stock: 18,
      badge: "Trending"
    },
    {
      id: 11,
      name: "Pink Tote Bag",
      price: 599,
      category: "Bags",
      rating: 4.7,
      reviews: 91,
      emoji: "🛍️",
      color: "#ffddea",
      description: "Spacious tote bag for college, shopping and everyday use.",
      stock: 11,
      badge: "Popular"
    },
    {
      id: 12,
      name: "Strawberry Mug",
      price: 299,
      category: "Lifestyle",
      rating: 4.9,
      reviews: 172,
      emoji: "☕",
      color: "#ffe1ed",
      description: "Adorable strawberry-themed mug for your morning drinks.",
      stock: 16,
      badge: "Cute"
    }
  ];

  // ============================================================
  // STATE
  // ============================================================

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("preppyCart");

    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch {
        return [];
      }
    }

    return [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("preppyWishlist");

    if (savedWishlist) {
      try {
        return JSON.parse(savedWishlist);
      } catch {
        return [];
      }
    }

    return [];
  });

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");

  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const [toast, setToast] = useState("");

  const [checkoutData, setCheckoutData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    payment: "UPI"
  });

  // ============================================================
  // LOCAL STORAGE
  // ============================================================

  useEffect(() => {
    localStorage.setItem("preppyCart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("preppyWishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // ============================================================
  // TOAST
  // ============================================================

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2000);
  };

  // ============================================================
  // CATEGORIES
  // ============================================================

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category))
  ];

  // ============================================================
  // FILTER PRODUCTS
  // ============================================================

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    if (sort === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [search, category, sort]);

  // ============================================================
  // CART FUNCTIONS
  // ============================================================

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(
                  item.quantity + 1,
                  product.stock
                )
              }
            : item
        )
      );

      showToast(`${product.name} quantity updated 💗`);
      return;
    }

    setCart([
      ...cart,
      {
        ...product,
        quantity: 1
      }
    ]);

    showToast(`${product.name} added to cart 🎀`);
  };

  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) => {
        if (item.id !== id) {
          return item;
        }

        if (item.quantity >= item.stock) {
          showToast("Maximum stock reached 💕");
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1
        };
      })
    );
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart
        .map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity - 1
            };
          }

          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    const item = cart.find((product) => product.id === id);

    setCart(cart.filter((product) => product.id !== id));

    if (item) {
      showToast(`${item.name} removed 🗑️`);
    }
  };

  const clearCart = () => {
    setCart([]);
    showToast("Cart cleared 🎀");
  };

  // ============================================================
  // WISHLIST
  // ============================================================

  const toggleWishlist = (product) => {
    const exists = wishlist.some((item) => item.id === product.id);

    if (exists) {
      setWishlist(
        wishlist.filter((item) => item.id !== product.id)
      );

      showToast("Removed from wishlist 💔");
    } else {
      setWishlist([...wishlist, product]);
      showToast("Added to wishlist 💗");
    }
  };

  const isWishlisted = (id) => {
    return wishlist.some((item) => item.id === id);
  };

  // ============================================================
  // CART CALCULATIONS
  // ============================================================

  const itemCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const discount = couponApplied ? subtotal * 0.1 : 0;

  const shipping =
    subtotal === 0
      ? 0
      : subtotal >= 999
      ? 0
      : 49;

  const grandTotal =
    subtotal - discount + shipping;

  // ============================================================
  // COUPON
  // ============================================================

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "PREPPY10") {
      setCouponApplied(true);
      showToast("10% discount applied 🎀");
    } else {
      setCouponApplied(false);
      showToast("Invalid coupon code 💔");
    }
  };

  // ============================================================
  // CHECKOUT
  // ============================================================

  const handleCheckoutChange = (event) => {
    const { name, value } = event.target;

    setCheckoutData({
      ...checkoutData,
      [name]: value
    });
  };

  const placeOrder = (event) => {
    event.preventDefault();

    if (cart.length === 0) {
      showToast("Your cart is empty 🛒");
      return;
    }

    if (
      !checkoutData.name ||
      !checkoutData.email ||
      !checkoutData.phone ||
      !checkoutData.address ||
      !checkoutData.city ||
      !checkoutData.pincode
    ) {
      showToast("Please fill all details 💕");
      return;
    }

    setCart([]);
    setShowCheckout(false);

    showToast("Order placed successfully! 🎀");

    setCheckoutData({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      pincode: "",
      payment: "UPI"
    });
  };

  // ============================================================
  // PRODUCT CARD
  // ============================================================

  const ProductCard = ({ product }) => {
    return (
      <div className="product-card">
        <div
          className="product-image"
          style={{
            background: product.color
          }}
        >
          <span className="product-emoji">
            {product.emoji}
          </span>

          <span className="badge">
            {product.badge}
          </span>

          <button
            className={`heart-button ${
              isWishlisted(product.id)
                ? "heart-active"
                : ""
            }`}
            onClick={() => toggleWishlist(product)}
          >
            {isWishlisted(product.id) ? "♥" : "♡"}
          </button>
        </div>

        <div className="product-info">
          <p className="category-label">
            {product.category}
          </p>

          <h3>{product.name}</h3>

          <p className="description">
            {product.description}
          </p>

          <div className="rating">
            <span>★★★★★</span>
            <small>
              {product.rating} ({product.reviews})
            </small>
          </div>

          <div className="product-bottom">
            <div>
              <span className="price">
                ₹{product.price}
              </span>

              <span className="stock">
                {product.stock} left
              </span>
            </div>

            <button
              className="add-button"
              onClick={() => addToCart(product)}
            >
              + Add
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ============================================================
  // CART SIDEBAR
  // ============================================================

  const CartSidebar = () => {
    return (
      <div className="overlay">
        <div className="side-panel">
          <div className="panel-header">
            <div>
              <p className="mini-title">
                YOUR BAG
              </p>

              <h2>Shopping Cart 🛍️</h2>
            </div>

            <button
              className="close-button"
              onClick={() => setShowCart(false)}
            >
              ×
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-icon">
                🛍️
              </div>

              <h3>Your cart is empty</h3>

              <p>
                Add something cute before your cart
                starts feeling neglected.
              </p>

              <button
                className="primary-button"
                onClick={() => setShowCart(false)}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((item) => (
                  <div
                    className="cart-item"
                    key={item.id}
                  >
                    <div
                      className="cart-item-image"
                      style={{
                        background: item.color
                      }}
                    >
                      {item.emoji}
                    </div>

                    <div className="cart-item-info">
                      <h4>{item.name}</h4>

                      <p>
                        ₹{item.price}
                      </p>

                      <div className="quantity-row">
                        <button
                          onClick={() =>
                            decreaseQuantity(item.id)
                          }
                        >
                          −
                        </button>

                        <span>
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            increaseQuantity(item.id)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      className="remove-button"
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <div className="coupon-box">
                <input
                  type="text"
                  placeholder="Coupon code"
                  value={coupon}
                  onChange={(event) =>
                    setCoupon(event.target.value)
                  }
                />

                <button onClick={applyCoupon}>
                  Apply
                </button>
              </div>

              <div className="summary">
                <div>
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>

                <div>
                  <span>Discount</span>
                  <span>
                    -₹{discount.toFixed(2)}
                  </span>
                </div>

                <div>
                  <span>Shipping</span>
                  <span>
                    {shipping === 0
                      ? "FREE"
                      : `₹${shipping}`}
                  </span>
                </div>

                <div className="grand-total">
                  <span>Total</span>
                  <span>
                    ₹{grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                className="checkout-button"
                onClick={() => {
                  setShowCart(false);
                  setShowCheckout(true);
                }}
              >
                Proceed to Checkout →
              </button>

              <button
                className="clear-button"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  // ============================================================
  // WISHLIST PANEL
  // ============================================================

  const WishlistPanel = () => {
    return (
      <div className="overlay">
        <div className="side-panel">
          <div className="panel-header">
            <div>
              <p className="mini-title">
                SAVED ITEMS
              </p>

              <h2>My Wishlist 💗</h2>
            </div>

            <button
              className="close-button"
              onClick={() => setShowWishlist(false)}
            >
              ×
            </button>
          </div>

          {wishlist.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-icon">
                ♡
              </div>

              <h3>No saved items</h3>

              <p>
                Your wishlist is currently experiencing
                a tragic lack of cute things.
              </p>
            </div>
          ) : (
            <div className="wishlist-list">
              {wishlist.map((item) => (
                <div
                  className="wishlist-item"
                  key={item.id}
                >
                  <div
                    className="wishlist-image"
                    style={{
                      background: item.color
                    }}
                  >
                    {item.emoji}
                  </div>

                  <div>
                    <h4>{item.name}</h4>

                    <p>
                      ₹{item.price}
                    </p>

                    <button
                      className="small-add"
                      onClick={() =>
                        addToCart(item)
                      }
                    >
                      Add to Cart
                    </button>
                  </div>

                  <button
                    className="remove-button"
                    onClick={() =>
                      toggleWishlist(item)
                    }
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // ============================================================
  // CHECKOUT
  // ============================================================

  const CheckoutModal = () => {
    return (
      <div className="overlay">
        <div className="checkout-modal">
          <div className="panel-header">
            <div>
              <p className="mini-title">
                FINAL STEP
              </p>

              <h2>Checkout 🎀</h2>
            </div>

            <button
              className="close-button"
              onClick={() =>
                setShowCheckout(false)
              }
            >
              ×
            </button>
          </div>

          <form onSubmit={placeOrder}>
            <div className="form-grid">
              <div className="form-group">
                <label>
                  Full Name
                </label>

                <input
                  name="name"
                  value={checkoutData.name}
                  onChange={handleCheckoutChange}
                  placeholder="Your name"
                />
              </div>

              <div className="form-group">
                <label>
                  Email
                </label>

                <input
                  name="email"
                  type="email"
                  value={checkoutData.email}
                  onChange={handleCheckoutChange}
                  placeholder="you@example.com"
                />
              </div>

              <div className="form-group">
                <label>
                  Phone
                </label>

                <input
                  name="phone"
                  value={checkoutData.phone}
                  onChange={handleCheckoutChange}
                  placeholder="10 digit number"
                />
              </div>

              <div className="form-group">
                <label>
                  Pincode
                </label>

                <input
                  name="pincode"
                  value={checkoutData.pincode}
                  onChange={handleCheckoutChange}
                  placeholder="400001"
                />
              </div>
            </div>

            <div className="form-group">
              <label>
                Address
              </label>

              <textarea
                name="address"
                value={checkoutData.address}
                onChange={handleCheckoutChange}
                placeholder="House number, street, area..."
              />
            </div>

            <div className="form-group">
              <label>
                City
              </label>

              <input
                name="city"
                value={checkoutData.city}
                onChange={handleCheckoutChange}
                placeholder="Mumbai"
              />
            </div>

            <div className="payment-section">
              <label>
                Payment Method
              </label>

              <div className="payment-options">
                {[
                  "UPI",
                  "Card",
                  "Cash on Delivery"
                ].map((method) => (
                  <label
                    className="payment-option"
                    key={method}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method}
                      checked={
                        checkoutData.payment === method
                      }
                      onChange={
                        handleCheckoutChange
                      }
                    />

                    <span>{method}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="checkout-total">
              <span>Order Total</span>

              <strong>
                ₹{grandTotal.toFixed(2)}
              </strong>
            </div>

            <button
              type="submit"
              className="checkout-button"
            >
              Place Order 🎀
            </button>
          </form>
        </div>
      </div>
    );
  };

  // ============================================================
  // MAIN RETURN
  // ============================================================

  return (
    <>
      <style>{`

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background: #fff7fb;
          color: #4d3040;
          font-family:
            "Trebuchet MS",
            Arial,
            sans-serif;
        }

        button,
        input,
        textarea,
        select {
          font-family: inherit;
        }

        button {
          cursor: pointer;
        }

        /* ======================================================
           HEADER
        ====================================================== */

        .header {
          position: sticky;
          top: 0;
          z-index: 20;
          background: rgba(255, 247, 251, 0.96);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid #f2d7e4;
        }

        .header-inner {
          max-width: 1250px;
          margin: auto;
          padding: 18px 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 180px;
        }

        .logo-icon {
          width: 44px;
          height: 44px;
          display: grid;
          place-items: center;
          background: #ffd3e5;
          border-radius: 50%;
          font-size: 23px;
        }

        .logo h2 {
          margin: 0;
          font-family: Georgia, serif;
          color: #9c4168;
        }

        .logo span {
          font-size: 11px;
          letter-spacing: 2px;
          color: #b87998;
        }

        .search-box {
          flex: 1;
          max-width: 450px;
          position: relative;
        }

        .search-box input {
          width: 100%;
          padding: 13px 18px;
          border: 1px solid #eccbd9;
          border-radius: 30px;
          background: white;
          outline: none;
          font-size: 14px;
        }

        .search-box input:focus {
          border-color: #d978a2;
          box-shadow: 0 0 0 4px #ffe5ef;
        }

        .header-actions {
          display: flex;
          gap: 10px;
        }

        .header-button {
          border: 1px solid #edcfdd;
          background: white;
          padding: 10px 15px;
          border-radius: 22px;
          color: #8e4b6b;
          transition: 0.2s;
        }

        .header-button:hover {
          background: #ffe6ef;
          transform: translateY(-2px);
        }

        /* ======================================================
           HERO
        ====================================================== */

        .hero {
          max-width: 1250px;
          margin: 30px auto;
          padding: 45px;
          border-radius: 30px;
          background:
            radial-gradient(
              circle at 85% 20%,
              #ffffff 0 10%,
              transparent 11%
            ),
            linear-gradient(
              135deg,
              #ffe3ef,
              #fff5f9
            );
          position: relative;
          overflow: hidden;
        }

        .hero::after {
          content: "🎀";
          position: absolute;
          right: 70px;
          bottom: -30px;
          font-size: 150px;
          opacity: 0.12;
        }

        .hero-content {
          max-width: 650px;
          position: relative;
          z-index: 2;
        }

        .eyebrow {
          letter-spacing: 4px;
          font-size: 12px;
          font-weight: bold;
          color: #ad5279;
        }

        .hero h1 {
          font-family: Georgia, serif;
          font-size: 52px;
          line-height: 1;
          margin: 15px 0;
          color: #8e3f61;
        }

        .hero p {
          color: #805d6c;
          max-width: 540px;
          line-height: 1.7;
        }

        .hero-button {
          border: none;
          background: #a94f76;
          color: white;
          padding: 14px 24px;
          border-radius: 25px;
          margin-top: 12px;
          font-weight: bold;
          box-shadow: 0 8px 20px rgba(169, 79, 118, 0.2);
        }

        .hero-button:hover {
          transform: translateY(-2px);
        }

        /* ======================================================
           TOOLBAR
        ====================================================== */

        .toolbar {
          max-width: 1250px;
          margin: 25px auto;
          padding: 0 10px;
        }

        .categories {
          display: flex;
          gap: 9px;
          overflow-x: auto;
          padding-bottom: 10px;
        }

        .category-button {
          border: 1px solid #e9cdd9;
          background: white;
          padding: 9px 17px;
          border-radius: 20px;
          color: #8d526b;
          white-space: nowrap;
        }

        .category-button.active,
        .category-button:hover {
          background: #9e496f;
          color: white;
          border-color: #9e496f;
        }

        .sort-row {
          margin-top: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .sort-row select {
          border: 1px solid #e6cbd7;
          background: white;
          padding: 10px 15px;
          border-radius: 15px;
          color: #75485b;
        }

        /* ======================================================
           PRODUCTS
        ====================================================== */

        .products-grid {
          max-width: 1250px;
          margin: 25px auto 80px;
          display: grid;
          grid-template-columns:
            repeat(4, 1fr);
          gap: 20px;
          padding: 0 10px;
        }

        .product-card {
          background: white;
          border: 1px solid #f0dce5;
          border-radius: 24px;
          overflow: hidden;
          box-shadow:
            0 8px 25px rgba(100, 40, 70, 0.06);
          transition: 0.25s;
        }

        .product-card:hover {
          transform: translateY(-6px);
          box-shadow:
            0 15px 35px rgba(100, 40, 70, 0.12);
        }

        .product-image {
          height: 220px;
          display: grid;
          place-items: center;
          position: relative;
        }

        .product-emoji {
          font-size: 85px;
          filter:
            drop-shadow(
              0 10px 10px
              rgba(120, 40, 80, 0.12)
            );
        }

        .badge {
          position: absolute;
          top: 13px;
          left: 13px;
          background: white;
          padding: 6px 10px;
          border-radius: 15px;
          font-size: 10px;
          font-weight: bold;
          color: #a14870;
        }

        .heart-button {
          position: absolute;
          right: 13px;
          top: 13px;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          border: none;
          background: white;
          color: #bb6287;
          font-size: 21px;
        }

        .heart-active {
          color: #d43d72;
        }

        .product-info {
          padding: 18px;
        }

        .category-label {
          text-transform: uppercase;
          letter-spacing: 1.5px;
          font-size: 9px;
          color: #b97896;
          font-weight: bold;
        }

        .product-info h3 {
          margin: 5px 0;
          font-family: Georgia, serif;
          color: #643c4e;
        }

        .description {
          font-size: 12px;
          color: #876875;
          line-height: 1.5;
          min-height: 38px;
        }

        .rating {
          display: flex;
          align-items: center;
          gap: 7px;
          margin: 12px 0;
        }

        .rating span {
          color: #e5a04e;
          font-size: 12px;
        }

        .rating small {
          color: #9b7887;
        }

        .product-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
        }

        .price {
          font-weight: bold;
          font-size: 18px;
          color: #873f61;
        }

        .stock {
          display: block;
          font-size: 9px;
          color: #b47790;
          margin-top: 3px;
        }

        .add-button {
          border: none;
          background: #ffe0ec;
          color: #914563;
          padding: 10px 13px;
          border-radius: 18px;
          font-weight: bold;
        }

        .add-button:hover {
          background: #9e496f;
          color: white;
        }

        /* ======================================================
           OVERLAY
        ====================================================== */

        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(65, 27, 45, 0.35);
          z-index: 100;
          display: flex;
          justify-content: flex-end;
          backdrop-filter: blur(3px);
        }

        .side-panel {
          width: min(460px, 100%);
          height: 100%;
          background: #fffafd;
          padding: 28px;
          overflow-y: auto;
          animation: slideIn 0.25s ease;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }

          to {
            transform: translateX(0);
          }
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 25px;
        }

        .panel-header h2 {
          font-family: Georgia, serif;
          color: #6e3d52;
          margin: 5px 0;
        }

        .mini-title {
          margin: 0;
          font-size: 9px;
          letter-spacing: 3px;
          color: #b66a88;
          font-weight: bold;
        }

        .close-button {
          border: none;
          background: #ffe2ed;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          font-size: 23px;
          color: #8c4562;
        }

        /* ======================================================
           CART
        ====================================================== */

        .cart-item {
          display: flex;
          align-items: center;
          gap: 13px;
          background: white;
          padding: 13px;
          border: 1px solid #f1dce5;
          border-radius: 18px;
          margin-bottom: 12px;
        }

        .cart-item-image {
          width: 62px;
          height: 62px;
          display: grid;
          place-items: center;
          border-radius: 14px;
          font-size: 30px;
          flex-shrink: 0;
        }

        .cart-item-info {
          flex: 1;
        }

        .cart-item-info h4 {
          margin: 0 0 4px;
          color: #673e51;
        }

        .cart-item-info p {
          margin: 0 0 8px;
          color: #a14c70;
          font-weight: bold;
        }

        .quantity-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .quantity-row button {
          border: 1px solid #eacbd9;
          background: #fff7fa;
          width: 27px;
          height: 27px;
          border-radius: 50%;
        }

        .remove-button {
          border: none;
          background: transparent;
          color: #c57996;
          font-size: 20px;
        }

        .coupon-box {
          display: flex;
          gap: 8px;
          margin: 22px 0;
        }

        .coupon-box input {
          flex: 1;
          border: 1px solid #e7cbd8;
          border-radius: 12px;
          padding: 11px;
          outline: none;
        }

        .coupon-box button {
          border: none;
          background: #f1bfd3;
          color: #723c54;
          padding: 0 16px;
          border-radius: 12px;
          font-weight: bold;
        }

        .summary {
          background: #fff0f6;
          padding: 18px;
          border-radius: 18px;
        }

        .summary > div {
          display: flex;
          justify-content: space-between;
          margin: 9px 0;
          color: #765567;
        }

        .grand-total {
          border-top: 1px dashed #dfb8ca;
          padding-top: 13px;
          font-size: 18px;
          color: #7c3e5b !important;
          font-weight: bold;
        }

        .checkout-button {
          width: 100%;
          border: none;
          background: #9e496f;
          color: white;
          padding: 14px;
          border-radius: 20px;
          margin-top: 17px;
          font-weight: bold;
          font-size: 15px;
        }

        .checkout-button:hover {
          background: #803b5a;
        }

        .clear-button {
          width: 100%;
          margin-top: 8px;
          border: none;
          background: transparent;
          color: #a7617e;
          padding: 10px;
        }

        /* ======================================================
           EMPTY CART
        ====================================================== */

        .empty-cart {
          text-align: center;
          padding: 70px 20px;
        }

        .empty-icon {
          font-size: 65px;
          opacity: 0.6;
        }

        .empty-cart h3 {
          font-family: Georgia, serif;
          color: #704256;
        }

        .empty-cart p {
          color: #927180;
          line-height: 1.6;
        }

        .primary-button {
          border: none;
          background: #9e496f;
          color: white;
          padding: 12px 20px;
          border-radius: 20px;
        }

        /* ======================================================
           WISHLIST
        ====================================================== */

        .wishlist-item {
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 13px;
          background: white;
          border: 1px solid #f0dce5;
          border-radius: 18px;
          margin-bottom: 12px;
        }

        .wishlist-image {
          width: 65px;
          height: 65px;
          display: grid;
          place-items: center;
          border-radius: 15px;
          font-size: 30px;
        }

        .wishlist-item > div:nth-child(2) {
          flex: 1;
        }

        .wishlist-item h4 {
          margin: 0 0 5px;
        }

        .wishlist-item p {
          margin: 0 0 7px;
          color: #9b496d;
          font-weight: bold;
        }

        .small-add {
          border: none;
          background: #ffe0eb;
          color: #874360;
          padding: 7px 10px;
          border-radius: 12px;
          font-size: 11px;
        }

        /* ======================================================
           CHECKOUT
        ====================================================== */

        .checkout-modal {
          width: min(700px, 94%);
          max-height: 90vh;
          overflow-y: auto;
          background: #fffafd;
          border-radius: 25px;
          padding: 30px;
          margin: auto;
          animation: popIn 0.2s ease;
        }

        @keyframes popIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }

          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .form-grid {
          display: grid;
          grid-template-columns:
            repeat(2, 1fr);
          gap: 15px;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-group label,
        .payment-section > label {
          display: block;
          font-size: 12px;
          font-weight: bold;
          color: #76455a;
          margin-bottom: 7px;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          border: 1px solid #e8ceda;
          background: white;
          padding: 12px;
          border-radius: 12px;
          outline: none;
        }

        .form-group textarea {
          min-height: 80px;
          resize: vertical;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          border-color: #c66c92;
          box-shadow: 0 0 0 3px #ffe8f0;
        }

        .payment-options {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }

        .payment-option {
          flex: 1;
          border: 1px solid #e9ceda;
          background: white;
          padding: 12px;
          border-radius: 12px;
          text-align: center;
          cursor: pointer;
        }

        .payment-option input {
          margin-right: 5px;
        }

        .checkout-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #ffeaf2;
          padding: 17px;
          border-radius: 15px;
          color: #713c54;
        }

        .checkout-total strong {
          font-size: 20px;
        }

        /* ======================================================
           TOAST
        ====================================================== */

        .toast {
          position: fixed;
          left: 50%;
          bottom: 25px;
          transform: translateX(-50%);
          background: #71384f;
          color: white;
          padding: 13px 20px;
          border-radius: 25px;
          z-index: 200;
          box-shadow:
            0 10px 30px
            rgba(80, 30, 50, 0.25);
          animation: toastIn 0.25s ease;
          font-size: 13px;
        }

        @keyframes toastIn {
          from {
            transform:
              translate(-50%, 15px);
            opacity: 0;
          }

          to {
            transform:
              translate(-50%, 0);
            opacity: 1;
          }
        }

        /* ======================================================
           FOOTER
        ====================================================== */

        .footer {
          background: #6c3d51;
          color: #ffeaf3;
          padding: 45px 20px;
          text-align: center;
        }

        .footer h2 {
          font-family: Georgia, serif;
        }

        .footer p {
          opacity: 0.75;
          font-size: 13px;
        }

        /* ======================================================
           RESPONSIVE
        ====================================================== */

        @media (max-width: 1000px) {
          .products-grid {
            grid-template-columns:
              repeat(3, 1fr);
          }

          .header-inner {
            flex-wrap: wrap;
          }

          .search-box {
            order: 3;
            max-width: none;
            flex-basis: 100%;
          }
        }

        @media (max-width: 700px) {
          .products-grid {
            grid-template-columns:
              repeat(2, 1fr);
          }

          .hero {
            margin: 20px 10px;
            padding: 30px;
          }

          .hero h1 {
            font-size: 38px;
          }

          .header-inner {
            padding: 15px;
          }

          .logo {
            min-width: auto;
          }

          .header-actions {
            gap: 5px;
          }

          .header-button {
            padding: 8px 10px;
            font-size: 11px;
          }
        }

        @media (max-width: 500px) {
          .products-grid {
            grid-template-columns: 1fr;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .payment-options {
            flex-direction: column;
          }

          .hero h1 {
            font-size: 32px;
          }

          .product-image {
            height: 250px;
          }
        }

      `}</style>

      {/* ========================================================
          HEADER
      ======================================================== */}

      <header className="header">
        <div className="header-inner">

          <div className="logo">
            <div className="logo-icon">
              🎀
            </div>

            <div>
              <h2>Pink & Pretty</h2>
              <span>SHOP THE CUTE LIFE</span>
            </div>
          </div>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search something pretty..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>

          <div className="header-actions">

            <button
              className="header-button"
              onClick={() =>
                setShowWishlist(true)
              }
            >
              ♡ {wishlist.length}
            </button>

            <button
              className="header-button"
              onClick={() =>
                setShowCart(true)
              }
            >
              🛍️ {itemCount}
            </button>

          </div>

        </div>
      </header>

      {/* ========================================================
          HERO
      ======================================================== */}

      <section className="hero">

        <div className="hero-content">

          <span className="eyebrow">
            ✦ NEW SEASON ✦
          </span>

          <h1>
            Pretty things
            <br />
            for pretty days.
          </h1>

          <p>
            Discover stationery, accessories,
            lifestyle essentials and little things
            that make ordinary days feel slightly
            more adorable.
          </p>

          <button
            className="hero-button"
            onClick={() =>
              window.scrollTo({
                top: 450,
                behavior: "smooth"
              })
            }
          >
            Shop Collection →
          </button>

        </div>

      </section>

      {/* ========================================================
          TOOLBAR
      ======================================================== */}

      <section className="toolbar">

        <div className="categories">

          {categories.map((item) => (
            <button
              key={item}
              className={`category-button ${
                category === item
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setCategory(item)
              }
            >
              {item}
            </button>
          ))}

        </div>

        <div className="sort-row">

          <span>
            {filteredProducts.length} products
          </span>

          <select
            value={sort}
            onChange={(event) =>
              setSort(event.target.value)
            }
          >
            <option value="default">
              Sort by
            </option>

            <option value="price-low">
              Price: Low to High
            </option>

            <option value="price-high">
              Price: High to Low
            </option>

            <option value="rating">
              Highest Rated
            </option>

            <option value="name">
              Name
            </option>
          </select>

        </div>

      </section>

      {/* ========================================================
          PRODUCTS
      ======================================================== */}

      <main className="products-grid">

        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))
        ) : (
          <div
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              padding: "80px"
            }}
          >
            <div
              style={{
                fontSize: "60px"
              }}
            >
              🎀
            </div>

            <h2>
              Nothing found
            </h2>

            <p>
              Even the shopping gods have limits.
            </p>
          </div>
        )}

      </main>

      {/* ========================================================
          FOOTER
      ======================================================== */}

      <footer className="footer">

        <h2>
          Pink & Pretty 🎀
        </h2>

        <p>
          Made with React, pink pixels and
          questionable amounts of shopping enthusiasm.
        </p>

        <p>
          © 2026 Pink & Pretty
        </p>

      </footer>

      {/* ========================================================
          MODALS
      ======================================================== */}

      {showCart && <CartSidebar />}

      {showWishlist && <WishlistPanel />}

      {showCheckout && <CheckoutModal />}

      {/* ========================================================
          TOAST
      ======================================================== */}

      {toast && (
        <div className="toast">
          {toast}
        </div>
      )}

    </>
  );
}

export default App;