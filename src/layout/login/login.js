import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';

import styles from './login.module.scss';
import { checkLogin, selectUser, selectLoading, selectAuthenticated, selectMessage } from './loginSlice';

const cx = classNames.bind(styles);

function Login() {
    const [userText, setUserText] = useState('');
    const [passText, setPassText] = useState('');
    const dispatch = useDispatch();

    // Select data from store
    const isLoading = useSelector(selectLoading);
    const errorMessage = useSelector(selectMessage);
    const currentUser = useSelector(selectUser);
    const isAuthenticated = useSelector(selectAuthenticated);

    console.log('user text : ', userText);
    const registerOptions = {
        email: { required: 'email is required', type: 'email' },
        password: {
            required: 'password is required',
            type: 'password',
            minLength: {
                value: 6,
                message: 'Password must have at least 6 characters',
            },
        },
    };

    const {
        register,
        handleSubmit,
        email,
        formState: { errors },
    } = useForm({ mode: 'onBlur' });

    const handleUserChange = (e) => {
        setUserText(e.target.value);
    };
    const handlePassChange = (e) => {
        setPassText(e.target.value);
    };

    const handleLogin = async (data) => {
        dispatch(checkLogin({ email: data.email, pwd: data.password }));
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('content row')}>
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <h1>Log in</h1>
                        <div className={cx('col-12 form-group')}>
                            <label>User Name :</label>
                            <input
                                className={cx('form-control')}
                                placeholder="Enter user name"
                                type="email"
                                name="email"
                                {...register(
                                    'email',
                                    // {
                                    //   // value: passText,
                                    //   onChange: handleUserChange,
                                    // },
                                    registerOptions.email,
                                )}
                            />
                            <small className="text-danger">{errors?.email && errors.email.message}</small>
                        </div>
                        <div className={cx('col-12 form-group')}>
                            <label>Password :</label>
                            <input
                                className={cx('form-control')}
                                placeholder="Enter password"
                                type="password"
                                // value={passText}
                                // onChange={handlePassChange}
                                name="password"
                                {...register(
                                    'password',
                                    // {
                                    //   // value: passText,
                                    //   onChange: handlePassChange,
                                    // },
                                    registerOptions.password,
                                )}
                            />
                            <small className="text-danger">{errors?.password && errors.password.message}</small>
                        </div>
                        <div className={cx('col-12 form-group')}>
                            <span>{errorMessage} </span>
                        </div>
                        <div className={cx('col-12')}>
                            <button className={cx('btn-login')} disabled={isLoading} type="submit">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
