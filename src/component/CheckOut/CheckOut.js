import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown, faLocationDot, faMoneyBill, faXmark, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { formatMoney, localStorageAccess } from '../../utils/common';
import { selectIsAuthenticated, selectUser } from '../Login/loginSlice';
import { exeOrder } from '../../services/orderService';
import classNames from 'classnames/bind';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './CheckOut.module.scss';

import {
    selectCart,
    selectCartCount,
    removeItemById,
    updateCarts,
    selectDiscount,
    getDiscount,
    removeCart,
} from '../Cart/CartSlice';
import { selectShippingInfo, removeShipping } from '../CheckOutShipping/CheckOutShippingSlice';

const cx = classNames.bind(styles);

function CheckOut() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    let productsState = useSelector(selectCart);
    let totalItems = useSelector(selectCartCount);
    let shippingInfo = useSelector(selectShippingInfo);
    let discount = useSelector(selectDiscount);
    let isAuthenticated = useSelector(selectIsAuthenticated);
    let userInfo = useSelector(selectUser);

    const [products, setProducts] = useState(productsState);
    const [coupon, setCoupon] = useState(0);
    const [shippingPrice, setShippingPrice] = useState(0);

    let totalPrice = products.reduce((total, item) => total + item.product.price * item.quantity, 0);

    const notifyError = (message) =>
        toast.error(message, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
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

    const handleUpdateAddress = () => {
        navigate('/check-out-shipping');
    };

    const handleCheckCoupon = () => {
        dispatch(getDiscount(coupon));
    };

    const handleSubmit = async () => {
        try {
            const res = await exeOrder({
                orders: products,
                shippingInfo: shippingInfo,
                userId: userInfo?.id,
                discount: discount,
            });
            if (res.status === 200) {
                dispatch(removeCart());
                dispatch(removeShipping());

                localStorageAccess().removeItems('cart');
                localStorageAccess().removeItems('shippingInfo');

                notifySuccess('bạn đã đặt hàng thành công');
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            }
        } catch (err) {
            //
            console.log(err);
            navigate('/file-not-found');
        }
    };
    return (
        <div className={cx('container')}>
            <ToastContainer />
            <div className={cx('cart-wrapper')}>
                <div className={cx('payment__process')}>
                    <div className={cx('back-to-cart')}>
                        <Link to="/cart">
                            {' '}
                            <FontAwesomeIcon icon={faArrowLeft} className={cx('arrow-left-icon')} /> quay lai giỏ hàng
                        </Link>
                    </div>
                    <div className={cx('process__status')}>
                        <ul>
                            <li>
                                <span className={cx('active')}>đăng nhập</span>
                            </li>
                            <li>
                                <span className={cx('active')}>địa chỉ giao hàng</span>
                            </li>
                            <li>
                                <span className={cx('active')}>thanh toán</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={cx('address__shipping')}>
                    <div className={cx('address__info')}>
                        <h1>
                            <FontAwesomeIcon icon={faLocationDot} className={cx('icon-item')} />
                            Địa chỉ nhận hàng
                        </h1>
                        <p>
                            {Object.keys(shippingInfo).length <= 0 && isAuthenticated
                                ? `${userInfo?.address}`
                                : `${shippingInfo?.address}, ${shippingInfo?.district}, ${shippingInfo?.province}`}
                        </p>
                        <p>
                            {Object.keys(shippingInfo).length <= 0 && isAuthenticated
                                ? userInfo.phoneNumber
                                : shippingInfo.phoneNumber}
                        </p>
                    </div>
                    <div className={cx('div-update__button')}>
                        <button className={cx('btn-inline')} onClick={handleUpdateAddress}>
                            Change Address
                        </button>
                    </div>
                </div>
                <div className={cx('check-out__area')}>
                    <div className={cx('delivery')}>
                        <div className={cx('payment')}>
                            <h1>
                                <FontAwesomeIcon icon={faMoneyBill} className={cx('icon-item')} />
                                Thanh toán
                            </h1>
                            <div>
                                <h2>Phương thức vận chuyển</h2>
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="shippingMethod"
                                    id="shipping-method"
                                    checked
                                    readOnly
                                />
                                <label className="form-check-label" htmlFor="shipping-method">
                                    giao hàng tiết kiệm
                                    <span> {totalPrice !== 0 ? formatMoney(shippingPrice) : formatMoney(0)}</span>
                                </label>
                            </div>
                            <div>
                                <h2>Phương thức thanh toán</h2>
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="paymentMethod"
                                    id="payment-method"
                                    checked
                                    readOnly
                                />
                                <label className="form-check-label" htmlFor="payment-method">
                                    thanh toán khi nhận hàng
                                </label>
                            </div>
                            <div>
                                <textarea
                                    className="form-control"
                                    placeholder="Leave a comment here"
                                    id="floatingTextarea"
                                    name="paymentComment"
                                ></textarea>
                            </div>
                        </div>
                    </div>
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
                                            </li>
                                            <li>
                                                <span>Số lương : {item.quantity}</span>
                                            </li>
                                            <li>{formatMoney(item.quantity * item.product.price)} </li>
                                        </ul>
                                    </div>
                                </div>
                            );
                        })}

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
                            />{' '}
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
                                        <span>{formatMoney(totalPrice)}</span>
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
                                        <span> {totalPrice !== 0 ? formatMoney(shippingPrice) : formatMoney(0)}</span>
                                    </div>
                                </li>
                            </ul>
                            <p className={cx('cross_line')}></p>

                            <div className={cx('total__price')}>
                                <span> Tổng số</span>
                                <h1>{formatMoney(totalPrice * (1 - discount))}</h1>
                            </div>
                        </div>
                        <div className={cx('div-checkOut__button')}>
                            <button className={cx('btn-inline')} onClick={handleSubmit}>
                                Thanh Toán
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckOut;
