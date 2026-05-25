import log from '../log/log';

const CHANGE_RECT_RADIUS = 'scratch-paint/rect-mode/CHANGE_RECT_RADIUS';
const initialState = {rectRadius: 0};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case CHANGE_RECT_RADIUS:
        if (isNaN(action.rectRadius)) {
            log.warn(`Invalid corner radius: ${action.rectRadius}`);
            return state;
        }
        return {rectRadius: Math.max(0, action.rectRadius)};
    default:
        return state;
    }
};

const changeRectRadius = function (rectRadius) {
    return {
        type: CHANGE_RECT_RADIUS,
        rectRadius: rectRadius
    };
};

export {
    reducer as default,
    changeRectRadius
};