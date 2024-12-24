document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
    }

    fetch('https://675864a560576a194d10537e.mockapi.io/products')
    .then(response => response.json())
    .then(data => {
        const productList = document.getElementById('productList');
        data.forEach(product => {
            const productItem = document.createElement('div');
            productItem.textContent = product.name;
            productList.appendChild(productItem);
        });
    })
    .catch(error => console.error('Error:', error));

    document.querySelectorAll('.logoutButton').forEach(button => {
        button.addEventListener('click', function() {
            localStorage.removeItem('token'); 
            window.location.href = 'login.html';
        });
    });
});

// Slider
const images = [
    'assets/imgs/banners/banner-1.png',
    'assets/imgs/banners/banner-2.png',
    'assets/imgs/banners/banner-3.png',
    'assets/imgs/banners/banner-4.png',
    'assets/imgs/banners/banner-5.png',
    'assets/imgs/banners/banner-6.png',
    'assets/imgs/banners/banner-7.png',
    'assets/imgs/banners/banner-8.png'
];

const slidesContainer = document.querySelector('.slides');
const ellipsesContainer = document.querySelector('.ellipses');
let currentIndex = 0;

images.forEach((image, index) => {
    const slide = document.createElement('div');
    slide.classList.add('slide');
    slide.innerHTML = `<img src="${image}" alt="banner-${index + 1}">`;
    slidesContainer.appendChild(slide);

    const dot = document.createElement('span');
    dot.addEventListener('click', () => goToSlide(index));
    ellipsesContainer.appendChild(dot);
});

function goToSlide(index) {
    currentIndex = index;
    updateSlider();
}

function updateSlider() {
    const offset = -currentIndex * 100;
    slidesContainer.style.transform = `translateX(${offset}%)`;
    updateDots();
}

function updateDots() {
    const dots = ellipsesContainer.querySelectorAll('span');
    dots.forEach((dot, index) => {
        dot.style.backgroundColor = index === currentIndex ? 'black' : 'white';
    });
}

document.querySelector('.prev').addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
    updateSlider();
});

document.querySelector('.next').addEventListener('click', () => {
    currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
    updateSlider();
});

updateSlider();

// Add CSS transition property to the slidesContainer to enable smooth transitions
slidesContainer.style.transition = 'transform 0.5s ease';

// Function to automatically change slides every 3 seconds
function startSliderAutoPlay() {
    setInterval(() => {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        updateSlider();
    }, 3000); // Change slide every 3 seconds
}

// Call the function to start auto-playing the slider
startSliderAutoPlay();

// Update the updateSlider function to include transition and updateDots
function updateSlider() {
    const offset = -currentIndex * 100; // Calculate the offset
    slidesContainer.style.transform = `translateX(${offset}%)`;
    updateDots();
}

// Categories
const categories = [
    { slug: "beauty", name: "Beauty", description: "Explore a range of beauty products including makeup and skincare." },
    { slug: "fragrances", name: "Fragrances", description: "Discover a variety of perfumes and colognes." },
    { slug: "furniture", name: "Furniture", description: "Find stylish furniture for your home." },
    { slug: "groceries", name: "Groceries", description: "Shop for everyday grocery items." },
    { slug: "home-decoration", name: "Home Decoration", description: "Decorate your home with beautiful items." },
    { slug: "kitchen-accessories", name: "Kitchen Accessories", description: "Upgrade your kitchen with essential tools." },
    { slug: "laptops", name: "Laptops", description: "Browse the latest laptops and accessories." },
    { slug: "mens-shirts", name: "Mens Shirts", description: "Shop stylish shirts for men." },
    { slug: "mens-shoes", name: "Mens Shoes", description: "Find the perfect shoes for men." },
    { slug: "mens-watches", name: "Mens Watches", description: "Explore a collection of men's watches." },
    { slug: "mobile-accessories", name: "Mobile Accessories", description: "Find the latest mobile accessories." },
    { slug: "motorcycle", name: "Motorcycle", description: "Explore a range of motorcycles." },
    { slug: "skin-care", name: "Skin Care", description: "Discover skincare products for all types." },
    { slug: "smartphones", name: "Smartphones", description: "Browse the latest smartphones." },
    { slug: "sports-accessories", name: "Sports Accessories", description: "Get the best sports accessories." },
    { slug: "sunglasses", name: "Sunglasses", description: "Find stylish sunglasses for every occasion." },
    { slug: "tablets", name: "Tablets", description: "Explore a variety of tablets." },
    { slug: "tops", name: "Tops", description: "Shop for trendy tops." },
    { slug: "vehicle", name: "Vehicle", description: "Browse vehicles for all needs." },
    { slug: "womens-bags", name: "Womens Bags", description: "Find stylish bags for women." },
    { slug: "womens-dresses", name: "Womens Dresses", description: "Shop for beautiful dresses." },
    { slug: "womens-jewellery", name: "Womens Jewellery", description: "Explore a range of women's jewellery." },
    { slug: "womens-shoes", name: "Womens Shoes", description: "Find the perfect shoes for women." },
    { slug: "womens-watches", name: "Womens Watches", description: "Explore a collection of women's watches." },
];

