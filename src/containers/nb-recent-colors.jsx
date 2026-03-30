import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import RecentColorsComponent from '../components/nb-recent-colors/nb-recent-colors.jsx';
import {changeFillColor} from '../reducers/fill-style';
import {changeStrokeColor} from '../reducers/stroke-style';

const mapStateToProps = state => ({
    recentColors: state.scratchPaint.color.recentColors,
    colorIndex: state.scratchPaint.fillMode.colorIndex
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSelectColor: (color, colorIndex) => {
        if (colorIndex === 0) {
            dispatch(changeFillColor(color));
        } else {
            dispatch(changeStrokeColor(color));
        }
        if (ownProps.onUpdateImage) {
            ownProps.onUpdateImage();
        }
    }
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    recentColors: stateProps.recentColors,
    onSelectColor: color => dispatchProps.onSelectColor(color, stateProps.colorIndex)
});

const RecentColorsContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(RecentColorsComponent);

RecentColorsContainer.propTypes = {
    onUpdateImage: PropTypes.func.isRequired
};

export default RecentColorsContainer;