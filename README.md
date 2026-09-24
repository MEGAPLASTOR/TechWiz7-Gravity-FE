# MarketLink - Nền Tảng Thương Mại Nông Sản Số (React + Vite)

Nền tảng thương mại nông sản số địa phương kết hợp mô hình **O2O (Online-to-Offline)**: Đặt trước nông sản sạch tận vườn (**Pre-Order**) và nhận hàng trực tiếp tại các điểm hẹn chợ truyền thống (**Pay-At-Pickup**).

---

## 🎨 Design System & Giao Diện

- **Bảng màu**:
  - **Màu chủ đạo**: `#1FA855` (Xanh ngọc lục bảo)
  - **Màu nền pastel**: `#EAF4EC` (Bạc hà dịu mắt)
  - **Màu nhấn / Cảnh báo**: `#FF7A30` (Cam thu hoạch)
- **Kiểu dáng**: Bo tròn mềm mại, đổ bóng nổi đa tầng tạo chiều sâu trực quan, thân thiện cho cả người nông dân lẫn khách hàng đô thị.
- **Phông chữ**: Outfit, Plus Jakarta Sans và Inter rõ nét.

---

## 🏗️ Kiến Trúc Các Khu Vực Chính

### 1. Thanh Điều Hướng & Đổi Vai Trò (Header Navigation)
- Logo thương hiệu MarketLink với hiệu ứng chuyển động trực quan.
- Chuyển đổi vai trò người dùng linh hoạt:
  - 🛒 **Customer** (Khách mua nông sản)
  - 👨‍🌾 **Farmer** (Nông dân / Hợp tác xã)
  - 🛡️ **Admin** (Ban Quản Lý chợ)
- Thanh tìm kiếm thời gian thực & Giỏ hàng trượt thông minh (**Cart Drawer**).
- Chuyển đổi ngôn ngữ Song ngữ Anh - Việt linh hoạt.

### 2. Khu Vực Giới Thiệu & Bản Đồ Điểm Hẹn (Hero Section)
- Hình ảnh đại diện quầy nông sản và người nông dân Nam Bộ.
- Đồng hồ đếm ngược giờ chốt đơn hàng ngày (**Order Cutoff Countdown Clock**).
- Bản đồ định vị các điểm chợ lân cận (Chợ Trung Tâm Cần Thơ, Trạm Cái Răng, HTX Ô Môn, Điểm Bình Thủy).
- Danh sách nông hộ tiêu biểu kèm chứng nhận VietGAP / GlobalGAP.

### 3. Danh Mục Nông Sản Đặt Trước (Product Catalog)
- Thẻ nông sản trực quan (Rau ăn lá, Củ quả hữu cơ, Cam sành Tam Bình, Trứng gà thảo mộc...).
- Thanh đo hạn ngạch kho theo thời gian thực (`current_stock` / `total_quota`).
- Bộ lọc danh mục & Huy hiệu nông hộ xác thực (VietGAP, GlobalGAP, OCOP 4 Sao).

### 4. Chọn Khung Giờ Nhận & Phiếu Hẹn (Time-Slot Checkout & Pass)
- Bộ chọn khung giờ đến nhận hàng tại quầy: Giới hạn 15 khách/khung giờ nhằm chống dồn ứ tại quầy.
- Quy chuẩn **Pay-At-Pickup (Zero Gateway)**: Không qua cổng thanh toán trung gian, miễn phí sàn, kiểm tra tận tay rau củ tươi ngon mới trả tiền.
- **Phiếu hẹn thông minh (Smart Pickup Pass)** mang mã đơn riêng biệt, tích hợp mã QR để quét nhận nhanh tại quầy.

### 5. Cổng Quản Trị & Thẩm Định Nông Dân (Operations Portal)
- Tự động thay đổi giao diện theo vai trò đang chọn:
  - **Giao diện Nông Dân**: Thống kê doanh thu, đơn hàng, bảng cấu hình hạn ngạch định kỳ hàng tuần và kiểm tra trạng thái chứng chỉ.
  - **Giao diện Ban Quản Lý (Admin)**: Thẩm định hồ sơ nông dân, duyệt chứng chỉ VietGAP/GlobalGAP và nhật ký kiểm toán hệ thống.
  - **Giao diện Khách Hàng**: Lịch sử đơn hàng và phiếu hẹn điện tử.

### 6. Trợ Lý Hỗ Trợ & Chân Trang (Support & Footer)
- Hộp thoại hỗ trợ khách hàng: Giải đáp thắc mắc về nguồn gốc rau củ, giờ chốt đơn và quy trình nhận hàng.
- Dải tin tức hệ thống thời gian thực và bộ chứng nhận an toàn thực phẩm.

---

## 🚀 Hướng Dẫn Cài Đặt & Khởi Chạy

```bash
# Cài đặt thư viện
npm install

# Khởi chạy máy chủ phát triển
npm run dev

# Kiểm tra bản đóng gói sản phẩm
npm run build
```
