import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import "./navbar.css";

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("token", "");
    window.localStorage.removeItem("userId");
    navigate("/auth");
  };

  return (
    <div className="navbar">
      <Link to="/">Whatsapp</Link>
      {cookies.token && <p onClick={logout}>Logout</p>}
    </div>
  );
};

export default Navbar;
