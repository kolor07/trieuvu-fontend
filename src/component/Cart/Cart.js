import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown, faXmark } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import styles from './Cart.module.scss';

import { selectCart, selectCartCount, removeItemById, updateCarts, getDiscount, selectDiscount } from './CartSlice';
import { formatMoney } from '../../utils/common';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

function Cart() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    let productsState = useSelector(selectCart);
    let totalItems = useSelector(selectCartCount);
    let discount = useSelector(selectDiscount);

    const [products, setProducts] = useState(productsState);
    const [coupon, setCoupon] = useState(0);
    const [isShowToast, setIsShowToast] = useState(false);
    const [shippingPrice, setShippingPrice] = useState(0);

    let totalPrice = products.reduce((total, item) => total + item.product.price * item.quantity, 0);

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
        setProducts(productsState);

        if (totalPrice < 500000) {
            setShippingPrice(50000);
        }
    }, [productsState]);

    const handleDeleteItem = (id) => {
        dispatch(removeItemById(+id));
    };

    const handleUpdateCart = () => {
        dispatch(updateCarts(products));
        notifySuccess('update giỏ hàng thành công');
    };

    const handleCheckCoupon = () => {
        dispatch(getDiscount(coupon));
    };

    const handleDecreaseQuantity = (quantity, id) => {
        const cloneProducts = [...products];
        const index = cloneProducts.findIndex((item) => item.product.id === id);
        cloneProducts[index] = { ...cloneProducts[index], quantity: +quantity > 1 ? +quantity - 1 : +quantity };
        setProducts(cloneProducts);
    };

    const handleIncreaseQuantity = (quantity, id) => {
        const cloneProducts = [...products];
        const index = cloneProducts.findIndex((item) => item.product.id === id);
        cloneProducts[index] = { ...cloneProducts[index], quantity: +quantity + 1 };
        setProducts(cloneProducts);
    };

    const handlePayment = () => {
        navigate('/check-out-login');
    };

    return (
        <div className={cx('container')}>
            <ToastContainer />

            <div className={cx('cart-wrapper')}>
                {products.length === 0 ? (
                    <div className={cx('cart-noItems')}>
                        <h1>
                            <FontAwesomeIcon icon={faCartArrowDown} className={cx('icon-item')} />
                            Giỏ hàng
                        </h1>

                        <div>
                            <p>Bạn không có sản phẩm nào trong giỏ hàng của bạn.</p>
                            <p>
                                Bấm vào{' '}
                                {
                                    <Link to="/">
                                        <strong>đây</strong>
                                    </Link>
                                }{' '}
                                để tiếp tục mua sắm.
                            </p>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className={cx('cart_area')}>
                            <div className={cx('header-cart')}>
                                <h1>
                                    <FontAwesomeIcon icon={faCartArrowDown} className={cx('icon-item')} />
                                    Giỏ hàng
                                </h1>
                            </div>
                            <div className={cx('header-quantity')}>
                                <span> {totalItems} Sản Phẩm </span>
                            </div>
                            {products.map((item, index) => {
                                return (
                                    <div className={cx('cart-items')} key={index}>
                                        <div className={cx('cart-img')}>
                                            <img src={item.product.imageLink} alt={item.product.name} />
                                        </div>
                                        <div className={cx('cart-detail')}>
                                            <ul>
                                                <li>
                                                    <Link to="">{item.product.name}</Link>
                                                    <span
                                                        className={cx('btn-close-ctm')}
                                                        onClick={() => handleDeleteItem(item.product.id)}
                                                    >
                                                        <FontAwesomeIcon icon={faXmark} className={cx('icon-close')} />
                                                    </span>
                                                </li>
                                                <li>
                                                    <div className={cx('input-price')}>
                                                        <button
                                                            onClick={() => {
                                                                handleDecreaseQuantity(item.quantity, item.product.id);
                                                            }}
                                                        >
                                                            -
                                                        </button>
                                                        <input
                                                            className={cx('input-sm')}
                                                            value={item.quantity}
                                                            readOnly
                                                        />
                                                        <button
                                                            onClick={() => {
                                                                handleIncreaseQuantity(item.quantity, item.product.id);
                                                            }}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </li>
                                                <li>{formatMoney(item.quantity * item.product.price)} </li>
                                            </ul>
                                        </div>
                                    </div>
                                );
                            })}

                            <div className={cx('div-update__button')}>
                                <button className={cx('btn-inline')} onClick={handleUpdateCart}>
                                    Update Cart
                                </button>
                            </div>
                        </div>

                        <div className={cx('cart_total')}>
                            <div className={cx('coupon')}>
                                <h1> Nhập mã Coupon </h1>
                                <p> chỉ sử dụng 1 mã cho 1 đơn hàng</p>
                                <input
                                    type="text"
                                    placeholder="chỉ sử dụng 1 mã"
                                    value={coupon === 0 ? '' : coupon}
                                    onChange={(e) => {
                                        setCoupon(e.target.value);
                                    }}
                                />
                                <button onClick={handleCheckCoupon}> Áp Dụng</button>
                            </div>
                            <div className={cx('prepare__bill')}>
                                <h1> tạm tính </h1>
                                <ul>
                                    <li>
                                        <div>
                                            <span> Số lượng</span>
                                            <span>
                                                {products.reduce((total, item) => {
                                                    return total + +item.quantity;
                                                }, 0)}
                                            </span>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <span> Tạm tính</span>
                                            <span>
                                                <strong>{formatMoney(totalPrice)}</strong>
                                            </span>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <span> giảm giá</span>
                                            <span>{formatMoney(discount * totalPrice)}</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <span> Phí vận chuyển</span>
                                            <span>
                                                {' '}
                                                {totalPrice !== 0 ? formatMoney(shippingPrice) : formatMoney(0)}
                                            </span>
                                        </div>
                                    </li>
                                </ul>

                                <div className={cx('total__price')}>
                                    <span> Tổng số</span>
                                    <h1>{formatMoney(totalPrice * (1 - discount))}</h1>
                                </div>
                            </div>
                            <div className={cx('col-lg-12 col-md-12 col-sm-12', 'div-checkOut__button')}>
                                <button className={cx('btn-inline')} onClick={handlePayment}>
                                    {' '}
                                    Thanh Toán{' '}
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Cart;
