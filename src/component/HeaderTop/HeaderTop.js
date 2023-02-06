import { selectIsAuthenticated } from '../Login/loginSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faPhone, faEnvelope, faChevronDown, faUser } from '@fortawesome/free-solid-svg-icons';

import styles from './HeaderTop.module.scss';
import { AppContext } from '../../context/appContext';
import { removeUser } from '../../services/tokenService';
import { signOut } from '../../component/Login/loginSlice';
import { useDispatch } from 'react-redux';

import React, { useState } from 'react';

const cx = classNames.bind(styles);

function HeaderTop() {
    const { setIsSignUpForm, setIsLoginForm } = useContext(AppContext);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleSignUp = () => {
        setIsSignUpForm(true);
    };
    const handleSignIn = () => {
        // alert('sign in');

        setIsLoginForm(true);
    };

    const handleSignOut = () => {
        // setIsToggle(true);
        removeUser();
        dispatch(signOut(false));
        // window.location.reload();
    };

    const handleCheckOut = () => {
        navigate('/cart');
    };

    return (
        <div className={cx('header_top-container')}>
            <div className={cx('header_top')}>
                <div className={cx('header_contact_us')}>
                    <ul>
                        <li>
                            <span>
                                <FontAwesomeIcon icon={faPhone} beat className={cx('phone_icon')} />
                                goi cho chúng tôi:
                            </span>
                            <a href="tel:(+800)123456789"> (+800)123456789</a>
                        </li>

                        <li>
                            <span>
                                <FontAwesomeIcon icon={faEnvelope} beat className={cx('email_icon')} />
                                Email:{' '}
                            </span>{' '}
                            <a href="mailto:http://1.envato.market/9LbxW">
                                <i className="icon-envelope"></i> has@posthemes.com
                            </a>
                        </li>
                    </ul>
                </div>
                <div className={cx('header_account_area')}>
                    <ul>
                        <li onClick={handleCheckOut}>
                            <span>THANH TOÁN</span>
                        </li>
                        {(isAuthenticated && (
                            <>
                                <li>
                                    <span onClick={handleSignOut}>ĐĂNG XUẤT</span>
                                </li>
                                <li>
                                    <span onClick={handleSignOut}>
                                        {' '}
                                        <FontAwesomeIcon icon={faUser} className={cx('phone_icon')} />
                                    </span>
                                </li>
                            </>
                        )) || (
                            <>
                                <li>
                                    <span onClick={handleSignUp}>ĐĂNG KÍ</span>
                                </li>
                                <li>
                                    {/* <Link to="/login"> handleSignIn</Link> */}
                                    {/* <a onClick={handleSignUp}>SIGN UP</a> */}
                                    <span onClick={handleSignIn}>ĐĂNG NHẬP</span>
                                </li>
                            </>
                        )}

                        <li className={cx('language_currency')}>
                            <span href="/">VietNamese</span>
                            <FontAwesomeIcon icon={faChevronDown} className={cx('language_currency_icon')} />
                            <ul className={cx('dropdown_language')}>
                                <li>
                                    <span href="/"> VietNamese</span>
                                </li>
                                <li>
                                    <span href="/"> English</span>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default HeaderTop;
