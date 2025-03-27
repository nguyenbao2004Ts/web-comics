<template>
    <main>
      <div class="menu-item">
        <router-link :to="{ name: 'ProductDetail', params: { id } }">
          <img :src="require(`@/assets/hinh_conan/${product.image.split('/').pop()}`)" alt="Product Image">
          <div class="menu-item-info">
            <h3>{{ product.name }}</h3>
            <p>{{ product.description }}</p>
            <p>{{ product.price }}</p>
          </div>
        </router-link>
      </div>
    </main>
  </template>
  
  <script>
  export default {
    props: ['product'],
    data() {
      return {
        id: this.product.id,
      };
    },
  };
  </script>
  
  <style scoped>
  .menu-item {
    width: 200px; /* Thay đổi giá trị này để điều chỉnh chiều rộng */
    height: 350px; /* Thay đổi giá trị này để điều chỉnh chiều cao */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    margin: 10px;
    overflow: hidden;
    transition: transform 0.3s ease;
  }
  
  .menu-item img {
    width: 100%;
    height: 70%; /* Chiều cao của ảnh chiếm 70% chiều cao của sản phẩm */
    object-fit: cover; /* Đảm bảo ảnh không bị méo */
    transition: transform 0.3s ease;
  }
  
  .menu-item-info {
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;
    text-align: center;
  }
  
  .menu-item:hover img {
    transform: scale(1.1);
  }
  
  .menu-item-info h3 {
    font-size: 18px;
    margin: 0 0 10px;
  }
  
  .menu-item-info p {
    margin: 0;
    color: #ccc;
  }
  </style>
  