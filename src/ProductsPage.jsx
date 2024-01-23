import { useEffect, useState } from "react";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [price, setFilterPrice] = useState(100000);
  const productsPerPage = 10;

  // Calculate the index range for products to display on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = searchedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // display all the products when render the page
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products/");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        setSearchedProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // function for searched items
  const handleSearch = () => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTermLowerCase)
    );
    setSearchedProducts(filtered);
    setCurrentPage(1); // Reset current page on search
  };

  const handleClear = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    // If the search term is cleared, show all products
    if (!newSearchTerm) {
      setSearchedProducts(products);
      setCurrentPage(1);
    }
  };

  // functions for handling the selected items in the dropdown
  const handleFilterChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedFilter(selectedOptions);
  };

  const filterProducts = () => {
    let Products = [...products];

    const filteredProducts = Products.filter((item) => {
      if (item.price <= price) {
        if (selectedFilter.length > 0) {
          if (selectedFilter.includes(item.category)) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      } else {
        return false;
      }
    });

    // Update the state with the filtered products
    setSearchedProducts(filteredProducts);
    setCurrentPage(1); // Reset current page after filtering
  };

  useEffect(() => {
    filterProducts();
  }, [selectedFilter, price]);

  const handleRange = (e) => {
    setFilterPrice(parseInt(e.target.value, 10));
  };

  return (
    <div className="products-container">
      <div className="filtersContainer">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleClear}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="price-range">
          <label htmlFor="price">Price: </label>
          <input
            id="price"
            type="range"
            value={price}
            onChange={handleRange}
            min="0"
            max="100000"
          />
        </div>
        <div>
          <select onChange={handleFilterChange} multiple>
            <optgroup label="Category">
              <option value="men's clothing">Mens</option>
              <option value="women's clothing">Womens</option>
              <option value="jewelery">Jewellery</option>
              <option value="electronics">Electronics</option>
            </optgroup>
          </select>
        </div>
      </div>

      <div className="products-list">
        {currentProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} />
            <div className="description">
              <h2>&#8377;{product.price}</h2>
              <h3>{product.title}</h3>
              <div>
                <p
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                  }}
                >
                  {product.description}
                </p>
              </div>
              <p className="rating">Rating: {product.rating.rate}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        {Array.from(
          { length: Math.ceil(searchedProducts.length / productsPerPage) },
          (_, index) => (
            <button key={index + 1} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default ProductsPage;

// import { useEffect, useState } from "react";

// const ProductsPage = () => {
//   const [products, setProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchedProducts, setSearchedProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedFilter, setSelectedFilter] = useState([]);
//   const productsPerPage = 10;

//   // Calculate the index range for products to display on the current page
//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = searchedProducts.slice(
//     indexOfFirstProduct,
//     indexOfLastProduct
//   );

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch("https://fakestoreapi.com/products/");
//         if (!response.ok) {
//           throw new Error("Failed to fetch products");
//         }
//         const data = await response.json();
//         setProducts(data);
//         setSearchedProducts(data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleSearch = () => {
//     const searchTermLowerCase = searchTerm.toLowerCase();
//     const filtered = products.filter((product) =>
//       product.title.toLowerCase().includes(searchTermLowerCase)
//     );
//     setSearchedProducts(filtered);
//     setCurrentPage(1); // Reset current page on search
//   };

//   const handleClear = (e) => {
//     const newSearchTerm = e.target.value;
//     setSearchTerm(newSearchTerm);

//     // If the search term is cleared, show all products
//     if (!newSearchTerm) {
//       setSearchedProducts(products);
//       setCurrentPage(1);
//     }
//   };

//   const handleFilterChange = (e) => {
//     const newFilter = e.target.value;
//     setSelectedFilter(newFilter);
//   };

//   const filterProducts = () => {
//     let filteredProducts = products;

//     if (selectedFilter === "price") {
//       const sortedProducts = filteredProducts.slice().sort((a, b) => a.price - b.price);
//       setSearchedProducts(sortedProducts);
//       setCurrentPage(1);
//     } else if (selectedFilter === "men's clothing") {
//       const mensProducts = filteredProducts.filter((product) => product.category.toLowerCase() === "men's clothing");
//       setSearchedProducts(mensProducts);
//       setCurrentPage(1);
//     } else if (selectedFilter === "women's clothing") {
//       const womensProducts = filteredProducts.filter((product) => product.category.toLowerCase() === "women's clothing");
//       setSearchedProducts(womensProducts);
//       setCurrentPage(1);
//     } else if (selectedFilter === "jewelery") {
//       const jewelleryProducts = filteredProducts.filter((product) => product.category.toLowerCase() === "jewelery");
//       setSearchedProducts(jewelleryProducts);
//       setCurrentPage(1);
//     } else if (selectedFilter === "electronics") {
//       const electronicsProducts = filteredProducts.filter((product) => product.category.toLowerCase() === "electronics");
//       setSearchedProducts(electronicsProducts);
//       setCurrentPage(1);
//     } else if (selectedFilter === "") {
//       setSearchedProducts(filteredProducts);
//     }
//   };

//   useEffect(() => {
//     filterProducts();
//   }, [selectedFilter]);

//   return (
//     <div className="products-container">
//       <div className="search-bar">
//         <input
//           type="text"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={handleClear}
//         />
//         <button onClick={handleSearch}>Search</button>

//         <select onChange={handleFilterChange}>
//           <option value="">Select</option>
//           <optgroup label="Category">
//             <option value="men's clothing">Mens</option>
//             <option value="women's clothing">Womens</option>
//             <option value="jewelery">Jewellery</option>
//             <option value="electronics">Electronics</option>
//           </optgroup>
//           <option value="price">Price</option>
//         </select>
//       </div>

//       <div className="products-list">
//         {currentProducts.map((product) => (
//           <div key={product.id} className="product-card">
//             <img src={product.image} alt={product.title} />
//             <div>
//               <h2>&#8377;{product.price}</h2>
//               <h3>{product.title}</h3>
//               <p>{product.description}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       <div className="pagination">
//         {Array.from(
//           { length: Math.ceil(searchedProducts.length / productsPerPage) },
//           (_, index) => (
//             <button key={index + 1} onClick={() => paginate(index + 1)}>
//               {index + 1}
//             </button>
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductsPage;
