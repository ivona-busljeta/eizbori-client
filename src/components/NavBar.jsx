import {NavLink} from "react-router-dom";

export const NavBar = () => {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark d-flex">
            <a className="navbar-brand mx-2" href="/">
                <strong className="mx-2">eIzbori</strong>
            </a>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink to="/izbori" className="nav-link">Izbori</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/registar" className="nav-link">Registar birača</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};