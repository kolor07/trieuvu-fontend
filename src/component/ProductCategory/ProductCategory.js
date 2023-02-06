import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faStar, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';

import styles from './ProductCategory.module.scss';
import { getCategoryNameById } from '../../services/CategoryService';
import { getProductByCategoryId } from '../../services/productService';
import { addOrUpdateCart } from '../Cart/CartSlice';
import { pagingConstant } from '../../utils/constant';
import { routeExtra } from '../../utils/common';

import Pagination from '../Pagination';
import GoTopButton from '../GoTopButton';
import { useScroll } from '../../utils/scroll';

const cx = classNames.bind(styles);

function ProductCategory() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const scrollPosition = useScroll();
    const { categoryId } = useParams();

    const [category, setCategory] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [products, setProducts] = useState([]);

    console.log('currentPage', currentPage);

    useEffect(() => {
        const getDataInitial = async () => {
            try {
                const categoryRes = await getCategoryNameById(categoryId);
                if (categoryRes.status === 200 && categoryRes.data.id) {
                    setCategory({ id: categoryRes.data.id, name: categoryRes.data.name });

                    console.log('category.data.name', categoryRes.data.name);

                    const products = await getProductByCategoryId(categoryRes.data.id, currentPage);
                    if (products.status === 200) {
                        setTotalItems(products.data.count);
                        setProducts(products.data.rows);
                        console.log('products.data.count', products.data.count);
                        console.log('products.data.rows', products.data.rows);
                    } else {
                        navigate('/file-not-found');
                    }
                } else {
                    navigate('/file-not-found');
                }
            } catch (error) {
                console.log(error);
                navigate('/file-not-found');
            }
        };

        getDataInitial();
    }, [categoryId, currentPage]);

    console.log('currentPage', currentPage);

    const handleAddToCart = (product) => {
        dispatch(addOrUpdateCart({ product: product, quantity: 1 }));
    };

    console.log('products', products, 'category', category);
    return (
        <div className="container">
            <div className={cx('row')}>
                <div className={cx('col-12')}>
                    <ul className={cx('Header_nav')}>
                        <li
                            onClick={() => {
                                navigate('/');
                            }}
                        >
                            Home
                            <FontAwesomeIcon icon={faAngleRight} className={cx('Header_nav_icon')} />
                        </li>
                        <li> {category.name}</li>
                    </ul>
                </div>
                <div className={cx('col-12')}>
                    <div className={cx('home_product_carousel')}>
                        {products.map((item) => {
                            return (
                                <article className={cx('product_single_item')} key={item.id}>
                                    <figure>
                                        <div className={cx('product_thumb')}>
                                            <Link
                                                to={routeExtra.productDetail + item.id}
                                                className={cx('primary_image')}
                                            >
                                                <img src={item.imageLink} alt="" />
                                            </Link>
                                            {item.discount !== 0 && (
                                                <div className={cx('label_product')}>
                                                    <span className={cx('label_sale')}>Sale</span>
                                                </div>
                                            )}
                                        </div>
                                        <figcaption className={cx('product_content')}>
                                            <h4 className={cx('product_name')}>
                                                <a href="product-details.html">{item.name}</a>
                                            </h4>
                                            <div className={cx('product_rating')}>
                                                <ul>
                                                    <li>
                                                        <a href="#">
                                                            <FontAwesomeIcon
                                                                icon={faStar}
                                                                className={cx('search-icon')}
                                                            />
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <FontAwesomeIcon
                                                                icon={faStar}
                                                                className={cx('search-icon')}
                                                            />
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <FontAwesomeIcon
                                                                icon={faStar}
                                                                className={cx('search-icon')}
                                                            />
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <FontAwesomeIcon
                                                                icon={faStar}
                                                                className={cx('search-icon')}
                                                            />
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <FontAwesomeIcon
                                                                icon={faStar}
                                                                className={cx('search-icon')}
                                                            />
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className={cx('price_box')}>
                                                <span
                                                    className={cx(
                                                        'old_price',
                                                        item.discount === 0 ? 'old_price-noDiscount' : null,
                                                    )}
                                                >
                                                    ${item.price}
                                                </span>
                                                {item.discount !== 0 && (
                                                    <span className={cx('current_price')}>
                                                        ${(item.price * item.discount) / 100}
                                                    </span>
                                                )}
                                            </div>
                                            <div className={cx('add_to_cart')}>
                                                <span onClick={() => handleAddToCart(item)}>
                                                    <FontAwesomeIcon icon={faCartShopping} aria-hidden="true" /> Add to
                                                    cart
                                                </span>
                                            </div>
                                        </figcaption>
                                    </figure>
                                </article>
                            );
                        })}
                    </div>
                </div>
                <div className={cx('col-12 d-flex justify-content-center')}>
                    {console.log('products.length', products.length)}
                    <div className={cx('pagination-wrapper')}>
                        {products.length > 0 && (
                            <Pagination
                                itemsCount={totalItems}
                                itemsPerPage={pagingConstant.productPerPage}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                alwaysShown={true}
                            />
                        )}
                        {/* <GoTopButton visible={scrollPosition > 400} /> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCategory;
