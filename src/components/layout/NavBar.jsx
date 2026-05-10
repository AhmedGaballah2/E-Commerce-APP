import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import "../../NavBar.css";
import { useContext } from "react";
import LangContext from "../../Context/LangContext";

function NavBar() {
  const items = useSelector((state) => state.cart.items);

  const totalQuantity = items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const { lang, setLang } = useContext(LangContext);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary p-3">
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/"}>
            Products App
          </Link>
        </div>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => setLang(e.target.value)}
                value={lang}
              >
                <option value="En" selected>
                  English
                </option>
                <option value="Ar">العربية</option>
              </select>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/register"}>
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/login"}>
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link position-relative" to={"/cart"}>
                <FontAwesomeIcon icon={faCartShopping} />
                <span class="position-absolute top-75 start-75 translate-middle badge rounded-pill bg-danger">
                  {totalQuantity}
                  <span class="visually-hidden">unread messages</span>
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
