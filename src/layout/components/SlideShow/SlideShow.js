import classNames from 'classnames/bind';
import styles from './SlideShow.module.scss';

import { Carousel } from 'react-bootstrap';

const cx = classNames.bind(styles);

const carousels = [
    // {
    //     id: 1,
    //     name: 'First slide 1',
    //     url: 'https://htmldemo.net/classico/classico/assets/img/slider/slider1.jpg',
    //     captionTitle: 'big sale up to 20% off',
    //     captionStrategy: 'NEW SALE',
    //     captionContain: `Lorem ipsum dolor sit amet elit. Provident, magni quae nisi minima ut doloribus
    //                                     natus eos, dolores aliquam ducimus.`,
    // },
    {
        id: 2,
        name: 'First slide 2',
        url: 'https://htmldemo.net/classico/classico/assets/img/slider/slider2.jpg',
        captionTitle: 'big sale up to 20% off',
        captionStrategy: 'NEW SALE',
        captionContain: `Lorem ipsum dolor sit amet elit. Provident, magni quae nisi minima ut doloribus
                                        natus eos, dolores aliquam ducimus.Lorem ipsum dolor sit amet elit. 
                                       `,
    },
];

function SlideShow({ style }) {
    const Background = 'https://htmldemo.net/classico/classico/assets/img/slider/slider2.jpg';
    return (
        <div className={style}>
            <div id="container-fluid">
                <div className="row">
                    <Carousel interval={3000} fade variant="dark" controls={false}>
                        {carousels.map((slideItem) => {
                            return (
                                <Carousel.Item key={slideItem.id} className={cx('carousel_item-customize')}>
                                    <div
                                        style={{
                                            backgroundImage: `url(${slideItem.url})`,
                                            height: '600px',
                                            backgroundAttachment: 'scroll',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                        }}
                                    >
                                        {' '}
                                    </div>
                                    <Carousel.Caption className={cx('carousel_caption-customize')}>
                                        <div className={cx('slide-content')}>
                                            <h2>{slideItem.captionTitle}</h2>
                                            <h1>{slideItem.captionStrategy}</h1>
                                            <p>{slideItem.captionContain}</p>
                                            <a href="shop.html" className={cx('btn-default')}>
                                                shop now
                                            </a>
                                        </div>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            );
                        })}
                    </Carousel>
                </div>
            </div>
        </div>
    );
}

export default SlideShow;