// Function to fetch products by category
function fetchProducts(category, section) {
    fetch(`https://dummyjson.com/products/category/${category}`)
        .then(response => response.json())
        .then(data => {
            const productSection = document.getElementById(section);
            productSection.innerHTML = ''; // Clear previous products
            // Limit to 4 products for initial display
            data.products.slice(0, 4).forEach(product => { 
                const productCard = createProductCard(product);
                productSection.appendChild(productCard);
            });

            // Store all products in a data attribute for later use
            productSection.dataset.allProducts = JSON.stringify(data.products);
        })
        .catch(error => console.error('Error fetching products:', error));
}

// Function to create a product card
function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.className = 'product-cards';
    const imageUrl = product.images[0] || 'path/to/default-image.jpg'; // استخدام صورة افتراضية إذا كانت الصورة مفقودة

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
        localStorage.setItem(imageUrl, img.src); // Store only if fully loaded
    };
    img.onerror = () => {
        console.error(`Failed to load image: ${imageUrl}`); // Handle error
    };

    return productCard;
}

// Function to handle "View More" button click
function viewMore(category) {
    // Redirect to products.html with the selected category
    window.location.href = `products.html?category=${category}`;
}

// Create sections for each category
categories.forEach(category => {
    const section = document.createElement('section');
    section.className = 'category-section';
    section.innerHTML = `
        <div class="section-header">
            <h2 class="category-name header-text body-medium-18">${category.name}</h2>
            <p class="category-description body-medium-16">${category.description}</p>
            <button type="button" class="btn btn-light view-more body-medium-16" onclick="viewMore('${category.slug}')">View More<i class="fa-solid fa-arrow-up"></i></button>
        </div>
        <div class="products" id="${category.slug}"></div>
    `;
    document.getElementById('sections-container').appendChild(section);
    fetchProducts(category.slug, category.slug); // Fetch products for each category
});

// Last Banner Slider
document.addEventListener('DOMContentLoaded', function() {
    const images = [
        'assets/imgs/banners/banner-one-1.png',
        'assets/imgs/banners/banner-one-2.png',
        'assets/imgs/banners/banner-one-3.png',
        'assets/imgs/banners/banner-one-4.png'
    ];

    const slidesContainer = document.querySelector('#dynamicBanner .slides');
    const ellipsesContainer = document.querySelector('#dynamicBanner .ellipses');
    let currentIndex = 0;

    images.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.classList.add('slide');
        slide.innerHTML = `<img src="${image}" alt="banner-${index + 1}">`;
        slidesContainer.appendChild(slide);

        const dot = document.createElement('span');
        dot.addEventListener('click', () => goToSlide(index));
        ellipsesContainer.appendChild(dot);
    });

    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }

    function updateSlider() {
        const offset = -currentIndex * 100;
        slidesContainer.style.transform = `translateX(${offset}%)`;
        updateDots();
    }

    function updateDots() {
        const dots = ellipsesContainer.querySelectorAll('span');
        dots.forEach((dot, index) => {
            dot.style.backgroundColor = index === currentIndex ? 'black' : 'white';
        });
    }

    document.querySelector('#dynamicBanner .prev').addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        updateSlider();
    });

    document.querySelector('#dynamicBanner .next').addEventListener('click', () => {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        updateSlider();
    });

    updateSlider();

    // Add CSS transition property to the slidesContainer to enable smooth transitions
    slidesContainer.style.transition = 'transform 0.5s ease';

    // Function to automatically change slides every 3 seconds
    function startSliderAutoPlay() {
        setInterval(() => {
            currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
            updateSlider();
        }, 3000); // Change slide every 3 seconds
    }

    // Call the function to start auto-playing the slider
    startSliderAutoPlay();
});