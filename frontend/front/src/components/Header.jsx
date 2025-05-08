import {Link} from "react-router-dom";

const Header = () => {
    return (
        <header>
            <h1> 쇼핑몰 Header </h1>
            <nav>
                <Link to="/"> 홈 </Link>
            </nav>
        </header>
    );
};

export default Header;
