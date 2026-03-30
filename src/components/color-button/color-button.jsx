import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {MIXED} from '../../helper/style-path';

import noFillIcon from './no-fill.svg';
import mixedFillIcon from './mixed-fill.svg';
import styles from './color-button.css';
import GradientTypes from '../../lib/gradient-types';
import log from '../../log/log';

const colorToBackground = (color, color2, gradientType) => {
    if (color === MIXED || (gradientType !== GradientTypes.SOLID && color2 === MIXED)) return 'white';
    if (color === null) color = 'white';
    if (color2 === null) color2 = 'white';
    switch (gradientType) {
    case GradientTypes.SOLID: return color;
    case GradientTypes.HORIZONTAL: return `linear-gradient(to right, ${color}, ${color2})`;
    case GradientTypes.VERTICAL: return `linear-gradient(${color}, ${color2})`;
    case GradientTypes.RADIAL: return `radial-gradient(${color}, ${color2})`;
    default: log.error(`Unrecognized gradient type: ${gradientType}`);
    }
};

const ColorButtonComponent = props => (
    <div
        className={styles.colorButton}
        onClick={props.onClick}
        style={props.size ? {width: props.size, height: props.size} : {} }
    >
        <div
            className={classNames(styles.colorButtonSwatch, {
                [styles.outlineSwatch]: props.outline && !(props.color === MIXED)
            }, props.noArrow !== true ? styles.colorButtonSwatchWithArrow : null)}
            style={Object.assign({
                background: colorToBackground(props.color, props.color2, props.gradientType)
            }, props.size ? {flexBasis: props.size} : {} )}
        >
            {props.color === null && (props.gradientType === GradientTypes.SOLID || props.color2 === null) ? (
                <img
                    className={styles.swatchIcon}
                    draggable={false}
                    src={noFillIcon}
                />
            ) : ((props.color === MIXED || (props.gradientType !== GradientTypes.SOLID && props.color2 === MIXED) ? (
                <img
                    className={styles.swatchIcon}
                    draggable={false}
                    src={mixedFillIcon}
                />
            ) : null))}
        </div>
        {props.noArrow !== true && <div className={styles.colorButtonArrow}>▾</div>}
    </div>
);

ColorButtonComponent.propTypes = {
    color: PropTypes.string,
    color2: PropTypes.string,
    gradientType: PropTypes.oneOf(Object.keys(GradientTypes)).isRequired,
    onClick: PropTypes.func.isRequired,
    outline: PropTypes.bool.isRequired,
    noArrow: PropTypes.bool,
    size: PropTypes.string
};

ColorButtonComponent.defaultProps = {
    outline: false,
    noArrow: false
};

export default ColorButtonComponent;
