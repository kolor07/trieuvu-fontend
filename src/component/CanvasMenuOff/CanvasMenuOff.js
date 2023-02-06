import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './CanvasMenuOff.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { showCanvasMenu, selectIsDisplayed } from '../HeaderMiddle/HeaderMiddleSlice';
import { menuStructure, phanBon, thuocBaoVeThucVat } from '../../utils/constant';
import Accordion from '../Accordion';
import { useState } from 'react';

const cx = classNames.bind(styles);

function CanvasMenuOff() {
    let isDisplay = useSelector(selectIsDisplayed);
    const [isActive, setIsActive] = useState(false);
    const dispatch = useDispatch();
    const handleCloseCanvasMenu = () => {
        dispatch(showCanvasMenu(false));
        isDisplay = false;
    };
    return (
        <>
            <div
                className={cx('off_canvars_overlay', isDisplay ? 'displayNoneAnimation' : 'noneDisplayNoneAnimation')}
            ></div>
            <div className={cx('offcanvas_menu', isDisplay ? 'display' : 'noneDisplay')}>
                <div className="container">
                    <div className={cx('row')}>
                        <div className={cx('col-12')}>
                            <div className={cx('offcanvas_menu_wrapper')}>
                                <div className={cx('canvas_close')}>
                                    <FontAwesomeIcon icon={faXmark} onClick={handleCloseCanvasMenu} />
                                </div>

                                <div className={cx('header_search_box')}>
                                    <input type="text" placeholder="search" className={cx('search')} />
                                    <button>
                                        <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('search-icon')} />
                                    </button>
                                </div>
                                <div className={cx('main_menu')}>
                                    <Accordion />
                                    {/* <nav>
                                        <ul>
                                            <li>
                                                <li>
                                                    <Link to="/">HOME</Link>
                                                </li>
                                            </li>
                                            <li className={cx('mega_items')}>
                                                <Link href="shop.html">
                                                    SHOP
                                                    <FontAwesomeIcon
                                                        icon={faAngleDown}
                                                        className={cx('main_menu_arrow_down')}
                                                    />
                                                </Link>

                                                <div className={cx('sub_menu_wrapper')}>
                                                    <ul className={cx('sub_menu')}>
                                                        <li>
                                                            <Link
                                                                to={`/product/${menuStructure[0].id}`}
                                                                className={cx('mega_menu_product_type')}
                                                            >
                                                                {menuStructure[0].name}
                                                            </Link>
                                                            <ul className={cx('sub_menu')}>
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
                                                            <ul className={cx('sub_menu')}>
                                                                <li>
                                                                    <Link to={`/product/${menuStructure[4].id}`}>
                                                                        {menuStructure[4].name}
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link to={`/product/${menuStructure[5].id}`}>
                                                                        {menuStructure[5].name}
                                                                    </Link>
                                                                </li>
                                                                <li>
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
                                                <a href="/"> About us</a>
                                            </li>

                                            <li>
                                                <a href="/"> advisory</a>
                                            </li>
                                            <li>
                                                <a href="/"> blog</a>
                                            </li>
                                        </ul>
                                    </nav> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CanvasMenuOff;
