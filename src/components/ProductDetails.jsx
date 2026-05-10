import "../ProductDetails.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../Store/Slices/cart";

function Product() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function getProduct() {
      const res = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/${id}`);
      const data = await res.json();
      setProduct(data);
    }

    getProduct();
  }, [id]);

  if (!product) return <p className="mt-3 fs-1 text-center">Loading...</p>;

  function getOriginalPrice(finalPrice, discountPercent) {
    return finalPrice / (1 - discountPercent / 100);
  }

  const finalPrice = product.price;
  const discount = product.discountPercentage;

  const originalPrice = getOriginalPrice(finalPrice, discount);

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 mb-4">
            <img
              src={product.images[0]}
              alt="Product"
              className="img-fluid rounded mb-3 product-image"
              id="mainImage"
            />
          </div>

          <div className="col-md-6">
            <h2 className="mb-3">{product.title}</h2>
            <p className="text-muted mb-4">{product.category}</p>
            <div className="mb-3">
              <span className="h4 me-2">${product.price}</span>
              <span className="text-muted">
                <s>${originalPrice.toFixed(2)}</s>
              </span>
            </div>
            <div className="mb-3">
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-half text-warning"></i>
              <span className="ms-2">
                {product.rating} ({product.reviews.length} reviews)
              </span>
            </div>
            <p className="mb-4">{product.description}</p>

            <div className="mb-4">
              <label for="quantity" className="form-label">
                Quantity:
              </label>
              <div className="quantity-container d-flex justify-content-start align-content-center gap-2">
                <button
                  className="btn btn-primary btn-lg mb-3 me-2 px-3"
                  style={{ width: "50px" }}
                >
                  +
                </button>

                <div
                  id="quantity"
                  className="form-control mb-3 me-2 btn-lg p-2 d-flex justify-content-center align-items-center"
                  style={{ width: "80px" }}
                >
                  1
                </div>
                <button
                  className="btn btn-primary btn-lg mb-3 me-2 px-3"
                  style={{ width: "50px" }}
                >
                  -
                </button>
              </div>
            </div>
            <button
              onClick={() => dispatch(addToCart(product))}
              className="btn btn-primary btn-lg mb-3 me-2 "
            >
              <i className="bi bi-cart-plus"></i> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
