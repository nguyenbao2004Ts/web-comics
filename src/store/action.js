import axios from "axios";
import APIURL from "./constraint";

const actions = {
  async fetchDataProduct({ commit }) {
    try {
      const response = await axios.get(`${APIURL}/product`);
      commit("SET_PRODUCTS", response.data);
    } catch (error) {
      console.error("Lỗi", error);
    }
  },

  async registerUser({ commit }, userData) {
    try {
     // Lấy tất cả người dùng từ API để kiểm tra xem tên người dùng đã tồn tại chưa
      const response = await axios.get(`${APIURL}/users`);
      const userExists = response.data.some(user => user.username === userData.username);

      if (userExists) {
        throw new Error("Tên đăng nhập đã tồn tại"); // Username already exists
      }

      // If username is unique, proceed with the registration
      const registerResponse = await axios.post(`${APIURL}/users`, userData);
      commit("REGISTER_USER", registerResponse.data);
      return registerResponse.data; // Return the user data to confirm successful registration
    } catch (error) {
      console.error("Lỗi khi đăng ký người dùng", error);
      throw error; // Propagate error for the component to handle
    }
  },

  async loginUser({ commit }, { username, password }) {
    try {
      // Fetch all users from the API
      const response = await axios.get(`${APIURL}/users`);
      const user = response.data.find(user => user.username === username && user.password === password);

      if (user) {
        commit("SET_CURRENT_USER", user); // Store the user data in Vuex state
        return user; // Return the user data to the component
      } else {
        throw new Error("Thông tin đăng nhập không đúng");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      throw error; // Propagate the error for the component to handle
    }
  },

  async addToCart({ commit, state }, product) {
    if (state.currentUser) {
      // If user is logged in, save to the API and add to the cart in the store
      try {
        const response = await axios.post(`${APIURL}/cart`, {
          username: state.currentUser.username,
          productId: product.id,
          quantity: 1,
        });
        commit("ADD_TO_CART", product);
        console.log("Added to cart and saved to API:", response.data);
      } catch (error) {
        console.error("Error adding to cart on API:", error);
      }
    } else {
      // If user is not logged in, add to the cart in the store only
      commit("ADD_TO_CART", product);
      console.log("Added to cart locally (user not logged in).");
    }
  },


  // Action mới để tạo hóa đơn
  async createInvoice({ commit }, invoiceData) {
    try {
      const response = await axios.post(`${APIURL}/hoadon`, invoiceData);
      console.log("Hóa đơn đã được lưu vào DB:", response.data);
  
      // Commit the mutation to update the state with the new invoice
      commit("SET_INVOICE", response.data);
    } catch (error) {
      console.error("Lỗi khi lưu hóa đơn:", error);
      throw error;
    }
  },
  removeFromCart({ commit }, product) {
    commit("REMOVE_FROM_CART", product);
  },

  clearCart({ commit }) {
    commit("CLEAR_CART");
  },

  increaseQuantity({ commit }, product) {
    commit("INCREASE_QUANTITY", product);
  },

  decreaseQuantity({ commit }, product) {
    commit("DECREASE_QUANTITY", product);
  },

  // Lọc sản phẩm theo category
  filterProducts({ commit }, category) {
    commit('setFilteredProducts', category);
  },
};

export default actions;
