<template>
    <footer>
      <div class="footer-container">
        <!-- Cột Hỗ Trợ Khách Hàng -->
        <div class="footer-column">
          <div class="footer-column-content">
            <h3>HỖ TRỢ KHÁCH HÀNG</h3>
            <div class="footer-column-body">
              <p>Sản phẩm & Đơn hàng: 0367231377</p>
              <p>Kỹ thuật & Bảo hành: 0367231377</p>
              <p>Điện thoại: 0367231377 (Giờ hành chính)</p>
              <p>
                Email:
                <a href="mailto:giabao2004ts@gmail.com">giabao2004ts@gmail.com</a>
              </p>
              <p>Địa chỉ: 96/9 Tân Mỹ, Phường Tân Thuận Tây, Q7, TP.HCM</p>
            </div>
            <!-- Phần "Chấp nhận thanh toán" -->
            <div class="payment-method-container">
              <p>Chấp nhận thanh toán:</p>
              <img src="/Images/thanh_toan/internet-banking.png" alt="Internet Banking" />
              <img src="/Images/thanh_toan/tien-mat.png" alt="Tiền Mặt" />
            </div>
          </div>
        </div>
  
        <!-- Cột Trợ Giúp -->
        <div class="footer-column">
          <div class="footer-column-content">
            <h3>TRỢ GIÚP</h3>
            <div class="footer-column-body">
              <p>Hướng dẫn mua hàng</p>
              <p>Phương thức thanh toán</p>
              <p>Phương thức vận chuyển</p>
              <p>Chính sách đổi - trả</p>
              <p>Chính sách bồi hoàn</p>
              <p>Câu hỏi thường gặp</p>
            </div>
          </div>
        </div>
  
        <!-- Hàng chứa logo thương hiệu -->
        <div class="logo-container">
          <a href="https://www.lazada.vn/#?" target="_blank" rel="noopener noreferrer">
            <img src="/Images/nhan_hang/logo-lazada-vietnam.png" alt="Lazada Logo" />
          </a>
          <a href="https://tiki.vn/" target="_blank" rel="noopener noreferrer">
            <img src="/Images/nhan_hang/logo-tiki-tra-gop.png" alt="Tiki Logo" />
          </a>
          <a href="https://shopee.vn/" target="_blank" rel="noopener noreferrer">
            <img src="/Images/nhan_hang/shoppe-tra-gop.png" alt="Shopee Logo" />
          </a>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style scoped>
  /* Cơ bản cho Footer */
  footer {
    background-color: #ffffff;
    color: #393737;
    padding: 20px 0;
    font-family: Arial, sans-serif;
    font-size: 14px;
    border-top: 1px solid #ddd;
  }
  
  /* Container chính */
  .footer-container {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    flex-wrap: wrap;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    gap: 20px;
  }
  
  /* Cột Footer */
  .footer-column {
    flex: 1;
    min-width: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .footer-column-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .footer-column h3 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #000;
  }
  
  .footer-column-body p {
    margin: 5px 0;
    line-height: 1.5;
    color: #666;
  }
  
  /* Định dạng liên kết Email */
  .footer-column a {
    color: #007bff;
    text-decoration: none;
  }
  
  .footer-column a:hover {
    text-decoration: underline;
  }
  
  /* Logo Container */
  .logo-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-top: 20px;
    flex: 1; /* Đặt logo chiếm không gian phù hợp */
  }
  
  .logo-container img {
    width: 100px;
    height: auto;
    cursor: pointer;
  }
  
  /* Payment Method Container */
  .payment-method-container {
    margin-top: 20px;
    text-align: center;
  }
  
  .payment-method-container p {
    margin-bottom: 10px;
    font-weight: bold;
    color: #000;
  }
  
  .payment-method-container img {
    height: 40px;
    margin: 0 5px;
    cursor: default;
  }
  </style>
  