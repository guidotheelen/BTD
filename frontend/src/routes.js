import HomeView from "./views/HomeView.vue";
import MissionView from "./views/MissionView.vue";
import ProductsView from "./views/ProductsView.vue";
import ContactView from "./views/ContactView.vue";
import CartView from "./views/CartView.vue";

export default [
  { path: "/", name: "home", component: HomeView },
  { path: "/mission", name: "mission", component: MissionView },
  { path: "/products", name: "products", component: ProductsView },
  { path: "/contact", name: "contact", component: ContactView },
  { path: "/cart", name: "cart", component: CartView },
];
