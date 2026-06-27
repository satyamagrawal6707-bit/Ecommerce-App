import { useState, useEffect } from "react";

const PRIMARY = "#1a1a2e";
const ACCENT = "#e94560";
const SURFACE = "#f8f9fb";
const CARD_BG = "#ffffff";
const TEXT = "#1a1a2e";
const MUTED = "#6b7280";
const BORDER = "#e5e7eb";

const styles = {
  app: { fontFamily: "'Inter', sans-serif", background: SURFACE, minHeight: "100vh", color: TEXT },
  nav: {
    background: PRIMARY, color: "#fff", padding: "0 24px", height: 60,
    display: "flex", alignItems: "center", justifyContent: "space-between",
    position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 12px rgba(0,0,0,0.18)"
  },
  navLogo: { fontWeight: 800, fontSize: 22, letterSpacing: "-0.5px", cursor: "pointer", color: "#fff" },
  navLogoAccent: { color: ACCENT },
  navRight: { display: "flex", alignItems: "center", gap: 16 },
  cartBtn: {
    background: ACCENT, color: "#fff", border: "none", borderRadius: 8,
    padding: "8px 18px", fontWeight: 700, cursor: "pointer", fontSize: 15,
    display: "flex", alignItems: "center", gap: 8, transition: "opacity 0.15s"
  },
  cartBadge: {
    background: "#fff", color: ACCENT, borderRadius: "50%", width: 20, height: 20,
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    fontSize: 11, fontWeight: 800
  },
  main: { maxWidth: 1280, margin: "0 auto", padding: "28px 20px" },
  pageTitle: { fontSize: 28, fontWeight: 800, marginBottom: 6, letterSpacing: "-0.5px" },
  pageSubtitle: { color: MUTED, fontSize: 14, marginBottom: 24 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 },
  card: {
    background: CARD_BG, borderRadius: 14, border: `1px solid ${BORDER}`,
    overflow: "hidden", cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s",
    display: "flex", flexDirection: "column"
  },
  cardImg: { width: "100%", height: 180, objectFit: "contain", background: "#f3f4f6", padding: 12 },
  cardBody: { padding: "12px 14px 14px", flex: 1, display: "flex", flexDirection: "column" },
  cardBrand: { fontSize: 10, fontWeight: 700, color: ACCENT, textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 },
  cardTitle: { fontSize: 13, fontWeight: 600, marginBottom: 6, lineHeight: 1.4, flex: 1, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" },
  cardBottom: { display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 },
  cardPrice: { fontWeight: 800, fontSize: 16, color: PRIMARY },
  cardRating: { fontSize: 12, color: MUTED, display: "flex", alignItems: "center", gap: 3 },
  star: { color: "#f59e0b" },
  addBtn: {
    background: PRIMARY, color: "#fff", border: "none", borderRadius: 7,
    padding: "7px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer",
    marginTop: 10, transition: "background 0.15s"
  },
  discountBadge: {
    background: ACCENT, color: "#fff", fontSize: 10, fontWeight: 700,
    borderRadius: 4, padding: "2px 6px", marginLeft: 6
  },
  filterBar: { display: "flex", gap: 10, marginBottom: 22, flexWrap: "wrap", alignItems: "center" },
  searchInput: {
    flex: 1, minWidth: 200, padding: "9px 14px", borderRadius: 8, border: `1.5px solid ${BORDER}`,
    fontSize: 14, outline: "none", fontFamily: "inherit"
  },
  select: {
    padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${BORDER}`,
    fontSize: 13, fontFamily: "inherit", cursor: "pointer", background: "#fff"
  },
  resultCount: { color: MUTED, fontSize: 13, alignSelf: "center", marginLeft: "auto" },
  backBtn: {
    background: "transparent", border: `1.5px solid ${BORDER}`, borderRadius: 8,
    padding: "7px 16px", cursor: "pointer", fontSize: 13, fontWeight: 600,
    marginBottom: 24, display: "inline-flex", alignItems: "center", gap: 6
  },
  detailGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 },
  detailImgWrap: { background: CARD_BG, borderRadius: 16, border: `1px solid ${BORDER}`, padding: 24, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 340 },
  detailImg: { maxWidth: "100%", maxHeight: 340, objectFit: "contain" },
  detailThumbRow: { display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" },
  thumb: { width: 60, height: 60, objectFit: "contain", border: `2px solid ${BORDER}`, borderRadius: 8, cursor: "pointer", background: "#f3f4f6", padding: 4 },
  thumbActive: { borderColor: ACCENT },
  detailInfo: { display: "flex", flexDirection: "column", gap: 12 },
  detailCategory: { fontSize: 12, color: ACCENT, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 },
  detailTitle: { fontSize: 26, fontWeight: 800, lineHeight: 1.25, letterSpacing: "-0.5px" },
  detailMeta: { display: "flex", alignItems: "center", gap: 12, fontSize: 13, color: MUTED },
  detailPrice: { fontSize: 32, fontWeight: 900, color: PRIMARY },
  detailOldPrice: { textDecoration: "line-through", color: MUTED, fontSize: 18, marginLeft: 10, fontWeight: 400 },
  detailDesc: { fontSize: 14, color: MUTED, lineHeight: 1.7 },
  detailRow: { display: "flex", gap: 8, alignItems: "center" },
  qtyBtn: {
    width: 34, height: 34, border: `1.5px solid ${BORDER}`, borderRadius: 7,
    background: "#fff", cursor: "pointer", fontSize: 18, fontWeight: 700,
    display: "flex", alignItems: "center", justifyContent: "center"
  },
  qtyNum: { width: 40, textAlign: "center", fontWeight: 700, fontSize: 16 },
  addToCartBtn: {
    background: ACCENT, color: "#fff", border: "none", borderRadius: 10,
    padding: "13px 28px", fontSize: 15, fontWeight: 700, cursor: "pointer", flex: 1
  },
  specGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, background: "#f3f4f6", borderRadius: 10, padding: 14, fontSize: 13 },
  specLabel: { color: MUTED, fontWeight: 500 },
  specVal: { fontWeight: 600 },
  tagRow: { display: "flex", gap: 6, flexWrap: "wrap" },
  tag: { background: "#e0e7ff", color: "#3730a3", borderRadius: 5, padding: "3px 9px", fontSize: 11, fontWeight: 600 },
  stockBadge: { display: "inline-block", borderRadius: 5, padding: "3px 10px", fontSize: 12, fontWeight: 700 },
  cartGrid: { display: "grid", gridTemplateColumns: "1fr 380px", gap: 28 },
  cartItem: {
    background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 14,
    display: "flex", gap: 16, padding: 16, marginBottom: 14, alignItems: "center"
  },
  cartItemImg: { width: 80, height: 80, objectFit: "contain", background: "#f3f4f6", borderRadius: 10, padding: 6, flexShrink: 0 },
  cartItemInfo: { flex: 1 },
  cartItemTitle: { fontWeight: 700, fontSize: 14, marginBottom: 4, lineHeight: 1.4 },
  cartItemBrand: { fontSize: 11, color: MUTED, marginBottom: 6, textTransform: "uppercase", fontWeight: 600 },
  cartItemPrice: { fontWeight: 800, fontSize: 16, color: PRIMARY },
  removeBtn: {
    background: "transparent", border: "none", color: MUTED, cursor: "pointer",
    fontSize: 18, padding: 4, borderRadius: 6, lineHeight: 1
  },
  summaryBox: {
    background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 14,
    padding: 24, position: "sticky", top: 76, height: "fit-content"
  },
  summaryTitle: { fontWeight: 800, fontSize: 18, marginBottom: 18, letterSpacing: "-0.3px" },
  summaryRow: { display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 10 },
  summaryDivider: { border: "none", borderTop: `1px solid ${BORDER}`, margin: "14px 0" },
  summaryTotal: { display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 18, marginBottom: 20 },
  checkoutBtn: {
    background: ACCENT, color: "#fff", border: "none", borderRadius: 10,
    padding: "14px", fontSize: 16, fontWeight: 700, cursor: "pointer", width: "100%"
  },
  emptyCart: { textAlign: "center", padding: "60px 20px", color: MUTED },
  emptyIcon: { fontSize: 56, marginBottom: 12 },
  shopNowBtn: {
    background: ACCENT, color: "#fff", border: "none", borderRadius: 10,
    padding: "12px 28px", fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 16
  },
  savings: { color: "#16a34a", fontWeight: 600 },
  loader: { display: "flex", justifyContent: "center", alignItems: "center", height: 300, fontSize: 16, color: MUTED },
};

function StarRating({ rating }) {
  return (
    <span style={styles.cardRating}>
      <span style={styles.star}>★</span> {rating?.toFixed(1)}
    </span>
  );
}

function Navbar({ page, cartCount, onCartClick, onLogoClick }) {
  return (
    <nav style={styles.nav}>
      <span style={styles.navLogo} onClick={onLogoClick}>
        Shop<span style={styles.navLogoAccent}>Sphere</span>
      </span>
      <div style={styles.navRight}>
        {page !== "cart" && (
          <button style={styles.cartBtn} onClick={onCartClick}>
            🛒 Cart <span style={styles.cartBadge}>{cartCount}</span>
          </button>
        )}
        {page === "cart" && (
          <button style={{ ...styles.cartBtn, background: "transparent", border: `1.5px solid rgba(255,255,255,0.3)` }} onClick={onLogoClick}>
            ← Back to Shop
          </button>
        )}
      </div>
    </nav>
  );
}

function ListingPage({ onProductClick, cart, setCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=194")
      .then(r => r.json())
      .then(d => { setProducts(d.products || []); setLoading(false); });
  }, []);

  const categories = ["All", ...Array.from(new Set(products.map(p => p.category))).sort()];

  let filtered = products.filter(p =>
    (category === "All" || p.category === category) &&
    (p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.brand?.toLowerCase().includes(search.toLowerCase()))
  );

  if (sort === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  if (sort === "discount") filtered = [...filtered].sort((a, b) => b.discountPercentage - a.discountPercentage);

  const addToCart = (e, product) => {
    e.stopPropagation();
    setCart(prev => {
      const ex = prev.find(i => i.id === product.id);
      if (ex) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  return (
    <div style={styles.main}>
      <h1 style={styles.pageTitle}>All Products</h1>
      <p style={styles.pageSubtitle}>Browse {products.length} products across {categories.length - 1} categories</p>
      <div style={styles.filterBar}>
        <input style={styles.searchInput} placeholder="Search products or brands…" value={search} onChange={e => setSearch(e.target.value)} />
        <select style={styles.select} value={category} onChange={e => setCategory(e.target.value)}>
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
        <select style={styles.select} value={sort} onChange={e => setSort(e.target.value)}>
          <option value="default">Sort: Default</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="rating">Top Rated</option>
          <option value="discount">Best Discount</option>
        </select>
        <span style={styles.resultCount}>{filtered.length} results</span>
      </div>
      {loading ? (
        <div style={styles.loader}>Loading products…</div>
      ) : (
        <div style={styles.grid}>
          {filtered.map(p => {
            const inCart = cart.find(i => i.id === p.id);
            return (
              <div key={p.id} style={styles.card} onClick={() => onProductClick(p.id)}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.10)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
                <img src={p.thumbnail} alt={p.title} style={styles.cardImg} />
                <div style={styles.cardBody}>
                  <div style={styles.cardBrand}>{p.brand || p.category}</div>
                  <div style={styles.cardTitle}>{p.title}</div>
                  <div style={styles.cardBottom}>
                    <div>
                      <span style={styles.cardPrice}>${p.price}</span>
                      {p.discountPercentage > 0 && <span style={styles.discountBadge}>-{Math.round(p.discountPercentage)}%</span>}
                    </div>
                    <StarRating rating={p.rating} />
                  </div>
                  <button style={{ ...styles.addBtn, background: inCart ? "#16a34a" : PRIMARY }} onClick={e => addToCart(e, p)}>
                    {inCart ? `✓ In Cart (${inCart.qty})` : "+ Add to Cart"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ProductPage({ productId, onBack, cart, setCart }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/${productId}`)
      .then(r => r.json())
      .then(d => { setProduct(d); setLoading(false); setActiveImg(0); });
  }, [productId]);

  if (loading) return <div style={styles.loader}>Loading product…</div>;
  if (!product) return null;

  const images = product.images?.length ? product.images : [product.thumbnail];
  const originalPrice = (product.price / (1 - product.discountPercentage / 100)).toFixed(2);
  const savings = (originalPrice - product.price).toFixed(2);
  const inCartItem = cart.find(i => i.id === product.id);
  const stockColor = product.stock > 20 ? "#16a34a" : product.stock > 5 ? "#d97706" : "#dc2626";

  const handleAddToCart = () => {
    setCart(prev => {
      const ex = prev.find(i => i.id === product.id);
      if (ex) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { ...product, qty }];
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div style={styles.main}>
      <button style={styles.backBtn} onClick={onBack}>← Back to Products</button>
      <div style={styles.detailGrid}>
        <div>
          <div style={styles.detailImgWrap}>
            <img src={images[activeImg]} alt={product.title} style={styles.detailImg} />
          </div>
          {images.length > 1 && (
            <div style={styles.detailThumbRow}>
              {images.map((img, i) => (
                <img key={i} src={img} alt="" style={{ ...styles.thumb, ...(activeImg === i ? styles.thumbActive : {}) }} onClick={() => setActiveImg(i)} />
              ))}
            </div>
          )}
        </div>
        <div style={styles.detailInfo}>
          <div style={styles.detailCategory}>{product.category}</div>
          <h1 style={styles.detailTitle}>{product.title}</h1>
          <div style={styles.detailMeta}>
            <span>⭐ {product.rating?.toFixed(1)}</span>
            <span>·</span>
            <span>{product.reviews?.length || 0} reviews</span>
            <span>·</span>
            <span style={{ ...styles.stockBadge, background: stockColor + "20", color: stockColor }}>
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </span>
          </div>
          <div>
            <span style={styles.detailPrice}>${product.price}</span>
            {product.discountPercentage > 0 && <span style={styles.detailOldPrice}>${originalPrice}</span>}
            {product.discountPercentage > 0 && <div style={{ ...styles.savings, fontSize: 13, marginTop: 4 }}>You save ${savings} ({Math.round(product.discountPercentage)}% off)</div>}
          </div>
          <p style={styles.detailDesc}>{product.description}</p>
          <div style={styles.specGrid}>
            {product.brand && <><span style={styles.specLabel}>Brand</span><span style={styles.specVal}>{product.brand}</span></>}
            {product.sku && <><span style={styles.specLabel}>SKU</span><span style={styles.specVal}>{product.sku}</span></>}
            {product.weight && <><span style={styles.specLabel}>Weight</span><span style={styles.specVal}>{product.weight}g</span></>}
            {product.warrantyInformation && <><span style={styles.specLabel}>Warranty</span><span style={styles.specVal}>{product.warrantyInformation}</span></>}
            {product.shippingInformation && <><span style={styles.specLabel}>Shipping</span><span style={styles.specVal}>{product.shippingInformation}</span></>}
            {product.returnPolicy && <><span style={styles.specLabel}>Returns</span><span style={styles.specVal}>{product.returnPolicy}</span></>}
          </div>
          {product.tags?.length > 0 && (
            <div style={styles.tagRow}>
              {product.tags.map(t => <span key={t} style={styles.tag}>{t}</span>)}
            </div>
          )}
          <div style={styles.detailRow}>
            <button style={styles.qtyBtn} onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
            <span style={styles.qtyNum}>{qty}</span>
            <button style={styles.qtyBtn} onClick={() => setQty(q => Math.min(product.stock, q + 1))}>+</button>
            <button style={{ ...styles.addToCartBtn, background: added ? "#16a34a" : ACCENT }} onClick={handleAddToCart} disabled={product.stock === 0}>
              {added ? "✓ Added to Cart!" : inCartItem ? `Update Cart (${inCartItem.qty} already)` : "Add to Cart"}
            </button>
          </div>
          {product.reviews?.length > 0 && (
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10 }}>Customer Reviews</div>
              {product.reviews.slice(0, 3).map((r, i) => (
                <div key={i} style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 10, marginTop: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontWeight: 600, fontSize: 13 }}>{r.reviewerName}</span>
                    <span style={{ color: "#f59e0b", fontSize: 13 }}>{"★".repeat(r.rating)}</span>
                  </div>
                  <p style={{ fontSize: 13, color: MUTED, margin: 0 }}>{r.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CartPage({ cart, setCart, onShopClick }) {
  const updateQty = (id, delta) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  };
  const remove = (id) => setCart(prev => prev.filter(i => i.id !== id));

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const totalDiscount = cart.reduce((s, i) => {
    const orig = i.price / (1 - i.discountPercentage / 100);
    return s + (orig - i.price) * i.qty;
  }, 0);
  const shipping = subtotal > 50 ? 0 : 4.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);

  if (cart.length === 0) return (
    <div style={styles.main}>
      <div style={styles.emptyCart}>
        <div style={styles.emptyIcon}>🛒</div>
        <h2 style={{ fontWeight: 800, marginBottom: 8 }}>Your cart is empty</h2>
        <p>Add some products to get started!</p>
        <button style={styles.shopNowBtn} onClick={onShopClick}>Browse Products</button>
      </div>
    </div>
  );

  return (
    <div style={styles.main}>
      <h1 style={styles.pageTitle}>Your Cart</h1>
      <p style={styles.pageSubtitle}>{totalItems} item{totalItems !== 1 ? "s" : ""} in your cart</p>
      <div style={styles.cartGrid}>
        <div>
          {cart.map(item => (
            <div key={item.id} style={styles.cartItem}>
              <img src={item.thumbnail} alt={item.title} style={styles.cartItemImg} />
              <div style={styles.cartItemInfo}>
                <div style={styles.cartItemBrand}>{item.brand || item.category}</div>
                <div style={styles.cartItemTitle}>{item.title}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
                  <div style={styles.detailRow}>
                    <button style={styles.qtyBtn} onClick={() => updateQty(item.id, -1)}>−</button>
                    <span style={styles.qtyNum}>{item.qty}</span>
                    <button style={styles.qtyBtn} onClick={() => updateQty(item.id, 1)}>+</button>
                  </div>
                  <span style={styles.cartItemPrice}>${(item.price * item.qty).toFixed(2)}</span>
                  <span style={{ color: MUTED, fontSize: 12 }}>${item.price} each</span>
                </div>
              </div>
              <button style={styles.removeBtn} onClick={() => remove(item.id)}>✕</button>
            </div>
          ))}
        </div>
        <div style={styles.summaryBox}>
          <div style={styles.summaryTitle}>Bill Summary</div>
          <div style={styles.summaryRow}><span>Subtotal ({totalItems} items)</span><span>${subtotal.toFixed(2)}</span></div>
          {totalDiscount > 0 && <div style={styles.summaryRow}><span style={styles.savings}>Discount Savings</span><span style={styles.savings}>-${totalDiscount.toFixed(2)}</span></div>}
          <div style={styles.summaryRow}>
            <span>Shipping</span>
            <span>{shipping === 0 ? <span style={styles.savings}>FREE</span> : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div style={styles.summaryRow}><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
          {subtotal < 50 && <div style={{ fontSize: 12, color: "#d97706", background: "#fef3c7", borderRadius: 6, padding: "7px 10px", marginTop: 4 }}>Add ${(50 - subtotal).toFixed(2)} more for free shipping!</div>}
          <hr style={styles.summaryDivider} />
          <div style={styles.summaryTotal}><span>Total</span><span>${total.toFixed(2)}</span></div>
          <button style={styles.checkoutBtn}>Proceed to Checkout →</button>
          <div style={{ marginTop: 14, fontSize: 12, color: MUTED, textAlign: "center" }}>🔒 Secure checkout · Free returns</div>
          <hr style={styles.summaryDivider} />
          <div style={{ fontSize: 12, color: MUTED }}>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>Order Breakdown</div>
            {cart.map(item => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 200 }}>{item.title} ×{item.qty}</span>
                <span style={{ flexShrink: 0, marginLeft: 8 }}>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("listing");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [cart, setCart] = useState([]);

  const handleProductClick = (id) => { setSelectedProductId(id); setPage("product"); };
  const handleBack = () => setPage("listing");
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div style={styles.app}>
      <Navbar page={page} cartCount={cartCount} onCartClick={() => setPage("cart")} onLogoClick={() => setPage("listing")} />
      {page === "listing" && <ListingPage onProductClick={handleProductClick} cart={cart} setCart={setCart} />}
      {page === "product" && <ProductPage productId={selectedProductId} onBack={handleBack} cart={cart} setCart={setCart} />}
      {page === "cart" && <CartPage cart={cart} setCart={setCart} onShopClick={() => setPage("listing")} />}
    </div>
  );
}
