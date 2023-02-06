import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarOfLife, faUser, faArrowLeft, faLocationDot } from '@fortawesome/free-solid-svg-icons';

import styles from './CheckOutShipping.module.scss';
import * as commonService from '../../services/commonService';
import { phoneRegExp, localStorageAccess } from '../../utils/common';
import { saveCheckOutShipping } from './CheckOutShippingSlice';
import { getProvinceNameById, getDistrictNameById, getWardById } from '../../services/commonService';

const cx = classNames.bind(styles);

function CheckOutShipping() {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // valid
    const yupSchema = yup.object().shape({
        firstName: yup.string().required('First Name is a required field'),
        lastName: yup.string().required('Last Name is a required field'),
        email: yup.string().required('Email is a required field'),
        phoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
        province: yup.string().required('province is a required field'),
        district: yup.string().required('district is a required field'),
        ward: yup.string().required('ward is a required field'),
        address: yup.string().required('address is a required field'),
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

    const provinceRef = register('province');
    const districtRef = register('district');
    const wardRef = register('ward');

    useEffect(() => {
        setProvinces(commonService.getProvinces());
    }, []);

    const handleProvinceChange = async (e) => {
        const selectedId = e.target.value;
        if (selectedId !== '') {
            const result = commonService.getDistrictsByProvinceCode(e.target.value);
            setDistricts(result);
            setSelectedProvince(e.target.value);
        }
    };

    const handleDistrictChange = (e) => {
        const selectedId = e.target.value;
        console.log(selectedId);
        if (selectedId !== '') {
            const result = commonService.getWardsByDistrictCode(selectedId);
            setWards(result);
            setSelectedDistrict(selectedId);
        }
    };

    const handleWardChange = (e) => {
        if (e.target.value !== '') setSelectedWard(e.target.value);
    };

    const handleDelivery = (data) => {
        // modify data
        data.province = getProvinceNameById(data.province);
        data.district = getDistrictNameById(data.district);
        data.address = data.address + ' ,' + getWardById(data.ward);
        // ward is not saved in back end
        delete data.ward;
        console.log(data);
        localStorageAccess().setItems('shippingInfo', data);
        dispatch(saveCheckOutShipping(data));
        navigate('/check-out');
    };

    return (
        <div className={cx('container', 'check-out-wrapper')}>
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
                            <span>thanh toán</span>
                        </li>
                    </ul>
                </div>
            </div>
            {/* <div className={cx('col-lg-12 col-md-12 col-sm-12')}> */}
            <div className={cx('bill-header')}>
                <h2>
                    <FontAwesomeIcon icon={faUser} className={cx('fa__user-icon')} />
                    đăng nhập
                </h2>
                <button type="đăng nhập" className={cx('btn-inline')}>
                    đăng nhập
                </button>
            </div>
            {/* </div> */}
            {/* <div className={cx('col-lg-12 col-md-12 col-sm-12')}> */}
            <div className={cx('location__header')}>
                <h2>
                    <FontAwesomeIcon icon={faLocationDot} className={cx('fa__location__dot-icon')} />
                    địa chỉ giao hàng
                </h2>
                <h2>thêm địa chỉ giao hàng</h2>
            </div>
            {/* </div> */}

            <form onSubmit={handleSubmit(handleDelivery)}>
                <div className={cx('shipping__info')}>
                    <div className={cx('shipping-left')}>
                        <div>
                            <label htmlFor="firstName" className={cx('form-label')}>
                                first Name
                                <FontAwesomeIcon icon={faStarOfLife} className={cx('fa__start__of__life-icon')} />
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
                        <div>
                            <label htmlFor="lastName" className={cx('form-label')}>
                                Last Name
                                <FontAwesomeIcon icon={faStarOfLife} className={cx('fa__start__of__life-icon')} />
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

                        <div>
                            <label htmlFor="email" className={cx('form-label')}>
                                email
                                <FontAwesomeIcon icon={faStarOfLife} className={cx('fa__start__of__life-icon')} />
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
                        <div>
                            <label htmlFor="phoneNumber" className={cx('form-label')}>
                                Phone Number
                                <FontAwesomeIcon icon={faStarOfLife} className={cx('fa__start__of__life-icon')} />
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
                    </div>

                    <div className={cx('shipping-right')}>
                        <div>
                            <label htmlFor="province" className={cx('form-label')}>
                                Province
                                <FontAwesomeIcon icon={faStarOfLife} className={cx('fa__start__of__life-icon')} />
                            </label>
                            <br />
                            <select
                                {...register('province')}
                                onChange={(e) => {
                                    districtRef.onChange(e);
                                    handleProvinceChange(e);
                                }}
                            >
                                <option value="">Select...</option>
                                {provinces.map((item, index) => {
                                    return (
                                        <option value={item.code} key={index}>
                                            {item.name}
                                        </option>
                                    );
                                })}
                            </select>
                            <br />

                            <small className={cx('text-danger', 'error-danger')}>
                                {errors?.province && errors.province.message}
                            </small>
                        </div>
                        <div>
                            <label htmlFor="district" className={cx('form-label')}>
                                District
                                <FontAwesomeIcon icon={faStarOfLife} className={cx('fa__start__of__life-icon')} />
                            </label>
                            <br />
                            <select
                                {...register('district')}
                                value={selectedDistrict}
                                onChange={(e) => {
                                    wardRef.onChange(e);
                                    handleDistrictChange(e);
                                }}
                                id="district"
                            >
                                <option value="">select a district</option>
                                {districts.map((item, index) => {
                                    return (
                                        <option value={item.code} key={index}>
                                            {item.name}
                                        </option>
                                    );
                                })}
                            </select>

                            <br />
                            <small className={cx('text-danger', 'error-danger')}>
                                {errors?.district && errors.district.message}
                            </small>
                        </div>
                        <div>
                            <label htmlFor="ward" className={cx('form-label')}>
                                ward
                                <FontAwesomeIcon icon={faStarOfLife} className={cx('fa__start__of__life-icon')} />
                            </label>
                            <br />

                            <select
                                {...register('ward')}
                                value={selectedWard}
                                onChange={(e) => {
                                    provinceRef.onChange(e);
                                    handleWardChange(e);
                                }}
                                id="ward"
                            >
                                <option value="">select a ward</option>
                                {wards.map((item, index) => {
                                    return (
                                        <option value={item.code} key={index}>
                                            {item.name}
                                        </option>
                                    );
                                })}
                            </select>
                            <br />

                            <small className={cx('text-danger', 'error-danger')}>
                                {errors?.ward && errors.ward.message}
                            </small>
                        </div>

                        <div>
                            <label htmlFor="address" className={cx('form-label')}>
                                Address
                                <FontAwesomeIcon icon={faStarOfLife} className={cx('fa__start__of__life-icon')} />
                            </label>
                            <input
                                className={cx('form-control', 'login_input')}
                                placeholder="...."
                                name="address"
                                id="address"
                                {...register('address')}
                            />
                            <small className={cx('text-danger', 'error-danger')}>
                                {errors?.address && errors.address.message}
                            </small>
                        </div>
                    </div>
                </div>
                <div className={cx('div__button-submit')}>
                    <button
                        type="submit"
                        className={cx('btn-inline', `${Object.keys(errors).length > 0 ? 'inactive' : ''}`)}
                    >
                        xác nhận giao đến địa chỉ này
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CheckOutShipping;
