import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';

import Header from '../components/Header';
import SlideShow from '../components/SlideShow';
import Footer from '../components/Footer';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header style={cx('header')} />
            <SlideShow style={cx('slideshow')} />
            <div className={cx('main-content')}>{children} </div>
            <Footer style={cx('footer')} />
        </div>
    );
}

export default DefaultLayout;
