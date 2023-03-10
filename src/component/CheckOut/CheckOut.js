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

                notifySuccess('b???n ???? ?????t h??ng th??nh c??ng');
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
                            <FontAwesomeIcon icon={faArrowLeft} className={cx('arrow-left-icon')} /> quay lai gi??? h??ng
                        </Link>
                    </div>
                    <div className={cx('process__status')}>
                        <ul>
                            <li>
                                <span className={cx('active')}>????ng nh???p</span>
                            </li>
                            <li>
                                <span className={cx('active')}>?????a ch??? giao h??ng</span>
                            </li>
                            <li>
                                <span className={cx('active')}>thanh to??n</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={cx('address__shipping')}>
                    <div className={cx('address__info')}>
                        <h1>
                            <FontAwesomeIcon icon={faLocationDot} className={cx('icon-item')} />
                            ?????a ch??? nh???n h??ng
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
                                Thanh to??n
                            </h1>
                            <div>
                                <h2>Ph????ng th???c v???n chuy???n</h2>
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="shippingMethod"
                                    id="shipping-method"
                                    checked
                                    readOnly
                                />
                                <label className="form-check-label" htmlFor="shipping-method">
                                    giao h??ng ti???t ki???m
                                    <span> {totalPrice !== 0 ? formatMoney(shippingPrice) : formatMoney(0)}</span>
                                </label>
                            </div>
                            <div>
                                <h2>Ph????ng th???c thanh to??n</h2>
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="paymentMethod"
                                    id="payment-method"
                                    checked
                                    readOnly
                                />
                                <label className="form-check-label" htmlFor="payment-method">
                                    thanh to??n khi nh???n h??ng
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
                                Gi??? h??ng
                            </h1>
                        </div>
                        <div className={cx('header-quantity')}>
                            <span> {totalItems} S???n Ph???m </span>
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
                                                <span>S??? l????ng : {item.quantity}</span>
                                            </li>
                                            <li>{formatMoney(item.quantity * item.product.price)} </li>
                                        </ul>
                                    </div>
                                </div>
                            );
                        })}

                        <div className={cx('coupon')}>
                            <h1> Nh???p m?? Coupon </h1>
                            <p> ch??? s??? d???ng 1 m?? cho 1 ????n h??ng</p>
                            <input
                                type="text"
                                placeholder="ch??? s??? d???ng 1 m??"
                                value={coupon === 0 ? '' : coupon}
                                onChange={(e) => {
                                    setCoupon(e.target.value);
                                }}
                            />{' '}
                            <button onClick={handleCheckCoupon}> ??p D???ng</button>
                        </div>
                        <div className={cx('prepare__bill')}>
                            <h1> t???m t??nh </h1>
                            <ul>
                                <li>
                                    <div>
                                        <span> S??? l?????ng</span>
                                        <span>
                                            {products.reduce((total, item) => {
                                                return total + +item.quantity;
                                            }, 0)}
                                        </span>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <span> T???m t??nh</span>
                                        <span>{formatMoney(totalPrice)}</span>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <span> gi???m gi??</span>
                                        <span>{formatMoney(discount * totalPrice)}</span>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <span> Ph?? v???n chuy???n</span>
                                        <span> {totalPrice !== 0 ? formatMoney(shippingPrice) : formatMoney(0)}</span>
                                    </div>
                                </li>
                            </ul>
                            <p className={cx('cross_line')}></p>

                            <div className={cx('total__price')}>
                                <span> T???ng s???</span>
                                <h1>{formatMoney(totalPrice * (1 - discount))}</h1>
                            </div>
                        </div>
                        <div className={cx('div-checkOut__button')}>
                            <button className={cx('btn-inline')} onClick={handleSubmit}>
                                Thanh To??n
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckOut;
