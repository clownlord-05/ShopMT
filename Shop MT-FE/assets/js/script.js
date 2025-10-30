// Global Variables and State Management
let currentUser = null;
let isAdmin = false;
let cart = [];
let products = [];
let orders = [];
let vouchers = [];
let appliedVoucher = null;
let nextProductId = 5; // Start from 5 since we have 4 sample products

// Sample Data
const sampleProducts = [
    {
        id: 1,
        name: "Laptop Gaming ASUS ROG Strix G15",
        price: 25990000,
        originalPrice: 29990000,
        image: "assets/img/rog.webp",   
        category: "laptop",
        featured: true,
        flashSale: true,
        stock: 15,
        specs: {
            "CPU": "AMD Ryzen 7 5800H",
            "RAM": "16GB DDR4",
            "Storage": "512GB SSD",
            "GPU": "RTX 3060 6GB",
            "Display": "15.6\" FHD 144Hz"
        },
        description: "Laptop gaming cao cấp với hiệu năng mạnh mẽ, thiết kế đẹp mắt và tản nhiệt tốt."
    },
    {
        id: 2,
        name: "Màn hình Gaming LG UltraGear 27\"",
        price: 8990000,
        originalPrice: 10990000,
        image: "assets/img/mn.webp",
        category: "monitor",
        featured: true,
        flashSale: false,
        stock: 25,
        specs: {
            "Kích thước": "27 inch",
            "Độ phân giải": "2560x1440 (QHD)",
            "Tần số quét": "165Hz",
            "Thời gian phản hồi": "1ms",
            "Panel": "IPS"
        },
        description: "Màn hình gaming chuyên nghiệp với độ phân giải QHD và tần số quét cao."
    },
    {
        id: 3,
        name: "CPU Intel Core i7-12700K",
        price: 9990000,
        originalPrice: 11990000,
        image: "assets/img/chip.jpg",
        category: "component",
        featured: false,
        flashSale: true,
        stock: 30,
        specs: {
            "Số nhân": "12 cores (8P + 4E)",
            "Số luồng": "20 threads",
            "Tốc độ base": "3.6 GHz",
            "Tốc độ boost": "5.0 GHz",
            "Socket": "LGA 1700"
        },
        description: "Bộ vi xử lý thế hệ 12 với hiệu năng vượt trội cho gaming và làm việc."
    },
    {
        id: 4,
        name: "Laptop Dell XPS 13",
        price: 32990000,
        originalPrice: 35990000,
        image: "assets/img/ltdell.jpg",
        category: "laptop",
        featured: true,
        flashSale: false,
        stock: 8,
        specs: {
            "CPU": "Intel Core i7-1165G7",
            "RAM": "16GB LPDDR4x",
            "Storage": "512GB SSD",
            "Display": "13.4\" FHD+",
            "Weight": "1.2kg"
        },
        description: "Laptop cao cấp siêu mỏng nhẹ, hoàn hảo cho công việc và di động."
    },
    {
    id: 5,
    name: "Laptop HP Spectre x360 14",
    price: 33990000,
    originalPrice: 36990000,
    image: "assets/img/hp.avif",
    category: "laptop",
    featured: true,
    flashSale: false,
    stock: 10,
    specs: {
        "CPU": "Intel Core i7-1355U",
        "RAM": "16GB LPDDR4x",
        "Storage": "1TB SSD",
        "Display": "13.5\" 3K2K OLED Touch",
        "Weight": "1.34kg"
    },
    description: "Laptop 2-trong-1 cao cấp với màn hình cảm ứng OLED siêu nét, pin lâu và thiết kế sang trọng."
    },
    {
    id: 6,
    name: "Laptop MacBook Air M2 13.6\" (2023)",
    price: 28990000,
    originalPrice: 31990000,
    image: "assets/img/mac.webp",
    category: "laptop",
    featured: true,
    flashSale: false,
    stock: 12,
    specs: {
        "CPU": "Apple M2 (8-core)",
        "RAM": "8GB Unified",
        "Storage": "256GB SSD",
        "Display": "13.6\" Liquid Retina",
        "Weight": "1.24kg"
    },
    description: "MacBook Air M2 mỏng nhẹ, hiệu năng vượt trội, pin bền và màn hình sắc nét, lý tưởng cho công việc di động."
    },
    {
    id: 7,
    name: "Laptop Lenovo Yoga Slim 7i Carbon Gen 7",
    price: 30990000,
    originalPrice: 33990000,
    image: "assets/img/yoga.jpg ",
    category: "laptop",
    featured: true,
    flashSale: false,
    stock: 9,
    specs: {
        "CPU": "Intel Core i7-1260P",
        "RAM": "16GB LPDDR5",
        "Storage": "1TB SSD",
        "Display": "13.3\" 2.5K IPS 90Hz",
        "Weight": "0.97kg"
    },
    description: "Laptop siêu nhẹ dưới 1kg, thiết kế tinh tế, hiệu năng mạnh mẽ – hoàn hảo cho doanh nhân hiện đại."
},
{
  id: 8,
  name: "Card đồ họa MSI GeForce RTX 4060 Ventus 2X",
  price: 8390000,
  originalPrice: 9590000,
  image: "assets/img/card.png",
  category: "component",
  featured: true,
  flashSale: false,
  stock: 10,
  specs: {
    "GPU": "NVIDIA GeForce RTX 4060",
    "VRAM": "8GB GDDR6",
    "Bus": "128-bit",
    "TDP": "115W",
    "Output": "HDMI, 3x DisplayPort"
  },
  description: "Card đồ họa tầm trung hiệu năng mạnh mẽ cho gaming và đồ họa."
},
{
  id: 9,
  name: "RAM Corsair Vengeance LPX 16GB (2x8GB) DDR4 3200MHz",
  price: 1290000,
  originalPrice: 1490000,
  image: "assets/img/ram.jpg",
  category: "component",
  featured: false,
  flashSale: true,
  stock: 25,
  specs: {
    "Dung lượng": "16GB (2x8GB)",
    "Loại RAM": "DDR4",
    "Bus": "3200MHz",
    "Voltage": "1.35V",
    "Tản nhiệt": "Có"
  },
  description: "RAM hiệu năng cao cho game thủ và dân văn phòng."
},
{
  id: 10,
  name: "Màn hình LG UltraGear 27GN750-B 27\" Full HD 240Hz",
  price: 5990000,
  originalPrice: 6490000,
  image: "assets/img/manlg.jpg",
  category: "monitor",
  featured: true,
  flashSale: false,
  stock: 8,
  specs: {
    "Kích thước": "27 inch",
    "Độ phân giải": "1920 x 1080 (Full HD)",
    "Tấm nền": "IPS",
    "Tần số quét": "240Hz",
    "Tương thích G-Sync": "Có"
  },
  description: "Màn hình gaming chuyên nghiệp tốc độ cao, hiển thị cực mượt."
},
{
  id: 11,
  name: "Màn hình ASUS TUF Gaming VG249Q1A 23.8” IPS 165Hz",
  price: 4290000,
  originalPrice: 4990000,
  image: "assets/img/manasus.png",
  category: "monitor",
  featured: false,
  flashSale: true,
  stock: 12,
  specs: {
    "Kích thước": "23.8 inch",
    "Độ phân giải": "1920 x 1080",
    "Tấm nền": "IPS",
    "Tần số quét": "165Hz",
    "Công nghệ": "Adaptive-Sync, ELMB"
  },
  description: "Màn hình chơi game mượt mà, thiết kế hiện đại, giá hợp lý."
},
{
    id: 12,
    name: "RAM G.SKILL Trident Z RGB 16GB (2x8GB) DDR4 3200MHz",
    price: 1790000,
    originalPrice: 2150000,
    image: "assets/img/ram2.jpg",
    category: "component",
    featured: true,
    flashSale: false,
    stock: 20,
    specs: {
        "Loại RAM": "DDR4",
        "Dung lượng": "16GB (2x8GB)",
        "Bus": "3200MHz",
        "Điện áp": "1.35V",
        "Tản nhiệt": "Có RGB"
    },
    description: "RAM G.SKILL Trident Z RGB mang đến hiệu suất và thẩm mỹ cao cho các hệ thống chơi game và làm việc chuyên nghiệp."
}


];

