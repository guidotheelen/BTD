import { reactive } from "vue";

const STORAGE_KEY = "btd-cart";

function readCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch (error) {
    console.warn("Unable to read saved cart", error);
    return {};
  }
}

const state = reactive({
  items: readCart(),
});

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
}

export function useCartStore() {
  const cartItems = () => Object.values(state.items);
  const totalItems = () =>
    cartItems().reduce((total, item) => total + (item.quantity || 0), 0);
  const cartTotal = () =>
    cartItems().reduce(
      (total, item) => total + (item.quantity || 0) * (item.price || 0),
      0
    );

  function add(product) {
    const existing = state.items[product.id];
    if (existing) {
      existing.quantity += 1;
    } else {
      state.items[product.id] = { ...product, quantity: 1 };
    }
    persist();
  }

  function updateQuantity(id, delta) {
    const item = state.items[id];
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) {
      delete state.items[id];
    }
    persist();
  }

  function clear() {
    state.items = {};
    persist();
  }

  function syncFromStorage() {
    state.items = readCart();
  }

  return {
    state,
    cartItems,
    totalItems,
    cartTotal,
    add,
    updateQuantity,
    clear,
    syncFromStorage,
  };
}
