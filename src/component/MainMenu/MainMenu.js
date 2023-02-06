import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './MainMenu.module.scss';
const cx = classNames.bind(styles);

function MainMenu() {
    return (
        // <div className={cx('header_bottomzzz')}>

        <div className={cx('header_top')}>
            <div className="container">
                <div className={cx('row')}>
                    <div className={cx('col-lg-10 offset-lg-1')}></div>
                    <div className={cx('main_menu')}>
                        <nav>
                            <ul>
                                <li>
                                    <a href="index.html">HOME</a>
                                </li>
                                <li className={cx('mega_items')}>
                                    <a href="shop.html">
                                        SHOP
                                        <FontAwesomeIcon icon={faAngleDown} className={cx('main_menu_arrow_down')} />
                                    </a>
                                    <div className={cx('mega_menu')}>
                                        <ul className={cx('mega_menu_inner')}>
                                            <li>
                                                <a href="#" className={cx('mega_menu_product_type')}>
                                                    PHAN BON
                                                </a>
                                                <ul>
                                                    <li>
                                                        <a href="shop-fullwidth.html">Full Width</a>
                                                    </li>
                                                    <li>
                                                        <a href="shop-fullwidth-list.html">Full Width list</a>
                                                    </li>
                                                    <li>
                                                        <a href="shop-right-sidebar.html">Right Sidebar </a>
                                                    </li>
                                                    <li>
                                                        <a href="shop-right-sidebar-list.html"> Right Sidebar list</a>
                                                    </li>
                                                    <li>
                                                        <a href="shop-list.html">List View</a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <a href="#" className={cx('mega_menu_product_type')}>
                                                    THUOC TRU SAU
                                                </a>
                                                <ul>
                                                    <li>
                                                        <a href="shop-fullwidth.html">Full Width</a>
                                                    </li>
                                                    <li>
                                                        <a href="shop-fullwidth-list.html">Full Width list</a>
                                                    </li>
                                                    <li>
                                                        <a href="shop-right-sidebar.html">Right Sidebar </a>
                                                    </li>
                                                    <li>
                                                        <a href="shop-right-sidebar-list.html"> Right Sidebar list</a>
                                                    </li>
                                                    <li>
                                                        <a href="shop-list.html">List View</a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <a href="#" className={cx('mega_menu_product_type')}>
                                                    THUOC TRU SAU
                                                </a>
                                                <ul>
                                                    <li>
                                                        <a href="shop-fullwidth.html">Full Width</a>
                                                    </li>
                                                    <li>
                                                        <a href="shop-fullwidth-list.html">Full Width list</a>
                                                    </li>
                                                    <li>
                                                        <a href="shop-right-sidebar.html">Right Sidebar </a>
                                                    </li>
                                                    <li>
                                                        <a href="shop-right-sidebar-list.html"> Right Sidebar list</a>
                                                    </li>
                                                    <li>
                                                        <a href="shop-list.html">List View</a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <a href="#" className={cx('mega_menu_product_type')}>
                                                    THUOC TRU SAU
                                                </a>
                                                <ul>
                                                    <li>
                                                        <a href="shop-fullwidth.html">Full Width</a>
                                                    </li>
                                                    <li>
                                                        <a href="shop-fullwidth-list.html">Full Width list</a>
                                                    </li>
                                                    <li>
                                                        <a href="shop-right-sidebar.html">Right Sidebar </a>
                                                    </li>
                                                    <li>
                                                        <a href="shop-right-sidebar-list.html"> Right Sidebar list</a>
                                                    </li>
                                                    <li>
                                                        <a href="shop-list.html">List View</a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                                <li>
                                    <a href="about.html"> About us</a>
                                </li>

                                <li>
                                    <a href="about.html"> advisory</a>
                                </li>
                                <li>
                                    <a href="about.html"> blog</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainMenu;
