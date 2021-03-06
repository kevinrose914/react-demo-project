import { INCREASE, DECREASE } from '../constant/index.js';

const initState = {
    count: 1
};

const counter = (state = initState, action) => {
    switch(action.type) {
        case INCREASE:
            return { ...state, count: state.count + 1 };
        case DECREASE:
            return { ...state, count: state.count - 1 };
        default:
            return state;
    }
};

export default counter;