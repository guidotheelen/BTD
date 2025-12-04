<template>
  <main class="main-content cart-main" v-cloak>
    <header class="products-hero">
      <h1>Your Cart</h1>
      <p>Items stay in your browser so you can return later.</p>
    </header>

    <section class="cart-page">
      <div v-if="!cartItems.length" class="cart-empty">
        <p>No items yet.</p>
        <RouterLink class="cta-button" to="/products">Add products</RouterLink>
      </div>

      <div v-else>
        <div class="cart-lines">
          <div class="cart-line" v-for="item in cartItems" :key="item.id">
            <div>
              <p class="cart-line-name">{{ item.name }}</p>
              <p class="cart-line-meta" v-if="item.category">{{ item.category }}</p>
            </div>
            <div class="cart-line-controls">
              <button type="button" @click.stop="updateQuantity(item.id, -1)">−</button>
              <span>{{ item.quantity }}</span>
              <button type="button" @click.stop="updateQuantity(item.id, 1)">+</button>
            </div>
            <div class="cart-line-price">${{ (item.quantity * item.price).toFixed(2) }}</div>
          </div>
        </div>

        <div class="cart-summary">
          <div class="cart-total">
            <span>Subtotal</span>
            <strong>${{ cartTotal.toFixed(2) }}</strong>
          </div>
          <div class="cart-actions">
            <RouterLink class="cta-button" to="/products">Keep shopping</RouterLink>
            <button type="button" class="checkout-btn ghost" @click="clear">Clear cart</button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed } from "vue";
import { useCartStore } from "../stores/cartStore";

const { cartItems: itemsFn, cartTotal: totalFn, updateQuantity, clear } = useCartStore();
const cartItems = computed(() => itemsFn());
const cartTotal = computed(() => totalFn());
</script>
