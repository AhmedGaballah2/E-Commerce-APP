import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";

import {
  increaseQty,
  decreaseQty,
  removeFromCart,
} from "../../Store/Slices/cart";

function CartDetails() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <section className="h-100">
      <div className="container h-100 py-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-10">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-normal mb-0">Shopping Cart</h3>
            </div>
            {items.map((item) => (
              <div key={item.id} className="card rounded-3 mb-4">
                <div className="card-body p-4">
                  <div className="row d-flex justify-content-between align-items-center">
                    <div className="col-md-2 col-lg-2 col-xl-2">
                      <img
                        src={item.images[0]}
                        className="img-fluid rounded-3"
                        alt="Cotton T-shirt"
                      />
                    </div>
                    <div className="col-md-3 col-lg-3 col-xl-3">
                      <p className="lead fw-normal mb-2">{item.title}</p>
                    </div>
                    <div className="col-md-3 col-lg-3 col-xl-2 d-flex gap-3">
                      <button
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="btn btn-primary px-2 fs-6"
                        style={{ width: "80px" }}
                        onClick={() => dispatch(decreaseQty(item.id))}
                      >
                        -
                      </button>

                      <div
                        id="form1"
                        className="form-control form-control-sm d-flex justify-content-center align-items-center fs-6"
                      >
                        {item.quantity}
                      </div>

                      <button
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="btn btn-primary px-2 fs-6"
                        style={{ width: "80px" }}
                        onClick={() => dispatch(increaseQty(item.id))}
                      >
                        +
                      </button>
                    </div>
                    <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                      <h5 className="mb-0">${item.price}</h5>
                    </div>
                    <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                      <a
                        href="#!"
                        className="text-danger"
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(removeFromCart(item.id));
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} className="fs-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CartDetails;
