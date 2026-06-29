// Cart stored in localStorage

function getCart() {
  const data = localStorage.getItem("shopsphere-cart");
  return data ? JSON.parse(data) : [];
}

function saveCart(cart) {
  localStorage.setItem("shopsphere-cart", JSON.stringify(cart));
}

function updateCartBadge() {
  const cart = getCart();
  const total = cart.reduce((s, i) => s + i.qty, 0);
  const badge = document.getElementById("cart-count");
  if (badge) badge.textContent = total;
}