const sampleVouchers = [
    { code: "WELCOME10", discount: 10, type: "percent", expiry: "2025-12-31", active: true },
    { code: "SAVE50K", discount: 50000, type: "fixed", expiry: "2025-12-31", active: true },
    { code: "FLASHSALE20", discount: 20, type: "percent", expiry: "2025-12-31", active: true }
];

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Load sample data
    products = [...sampleProducts];
    vouchers = [...sampleVouchers];
    
    // Load products
    loadFeaturedProducts();
    loadFlashSaleProducts();
    loadAllProducts();
    
    // Initialize event listeners
    initializeEventListeners();
    
    // Start countdown timer
    startCountdown();
    
    // Load admin data if admin is logged in
    if (isAdmin) {
        loadAdminData();
    }
}

function initializeEventListeners() {
    // Authentication
    document.getElementById('loginBtn').addEventListener('click', () => showModal('loginModal'));
    document.getElementById('registerBtn').addEventListener('click', () => showModal('registerModal'));
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
    
    // Modal controls
    document.getElementById('closeLoginModal').addEventListener('click', () => hideModal('loginModal'));
    document.getElementById('closeRegisterModal').addEventListener('click', () => hideModal('registerModal'));
    document.getElementById('switchToRegister').addEventListener('click', switchToRegister);
    document.getElementById('switchToLogin').addEventListener('click', switchToLogin);
    
    // Product and cart
    document.getElementById('cartBtn').addEventListener('click', () => showModal('cartModal'));
    document.getElementById('closeCartModal').addEventListener('click', () => hideModal('cartModal'));
    document.getElementById('closeProductModal').addEventListener('click', () => hideModal('productModal'));
    
    // Checkout
    document.getElementById('checkoutBtn').addEventListener('click', showCheckout);
    document.getElementById('closeCheckoutModal').addEventListener('click', () => hideModal('checkoutModal'));
    document.getElementById('placeOrderBtn').addEventListener('click', placeOrder);
    
    // Admin
    document.getElementById('adminBtn').addEventListener('click', () => showModal('adminModal'));
    document.getElementById('closeAdminModal').addEventListener('click', () => hideModal('adminModal'));
    
    // Add Product/Voucher
    document.getElementById('addProductBtn').addEventListener('click', () => showModal('addProductModal'));
    document.getElementById('addVoucherBtn').addEventListener('click', () => showModal('addVoucherModal'));
    document.getElementById('closeAddProductModal').addEventListener('click', () => hideModal('addProductModal'));
    document.getElementById('closeAddVoucherModal').addEventListener('click', () => hideModal('addVoucherModal'));
    document.getElementById('addProductForm').addEventListener('submit', handleAddProduct);
    document.getElementById('addVoucherForm').addEventListener('submit', handleAddVoucher);
    
    // Voucher
    document.getElementById('applyVoucher').addEventListener('click', applyVoucher);
    
    // Product quantity controls
    document.getElementById('decreaseQty').addEventListener('click', () => changeQuantity(-1));
    document.getElementById('increaseQty').addEventListener('click', () => changeQuantity(1));
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => filterProducts(e.target.dataset.category));
    });
    
    // Admin tabs
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.addEventListener('click', (e) => switchAdminTab(e.target.dataset.tab));
    });
    
    // Search functionality
    document.getElementById('searchInput').addEventListener('input', handleSearch);
    
    // Modal backdrop clicks
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal(modal.id);
            }
        });
    });
}

