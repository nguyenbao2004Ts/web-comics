<template>
  <div v-if="cart.length === 0">
    <p>Giỏ hàng trống</p>
  </div>

  <div v-else class="modal-content">
    <table class="table text-center">
      <thead>
        <tr>
          <th>HÌNH</th>
          <th>SẢN PHẨM</th>
          <th>Đơn giá</th>
          <th>Số lượng</th>
          <th>Tiền</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <!-- Loop through cart using v-for -->
        <tr v-for="item in cart" :key="item.id">
          <td>
            <img :src="getImagePath(item.image)" style="height: 100px; width: 100px; object-fit: cover; border-radius: 8px;" />
          </td>
          <td class="align-middle">{{ item.name }}</td>
          <td class="align-middle">{{ item.price }} VND</td>
          <td class="align-middle">
            <button @click="decreaseQuantity(item)" class="btn btn-secondary">-</button>
            {{ item.quantity }}
            <button @click="increaseQuantity(item)" class="btn btn-secondary">+</button>
          </td>
          <td class="align-middle">{{ item.price * item.quantity }} VND</td>
          <td class="align-middle">
            <button class="btn btn-danger" @click="removeFromCart(item)">Xóa</button>
          </td>
        </tr>
        <tr>
          <th colspan="4">Tổng tiền</th>
          <th>{{ totalPrice }} VND</th>
          <th>
            <button class="btn btn-danger" @click="clearCart">Xóa hết</button>
          </th>
        </tr>
      </tbody>
    </table>

    <!-- Checkout button -->
    <div class="checkout-button">
      <button class="btn btn-primary" @click="checkout">Thanh toán</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["cart", "totalPrice", "totalQuantity"]),
  },
  methods: {
    ...mapActions(["increaseQuantity", "decreaseQuantity", "removeFromCart", "clearCart"]),
    
    getImagePath(image) {
      // Check if the image path is valid
      try {
        return require(`@/assets/hinh_conan/${image.split('/').pop()}`);
      } catch (e) {
        console.error("Image not found:", image);
        return "/images/default.jpg"; // Return a default image if not found
      }
    },
    
    checkout() {
      if (!this.$store.state.currentUser) {
        // Redirect to login if the user is not logged in
        alert("Bạn cần đăng nhập để tiếp tục thanh toán.");
        this.$router.push('/login');
      } else {
        // Proceed to checkout if the user is logged in
        this.$router.push({ name: 'HoaDon' });
      }
    },
  },
};
</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th, .table td {
  padding: 12px;
  border: 1px solid #ddd;
}

.table th {
  background-color: #f4f4f4;
  color: #333;
  text-transform: uppercase;
}

.modal-content {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.checkout-button {
  text-align: right;
  margin-top: 15px;
}

.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
  color: white;
  border-radius: 5px;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  color: white;
  border-radius: 5px;
}

.btn {
  padding: 8px 12px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
}

.align-middle {
  vertical-align: middle;
}

.checkout-button button {
  font-weight: bold;
}
</style>
