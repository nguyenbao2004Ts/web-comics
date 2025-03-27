<template>
    <main class="invoice-container">
      <h2>Hóa Đơn Thanh Toán</h2>
      <form @submit.prevent="confirmPayment" class="form-layout">
        <!-- Cột trái -->
        <div class="form-left">
          <div class="form-group">
            <label for="name">Tên:</label>
            <input type="text" id="name" v-model="name" placeholder="Nhập tên của bạn" required />
          </div>
          <div class="form-group">
            <label for="phone">Số điện thoại:</label>
            <input type="text" id="phone" v-model="phone" placeholder="Nhập số điện thoại" required />
          </div>
          <div class="form-group">
            <label for="address">Địa chỉ:</label>
            <textarea id="address" v-model="address" placeholder="Nhập địa chỉ nhận hàng" required></textarea>
          </div>
          <div class="form-group total-price">
            <label>Tổng số tiền:</label>
            <p>{{ totalPrice.toLocaleString() }} VND</p>
          </div>
        </div>
  
        <!-- Cột phải -->
        <div class="form-right">
          <div class="qr-code">
            <img src="@/assets/QRthanhtoan.png" alt="QR Code" />
            <p>Quét mã QR để thanh toán</p>
          </div>
          <div class="button-group">
          <button type="submit" class="btn btn-success">Xác nhận</button>
          <button type="button" class="btn btn-cancel" @click="cancelPayment">Hủy Thanh Toán</button>
        </div>
      </div>
      </form>
    </main>
  </template>
  
  <script>
  import { mapGetters } from "vuex";
  
  export default {
    data() {
      return {
        name: "",
        phone: "",
        address: "",
      };
    },
    computed: {
      ...mapGetters(["totalPrice"]),
    },
    methods: {
      async confirmPayment() {
        if (this.name && this.phone && this.address) {
          const invoiceData = {
            name: this.name,
            phone: this.phone,
            address: this.address,
            totalAmount: this.totalPrice,
            cart: this.$store.state.cart,
          };
  
          try {
            await this.$store.dispatch("createInvoice", invoiceData);
            alert("Thanh toán thành công! Cảm ơn bạn.");
            this.$store.dispatch("clearCart");
            this.$router.push("/");
          } catch (error) {
            alert("Lỗi khi tạo hóa đơn.");
            console.error(error);
          }
        } else {
          alert("Vui lòng điền đầy đủ thông tin.");
        }
      },
      cancelPayment() {
      this.$router.push("/cart");
    },
    },
  };
  </script>
  
  <style scoped>
.invoice-container {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

h2 {
  text-align: center;
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  font-weight: bold;
}

.form-layout {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.form-left,
.form-right {
  flex: 1;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  background-color: #f9f9f9;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input:focus,
textarea:focus {
  border-color: #28a745;
  box-shadow: 0 0 5px rgba(40, 167, 69, 0.5);
  outline: none;
}

textarea {
  resize: none;
  min-height: 80px;
}

.total-price {
  font-size: 18px;
  color: #333;
  font-weight: bold;
}

.total-price p {
  margin-top: 5px;
  font-size: 20px;
  color: #e63946;
}

.qr-code {
  text-align: center;
  margin-bottom: 20px;
}

.qr-code img {
  max-width: 200px;
  height: auto;
  display: block;
  margin: 0 auto;
}

.qr-code p {
  margin-top: 10px;
  font-size: 14px;
  color: #666;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 10px;
}

.btn-success,
.btn-cancel {
  flex-basis: 85%;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn-success {
  background-color: #28a745;
}

.btn-success:hover {
  background-color: #218838;
  transform: translateY(-2px);
}

.btn-cancel {
  background-color: #dc3545;
}

.btn-cancel:hover {
  background-color: #c82333;
  transform: translateY(-2px);
}
</style>
