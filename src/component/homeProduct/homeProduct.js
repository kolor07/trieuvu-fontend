import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faStar } from '@fortawesome/free-solid-svg-icons';

import styles from './homeProduct.module.scss';
import { getNewArrival, selectProducts } from './homeProductSlice';
import { tabType, routeExtra, formatMoney } from '../../utils/common';
import { addOrUpdateCart } from '../Cart/CartSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

function HomeProduct() {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentTab, setCurrentTab] = useState(tabType.newArrival);

    let products = useSelector(selectProducts);
    const dispatch = useDispatch();

    const notifySuccess = (message) =>
        toast.success(message, {
            position: 'top-right',
            autoClose: 900,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });

    useEffect(() => {
        dispatch(getNewArrival({ type: currentTab, page: currentPage }));
    }, [currentPage, currentTab]);

    const handleNewArrival = () => {
        setCurrentTab(tabType.newArrival);
    };
    const handleBestSale = () => {
        setCurrentTab(tabType.bestSale);
    };
    const handleBestVote = () => {
        setCurrentTab(tabType.bestVote);
    };

    const handleAddToCart = (product) => {
        dispatch(addOrUpdateCart({ product: product, quantity: 1 }));
        notifySuccess(`thêm ${product.name} thành công`);
    };
    return (
        <div className={cx('row')}>
            <ToastContainer />
            <div className={cx('col-12')}>
                <div className={cx('product_tab_btn')}>
                    <ul className={cx('nav')}>
                        <li onClick={handleNewArrival}>
                            <span className={cx(currentTab === tabType.newArrival ? 'active' : null)}>HÀNG MỚI VỀ</span>
                        </li>
                        <li onClick={handleBestSale}>
                            <span className={cx(currentTab === tabType.bestSale ? 'active' : null)}>BÁN CHẠY</span>
                        </li>
                        <li onClick={handleBestVote}>
                            <span className={cx(currentTab === tabType.bestVote ? 'active' : null)}>YÊU THÍCH</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={cx('home_product_carousel')}>
                {products.map((item) => {
                    return (
                        <article className={cx('product_single_item')} key={item.id}>
                            <figure>
                                <div className={cx('product_thumb')}>
                                    <Link to={routeExtra.productDetail + item.id} className={cx('primary_image')}>
                                        <img src={item.imageLink} alt={item.name} />
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
                                                    <FontAwesomeIcon icon={faStar} className={cx('search-icon')} />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <FontAwesomeIcon icon={faStar} className={cx('search-icon')} />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <FontAwesomeIcon icon={faStar} className={cx('search-icon')} />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <FontAwesomeIcon icon={faStar} className={cx('search-icon')} />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <FontAwesomeIcon icon={faStar} className={cx('search-icon')} />
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
                                            {formatMoney(item.price)}
                                        </span>
                                        {item.discount !== 0 && (
                                            <span className={cx('current_price')}>
                                                {formatMoney(item.price - (item.price * item.discount) / 100)}
                                            </span>
                                        )}
                                    </div>
                                    <div className={cx('add_to_cart')}>
                                        <span onClick={() => handleAddToCart(item)}>
                                            <FontAwesomeIcon icon={faCartShopping} aria-hidden="true" /> Add to cart
                                        </span>
                                    </div>
                                </figcaption>
                            </figure>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}

export default HomeProduct;
