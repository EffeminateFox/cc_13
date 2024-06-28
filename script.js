//54529624
document.addEventListener("DOMContentLoaded", function() {
  // Get references to DOM elements
  const productsContainer = document.getElementById("products");
  const loadingElement = document.getElementById("loading");
  const errorElement = document.getElementById("error");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");

  // Initialize array
  let products = [];
  let currentIndex = 0;

  // Function to fetch products from the API
  const fetchProducts = async () => {
    try {
      loadingElement.classList.remove("hidden");
      const response = await fetch("https://course-api.com/react-store-products");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      products = await response.json();
      displayProduct(currentIndex);
      loadingElement.classList.add("hidden");
      if (products.length > 1) {
        prevButton.classList.remove("hidden");
        nextButton.classList.remove("hidden");
      }
    } catch (error) {
      //Deals with loading element and error logging
      loadingElement.classList.add("hidden");
      errorElement.classList.remove("hidden");
      console.error("Error fetching products:", error);
    }
  };
 // Function to display a product by index
  const displayProduct = (index) => {
    productsContainer.innerHTML = "";
    const product = products[index];
    const productElement = document.createElement("div");
    productElement.classList.add("product");
    productElement.innerHTML = `
      <h2>${product.name}</h2>
      <img src="${product.image}" alt="${product.name}">
      <p>Price: $${product.price}</p>
      <p>${product.description}</p>
    `;
    productsContainer.appendChild(productElement);
  };
 // Event listener for the Previous button
  prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + products.length) % products.length;
    displayProduct(currentIndex);
  });

  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % products.length;
    displayProduct(currentIndex);
  });

  fetchProducts();
});
