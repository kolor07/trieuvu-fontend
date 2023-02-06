import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import React, { useContext, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faStarOfLife, faXmark } from '@fortawesome/free-solid-svg-icons';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import styles from './Login.module.scss';
import { AppContext } from '../../context/appContext';
import { signIn, selectLoading, selectIsAuthenticated, selectMessage } from './loginSlice';
const cx = classNames.bind(styles);

function LogIn() {
    const { isLoginForm, setIsLoginForm } = useContext(AppContext);
    let isLoading = useSelector(selectLoading);
    let isAuthenticated = useSelector(selectIsAuthenticated);
    let errorMessage = useSelector(selectMessage);
    const dispatch = useDispatch();

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
        if (isAuthenticated) setIsLoginForm(false);
    }, [isAuthenticated]);

    // handle close form
    const handleClose = () => setIsLoginForm(false);

    const handleLogin = async (data) => {
        dispatch(signIn(data));

        if (isAuthenticated) {
            setIsLoginForm(false);
            //
        } else {
            reset(data);
            alert(errorMessage);
        }
    };

    return (
        isLoginForm && (
            <div className={cx('wrapper_overlay')}>
                <div className={cx('wrapper')}>
                    <span className={cx('btn-close-ctm')} onClick={handleClose}>
                        <FontAwesomeIcon icon={faXmark} className={cx('icon-close')} />
                    </span>
                    <div className="container">
                        <div className="row">
                            <div className={cx('modal_header')}>
                                <h2>Sign In</h2>
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
                                        <button type="submit" className={cx('btn-info')} disabled={isLoading}>
                                            Sign In
                                        </button>
                                    </div>
                                    <div className={cx('col-12')}>
                                        <a onClick={handleClose} className={cx('back-to-login')}>
                                            <FontAwesomeIcon icon={faArrowLeft} className={cx('icon-back')} />
                                            Back to Home
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
export default LogIn;

// import { useDispatch, useSelector } from 'react-redux';
// import classNames from 'classnames/bind';
// import { useForm } from 'react-hook-form';

// import { checkLogin, selectUser, selectLoading, selectAuthenticated, selectMessage } from './loginSlice';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebook, faTwitter, faGoogle } from '@fortawesome/free-brands-svg-icons';

// import styles from './Login.module.scss';

// const cx = classNames.bind(styles);

// function Login() {
//     const dispatch = useDispatch();

//     let isLoading = useSelector(selectLoading);
//     let errorMessage = useSelector(selectMessage);
//     // const currentUser = useSelector(selectUser);
//     // const isAuthenticated = useSelector(selectAuthenticated);

//     const registerOptions = {
//         email: { required: 'email is required', type: 'email' },
//         password: {
//             required: 'password is required',
//             type: 'password',
//             minLength: {
//                 value: 6,
//                 message: 'Password must have at least 6 characters',
//             },
//         },
//     };

//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//     } = useForm({ mode: 'onBlur' });

//     const handleLogin = async (data) => {
//         dispatch(checkLogin({ email: data.email, pwd: data.password }));
//     };

//     return (
//         <div className={cx('wrapper')}>
//             <div className="container d-flex justify-content-center align-items-center">
//                 <div className={cx('login_content')}>
//                     {/* <form className={cx('row g-3')}> */}
//                     <form onSubmit={handleSubmit(handleLogin)} className={cx('row g-3')}>
//                         <div className={cx('col-md-12')}>
//                             <h1>login</h1>
//                         </div>
//                         <div className={cx('col-md-12')}>
//                             <label htmlFor="email" className={cx('form-label')}>
//                                 Email
//                             </label>
//                             <input
//                                 type="email"
//                                 className={cx('form-control', 'login_input')}
//                                 placeholder="email@gmail.com"
//                                 name="email"
//                                 {...register('email', registerOptions.email)}
//                             />
//                             <small className="text-danger">{errors?.email && errors.email.message}</small>
//                         </div>
//                         <div className={cx('col-md-12')}>
//                             <label htmlFor="password" className={cx('form-label')}>
//                                 Password
//                             </label>
//                             <input
//                                 type="password"
//                                 className={cx('form-control', 'login_input')}
//                                 placeholder="*****"
//                                 name="password"
//                                 {...register('password', registerOptions.password)}
//                             />
//                             <small className="text-danger">{errors?.password && errors.password.message}</small>
//                             <a href="/" className={cx('login-forget-pwd')}>
//                                 <span> forget password ?</span>
//                             </a>
//                         </div>
//                         <div className={cx('col-12')}>
//                             {errorMessage && <span className={cx('login-error-massager')}> {errorMessage} </span>}
//                         </div>
//                         <div className={cx('col-12')}>
//                             <button type="submit" className={cx('btn-info')} disabled={isLoading}>
//                                 Sign in
//                             </button>
//                         </div>

//                         <div className={cx('col-12')}>
//                             <span> or sign up using</span>
//                         </div>
//                         <div className={cx('col-12')}>
//                             <div className={cx('login-openId')}>
//                                 <a href="/">
//                                     <FontAwesomeIcon icon={faFacebook} className={cx('facebook', 'icon')} />
//                                 </a>
//                                 <a href="/">
//                                     <FontAwesomeIcon icon={faGoogle} className={cx('google', 'icon')} />
//                                 </a>
//                                 <a href="/">
//                                     <FontAwesomeIcon icon={faTwitter} className={cx('twitter', 'icon')} />
//                                 </a>
//                             </div>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Login;
