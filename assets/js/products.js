document.addEventListener('DOMContentLoaded', function() {
    const itemsPerPage = 8;
    let currentPage = 1;
    let totalProducts = 0;

    // دالة جلب المنتجات مع الترقيم
    function fetchProducts(page = 1) {
        const skip = (page - 1) * itemsPerPage;
        
        fetch(`https://dummyjson.com/products?limit=${itemsPerPage}&skip=${skip}`)
            .then(response => response.json())
            .then(data => {
                totalProducts = data.total;
                displayProducts(data.products);
                setupPagination();
            })
            .catch(error => console.error('Error:', error));
    }

    // دالة عرض المنتجات
    function displayProducts(products) {
        const productSection = document.getElementById('product-section');
        productSection.innerHTML = '';

        products.forEach(product => {
            const productCard = `
                <div class="product-cards">
                    <div class="image">
                        <img class="product-image" src="${product.thumbnail}" alt="${product.title}">
                        <span class="product-label body-regular-12">${product.category}</span>
                    </div>
                    <div class="text">
                        <p class="product-price body-medium-14">$${product.price}</p>
                        <p class="product-name body-medium-16">${product.title}</p>
                    </div>
                    <div class="divider"></div>
                    <div class="actions">
                        <button type="button" title="Add to Favourite" class="btn btn-light add-to-favourite">
                            <i class="fa-regular fa-heart"></i>
                        </button>
                        <button type="button" title="Add to Cart" class="btn btn-dark body-medium-16 add-to-cart">
                            <i class="fa-solid fa-cart-shopping"></i>Add to cart
                        </button>
                    </div>
                </div>
            `;
            productSection.innerHTML += productCard;
        });
    }

    // دالة إعداد الترقيم
    function setupPagination() {
        const paginationContainer = document.querySelector('.pagination');
        if (!paginationContainer) return;

        const totalPages = Math.ceil(totalProducts / itemsPerPage);
        paginationContainer.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            button.classList.add('pagination-button');
            if (i === currentPage) {
                button.classList.add('active');
            }
            button.addEventListener('click', () => {
                currentPage = i;
                fetchProducts(currentPage);
            });
            paginationContainer.appendChild(button);
        }
    }

    // جلب المنتجات عند تحميل الصفحة
    fetchProducts();
});

// Function to get query parameters from URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Function to fetch products by category
function fetchProductsByCategory() {
    const category = getQueryParam('category');
    if (category) {
        fetch(`https://dummyjson.com/products/category/${category}`)
            .then(response => response.json())
            .then(data => {
                const productSection = document.getElementById('product-list');
                productSection.innerHTML = ''; // Clear previous products
                data.products.forEach(product => {
                    const productCard = createProductCard(product);
                    productSection.appendChild(productCard);
                });
            })
            .catch(error => console.error('Error fetching products:', error));
    }
}

// Function to create a product card
function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.className = 'product-cards';
    const imageUrl = product.images[0] || 'path/to/default-image.jpg';

    // Check if the image is already in localStorage
    const storedImage = localStorage.getItem(imageUrl);
    const imgSrc = storedImage ? storedImage : imageUrl;

    productCard.innerHTML = `
        <div class="image">
            <img class="product-image lazyload" 
                    src="${imgSrc}" 
                    alt="${product.title}">
            <span class="product-label body-regular-12">${product.category}</span>
        </div>
        <div class="text">
            <p class="product-price body-medium-14">$${product.price}</p>
            <p class="product-name body-medium-16">${product.title}</p>
        </div>
        <div class="divider"></div>
        <div class="actions">
            <button type="button" title="Add to Favourite" class="btn btn-light add-to-favourite"><i class="fa-regular fa-heart"></i></button>
            <button type="button" title="Add to Cart" class="btn btn-dark body-medium-16 add-to-cart"><i class="fa-solid fa-cart-shopping"></i>Add to cart</button>
        </div>
    `;

    // Load the image and store it in localStorage
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
        localStorage.setItem(imageUrl, img.src);
    };
    img.onerror = () => {
        console.error(`Failed to load image: ${imageUrl}`);
    };

    return productCard;
}

// Lazy loading images with caching
const lazyLoadImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src; // Set the src to the data-src
            img.onload = () => img.removeAttribute('data-src'); // Remove data-src after loading
            observer.unobserve(img); // Stop observing the image
        }
    });
});

// Observe each lazy load image
lazyLoadImages.forEach(image => {
    imageObserver.observe(image);
});

// Call the function to fetch products when the page loads
window.onload = fetchProductsByCategory;