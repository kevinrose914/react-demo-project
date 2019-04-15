import { INCREASE, DECREASE } from '../constant/index.js';

export const increase = () => {
    return {
        type: INCREASE,
        payload: {}
    };
};

export const decrease = () => {
    return {
        type: DECREASE,
        payload: {}
    };
};

export const asyncIncrease = () => {
    return async (dispatch, getState) => {
        console.log(getState);
        await new Promise((resolve) => {
            setTimeout(resolve, 2000);
        });
        dispatch(increase());
    };
};