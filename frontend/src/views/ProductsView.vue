<template>
  <main class="main-content products-main" v-cloak>
    <header class="products-hero">
      <h1>Tools for Thoughtful Journeys</h1>
      <p>Built to be clear, respectful, and easy to use.</p>
    </header>

    <section class="products-shell">
      <div class="products-grid" v-if="!loading && products.length">
        <article class="product-card" v-for="product in products" :key="product.id">
          <div class="product-meta">
            <img v-if="product.image" :src="formatImage(product.image)" :alt="product.name" class="product-image" />
            <div class="product-meta-text">
              <p class="product-badge" v-if="product.badge">{{ product.badge }}</p>
              <p class="product-category" v-if="product.category">{{ product.category }}</p>
            </div>
          </div>
          <h3>{{ product.name }}</h3>
          <p class="product-description">{{ product.description }}</p>
          <ul>
            <li v-for="feature in product.features" :key="feature">{{ feature }}</li>
          </ul>
          <div class="product-footer">
            <span class="product-price">${{ product.price.toFixed(2) }}</span>
            <button class="add-to-cart" type="button" @click="add(product)">Add to cart</button>
          </div>
        </article>
      </div>

      <div class="products-loading" v-if="loading">
        <p>Loading products…</p>
      </div>

      <div class="products-empty" v-if="!loading && !products.length">
        <p>Start the Django backend to load products into the shop.</p>
      </div>
    </section>
  </main>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useCartStore } from "../stores/cartStore";

const products = ref([]);
const loading = ref(true);
const { add } = useCartStore();

const isFile = window.location.protocol === "file:";
const originWithBackendPort = window.location.origin.replace(/:\d+$/, ":8000");
const API_URL =
  window.BTD_API_URL ||
  (isFile ? "http://localhost:8000/api/products/" : `${originWithBackendPort}/api/products/`);

function formatImage(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const clean = path.replace(/^\//, "");
  if (clean.startsWith("assets/icons/")) {
    return `/icons/${clean.replace(/^assets\/icons\//, "")}`;
  }
  return `/${clean}`;
}

async function fetchProducts() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Could not reach the backend");
    const data = await response.json();
    products.value = data.products || [];
  } catch (error) {
    console.error("Failed to load products", error);
    products.value = [];
  } finally {
    loading.value = false;
  }
}

onMounted(fetchProducts);
</script>
