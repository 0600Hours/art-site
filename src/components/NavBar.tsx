import { Link } from "react-router-dom";


interface NavBarProps {
    selected: string;
}

export default function NavBar(props: NavBarProps) {
    return (
        <ul id="nav-bar">
            <li>
                <Link to='/'>
                    <div className={props.selected === 'Portfolio' ? 'nav-item selected': 'nav-item'}>
                        Portfolio
                    </div>
                </Link>
            </li>
            <li>
                <a href='https://www.saltmalk.in/'>
                    <div className='nav-item'>
                        Shop
                    </div>
                </a>
            </li>
            <li>
                <a href='https://www.patreon.com/saltmalkin'>
                    <div className='nav-item'>
                        Patreon
                    </div>
                </a>
            </li>
            <li>
                <Link to='/contact'>
                    <div className={props.selected === 'Contact Info' ? 'nav-item selected': 'nav-item'}>
                        Contact Info
                    </div>
                </Link>
            </li>
        </ul>
    )
}