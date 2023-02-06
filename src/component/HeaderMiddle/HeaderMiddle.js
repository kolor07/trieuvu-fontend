import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCartShopping, faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import styles from './HeaderMiddle.module.scss';

import CanvasMenuOff from '../CanvasMenuOff';
import { showCanvasMenu, selectIsDisplayed } from './HeaderMiddleSlice';
import { selectCartCount } from '../../component/Cart/CartSlice';
import * as searchService from '../../services/searchService';
import { setSearchResults } from '../Search/SearchSlice';

import logo from '../../../src/assets/images/logo1.png';

const cx = classNames.bind(styles);

function HeaderMiddle() {
    const [isShowCanvasMenu, setShowCanvasMenu] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const searchValueRef = useRef();
    const cartCount = useSelector(selectCartCount);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShowCanvasMenu = () => {
        setShowCanvasMenu(true);
        dispatch(showCanvasMenu(true));
    };
    const handleSearch = async (e) => {
        e.preventDefault();
        console.log('ref value ', searchValueRef);
        if (searchValue === '') {
            searchValueRef.current.focus();
        } else {
            try {
                const res = await searchService.search(searchValue, 1);
                console.log('resSearch...', res);
                dispatch(
                    setSearchResults({
                        keySearch: searchValue,
                        searchData: res.data?.rows,
                        totalItem: res.data?.count,
                    }),
                );
                const currentUrl = window.location.href;
                console.log(currentUrl);
                if (!currentUrl.includes('/search/')) {
                    navigate(`/search`);
                }
            } catch (error) {
                navigate(`/file-not-found`);
            }
        }
    };

    return (
        <>
            <CanvasMenuOff />
            <div className="container">
                <div className={cx('header_middle')}>
                    {/* <div className={cx('row align-item-center')}> */}
                    <div className={cx('col_canvas_menu')}>
                        <div className={cx('canvas_menu-open')}>
                            <FontAwesomeIcon icon={faBars} onClick={handleShowCanvasMenu} />
                        </div>
                    </div>
                    <div className={cx('home-logo')}>
                        <div className={cx('header_logo')}>
                            <img src={logo} alt="logo"></img>
                        </div>
                    </div>
                    <div className={cx('col_search_area')}>
                        <div className={cx('header_search_box')}>
                            <input
                                value={searchValue}
                                ref={searchValueRef}
                                type="text"
                                placeholder="Tìm kiếm"
                                className={cx('search')}
                                onChange={(e) => {
                                    setSearchValue(e.target.value);
                                }}
                            />
                            <button>
                                <FontAwesomeIcon
                                    icon={faMagnifyingGlass}
                                    className={cx('search-icon')}
                                    onClick={handleSearch}
                                />
                            </button>
                        </div>
                    </div>
                    <div className={cx('mini_cart_wrapper')}>
                        <Link to="/cart">
                            <FontAwesomeIcon icon={faCartShopping} className={cx('cart_icon')} beat />
                            <span className={cx('cart-text')}> GIỎ HÀNG</span>
                            <span className={cx('cart_items-count')}> {cartCount}</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HeaderMiddle;
