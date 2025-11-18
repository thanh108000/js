document.addEventListener("DOMContentLoaded", function () {
    
    // ====================================================
    // HÀM HỖ TRỢ: TOAST NOTIFICATION
    // ====================================================
    
    // Tạo container cho thông báo (Chạy đầu tiên)
    const toastContainer = document.createElement('div');
    toastContainer.style.position = 'fixed';
    toastContainer.style.top = '20px';
    toastContainer.style.right = '20px';
    toastContainer.style.zIndex = '1050';
    document.body.appendChild(toastContainer);

    function showNotification(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast align-items-center text-white bg-${type} border-0 show`;
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'assertive');
        toast.setAttribute('aria-atomic', 'true');
        toast.style.marginBottom = '10px';
        
        toast.innerHTML = `<div class="d-flex"><div class="toast-body">${message}</div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button></div>`;
        
        toastContainer.appendChild(toast);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300); 
        }, 3000);
    }
    
    // ====================================================
    // 1. TÍNH NĂNG TÌM KIẾM NÂNG CAO (SEARCH FUNCTIONALITY)
    // ====================================================
    
    const searchInput = document.querySelector('input[placeholder="Recipient’s username"]');
    const searchIcon = document.querySelector('.input-group-text .bi-search');
    // Chọn tất cả các mục menu để tìm kiếm
    const menuItems = document.querySelectorAll('.container.py-5 .col-md-3.col-sm-6');
    
    if (searchInput && searchIcon && menuItems.length > 0) {
        
        // 1a. Xử lý sự kiện khi gõ phím hoặc nhấn nút tìm kiếm
        const handleSearch = () => {
            const searchText = searchInput.value.toLowerCase().trim();
            let resultsFound = false;

            if (searchText.length === 0) {
                // Nếu thanh tìm kiếm trống, hiển thị lại tất cả
                menuItems.forEach(item => {
                    item.style.display = 'block';
                });
                return;
            }

            menuItems.forEach(item => {
                // Lấy tên món ăn và mô tả để tìm kiếm
                const title = item.querySelector('.card-title')?.textContent.toLowerCase() || '';
                const description = item.querySelector('.card-text')?.textContent.toLowerCase() || '';

                if (title.includes(searchText) || description.includes(searchText)) {
                    item.style.display = 'block'; // Hiển thị nếu khớp
                    resultsFound = true;
                } else {
                    item.style.display = 'none'; // Ẩn nếu không khớp
                }
            });
            
            // 1b. Thông báo kết quả tìm kiếm
            if (resultsFound) {
                showNotification(`Đã tìm thấy các món ăn cho từ khóa: "${searchText}"`, 'success');
            } else {
                showNotification(`Không tìm thấy món ăn nào cho từ khóa: "${searchText}"`, 'danger');
            }
        };

        // Kích hoạt tìm kiếm khi gõ xong (debounce có thể được thêm vào để tối ưu)
        searchInput.addEventListener('keyup', handleSearch);
        
        // Kích hoạt tìm kiếm khi nhấn vào icon
        searchIcon.style.cursor = 'pointer';
        searchIcon.addEventListener('click', handleSearch);
    }

    // ====================================================
    // 2. TƯƠNG TÁC: THÍCH/BỎ THÍCH (LIKE)
    // ====================================================

    const heartIcons = document.querySelectorAll('.card-body .bi-heart, .card-body .bi-heart-fill');

    heartIcons.forEach(icon => {
        icon.style.cursor = 'pointer'; 
        
        icon.addEventListener('click', function(event) {
            event.stopPropagation();
            
            if (this.classList.contains('bi-heart')) {
                this.classList.remove('bi-heart');
                this.classList.add('bi-heart-fill', 'text-warning');
                showNotification('Đã thêm món ăn vào mục yêu thích!', 'success');
            } else {
                this.classList.remove('bi-heart-fill', 'text-warning');
                this.classList.add('bi-heart');
                showNotification('Đã gỡ món ăn khỏi mục yêu thích.', 'warning');
            }
        });
    });

    // ====================================================
    // 3. HIỆU ỨNG: CHUYỂN ĐỔI CHẾ ĐỘ SÁNG/TỐI (DARK MODE)
    // ====================================================
    
    const toggleModeButton = document.querySelector('.btn-warning[title="Toggle Mode"]');
    const body = document.body;

    if (toggleModeButton) {
        const currentMode = localStorage.getItem('theme-mode');
        
        // Khởi tạo trạng thái
        if (currentMode === 'dark') {
            body.classList.add('dark-mode');
            toggleModeButton.textContent = 'Dark Mode';
        } else {
            toggleModeButton.textContent = 'Light Mode';
        }

        toggleModeButton.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
            
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme-mode', 'dark');
                this.textContent = 'Dark Mode';
            } else {
                localStorage.setItem('theme-mode', 'light');
                this.textContent = 'Light Mode';
            }
        });
    }

    // ====================================================
    // 4. HIỆU ỨNG: THAY ĐỔI MÀU CHỮ TIÊU ĐỀ KHI HOVER
    // ====================================================
    
    const menuLinks = document.querySelectorAll('.justify-content-center.col a');
    
    menuLinks.forEach(link => {
        link.addEventListener('mouseover', function() {
            this.style.color = '#ffc107'; 
            this.style.transition = 'color 0.3s';
        });

        link.addEventListener('mouseout', function() {
            this.style.color = 'inherit'; 
        });
    });


    // ====================================================
    // 5. CHỨC NĂNG BỔ SUNG CỦA BẠN: TẠO DYNAMIC CAROUSEL
    // ====================================================
    
    const carouselContainer = document.getElementById("carouselContainer");
    
    if (carouselContainer) {
        // ... (Giữ nguyên logic tạo Carousel của bạn)
    }

    // ====================================================
    // 6. TƯƠNG TÁC: ĐĂNG KÝ EMAIL TỪ KHUNG FOOTER
    // ====================================================
    
    const signUpButton = document.querySelector('.khung button.btn-warning');
    
    if (signUpButton) {
        signUpButton.addEventListener('click', function(event) {
            event.preventDefault(); 
            showNotification('Đăng ký thành công! Bạn sẽ nhận được mã giảm giá 50% qua email!', 'success');
        });
    }

});

// ====================================================
// CHỨC NĂNG NGOÀI SCOPE: Cuộn trang mượt mà (Smooth Scroll)
// ====================================================

document.getElementById('btn-get-started')?.addEventListener('click', function(event) {
    event.preventDefault(); 
    const targetSection = document.getElementById('our-menu'); 
    
    if (targetSection) {
        targetSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start'      
        });
    }
});