// Authentication Functions
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simple authentication (in real app, this would be server-side)
    if (email === 'admin@mtshop.vn' && password === '1') {
        currentUser = { email, name: 'Admin', isAdmin: true };
        isAdmin = true;
        document.getElementById('adminBtn').classList.remove('hidden');
    } else {
        currentUser = { email, name: email.split('@')[0], isAdmin: false };
    }
    
    updateUserInterface();
    hideModal('loginModal');
    showNotification('Đăng nhập thành công!', 'success');
}

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    currentUser = { email, name, isAdmin: false };
    updateUserInterface();
    hideModal('registerModal');
    showNotification('Đăng ký thành công!', 'success');
}

function updateUserInterface() {
    if (currentUser) {
        document.getElementById('loginBtn').classList.add('hidden');
        document.getElementById('registerBtn').classList.add('hidden');
        document.getElementById('userInfo').classList.remove('hidden');
        document.getElementById('userName').textContent = currentUser.name;
        
        document.getElementById('logoutBtn').addEventListener('click', logout);
    }
}

function logout() {
    currentUser = null;
    isAdmin = false;
    document.getElementById('loginBtn').classList.remove('hidden');
    document.getElementById('registerBtn').classList.remove('hidden');
    document.getElementById('userInfo').classList.add('hidden');
    document.getElementById('adminBtn').classList.add('hidden');
    showNotification('Đã đăng xuất!', 'info');
}

// Add Product Function
function handleAddProduct(e) {
    e.preventDefault();
    
    const newProduct = {
        id: nextProductId++,
        name: document.getElementById('newProductName').value,
        price: parseInt(document.getElementById('newProductPrice').value),
        originalPrice: parseInt(document.getElementById('newProductOriginalPrice').value),
        category: document.getElementById('newProductCategory').value,
        stock: parseInt(document.getElementById('newProductStock').value),
        image: document.getElementById('newProductImage').value || `https://via.placeholder.com/300x200?text=${encodeURIComponent(document.getElementById('newProductName').value)}`,
        description: document.getElementById('newProductDescription').value,
        featured: document.getElementById('newProductFeatured').checked,
        flashSale: document.getElementById('newProductFlashSale').checked,
        specs: {
            "Thông tin": "Đang cập nhật",
            "Bảo hành": "12 tháng",
            "Xuất xứ": "Chính hãng"
        }
    };
    
    products.push(newProduct);
    
    // Refresh all product displays
    loadFeaturedProducts();
    loadFlashSaleProducts();
    loadAllProducts();
    loadAdminProducts();
    
    // Reset form and close modal
    document.getElementById('addProductForm').reset();
    hideModal('addProductModal');
    
    showNotification('Thêm sản phẩm thành công!', 'success');
}

