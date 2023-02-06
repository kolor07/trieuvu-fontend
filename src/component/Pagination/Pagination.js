import React, { useEffect } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { scrollToTop } from '../../utils/scroll';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Pagination.module.scss';

const cx = classNames.bind(styles);
const PaginationComponent = ({ itemsCount, itemsPerPage, currentPage, setCurrentPage, alwaysShown = true }) => {
    const pagesCount = Math.ceil(itemsCount / itemsPerPage);
    const isPaginationShown = alwaysShown ? true : pagesCount > 1;
    const isCurrentPageFirst = currentPage === 1;
    const isCurrentPageLast = currentPage === pagesCount;

    const changePage = (number) => {
        if (currentPage === number) return;
        setCurrentPage(number);
        scrollToTop();
    };

    const onPageNumberClick = (pageNumber) => {
        changePage(pageNumber);
    };

    const onPreviousPageClick = () => {
        changePage((currentPage) => currentPage - 1);
    };

    const onNextPageClick = () => {
        changePage((currentPage) => currentPage + 1);
    };

    const setLastPageAsCurrent = () => {
        if (currentPage > pagesCount) {
            setCurrentPage(pagesCount);
        }
    };

    let isPageNumberOutOfRange;

    const pageNumbers = [...new Array(pagesCount)].map((_, index) => {
        const pageNumber = index + 1;
        const isPageNumberFirst = pageNumber === 1;
        const isPageNumberLast = pageNumber === pagesCount;
        const isCurrentPageWithinTwoPageNumbers = Math.abs(pageNumber - currentPage) <= 2;

        if (isPageNumberFirst || isPageNumberLast || isCurrentPageWithinTwoPageNumbers) {
            isPageNumberOutOfRange = false;
            return (
                <Pagination.Item
                    key={pageNumber}
                    onClick={() => onPageNumberClick(pageNumber)}
                    active={pageNumber === currentPage}
                    className={cx('page-item-add')}
                >
                    {pageNumber}
                </Pagination.Item>
            );
        }

        if (!isPageNumberOutOfRange) {
            isPageNumberOutOfRange = true;
            return <Pagination.Ellipsis key={pageNumber} className="muted" />;
        }

        return null;
    });

    useEffect(setLastPageAsCurrent, [pagesCount]);

    return (
        <>
            {isPaginationShown && (
                <Pagination size="lg">
                    <Pagination.Prev onClick={onPreviousPageClick} disabled={isCurrentPageFirst} />
                    {pageNumbers}
                    <Pagination.Next onClick={onNextPageClick} disabled={isCurrentPageLast} />
                </Pagination>
            )}
        </>
    );
};

PaginationComponent.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    setCurrentPage: PropTypes.func.isRequired,
    alwaysShown: PropTypes.bool,
};

export default PaginationComponent;
