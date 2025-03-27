<template>
  <div class="menu-container">
    <div class="product-list">
      <Product v-for="item in filterproduct" :key="item.id" :product="item" />
    </div>

    <div class="pagination">
      <button v-if="currentpage > 1" @click="changepage(currentpage - 1)">Prev</button>
      <button v-for="i in totalpage" :key="i" @click="changepage(i)">{{ i }}</button>
      <button v-if="currentpage < totalpage" @click="changepage(currentpage + 1)">Next</button>
    </div>
  </div>
</template>

<script>
import Product from './ComProduct.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ComHome',
  components: {
    Product,
  },
  data() {
    return {
      currentpage: 1,
      limit: 10,
    };
  },
  computed: {
    ...mapGetters(['products']), // Truy cập products từ Vuex store
    totalpage() {
      return Math.ceil(this.products.length / this.limit);
    },
    filterproduct() {
      const start = (this.currentpage - 1) * this.limit;
      const end = start + this.limit;
      return this.products.slice(start, end);
    },
  },
  methods: {
    ...mapActions(['fetchDataProduct']), // Action để lấy dữ liệu

    changepage(page) {
      if (page >= 1 && page <= this.totalpage) {
        this.currentpage = page;
      }
    },
  },
  created() {
    this.fetchDataProduct(); // Lấy dữ liệu khi component được tạo
  },
};
</script>

<style scoped>
.menu-container {
  text-align: center;
  padding: 40px 20px;
  background-color: #fff;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
}

button:hover {
  background-color: #0056b3;
}

/* Media query for devices with width less than or equal to 600px */
@media (max-width: 600px) {
  .menu-container {
    padding: 20px 10px;
  }

  .product-list {
    flex-direction: column; /* Arrange items in a single column */
    align-items: center;
  }

  .pagination {
    flex-wrap: wrap; /* Allow pagination buttons to wrap */
    gap: 10px;
  }

  button {
    padding: 8px 16px;
    font-size: 14px;
  }
}
</style>
