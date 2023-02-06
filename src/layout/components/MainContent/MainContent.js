import classNames from 'classnames/bind';
import styles from './MainContent.module.scss';
import HomeBanner from '../../../component/HomeBanner';
import HomeProduct from '../../../component/homeProduct';

const cx = classNames.bind(styles);

function MainContent() {
    return (
        <>
            <HomeBanner />
            <div className={cx('home_product')}>
                <div className="container">
                    <HomeProduct />
                </div>
            </div>
        </>
    );
}

export default MainContent;
