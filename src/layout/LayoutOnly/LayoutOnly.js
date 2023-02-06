import Login from '../../component/Login/Login';
import Header from '../components/Header';
import SlideShow from '../components/SlideShow';
import Footer from '../components/Footer';
import classNames from 'classnames/bind';
import styles from './LayoutOnly.module.scss';

const cx = classNames.bind(styles);

function LayoutOnly({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header style={cx('header')} />
            <div className={cx('main-content')}>{children} </div>
            <Footer style={cx('footer')} />
        </div>
    );
}

export default LayoutOnly;
