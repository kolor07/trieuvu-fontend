import classNames from 'classnames/bind';
import styles from './FileNotFound.module.scss';

const cx = classNames.bind(styles);

function FileNotFound() {
    return (
        <div className="container">
            <div className={cx('row')}>
                <div className={cx('col-12')}>
                    <h1> this is page not found page</h1>
                </div>
            </div>
        </div>
    );
}

export default FileNotFound;
