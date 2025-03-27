<template>
  <main>
    <div class="product-detail" v-if="product">
      <h2 class="product-name">{{ product.name }}</h2>
      <div class="product-content">
        <div class="product-image-container">
          <img :src="require(`@/assets/hinh_conan/${product.image.split('/').pop()}`)" alt="Product Image" class="product-image" />
        </div>
        <div class="product-info">
          <p class="product-description">{{ product.description }}</p>
          <p class="product-price">Giá: {{ product.price }} Vnd</p>
          <p class="product-quality" v-if="product.quality > 0">Hiện đang có: {{ product.quality }} sản phẩm</p>
          <p class="product-quality" v-else>Out of stock</p>
          <button v-if="product.quality > 0" @click="addToCart(product)">Thêm Vào Giỏ Hàng</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      product: null
    };
  },
  computed: {
    ...mapGetters(['products'])
  },
  mounted() {
    const id = this.$route.params.id;
    this.product = this.products.find(x => x.id === id);
  },
  methods: {
    ...mapActions(['addToCart']),
    
    // Add product to cart
    addToCart(product) {
      if (product.quality > 0) {
        this.$store.dispatch('addToCart', product);
      }
    }
  }
};
</script>

<style scoped>
.product-detail {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.product-name {
  font-size: 32px;
  margin-bottom: 20px;
}

.product-content {
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.product-image-container {
  flex-shrink: 0;
  margin-right: 20px;
}

.product-image {
  width: 250px; /* Adjust the image size here */
  height: auto;
  border-radius: 10px;
}

.product-info {
  text-align: left;
  max-width: 500px;
}

.product-description {
  font-size: 18px;
  margin-bottom: 10px;
}

.product-price {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.product-quality {
  font-size: 18px;
  color: #555;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  font-size: 18px;
  color: white;
  background-color: #ff5722;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #e64a19;
}
</style>
