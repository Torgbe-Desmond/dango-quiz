import { Link } from 'react-router-dom';
import './Header.css';


const Header = () => {
  return  <div className="header">
    <hr className="divider"/>
    <Link to="/" className="title">PROGRAMMING QUIZ HUB</Link>
    <hr className="divider"/>
    </div>;   
};

export default Header;  
