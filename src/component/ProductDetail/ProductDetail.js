import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import { addOrUpdateCart } from '../Cart/CartSlice';
import { formatMoney } from '../../utils/common';

import api from '../../httpHelper/api';
import { backEndPoint } from '../../utils/common';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './ProductDetail.module.scss';

const cx = classNames.bind(styles);

function ProductDetail() {
    const [quantity, SetQuantity] = useState(1);
    const [product, setProduct] = useState({});
    const [categoryName, setCategoryName] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { id } = useParams();

    const notifySuccess = (message) =>
        toast.success(message, {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });

    const initial = () => {
        try {
            api.get(backEndPoint.productDetail + id).then((res) => {
                console.log(res);
                setProduct(res?.data);
                api.get(backEndPoint.categoryById + res.data.categoryId).then((category) => {
                    setCategoryName(category?.data.name);
                });
            });
        } catch (err) {
            navigate('/file-not-found');
        }
    };

    useEffect(() => {
        initial();
    }, []);

    const handleShowCategory = () => {
        navigate('/product');
    };

    console.log('quantity', quantity);
    const handleDecreaseQuantity = () => {
        SetQuantity(quantity < 1 ? 0 : quantity - 1);
    };

    const handleIncreaseQuantity = () => {
        SetQuantity(quantity + 1);
    };
    const handleAddToCart = () => {
        dispatch(addOrUpdateCart({ product: product, quantity: quantity }));
        notifySuccess('Thêm vào giỏ hàng thành công');
    };
    return (
        <div className="container">
            <ToastContainer />

            <nav>
                <ul className={cx('Header_nav')}>
                    <li
                        onClick={() => {
                            navigate('/');
                        }}
                    >
                        <span>Trang chủ</span>
                        <FontAwesomeIcon icon={faAngleRight} className={cx('Header_nav_icon')} />
                    </li>
                    <li>
                        <span>Chi tiết sản phẩm</span>
                    </li>
                </ul>
            </nav>
            <div className={cx('product_wrapper')}>
                <div className={cx('primary_image')}>
                    <img
                        src="https://routine.vn/media/catalog/product/cache/5de180fdba0e830d350bd2803a0413e8/e/c/ecom.18.11_88_1_1.jpg"
                        alt={product.name}
                    />
                    {/* <img src={product.imageLink} alt={product.name} /> */}
                </div>
                <div className={cx('product-detail')}>
                    <h1> {product.name}</h1>
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
                        <span className={cx('old_price', product.discount === 0 ? 'old_price-noDiscount' : null)}>
                            {formatMoney(product.price)}
                        </span>
                        {product.discount !== 0 && (
                            <span className={cx('current_price')}>
                                {' '}
                                - {formatMoney(product.price * (1 - product.discount / 100))}
                            </span>
                        )}
                    </div>
                    <div className={cx('quantity-selected')}>
                        <span>Chọn số lượng : {quantity}</span>
                    </div>
                    <div className={cx('input-price-wrapper')}>
                        <div className={cx('input-price')}>
                            <button
                                onClick={() => {
                                    handleDecreaseQuantity(quantity);
                                }}
                            >
                                -
                            </button>
                            <input
                                className={cx('input-sm')}
                                type="number"
                                min="1"
                                max="100"
                                value={quantity}
                                readOnly
                            />
                            <button
                                onClick={() => {
                                    handleIncreaseQuantity(quantity);
                                }}
                            >
                                +
                            </button>
                        </div>

                        <div>
                            <button className={cx('btn btn-danger', 'btn-lg')} onClick={handleAddToCart}>
                                Thêm vào giỏ hàng
                            </button>
                        </div>
                    </div>
                    <div className={cx('product-category')}>
                        <span> Phân loại : </span>
                        <span className={cx('product-category-name')} onClick={handleShowCategory}>
                            {categoryName}
                        </span>
                    </div>
                    {/* <div className={cx('product-content')}>
                        <p> {product.content}</p>
                        <p> this is content of product</p>
                    </div> */}
                </div>
            </div>
            <div className={cx('')}>
                <div className={cx('related-items')}></div>
            </div>
            <div className={cx('')}>
                <div className={cx('related-upSaleItem')}></div>
            </div>
        </div>
    );
}

export default ProductDetail;
