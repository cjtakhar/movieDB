import { Link } from 'react-router-dom';
const About = () => {
    return (
      <div className="about-container">
        <div className="about">
          <p>Welcome to Movie DB! It's for movie things.</p>
          <p>And for people who love movie things!</p>
          <Link to="/account">
                <button className="ca-btn">Create an Account</button>
                </Link>
        </div>
      </div>
    );
  };
  
  export default About;
  