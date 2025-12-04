<template>
  <header class="banner">
    <RouterLink to="/">
      <img
        src="/BTD-head.png"
        alt="Beyond The Doors Banner Logo"
        class="banner-logo small-logo"
      />
    </RouterLink>
    <button class="hamburger" aria-label="Menu" @click="toggleMenu">&#9776;</button>
    <nav class="nav-links" :class="{ open: navOpen }">
      <RouterLink to="/" :class="{ active: isActive('/') }">Home</RouterLink>
      <RouterLink to="/mission" :class="{ active: isActive('/mission') }">Mission</RouterLink>
      <RouterLink to="/products" :class="{ active: isActive('/products') }">Products</RouterLink>
      <RouterLink to="/contact" :class="{ active: isActive('/contact') }">Contact</RouterLink>
    </nav>
    <RouterLink class="cart-banner" to="/cart" id="cart-widget">
      <span class="cart-trigger">
        <span class="cart-icon-only" aria-hidden="true">🛒</span>
        <span class="cart-trigger-title desktop-only">Cart</span>
        <span class="cart-trigger-pill desktop-only">
          <span>{{ totalItems }}</span>
          <span>{{ itemLabel }}</span>
        </span>
        <span class="cart-trigger-total desktop-only">${{ cartTotal.toFixed(2) }}</span>
      </span>
    </RouterLink>
  </header>
</template>

<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { useCartStore } from "../stores/cartStore";

const navOpen = ref(false);
const { cartItems, totalItems: totalItemsFn, cartTotal: cartTotalFn, syncFromStorage } =
  useCartStore();
const route = useRoute();

const totalItems = computed(() => totalItemsFn());
const cartTotal = computed(() => cartTotalFn());
const itemLabel = computed(() => (totalItems.value === 1 ? "item" : "items"));

function toggleMenu() {
  navOpen.value = !navOpen.value;
}

function handleClickOutside(event) {
  const nav = document.querySelector(".nav-links");
  const button = document.querySelector(".hamburger");
  if (navOpen.value && nav && button && !nav.contains(event.target) && !button.contains(event.target)) {
    navOpen.value = false;
  }
}

function handleStorage() {
  syncFromStorage();
}

function isActive(path) {
  if (path === "/") {
    return route.path === "/";
  }
  return route.path.startsWith(path);
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  window.addEventListener("storage", handleStorage);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
  window.removeEventListener("storage", handleStorage);
});
</script>
