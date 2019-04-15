import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers';

const confStore = (initialState) => {
    const middlewares = [thunkMiddleware];
    const enhancer = applyMiddleware(...middlewares);
    const store = createStore(
        rootReducer, 
        initialState,
        compose(
            enhancer,
            window.devToolsExtension ? window.devToolsExtension() : fn => fn
        )
    );

    if (module.hot) {
        // reducer热加载
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
};

export default confStore;