import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './HomeBanner.module.scss';
import { AppContext } from '../../context/appContext';

import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);
function HomeBanner() {
    const { categoryId, setCategoryId } = useContext(AppContext);
    const navigate = useNavigate();
    const handleShowPhanBonLa = () => {
        setCategoryId(2);
        navigate('/product/2');
    };
    const handleShowPhanBonGoc = () => {
        setCategoryId(5);
        navigate('/product/5');
    };
    const handleShowThuocBaVeThucVat = () => {
        setCategoryId(4);
        navigate('/product/4');
    };
    return (
        <div className={cx('home-banner')}>
            <div className="container">
                <div className={cx('row g-md-5')}>
                    <div className={cx('col-lg-4 col-md-4 col-sm-6')}>
                        <div className={cx('single_banner')} onClick={handleShowPhanBonLa}>
                            <div className={cx('home_banner_style1', 'one')}>
                                <h3>Phân bón Lá</h3>
                                {/* <div className={cx('banner_text_img')}>
                                    <img
                                        src="https://htmldemo.net/classico/classico/assets/img/bg/banner_static1.png"
                                        alt=""
                                    />
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className={cx('col-lg-4 col-md-4 col-sm-6')}>
                        <div className={cx('single_banner')} onClick={handleShowPhanBonGoc}>
                            <div className={cx('home_banner_style1', 'two')}>
                                <h3>Phân bón gốc</h3>
                                {/* <div
                                    className={cx('banner_text_img d-flex  justify-content-center align-items-center')}
                                >
                                    <img
                                        src="https://htmldemo.net/classico/classico/assets/img/bg/banner_static2.png"
                                        alt=""
                                    />
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className={cx('col-lg-4 col-md-4 col-sm-6')}>
                        <div className={cx('single_banner')} onClick={handleShowThuocBaVeThucVat}>
                            <div className={cx('home_banner_style1', 'three')}>
                                <h3>Thuốc Trừ Sâu</h3>
                                {/* <div className={cx('banner_text_img')}>
                                    <img
                                        src="https://htmldemo.net/classico/classico/assets/img/bg/banner_static3.png"
                                        alt=""
                                    />
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeBanner;
