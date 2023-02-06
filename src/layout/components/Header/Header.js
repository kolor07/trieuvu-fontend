// import MainMenu from '../../../component/MainMenu';
import HeaderTop from '../../../component/HeaderTop';
import HeaderMiddle from '../../../component/HeaderMiddle';
import HeaderBottom from '../../../component/HeaderBottom';
import Register from '../../../component/Register';
import Login from '../../../component/Login';

function Header({ style }) {
    return (
        <div className={style}>
            <Register />
            <Login />
            <HeaderTop />
            <HeaderMiddle />
            <HeaderBottom />
        </div>
    );
}

export default Header;
