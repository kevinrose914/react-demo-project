import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import confStore from './store/confStore';

import Layout from './pages/layout.jsx';

import './assets/styles/common.css';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

const store = confStore();

export default function Root() {
    return (
        <TransitionGroup style={{ height: '100%', width: '100%' }}>
            <CSSTransition
                appear
                classNames="appAppear"
                timeout={500}
            >
                <Provider store={store}>
                    <BrowserRouter>
                        <Route path="/" component={Layout} />
                    </BrowserRouter>
                </Provider>
            </CSSTransition>
        </TransitionGroup>
    );
}