// Add Voucher Function
function handleAddVoucher(e) {
    e.preventDefault();
    
    const newVoucher = {
        code: document.getElementById('newVoucherCode').value.toUpperCase(),
        type: document.getElementById('newVoucherType').value,
        discount: parseInt(document.getElementById('newVoucherDiscount').value),
        expiry: document.getElementById('newVoucherExpiry').value,
        active: true
    };
    
    // Check if voucher code already exists
    if (vouchers.find(v => v.code === newVoucher.code)) {
        showNotification('Mã voucher đã tồn tại!', 'error');
        return;
    }
    
    vouchers.push(newVoucher);
    loadAdminVouchers();
    
    // Reset form and close modal
    document.getElementById('addVoucherForm').reset();
    hideModal('addVoucherModal');
    
    showNotification('Tạo voucher thành công!', 'success');
}

// Product Loading Functions
function loadFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    const featuredProducts = products.filter(p => p.featured);
    
    container.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');
}

function loadFlashSaleProducts() {
    const container = document.getElementById('flashSaleProducts');
    const flashSaleProducts = products.filter(p => p.flashSale);
    
    container.innerHTML = flashSaleProducts.map(product => createProductCard(product, true)).join('');
}

function loadAllProducts() {
    const container = document.getElementById('allProducts');
    container.innerHTML = products.map(product => createProductCard(product)).join('');
}

