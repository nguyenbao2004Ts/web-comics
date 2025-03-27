<template>
    <header>
        <div class="container">
            <div class="logo">
                <img src="/Images/logotruyentranh.png" alt="TruyenTranh Logo">
            </div>

            <!-- Nút phân loại sản phẩm bên trái -->
            <div class="category-container">
                <label for="category" class="category-label">Phân loại</label>
                <select v-model="selectedCategory" @change="filterProducts" class="category-select" id="category">
                    <option value="all">Tất cả</option>
                    <option value="doraemon">Doraemon</option>
                    <option value="conan">Conan</option>
                </select>
            </div>

            <nav>
                <ul>
                    <li><router-link to="/">Trang Chủ</router-link></li>

                    <!-- Show these links only if the user is not logged in -->
                    <li v-if="!user"><router-link to="/register">Đăng Ký</router-link></li>
                    <li v-if="!user"><router-link to="/login">Đăng Nhập</router-link></li>
                </ul>
            </nav>
            <div class="user-info" v-if="user">
                <p class="username">Xin Chào {{ user.username }}</p>
                <button @click="logout" class="btn-logout">Đăng Xuất</button>
            </div>
            <div class="cta">
                <router-link to="/cart" class="cta-button">
                    <i class="fas fa-shopping-cart"></i> Giỏ hàng
                </router-link>
            </div>
        </div>
    </header>

    <router-view/>
</template>

<script>
import eventBus from '@/eventBus';

export default {
    data() {
        return {
            user: JSON.parse(localStorage.getItem('currentUser')) || null,
            selectedCategory: 'all', // Giá trị mặc định là 'Tất cả'
        };
    },
    created() {
        eventBus.on('loginSuccess', (user) => {
            this.user = user;
        });

        eventBus.on('cartUpdated', (count) => {
            this.cartItemCount = count;
        });
    },
    beforeUnmount() {
        eventBus.off('loginSuccess');
        eventBus.off('cartUpdated');
    },
    methods: {
        logout() {
            localStorage.removeItem('currentUser');
            this.user = null;
        },
        filterProducts() {
            this.$store.dispatch('filterProducts', this.selectedCategory);
        }
    }
};
</script>

<style scoped>
.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    flex-wrap: wrap;
}

/* Logo styling */
.logo img {
    height: 50px;
    transition: transform 0.3s ease;
}

/* Nút phân loại ở bên trái */
.category-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-right: 100px;
}

.category-label {
    font-weight: bold;
    color: #333;
    margin-bottom: 8px;
    font-size: 16px;
}

.category-select {
    padding: 8px 12px;
    font-size: 14px;
    border-radius: 4px;
    border: 1px solid #ccc;
    cursor: pointer;
    background-color: #f9f9f9;
    transition: border-color 0.3s ease;
}

.category-select:focus {
    border-color: #007BFF;
}

/* Navigation menu */
nav ul {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
}

nav ul li {
    margin: 0 15px;
}

nav ul li a {
    text-decoration: none;
    color: #000;
    font-weight: bold;
    transition: color 0.3s ease;
}

nav ul li a:hover {
    color: #fcb034;
}

/* User info */
.user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 20px;
}

.username {
    font-weight: bold;
    color: #333;
    margin-bottom: 5px;
}

.btn-logout {
    padding: 5px 15px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.btn-logout:hover {
    background-color: #c82333;
}

/* Cart button styling */
.cta-button {
    padding: 10px 20px;
    background-color: #ffffff;
    color: #000;
    text-decoration: none;
    border: none;
    border-radius: 4px;
    display: flex;
    align-items: center;
    font-weight: bold;
    transition: background-color 0.3s ease;
}

.cta-button i {
    margin-right: 8px;
    color: #f1bc66;
    font-size: 18px;
}

.cta-button:hover {
    background-color: #f8f9fa;
}

/* Media queries for responsiveness */
@media (max-width: 768px) {
    .container {
        flex-direction: column;
        align-items: flex-start;
    }

    .category-container {
        margin-bottom: 20px;
    }

    nav ul {
        flex-direction: column;
        align-items: flex-start;
    }

    nav ul li {
        margin-bottom: 10px;
    }

    .user-info {
        margin-top: 15px;
    }

    .cta {
        margin-top: 15px;
    }
}
</style>
