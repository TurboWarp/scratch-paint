const ADD_RECENT_COLOR = 'scratch-paint/recent-colors/ADD_RECENT_COLOR';
const MAX_RECENT_COLORS = 5;

const reducer = (state = ["#9966ff", "#668fff", "#66ebff", "#66ffb7", "#70ff66"], action) => {
    switch (action.type) {
    case ADD_RECENT_COLOR: {
        if (!action.color || typeof action.color !== 'string') return state;
        const noodles = state.filter(c => c !== action.color);
        return [action.color, ...noodles].slice(0, MAX_RECENT_COLORS);
    }
    default:
        return state;
    }
};

const addRecentColor = color => ({type: ADD_RECENT_COLOR, color});

export {
    reducer as default,
    addRecentColor,
    ADD_RECENT_COLOR
};