<template>
  <div class="register-container">
    <h2 class="register-title">Đăng Ký Tài Khoản</h2>
    <div class="register-form">
      <input v-model="username" placeholder="Tên đăng nhập" class="input-field" />
      <input v-model="email" type="email" placeholder="Email" class="input-field" />
      <input v-model="password" type="password" placeholder="Mật khẩu" class="input-field" />
      <input v-model="confirmPassword" type="password" placeholder="Xác nhận mật khẩu" class="input-field" />
      <button @click="register" class="register-button">Đăng Ký</button>
      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">{{ success }}</p>
      <p class="login-redirect">
        Đã có tài khoản? <router-link to="/login">Đăng nhập tại đây</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      error: "",
      success: "",
    };
  },
  methods: {
    ...mapActions(["registerUser"]),
    async register() {
      if (this.password !== this.confirmPassword) {
        this.error = "Mật khẩu không khớp";
        return;
      }

      try {
        await this.registerUser({
          username: this.username,
          email: this.email,
          password: this.password,
        });

        this.success = "Đăng ký thành công!";
        this.username = "";
        this.email = "";
        this.password = "";
        this.confirmPassword = "";
        this.error = "";

        this.$router.push("/login");
      } catch (error) {
        this.error = "Tên đăng nhập đã tồn tại hoặc có lỗi xảy ra";
      }
    },
  },
};
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.register-title {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.input-field {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.register-button {
  padding: 10px;
  font-size: 18px;
  color: white;
  background-color: #28a745;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.register-button:hover {
  background-color: #218838;
}

.error {
  color: red;
  font-size: 14px;
  text-align: center;
}

.success {
  color: green;
  font-size: 14px;
  text-align: center;
}

.login-redirect {
  text-align: center;
  font-size: 14px;
  margin-top: 10px;
}

.login-redirect a {
  color: #007bff;
  text-decoration: none;
}

.login-redirect a:hover {
  text-decoration: underline;
}
</style>
