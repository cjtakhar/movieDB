import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md">
      <Link className="navbar-brand" to="/wga">
        MOVIE DB
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/top" activeclassname="active">
              Top Rated
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/trending" activeclassname="active">
              Trending
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/discover" activeclassname="active">
              Discover
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/login" activeclassname="active">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about" activeclassname="active">
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;






