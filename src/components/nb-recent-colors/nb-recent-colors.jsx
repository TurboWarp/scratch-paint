import React from 'react';
import PropTypes from 'prop-types';

import ColorButtonComponent from '../color-button/color-button.jsx';
import GradientTypes from '../../lib/gradient-types';
import styles from './nb-recent-colors.css';

const RecentColorsComponent = ({recentColors, onSelectColor}) => {
    if (recentColors.length === 0) return null;
    return (
        <div className={styles.recentColorsPanel}>
            {recentColors.map(color => (
                <ColorButtonComponent
                    key={color}
                    color={color}
                    gradientType={GradientTypes.SOLID}
                    noArrow
                    outline={false}
                    size={"1.5rem"}
                    onClick={() => onSelectColor(color)}
                />
            ))}
        </div>
    );
};

RecentColorsComponent.propTypes = {
    recentColors: PropTypes.arrayOf(PropTypes.string).isRequired,
    onSelectColor: PropTypes.func.isRequired
};

export default RecentColorsComponent;
