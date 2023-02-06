import React from 'react';
import Button from 'react-bootstrap/Button';
import { scrollToTop } from '../../utils/scroll';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './GoTopButton.module.scss';

const cx = classNames.bind(styles);
const GoTopButton = ({ visible = true }) => (
    <Button
        className={cx('back-to-top-btn', visible ? 'back-to-top-btn--visible' : null)}
        onClick={scrollToTop}
        variant="dark"
    >
        <FontAwesomeIcon icon={faArrowUp} />
    </Button>
);

GoTopButton.propTypes = {
    visible: PropTypes.bool,
};

export default GoTopButton;