function createProductCard(product, isFlashSale = false) {
    const discountPercent = Math.round((1 - product.price / product.originalPrice) * 100);
    
    return `
        <div class="product-card animate-fadeInUp" data-category="${product.category}">
            ${isFlashSale ? '<div style="position: absolute; top: 10px; left: 10px; background: #dc3545; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; z-index: 10;">FLASH SALE</div>' : ''}
            ${discountPercent > 0 ? `<div style="position: absolute; top: 10px; right: 10px; background: #ffd700; color: #333; padding: 4px 8px; border-radius: 4px; font-size: 12px; z-index: 10;">-${discountPercent}%</div>` : ''}
            <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 200px; object-fit: cover; cursor: pointer;" onclick="showProductDetail(${product.id})">
            <div class="content" style="padding: 20px;">
                <h4 style="font-size: 1.1rem; font-weight: bold; margin-bottom: 10px; cursor: pointer;" onclick="showProductDetail(${product.id})">${product.name}</h4>
                <div class="price-section" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px;">
                    <div>
                        <span class="current-price" style="color: #dc3545; font-weight: bold; font-size: 1.2rem;">${formatPrice(product.price)}</span>
                        ${product.originalPrice > product.price ? `<span class="original-price" style="color: #6c757d; text-decoration: line-through; font-size: 0.9rem; margin-left: 10px;">${formatPrice(product.originalPrice)}</span>` : ''}
                    </div>
                </div>
                <div class="rating-section" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px;">
                    <div class="stars" style="color: #ffd700; font-size: 14px;">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <span class="stock-info" style="color: #6c757d; font-size: 14px;">Còn ${product.stock} sản phẩm</span>
                </div>
                <div class="product-actions" style="display: flex; gap: 10px;">
                    <button onclick="buyNow(${product.id})" class="buy-now" style="flex: 1; padding: 10px; border: none; border-radius: 6px; background: #dc3545; color: white; font-weight: bold; cursor: pointer;">
                        Mua ngay
                    </button>
                    <button onclick="addToCart(${product.id})" class="add-to-cart" style="flex: 1; padding: 10px; border: none; border-radius: 6px; background: #007bff; color: white; font-weight: bold; cursor: pointer;">
                        Thêm vào giỏ
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Product Detail Functions
function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    document.getElementById('productModalTitle').textContent = product.name;
    document.getElementById('productModalImage').src = product.image;
    document.getElementById('productModalPrice').textContent = formatPrice(product.price);
    document.getElementById('productModalOriginalPrice').textContent = product.originalPrice > product.price ? formatPrice(product.originalPrice) : '';
    
    // Load specs
    const specsContainer = document.getElementById('productSpecs');
    specsContainer.innerHTML = Object.entries(product.specs).map(([key, value]) => 
        `<div class="spec-item" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e9ecef;">
            <span style="font-weight: 600;">${key}:</span>
            <span>${value}</span>
        </div>`
    ).join('');
    
    // Load description
    document.getElementById('productDescription').textContent = product.description;
    
    // Set up buy buttons
    document.getElementById('buyNowBtn').onclick = () => buyNow(productId);
    document.getElementById('addToCartBtn').onclick = () => {
        const qty = parseInt(document.getElementById('productQty').value);
        addToCart(productId, qty);
    };
    
    showModal('productModal');
    // Ẩn tất cả nhóm ảnh
document.querySelectorAll(".thumbnail-grid").forEach(grid => {
  grid.style.display = "none";
});

// Hiện đúng nhóm theo category sản phẩm
const category = product.category;

const categoryMap = {
  "laptop": ".thumbnail-grid.laptop",
  "monitor": ".thumbnail-grid.monitor",
  "component": ".thumbnail-grid.component"
};

const selector = categoryMap[category];
if (selector) {
  const grid = document.querySelector(selector);
  if (grid) grid.style.display = "grid";
}

}

function changeQuantity(change) {
    const qtyInput = document.getElementById('productQty');
    const currentQty = parseInt(qtyInput.value);
    const newQty = Math.max(1, currentQty + change);
    qtyInput.value = newQty;
}

// Cart Functions
function addToCart(productId, quantity = 1) {
    if (!currentUser) {
        showNotification('Vui lòng đăng nhập để mua hàng!', 'warning');
        showModal('loginModal');
        return;
    }
    
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    updateCartUI();
    showNotification('Đã thêm vào giỏ hàng!', 'success');
}

function buyNow(productId) {
    if (!currentUser) {
        showNotification('Vui lòng đăng nhập để mua hàng!', 'warning');
        showModal('loginModal');
        return;
    }
    
    addToCart(productId);
    showModal('cartModal');
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    const cartItems = document.getElementById('cartItems');
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #6c757d; padding: 40px 0;">Giỏ hàng trống</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item" style="display: flex; align-items: center; justify-content: space-between; padding: 20px 0; border-bottom: 1px solid #e9ecef;">
                <div class="cart-item-info" style="display: flex; align-items: center;">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px; margin-right: 15px;">
                    <div class="cart-item-details">
                        <h5 style="font-weight: bold; margin-bottom: 5px;">${item.name}</h5>
                        <p class="cart-item-price" style="color: #dc3545; font-weight: bold;">${formatPrice(item.price)}</p>                                                                                                                                               
                    </div>
                </div>
                <div class="cart-item-controls" style="display: flex; align-items: center; gap: 15px;">
                    <button onclick="changeCartQuantity(${item.id}, -1)" class="cart-qty-btn" style="background: #e9ecef; border: none; width: 30px; height: 30px; border-radius: 4px; cursor: pointer;">-</button>
                    <span style="margin: 0 10px;">${item.quantity}</span>
                    <button onclick="changeCartQuantity(${item.id}, 1)" class="cart-qty-btn" style="background: #e9ecef; border: none; width: 30px; height: 30px; border-radius: 4px; cursor: pointer;">+</button>
                    <button onclick="removeFromCart(${item.id})" class="cart-remove-btn" style="background: none; border: none; color: #dc3545; cursor: pointer; font-size: 18px; margin-left: 10px;">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    updateCartTotal();
}

function changeCartQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateCartTotal() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let discount = 0;
    
    if (appliedVoucher) {
        if (appliedVoucher.type === 'percent') {
            discount = subtotal * (appliedVoucher.discount / 100);
        } else {
            discount = appliedVoucher.discount;
        }
    }
    
    const total = subtotal - discount;
    
    document.getElementById('cartTotal').textContent = formatPrice(total);
    
    // Update checkout totals
    if (document.getElementById('subtotal')) {
        document.getElementById('subtotal').textContent = formatPrice(subtotal);
        document.getElementById('discountAmount').textContent = formatPrice(discount);
        document.getElementById('totalAmount').textContent = formatPrice(total + 30000); // Add shipping
        document.getElementById('finalAmount').textContent = formatPrice(total + 30000);
    }
}

// Voucher Functions
function applyVoucher() {
    const code = document.getElementById('voucherCode').value.trim().toUpperCase();
    const voucher = vouchers.find(v => v.code === code && v.active);
    const messageEl = document.getElementById('voucherMessage');
    
    if (!voucher) {
        messageEl.textContent = 'Mã giảm giá không hợp lệ!';
        messageEl.style.color = '#dc3545';
        return;
    }
    
    if (new Date() > new Date(voucher.expiry)) {
        messageEl.textContent = 'Mã giảm giá đã hết hạn!';
        messageEl.style.color = '#dc3545';
        return;
    }
    
    appliedVoucher = voucher;
    messageEl.textContent = `Áp dụng thành công! Giảm ${voucher.type === 'percent' ? voucher.discount + '%' : formatPrice(voucher.discount)}`;
    messageEl.style.color = '#28a745';
    
    updateCartTotal();
}

// Checkout Functions
function showCheckout() {
    if (cart.length === 0) {
        showNotification('Giỏ hàng trống!', 'warning');
        return;
    }
    
    hideModal('cartModal');
    showModal('checkoutModal');
    updateCartTotal();
}

function placeOrder() {
    const form = document.getElementById('checkoutForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    const orderData = {
        id: Date.now(),
        customer: {
            name: document.getElementById('shippingName').value,
            phone: document.getElementById('shippingPhone').value,
            address: document.getElementById('shippingAddress').value,
            email: currentUser.email
        },
        items: [...cart],
        subtotal: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        discount: appliedVoucher ? (appliedVoucher.type === 'percent' ? 
            cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * (appliedVoucher.discount / 100) : 
            appliedVoucher.discount) : 0,
        shipping: 30000,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) - 
               (appliedVoucher ? (appliedVoucher.type === 'percent' ? 
                cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * (appliedVoucher.discount / 100) : 
                appliedVoucher.discount) : 0) + 30000,
        paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value,
        note: document.getElementById('orderNote').value,
        status: 'pending',
        date: new Date().toLocaleString('vi-VN')
    };
    
    orders.push(orderData);
    
    // Clear cart
    cart = [];
    appliedVoucher = null;
    updateCartUI();
    
    hideModal('checkoutModal');
    showNotification('Đặt hàng thành công! Cảm ơn bạn đã mua hàng.', 'success');
    
    // Update admin data if admin is logged in
    if (isAdmin) {
        loadAdminOrders();
    }
}

// Admin Functions
function switchAdminTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Show/hide content
    document.querySelectorAll('.admin-content').forEach(content => {
        content.classList.add('hidden');
    });
    
    document.getElementById(`admin${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`).classList.remove('hidden');
    
    // Load data for the selected tab
    switch(tabName) {
        case 'products':
            loadAdminProducts();
            break;
        case 'orders':
            loadAdminOrders();
            break;
        case 'vouchers':
            loadAdminVouchers();
            break;
    }
}

function loadAdminProducts() {
    const tbody = document.getElementById('adminProductsList');
    tbody.innerHTML = products.map(product => `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${formatPrice(product.price)}</td>
            <td>
                <input type="number" value="${product.stock}" min="0" 
                       onchange="updateProductStock(${product.id}, this.value)"
                       style="width: 80px; padding: 6px; border: 1px solid #e9ecef; border-radius: 4px;">
            </td>
            <td>
                <button onclick="editProduct(${product.id})" style="background: #007bff; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; margin-right: 5px;">
                    Sửa
                </button>
                <button onclick="deleteProduct(${product.id})" style="background: #dc3545; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer;">
                    Xóa
                </button>
            </td>
        </tr>
    `).join('');
}

function loadAdminOrders() {
    const tbody = document.getElementById('adminOrdersList');
    tbody.innerHTML = orders.map(order => `
        <tr>
            <td>#${order.id}</td>
            <td>
                <div style="font-weight: bold;">${order.customer.name}</div>
                <div style="font-size: 12px; color: #6c757d;">${order.customer.phone}</div>
                <div style="font-size: 12px; color: #6c757d;">${order.customer.email}</div>
            </td>
            <td>${order.date}</td>
            <td>${formatPrice(order.total)}</td>
            <td>
                <select onchange="updateOrderStatus(${order.id}, this.value)" 
                        style="padding: 6px; border: 1px solid #e9ecef; border-radius: 4px; ${getStatusColor(order.status)}">
                    <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Chờ xử lý</option>
                    <option value="confirmed" ${order.status === 'confirmed' ? 'selected' : ''}>Đã xác nhận</option>
                    <option value="shipping" ${order.status === 'shipping' ? 'selected' : ''}>Đang giao</option>
                    <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Đã giao</option>
                    <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Đã hủy</option>
                </select>
            </td>
            <td>
                <button onclick="viewOrderDetail(${order.id})" style="background: #007bff; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer;">
                    Chi tiết
                </button>
            </td>
        </tr>
    `).join('');
}

function loadAdminVouchers() {
    const tbody = document.getElementById('adminVouchersList');
    tbody.innerHTML = vouchers.map(voucher => `
        <tr>
            <td>${voucher.code}</td>
            <td>
                ${voucher.type === 'percent' ? voucher.discount + '%' : formatPrice(voucher.discount)}
            </td>
            <td>${voucher.expiry}</td>
            <td>
                <span style="padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; ${voucher.active ? 'background: #d4edda; color: #155724;' : 'background: #f8d7da; color: #721c24;'}">
                    ${voucher.active ? 'Hoạt động' : 'Tạm dừng'}
                </span>
            </td>
            <td>
                <button onclick="toggleVoucher('${voucher.code}')" 
                        style="background: #ffc107; color: #212529; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; margin-right: 5px;">
                    ${voucher.active ? 'Tạm dừng' : 'Kích hoạt'}
                </button>
                <button onclick="deleteVoucher('${voucher.code}')" style="background: #dc3545; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer;">
                    Xóa
                </button>
            </td>
        </tr>
    `).join('');
}

function updateProductStock(productId, newStock) {
    const product = products.find(p => p.id === productId);
    if (product) {
        product.stock = parseInt(newStock);
        showNotification('Cập nhật số lượng thành công!', 'success');
    }
}

function updateOrderStatus(orderId, newStatus) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.status = newStatus;
        showNotification('Cập nhật trạng thái đơn hàng thành công!', 'success');
        loadAdminOrders();
    }
}

function getStatusColor(status) {
    const colors = {
        'pending': 'color: #ffc107;',
        'confirmed': 'color: #007bff;',
        'shipping': 'color: #6f42c1;',
        'delivered': 'color: #28a745;',
        'cancelled': 'color: #dc3545;'
    };
    return colors[status] || 'color: #6c757d;';
}

function toggleVoucher(code) {
    const voucher = vouchers.find(v => v.code === code);
    if (voucher) {
        voucher.active = !voucher.active;
        loadAdminVouchers();
        showNotification(`Voucher ${voucher.active ? 'đã kích hoạt' : 'đã tạm dừng'}!`, 'success');
    }
}

    let currentProductIdToEdit = null;

function editProduct(productId) {
  currentProductIdToEdit = product.id;

  document.getElementById("editNewPrice").value = product.price;
  document.getElementById("editNewOriginalPrice").value = product.originalPrice;

  document.getElementById("editPriceModal").classList.remove("hidden");
}

document.getElementById("closeEditPriceModal").addEventListener("click", () => {
  document.getElementById("editPriceModal").classList.add("hidden");
});

document.getElementById("editPriceForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const newPrice = parseFloat(document.getElementById("editNewPrice").value);
  const newOriginalPrice = parseFloat(document.getElementById("editNewOriginalPrice").value);

  // TODO: Cập nhật vào danh sách sản phẩm (giả sử biến: allProducts)
  const product = allProducts.find(p => p.id === currentProductIdToEdit);
  if (product) {
    product.price = newPrice;
    product.originalPrice = newOriginalPrice;

    // Gọi hàm render lại UI
    renderAllProducts(); // hoặc renderAdminProducts() tùy cấu trúc của bạn
  }

  document.getElementById("editPriceModal").classList.add("hidden");
});



function deleteProduct(productId) {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
        products = products.filter(p => p.id !== productId);
        loadAdminProducts();
        loadFeaturedProducts();
        loadFlashSaleProducts();
        loadAllProducts();
        showNotification('Đã xóa sản phẩm!', 'success');
    }
}

function deleteVoucher(code) {
    if (confirm('Bạn có chắc chắn muốn xóa voucher này?')) {
        vouchers = vouchers.filter(v => v.code !== code);
        loadAdminVouchers();
        showNotification('Đã xóa voucher!', 'success');
    }
}

function viewOrderDetail(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        let itemsList = order.items.map(item => 
            `${item.name} x${item.quantity} - ${formatPrice(item.price * item.quantity)}`
        ).join('\n');
        
        alert(`Chi tiết đơn hàng #${order.id}\n\nKhách hàng: ${order.customer.name}\nSĐT: ${order.customer.phone}\nĐịa chỉ: ${order.customer.address}\n\nSản phẩm:\n${itemsList}\n\nTạm tính: ${formatPrice(order.subtotal)}\nGiảm giá: ${formatPrice(order.discount)}\nPhí ship: ${formatPrice(order.shipping)}\nTổng cộng: ${formatPrice(order.total)}\n\nGhi chú: ${order.note || 'Không có'}`);
    }
}

