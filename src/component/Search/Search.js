import { useNavigate } from 'react-router-dom';

import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faStar, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';

import styles from './Search.module.scss';
import { useScroll } from '../../utils/scroll';
import { routeExtra } from '../../utils/common';
import { addOrUpdateCart } from '../Cart/CartSlice';

import { selectSearchResults, selectKeySearch, selectTotalItems } from './SearchSlice';

import Pagination from '../Pagination';
import GoTopButton from '../GoTopButton';
const cx = classNames.bind(styles);

function Search() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const products = useSelector(selectSearchResults);
    const keySearch = useSelector(selectKeySearch);
    let totalItems = useSelector(selectTotalItems);

    const [currentPage, setCurrentPage] = useState(1);
    let productPerPage = 16;

    const scrollPosition = useScroll();

    useEffect(() => {}, []);

    const handleAddToCart = (product) => {
        dispatch(addOrUpdateCart({ product: product, quantity: 1 }));
    };

    return (
        <div className="container">
            <div className={cx('row')}>
                <div className={cx('col-12')}>
                    <ul className={cx('Header_nav')}>
                        <li
                            onClick={() => {
                                navigate('/');
                            }}
                        >
                            Home
                            <FontAwesomeIcon icon={faAngleRight} className={cx('Header_nav_icon')} />
                        </li>
                        <li> {keySearch}</li>
                    </ul>
                </div>
                <div className={cx('col-12')}>
                    <div className={cx('home_product_carousel')}>
                        {products.length > 0 ? (
                            products.map((item) => {
                                return (
                                    <article className={cx('product_single_item')} key={item.id}>
                                        <figure>
                                            <div className={cx('product_thumb')}>
                                                <Link
                                                    to={routeExtra.productDetail + item.id}
                                                    className={cx('primary_image')}
                                                >
                                                    <img src={item.imageLink} alt="" />
                                                </Link>
                                                {item.discount !== 0 && (
                                                    <div className={cx('label_product')}>
                                                        <span className={cx('label_sale')}>Sale</span>
                                                    </div>
                                                )}
                                            </div>
                                            <figcaption className={cx('product_content')}>
                                                <h4 className={cx('product_name')}>
                                                    <a href="product-details.html">{item.name}</a>
                                                </h4>
                                                <div className={cx('product_rating')}>
                                                    <ul>
                                                        <li>
                                                            <a href="#">
                                                                <FontAwesomeIcon
                                                                    icon={faStar}
                                                                    className={cx('search-icon')}
                                                                />
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <FontAwesomeIcon
                                                                    icon={faStar}
                                                                    className={cx('search-icon')}
                                                                />
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <FontAwesomeIcon
                                                                    icon={faStar}
                                                                    className={cx('search-icon')}
                                                                />
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <FontAwesomeIcon
                                                                    icon={faStar}
                                                                    className={cx('search-icon')}
                                                                />
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <FontAwesomeIcon
                                                                    icon={faStar}
                                                                    className={cx('search-icon')}
                                                                />
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className={cx('price_box')}>
                                                    <span
                                                        className={cx(
                                                            'old_price',
                                                            item.discount === 0 ? 'old_price-noDiscount' : null,
                                                        )}
                                                    >
                                                        ${item.price}
                                                    </span>
                                                    {item.discount !== 0 && (
                                                        <span className={cx('current_price')}>
                                                            ${(item.price * item.discount) / 100}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className={cx('add_to_cart')}>
                                                    <span onClick={() => handleAddToCart(item)}>
                                                        <FontAwesomeIcon icon={faCartShopping} aria-hidden="true" /> Add
                                                        to cart
                                                    </span>
                                                </div>
                                            </figcaption>
                                        </figure>
                                    </article>
                                );
                            })
                        ) : (
                            <h1>nothing was found</h1>
                        )}
                    </div>
                </div>
                <div className={cx('col-12 d-flex justify-content-center')}>
                    <div className={cx('pagination-wrapper')}>
                        {products.length > 0 && (
                            <Pagination
                                itemsCount={totalItems}
                                itemsPerPage={productPerPage}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                alwaysShown={false}
                            />
                        )}
                        <GoTopButton visible={scrollPosition > 400} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;
