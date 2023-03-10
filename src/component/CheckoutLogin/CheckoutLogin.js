import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faStarOfLife, faUser } from '@fortawesome/free-solid-svg-icons';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { signIn, selectLoading, selectIsAuthenticated, selectMessage } from '../Login/loginSlice';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './CheckoutLogin.module.scss';

const cx = classNames.bind(styles);

function CheckOutLogin() {
    let isLoading = useSelector(selectLoading);
    let isAuthenticated = useSelector(selectIsAuthenticated);
    let errorMessage = useSelector(selectMessage);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // valid
    const yupSchema = yup.object().shape({
        email: yup.string().required('Email is a required field'),
        password: yup
            .string()
            .required('Password is a required field')
            .min(6, 'Password must be at least 6 characters'),
    });

    // use form
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(yupSchema),
        shouldFocusError: true,
    });

    useEffect(() => {
        if (isAuthenticated) navigate('/check-out');
    }, []);

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

    const handleLogin = async (data) => {
        dispatch(signIn(data)).then(() => {
            if (errorMessage) {
                notifyError(errorMessage);
            } else if (!errorMessage) {
                notifySuccess('login success');

                setTimeout(() => {
                    navigate('/check-out');
                }, 2000);
            }
        });
    };
    const handleRedirectShipping = () => {
        navigate('/check-out-shipping');
    };
    return (
        <div className="container">
            <ToastContainer />
            <div className="row">
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
                                <span>?????a ch??? giao h??ng</span>
                            </li>
                            <li>
                                <span>thanh to??n</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={cx('sign-in__icon', 'modal_header-icon')}>
                    <p></p>
                    <h2>
                        <FontAwesomeIcon icon={faUser} className={cx('sign-in-icon')} />
                        ????ng nh???p
                    </h2>
                </div>
                <div className={cx('col-lg-6 col-md-12 col-sm-12', 'login-area')}>
                    <div className={cx('modal_header')}>
                        <h2>????ng nh???p</h2>
                        <p>????ng nh???p th??nh vi??n Routine</p>
                        <p>????? nh???n nhi???u nh???ng ch????ng tr??nh ??u ????i h???p d???n</p>
                    </div>
                    <div className={cx('modal_content')}>
                        <form className={cx('row g-3')} onSubmit={handleSubmit(handleLogin)}>
                            <div className={cx('col-md-12')}>
                                <label htmlFor="email" className={cx('form-label')}>
                                    Email
                                    <FontAwesomeIcon icon={faStarOfLife} className={cx('icon-start')} />
                                </label>
                                <input
                                    type="email"
                                    className={cx('form-control', 'login_input')}
                                    placeholder="email@gmail.com"
                                    name="email"
                                    id="email"
                                    {...register('email')}
                                />
                                <small className={cx('text-danger', 'error-danger')}>
                                    {errors?.email && errors.email.message}
                                </small>
                            </div>
                            <div className={cx('col-md-12')}>
                                <label htmlFor="password" className={cx('form-label')}>
                                    password
                                    <FontAwesomeIcon icon={faStarOfLife} className={cx('icon-start')} />
                                </label>
                                <input
                                    type="password"
                                    className={cx('form-control', 'login_input')}
                                    placeholder="******"
                                    name="password"
                                    id="password"
                                    {...register('password')}
                                />
                                <small className={cx('text-danger', 'error-danger')}>
                                    {errors?.password && errors.password.message}
                                </small>
                            </div>

                            <div className={cx('col-12')}>
                                <br />
                                <button type="submit" className={cx('btn-inline')} disabled={isLoading}>
                                    ????ng nh???p
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className={cx('modal-footer')}></div>
                </div>

                <div className={cx('col-lg-6 col-md-12 col-sm-12', 'not-login-area')}>
                    <div className={cx('or')}>
                        <span>Ho???c</span>
                    </div>
                    {/* <div className={cx('col-12', 'modal_header')}>
                        <h2>buy everything without login</h2>
                        <p>Ch??o m???ng! B???n kh??ng c???n t???o t??i kho???n</p>
                        <p>????? ?????t h??ng</p>
                    </div> */}
                    <div className={cx('col-12')}>
                        <div className={cx('modal_header')}>
                            <h2>Mua h??ng kh??ng c???n ????ng nh???p</h2>
                            <p>Ch??o m???ng! B???n kh??ng c???n t???o t??i kho???n</p>
                            <p>????? ?????t h??ng</p>
                        </div>
                        <br />

                        <button className={cx('btn-inline')} onClick={handleRedirectShipping}>
                            x??c nh???n mua h??ng kh??ng ????ng nh???p
                        </button>
                    </div>
                </div>

                <div className={cx('border__bottom')}>
                    <p></p>
                </div>
            </div>
        </div>
    );
}

export default CheckOutLogin;
