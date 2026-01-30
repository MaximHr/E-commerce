import { Link } from "react-router-dom";

const Container = ({ title, info, link }) => {
  return (
    <div className="about container not-found">
      <h1 className="about-title">{title}</h1>
      <p className="about-info">{info}</p>
      <Link to={link} className="button">
        Back to home page
      </Link>
    </div>
  );
};

export default Container;
