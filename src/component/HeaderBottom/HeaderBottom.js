import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import styles from './HeaderBottom.module.scss';
import api from '../../httpHelper/api';
import { backEndPoint } from '../../utils/common';
import { menuStructure } from '../../utils/constant';

const cx = classNames.bind(styles);
function MainMenu() {
    const getMenu = async () => {
        try {
            const res = api.get(backEndPoint.getCategoryForMenu);
        } catch (error) {}
    };

    console.log(menuStructure[0].name);
    return (
        <div className={cx('header_top')}>
            <div className="container">
                <div className={cx('row')}>
                    <div className={cx('main_menu')}>
                        <nav>
                            <ul className={cx('main_menu_ul')}>
                                <li>
                                    <Link to="/">TRANG CHỦ</Link>
                                </li>
                                <li className={cx('mega_item')}>
                                    <Link href="shop.html">
                                        MUA SẮM
                                        <FontAwesomeIcon icon={faAngleDown} className={cx('main_menu_arrow_down')} />
                                    </Link>
                                    <div className={cx('mega_menu')}>
                                        <ul className={cx('mega_menu_inner')}>
                                            <li>
                                                <Link
                                                    to={`/product/${menuStructure[0].id}`}
                                                    className={cx('mega_menu_product_type')}
                                                >
                                                    {menuStructure[0].name}
                                                </Link>
                                                <ul>
                                                    <li>
                                                        <Link to={`/product/${menuStructure[1].id}`}>
                                                            {menuStructure[1].name}
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to={`/product/${menuStructure[2].id}`}>
                                                            {menuStructure[2].name}
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <Link
                                                    to={`/product/${menuStructure[3].id}`}
                                                    className={cx('mega_menu_product_type')}
                                                >
                                                    {menuStructure[3].name}
                                                </Link>
                                                <ul>
                                                    <li>
                                                        <Link to={`/product/${menuStructure[4].id}`}>
                                                            {menuStructure[4].name}
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        {' '}
                                                        <Link to={`/product/${menuStructure[5].id}`}>
                                                            {menuStructure[5].name}
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        {' '}
                                                        <Link to={`/product/${menuStructure[6].id}`}>
                                                            {menuStructure[6].name}
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                                <li>
                                    <Link href="about.html"> THÔNG TIN CỬA HÀNG</Link>
                                </li>

                                <li>
                                    <Link href="about.html"> blog</Link>
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
