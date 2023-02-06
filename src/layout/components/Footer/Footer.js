import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMobileScreenButton, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTiktok } from '@fortawesome/free-brands-svg-icons';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import logo from '../../../../src/assets/images/logo1.png';

const cx = classNames.bind(styles);

function Footer({ style }) {
    return (
        <div className={style}>
            <div className={cx('footer_top')}>
                <div className="container">
                    <div className={cx('row')}>
                        <div className={cx('col-lg-3 col-md-4 col-sm-6')}>
                            <div className={cx('footer_list')}>
                                <div className={cx('footer_list_title')}>
                                    <h3>Về chúng tôi</h3>
                                </div>
                                <a href="/" className={cx('footer_logo')}>
                                    <img src={logo} alt="logo"></img>
                                </a>
                                <p className={cx('footer_desc')}>
                                    Cửa hàng Triều Vũ , chuyên cấp cấp các lại phân bón và thuốc bảo vệ thực vật
                                </p>
                            </div>
                        </div>
                        <div className={cx('col-lg-3 col-md-4 col-sm-6')}>
                            <div className={cx('footer_list')}>
                                <div className={cx('footer_list_title')}>
                                    <h3>Thông tin cửa hàng</h3>
                                </div>
                                <div className={cx('footer_list_menu')}>
                                    <ul>
                                        <li>
                                            <a href="#">Mã Số Thuế: 0106486365</a>
                                        </li>
                                        <li>
                                            <a href="#">Tân Long, Kim Long , Châu Đức ,Bà Ria Vũng Tàu</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className={cx('col-lg-3 col-md-4 col-sm-6')}>
                            <div className={cx('footer_list')}>
                                <div className={cx('footer_list_title')}>
                                    <h3>Chính Sách Khách Hàng</h3>
                                </div>
                                <div className={cx('footer_contact_list')}>
                                    <div className={cx('contact_list_item')}>
                                        <div className={cx('contact_item_icon')}>
                                            <span>1</span>
                                        </div>
                                        <div className={cx('contact_item_text')}>
                                            <p>Chính sách khách hàng thân thiết </p>
                                        </div>
                                    </div>
                                    <div className={cx('contact_list_item')}>
                                        <div className={cx('contact_item_icon')}>
                                            <span>2</span>
                                        </div>
                                        <div className={cx('contact_item_text')}>
                                            <p>Các câu hỏi thường gặp</p>
                                        </div>
                                    </div>
                                    <div className={cx('contact_list_item')}>
                                        <div className={cx('contact_item_icon')}>
                                            <span>2</span>
                                        </div>
                                        <div className={cx('contact_item_text')}>
                                            <p>Hướng dẫn đặt hàng</p>
                                        </div>
                                    </div>
                                    <div className={cx('contact_list_item')}>
                                        <div className={cx('contact_item_icon')}>
                                            <span>4</span>
                                        </div>
                                        <div className={cx('contact_item_text')}>
                                            <p>Hướng dẫn kiểm tra hạng thẻ thành viên</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('col-lg-3 col-md-4 col-sm-6')}>
                            <div className={cx('footer_list')}>
                                <div className={cx('footer_list_title')}>
                                    <h3>Liên Hệ</h3>
                                </div>
                                <div className={cx('footer_contact_list')}>
                                    <div className={cx('contact_list_item')}>
                                        <div className={cx('contact_item_icon')}>
                                            <span>
                                                <FontAwesomeIcon icon={faPhone} />
                                            </span>
                                        </div>
                                        <div className={cx('contact_item_text')}>
                                            <p>
                                                Điện thoại <a href="tel:+001666951">+001 666 951</a>
                                            </p>
                                        </div>
                                    </div>
                                    <div className={cx('contact_list_item')}>
                                        <div className={cx('contact_item_icon')}>
                                            <span>
                                                <FontAwesomeIcon icon={faEnvelope} />
                                            </span>
                                        </div>
                                        <div className={cx('contact_item_text')}>
                                            <p>
                                                <a href="mailto:http://1.envato.market/9LbxW">trieuvu@gmail.com</a>
                                            </p>{' '}
                                        </div>
                                    </div>
                                    <div className={cx('contact_list_item')}>
                                        <div className={cx('contact_item_icon')}>
                                            <span>
                                                <FontAwesomeIcon icon={faFacebook} />
                                            </span>
                                        </div>
                                        <div className={cx('contact_item_text')}>
                                            <p>
                                                <a href="http://youtube.com/holetex">Youtube</a>
                                            </p>
                                        </div>
                                    </div>
                                    <div className={cx('contact_list_item')}>
                                        <div className={cx('contact_item_icon')}>
                                            <span>
                                                <FontAwesomeIcon icon={faTiktok} />
                                            </span>
                                        </div>
                                        <div className={cx('contact_item_text')}>
                                            <p>
                                                <a href="http://youtube.com/holetex">Tiktok</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
