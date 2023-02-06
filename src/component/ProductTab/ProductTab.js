import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faStar, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { selectTotalItems, selectProducts, selectCategoryName } from '../ProductTab/ProductTabSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';

import * as categoryService from '../../services/CategoryService';

import { AppContext } from '../../context/appContext';
import styles from './ProductTab.module.scss';
import { useScroll } from '../../utils/scroll';
import { getProductByCategoryId, getCategoryNameById } from './ProductTabSlice';
import { addOrUpdateCart } from '../Cart/CartSlice';
import { routeExtra } from '../../utils/common';

import Pagination from '../Pagination';
import GoTopButton from '../GoTopButton';

const cx = classNames.bind(styles);

function ProductTab() {
    const dispatch = useDispatch();
    // const navigate = useNavigate();

    // const [currentPage, setCurrentPage] = useState(1);
    // // const { categoryId } = useParams();
    const [categoryIdParam, setCategoryParam] = useState(1);
    const [data, setData] = useState([]);
    const { categoryId } = useContext(AppContext);
    // console.log('categoryIdParam', categoryIdParam);

    // let products = useSelector(selectProducts);
    // let totalItems = useSelector(selectTotalItems);
    let categoryName = useSelector(selectCategoryName);
    // const scrollPosition = useScroll();

    // let productPerPage = 16;

    console.log('re-render');
    console.log('categoryName', categoryName);
    console.log('categoryIdParam', categoryIdParam);
    // console.log('categoryId', categoryId);

    // dispatch(getCategoryNameById(categoryId));

    const getDate = async () => {
        try {
            const res = await categoryService.getCategoryNameById(categoryId);
            console.log('>>>res getCategoryNameById..', res);

            if (res.status === 200) {
                return res.data;
            } else if (res.status !== 501) {
                //
                // return rejectWithValue(res.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        dispatch(getCategoryNameById(2));
        console.log('use effect re-render', categoryIdParam);
        const res = getDate();
        setData(res);
    }, []);

    console.log('res data', data);

    // const handleAddToCart = (product) => {
    //     dispatch(addOrUpdateCart({ product: product, quantity: 1 }));
    // };

    return (
        // <div className="container">
        //     <div className={cx('row')}>
        //         <div className={cx('col-12')}>
        //             <ul className={cx('Header_nav')}>
        //                 <li
        //                     onClick={() => {
        //                         navigate('/');
        //                     }}
        //                 >
        //                     Home
        //                     <FontAwesomeIcon icon={faAngleRight} className={cx('Header_nav_icon')} />
        //                 </li>
        //                 <li> {categoryName}</li>
        //             </ul>
        //         </div>
        //         <div className={cx('col-12')}>
        //             <div className={cx('home_product_carousel')}>
        //                 {products.map((item) => {
        //                     return (
        //                         <article className={cx('product_single_item')} key={item.id}>
        //                             <figure>
        //                                 <div className={cx('product_thumb')}>
        //                                     <Link
        //                                         to={routeExtra.productDetail + item.id}
        //                                         className={cx('primary_image')}
        //                                     >
        //                                         <img src={item.imageLink} alt="" />
        //                                     </Link>
        //                                     {item.discount !== 0 && (
        //                                         <div className={cx('label_product')}>
        //                                             <span className={cx('label_sale')}>Sale</span>
        //                                         </div>
        //                                     )}
        //                                 </div>
        //                                 <figcaption className={cx('product_content')}>
        //                                     <h4 className={cx('product_name')}>
        //                                         <a href="product-details.html">{item.name}</a>
        //                                     </h4>
        //                                     <div className={cx('product_rating')}>
        //                                         <ul>
        //                                             <li>
        //                                                 <a href="#">
        //                                                     <FontAwesomeIcon
        //                                                         icon={faStar}
        //                                                         className={cx('search-icon')}
        //                                                     />
        //                                                 </a>
        //                                             </li>
        //                                             <li>
        //                                                 <a href="#">
        //                                                     <FontAwesomeIcon
        //                                                         icon={faStar}
        //                                                         className={cx('search-icon')}
        //                                                     />
        //                                                 </a>
        //                                             </li>
        //                                             <li>
        //                                                 <a href="#">
        //                                                     <FontAwesomeIcon
        //                                                         icon={faStar}
        //                                                         className={cx('search-icon')}
        //                                                     />
        //                                                 </a>
        //                                             </li>
        //                                             <li>
        //                                                 <a href="#">
        //                                                     <FontAwesomeIcon
        //                                                         icon={faStar}
        //                                                         className={cx('search-icon')}
        //                                                     />
        //                                                 </a>
        //                                             </li>
        //                                             <li>
        //                                                 <a href="#">
        //                                                     <FontAwesomeIcon
        //                                                         icon={faStar}
        //                                                         className={cx('search-icon')}
        //                                                     />
        //                                                 </a>
        //                                             </li>
        //                                         </ul>
        //                                     </div>
        //                                     <div className={cx('price_box')}>
        //                                         <span
        //                                             className={cx(
        //                                                 'old_price',
        //                                                 item.discount === 0 ? 'old_price-noDiscount' : null,
        //                                             )}
        //                                         >
        //                                             ${item.price}
        //                                         </span>
        //                                         {item.discount !== 0 && (
        //                                             <span className={cx('current_price')}>
        //                                                 ${(item.price * item.discount) / 100}
        //                                             </span>
        //                                         )}
        //                                     </div>
        //                                     <div className={cx('add_to_cart')}>
        //                                         <span onClick={() => handleAddToCart(item)}>
        //                                             <FontAwesomeIcon icon={faCartShopping} aria-hidden="true" /> Add to
        //                                             cart
        //                                         </span>
        //                                     </div>
        //                                 </figcaption>
        //                             </figure>
        //                         </article>
        //                     );
        //                 })}
        //             </div>
        //         </div>
        //         <div className={cx('col-12 d-flex justify-content-center')}>
        //             <div className={cx('pagination-wrapper')}>
        //                 {products.length > 0 && (
        //                     <Pagination
        //                         itemsCount={totalItems}
        //                         itemsPerPage={productPerPage}
        //                         currentPage={currentPage}
        //                         setCurrentPage={setCurrentPage}
        //                         alwaysShown={false}
        //                     />
        //                 )}
        //                 <GoTopButton visible={scrollPosition > 400} />
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <>
            <ul className={cx('Header_nav')}>
                <li onClick={() => setCategoryParam(Math.random())}>
                    Home
                    <FontAwesomeIcon icon={faAngleRight} className={cx('Header_nav_icon')} />
                </li>
                <li> {categoryName}</li>
            </ul>
            <h1>this is tab</h1>
        </>
    );
}

export default ProductTab;
