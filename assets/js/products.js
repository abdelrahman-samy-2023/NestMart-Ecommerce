// Function to fetch products by category
function fetchProducts(category) {
    fetch(`https://dummyjson.com/products/category/${category}`)
        .then(response => response.json())
        .then(data => {
            const productSection = document.getElementById('product-section');
            productSection.innerHTML = ''; // Clear previous products
            data.products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-cards';
                productCard.innerHTML = `
                    <div class="image">
                        <img class="product-image" src="${product.images[0]}" alt="${product.title}">
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
                productSection.appendChild(productCard);
            });
        })
        .catch(error => console.error('Error fetching products:', error));
}

// Get the category from the URL
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category');

// Fetch products for the specified category
if (category) {
    fetchProducts(category);
}