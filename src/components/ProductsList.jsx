import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import bg from "../assets/loading.png";
import { useDispatch } from "react-redux";
import { addToCart } from "../Store/Slices/cart";

function ProductsList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getProducts() {
      try {
        setLoading(true);
        const response = await fetch(import.meta.env.VITE_APP_BASE_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch Products!");
        }

        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, []);

  if (loading) {
    return (
      <>
        <div className="px-5 pt-3">
          <h4 className="mt-3">
            Welcome to our shopping website, start browsing...
          </h4>
          <div
            className="card mt-5"
            aria-hidden="true"
            style={{ maxWidth: "320px" }}
          >
            <img src={bg} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title placeholder-glow">
                <span className="placeholder col-6"></span>
              </h5>
              <p className="card-text placeholder-glow">
                <span className="placeholder col-7"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-6"></span>
                <span className="placeholder col-8"></span>
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return <h3 className="text-danger mt-3 px-5 pt-3">{error}</h3>;
  }

  return (
    <div className="px-5 pt-3">
      <h4 className="mt-3">
        Welcome to our shopping website, start browsing...
      </h4>

      <div className="mt-3 mb-4 row g-4">
        {products.map((product) => (
          <div className="col-md-4 col-lg-2" key={product.id}>
            <div
              className="card h-100 d-flex flex-column"
              style={{ maxWidth: "320px" }}
            >
              <img
                src={product.images[0]}
                className="card-img-top w-100"
                alt="Product Image"
                onClick={() => navigate(`/product/${product.id}`)}
                style={{ cursor: "pointer" }}
              />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="h5 mb-0">${product.price}</span>
                  <div>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-half text-warning"></i>
                    <small className="text-muted">{product.rating}</small>
                  </div>
                </div>
              </div>
              <div className="card-footer d-flex justify-content-between bg-light">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => dispatch(addToCart(product))}
                >
                  Add to Cart
                </button>
                <span
                  className={
                    product.stock > 0
                      ? "mt-auto mb-auto badge text-bg-success"
                      : "mt-auto mb-auto badge text-bg-danger"
                  }
                >
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsList;
