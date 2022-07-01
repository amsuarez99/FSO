import { Link } from "react-router-dom";
const Header = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <h1>Software anecdotes</h1>
      <Link to="/anecdotes" style={padding}>
        anecdotes
      </Link>
      <Link to="/anecdotes/new" style={padding}>
        create new
      </Link>
      <Link to="/about" style={padding}>
        about
      </Link>
    </div>
  );
};

export default Header;