// Utility Functions
function showModal(modalId) {
    document.getElementById(modalId).classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function hideModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function switchToRegister() {
    hideModal('loginModal');
    showModal('registerModal');
}

function switchToLogin() {
    hideModal('registerModal');
    showModal('loginModal');
}

function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 3000;
        padding: 15px 25px;
        border-radius: 8px;
        color: white;
        font-weight: bold;
        animation: fadeInUp 0.3s ease-out;
        max-width: 400px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;
    
    const colors = {
        'success': '#28a745',
        'error': '#dc3545',
        'warning': '#ffc107',
        'info': '#007bff'
    };
    
    notification.style.backgroundColor = colors[type];
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    const buttons = document.querySelectorAll('.filter-btn');
    
    // Update button styles
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    
    // Filter products
    products.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        const productName = product.querySelector('h4').textContent.toLowerCase();
        if (productName.includes(searchTerm)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

function startCountdown() {
    let hours = 12;
    let minutes = 34;
    let seconds = 56;
    
    setInterval(() => {
        seconds--;
        if (seconds < 0) {
            seconds = 59;
            minutes--;
            if (minutes < 0) {
                minutes = 59;
                hours--;
                if (hours < 0) {
                    hours = 23;
                }
            }
        }
        
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }, 1000);
}


// Toggle chatbot
const chatToggle = document.getElementById("chat-toggle");
const chatbot = document.getElementById("chatbot");
chatToggle.addEventListener("click", () => {
  chatbot.classList.toggle("show");
});

// Gửi tin nhắn
function sendMessage() {
  const inputField = document.getElementById("user-input");
  const userText = inputField.value.trim();
  if (!userText) return;

  appendMessage("user", userText);
  inputField.value = "";
  handleBotReply(userText);
}

// Xử lý nút gợi ý
function sendQuickReply(text) {
  appendMessage("user", text);
  handleBotReply(text);
}

// Hiển thị tin nhắn
function appendMessage(sender, text) {
  const chatContent = document.getElementById("chat-content");
  const messageDiv = document.createElement("div");
  messageDiv.className = "message " + sender;
  messageDiv.textContent = text;
  chatContent.appendChild(messageDiv);
  chatContent.scrollTop = chatContent.scrollHeight;
}

// Hiệu ứng typing + bot trả lời
function handleBotReply(userText) {
  const chatContent = document.getElementById("chat-content");
  const typingDiv = document.createElement("div");
  typingDiv.className = "message bot typing";
  typingDiv.textContent = "Đang nhập...";
  chatContent.appendChild(typingDiv);
  chatContent.scrollTop = chatContent.scrollHeight;

  setTimeout(() => {
    typingDiv.remove();
    const botText = getBotResponse(userText);
    appendMessage("bot", botText);
  }, 800);
}

// Logic phản hồi của bot
function getBotResponse(input) {
  input = input.toLowerCase();

  if (input.includes("chào") || input.includes("hi") || input.includes("hello") || input.includes("xin chào")) {
    return "Xin chào bạn! Tôi là trợ lý ảo của MT Store. Bạn đang quan tâm tới laptop, linh kiện hay cần hỗ trợ khác?";
  }

  if (input.includes("tư vấn") || input.includes("gợi ý") || input.includes("nên mua")) {
    return "Bạn cần tư vấn về loại sản phẩm nào ạ? Ví dụ: laptop văn phòng, gaming, hay linh kiện nâng cấp.";
  }

  if (input.includes("sinh viên") || input.includes("văn phòng")) {
    return "Bạn có thể tham khảo các dòng như ASUS Vivobook, Dell Inspiron hoặc HP Pavilion. Giá từ 11–18 triệu, mỏng nhẹ, pin ổn.";
  }

  if (input.includes("gaming") || input.includes("đồ họa") || input.includes("chơi game") || input.includes("lập trình")) {
    return "Các dòng laptop hiệu năng cao như MSI GF63, ASUS TUF Gaming, Lenovo Legion rất phù hợp. Giá từ 17–35 triệu, có card đồ họa rời.";
  }

  if (input.includes("ram") || input.includes("ssd") || input.includes("ổ cứng") || input.includes("bàn phím") || input.includes("chuột") || input.includes("màn hình")) {
    return "Chúng tôi có bán đầy đủ linh kiện chính hãng như RAM, SSD, màn hình, chuột... Vui lòng cho biết bạn cần gì để tôi gửi link cụ thể.";
  }

  if (input.includes("còn hàng") || input.includes("còn không") || input.includes("hết hàng")) {
    return "Vui lòng nhập tên hoặc mã sản phẩm để tôi kiểm tra tình trạng còn hàng giúp bạn nhé.";
  }

  if (input.includes("bảo hành") || input.includes("đổi") || input.includes("lỗi") || input.includes("hỏng")) {
    return "Laptop được bảo hành chính hãng 12–24 tháng. Linh kiện thường 6–12 tháng. Bạn đang gặp lỗi gì? Tôi sẽ giúp kiểm tra!";
  }

  if (input.includes("giao hàng") || input.includes("ship") || input.includes("vận chuyển")) {
    return "Chúng tôi giao hàng toàn quốc. Nội thành: 1–2 ngày, tỉnh khác: 2–4 ngày. Miễn phí ship với đơn từ 1 triệu!";
  }

  if (input.includes("thanh toán") || input.includes("trả tiền") || input.includes("cod") || input.includes("chuyển khoản") || input.includes("visa")) {
    return "Bạn có thể thanh toán qua COD, chuyển khoản ngân hàng, ví điện tử (Momo, ZaloPay), hoặc thẻ Visa/MasterCard.";
  }

  return "Xin lỗi, tôi chưa hiểu yêu cầu của bạn. Bạn có thể hỏi về: tư vấn laptop, linh kiện, thanh toán, bảo hành, giao hàng...";
}

// Gửi khi nhấn Enter
document.getElementById("user-input").addEventListener("keypress", function (e) {
  if (e.key === "Enter") sendMessage();
});



