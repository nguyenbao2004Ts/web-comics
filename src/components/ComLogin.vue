<template>
  <div class="login-container">
    <h2>Đăng Nhập</h2>
    <div class="form-group">
      <input v-model="username" placeholder="Tên đăng nhập" class="input-field" />
    </div>
    <div class="form-group">
      <input v-model="password" type="password" placeholder="Mật khẩu" class="input-field" />
    </div>
    <div class="button-group">
      <button @click="login" class="btn-login">Đăng Nhập</button>
    </div>
    <p v-if="error" class="error">{{ error }}</p>
    <div class="register-redirect">
      <span>Chưa có tài khoản?</span>
      <button @click="redirectToRegister" class="btn-register">Đăng ký tại đây</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import eventBus from "@/eventBus";

export default {
  data() {
    return {
      username: "",
      password: "",
      error: "",
    };
  },
  methods: {
    ...mapActions(["loginUser"]),
    async login() {
      try {
        const user = await this.loginUser({
          username: this.username,
          password: this.password,
        });

        if (user) {
          localStorage.setItem("currentUser", JSON.stringify(user));
          eventBus.emit("loginSuccess", user);
          this.$router.push("/");
        }
      } catch (error) {
        this.error = "Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin!";
        console.error("Lỗi đăng nhập:", error);
      }
    },
    redirectToRegister() {
      this.$router.push("/register");
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 40px auto;
  padding: 30px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  font-weight: bold;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.input-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
}

.button-group {
  text-align: center;
  margin-top: 20px;
}

.btn-login {
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.btn-login:hover {
  background-color: #218838;
}

.error {
  color: red;
  text-align: center;
  margin-top: 10px;
}

.register-redirect {
  text-align: center;
  margin-top: 15px;
  font-size: 14px;
}

.register-redirect span {
  margin-right: 5px;
}

.btn-register {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
  font-size: 14px;
  padding: 0;
}

.btn-register:hover {
  color: #0056b3;
}
</style>
