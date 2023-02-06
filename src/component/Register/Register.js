import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import React, { useContext, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faStarOfLife, faXmark } from '@fortawesome/free-solid-svg-icons';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import styles from './Register.module.scss';
import { AppContext } from '../../context/appContext';
import { phoneRegExp } from '../../utils/common';
import { selectIsAuthenticated, signUp } from '../Login/loginSlice';

const cx = classNames.bind(styles);

function Register() {
    const { isSignUpForm, setIsSignUpForm, setIsLoginForm } = useContext(AppContext);
    let isAuthenticated = useSelector(selectIsAuthenticated);

    const dispatch = useDispatch();

    // valid
    const yupSchema = yup.object().shape({
        firstName: yup.string().required('First Name is a required field'),
        lastName: yup.string().required('Last Name is a required field'),
        email: yup.string().required('Email is a required field'),
        password: yup
            .string()
            .required('Password is a required field')
            .min(6, 'Password must be at least 6 characters'),
        confirmPassword: yup
            .string()
            .required('Confirm Password is a required field')
            .oneOf([yup.ref('password'), null], 'Passwords must match'),
        phoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
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

    // handle close form
    const handleClose = () => setIsSignUpForm(false);
    const handleBackToLogIn = () => {
        setIsSignUpForm(false);
        setIsLoginForm(true);
    };

    const handleSignIn = async (data) => {
        console.log('registerUser', data);
        dispatch(signUp(data));
        reset(data);
    };
    useEffect(() => {
        if (isAuthenticated) setIsSignUpForm(false);
    }, [isAuthenticated]);
    return (
        isSignUpForm && (
            <div className={cx('wrapper_overlay')}>
                <div className={cx('wrapper')}>
                    <span className={cx('btn-close-ctm')} onClick={handleClose}>
                        <FontAwesomeIcon icon={faXmark} className={cx('icon-close')} />
                    </span>
                    <div className="container">
                        <div className="row">
                            <div className={cx('modal_header')}>
                                <h2>Sign Up</h2>
                            </div>
                            <div className={cx('modal_content')}>
                                <form className={cx('row g-3')} onSubmit={handleSubmit(handleSignIn)}>
                                    <div className={cx('col-md-6 col-sm-12')}>
                                        <label htmlFor="firstName" className={cx('form-label')}>
                                            first Name
                                            <FontAwesomeIcon icon={faStarOfLife} className={cx('icon-start')} />
                                        </label>
                                        <input
                                            className={cx('form-control', 'login_input')}
                                            placeholder="Portgas "
                                            name="firstName"
                                            id="firstName"
                                            {...register('firstName')}
                                        />
                                        <small className={cx('text-danger', 'error-danger')}>
                                            {errors?.firstName && errors.firstName.message}
                                        </small>
                                    </div>
                                    <div className={cx('col-md-6 col-sm-12')}>
                                        <label htmlFor="lastName" className={cx('form-label')}>
                                            Last Name
                                            <FontAwesomeIcon icon={faStarOfLife} className={cx('icon-start')} />
                                        </label>
                                        <input
                                            className={cx('form-control', 'login_input')}
                                            placeholder="D.Ace"
                                            name="lastName"
                                            id="lastName"
                                            {...register('lastName')}
                                        />
                                        <small className={cx('text-danger', 'error-danger')}>
                                            {errors?.lastName && errors.lastName.message}
                                        </small>
                                    </div>

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

                                            // {...register('email', registerOptions.email)}
                                        />
                                        <small className={cx('text-danger', 'error-danger')}>
                                            {errors?.password && errors.password.message}
                                        </small>
                                    </div>
                                    <div className={cx('col-md-12')}>
                                        <label htmlFor="confirmPassword" className={cx('form-label')}>
                                            confirm password
                                            <FontAwesomeIcon icon={faStarOfLife} className={cx('icon-start')} />
                                        </label>
                                        <input
                                            type="password"
                                            className={cx('form-control', 'login_input')}
                                            placeholder="******"
                                            // name="confirmPassword"
                                            id="confirmPassword"
                                            {...register('confirmPassword')}
                                        />
                                        <small className={cx('text-danger', 'error-danger')}>
                                            {errors?.confirmPassword && errors.confirmPassword.message}
                                        </small>
                                    </div>
                                    <div className={cx('col-md-12')}>
                                        <label htmlFor="phoneNumber" className={cx('form-label')}>
                                            Phone Number
                                            <FontAwesomeIcon icon={faStarOfLife} className={cx('icon-start')} />
                                        </label>
                                        <input
                                            type="phone"
                                            className={cx('form-control', 'login_input')}
                                            placeholder="+84...."
                                            name="phoneNumber"
                                            id="phoneNumber"
                                            {...register('phoneNumber')}
                                        />
                                        <small className={cx('text-danger', 'error-danger')}>
                                            {errors?.phoneNumber && errors.phoneNumber.message}
                                        </small>
                                    </div>
                                    <div className={cx('col-12')}>
                                        <button type="submit" className={cx('btn-info')}>
                                            Sign up
                                        </button>
                                    </div>
                                    <div className={cx('col-12')}>
                                        <a onClick={handleBackToLogIn} className={cx('back-to-login')}>
                                            <FontAwesomeIcon icon={faArrowLeft} className={cx('icon-back')} />
                                            Back to Login
                                        </a>
                                    </div>
                                </form>
                            </div>
                            <div className={cx('modal-footer')}></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}
export default Register;
