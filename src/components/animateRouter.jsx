import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

// const HISTORY_KEY = 'HISTORY_KEY';
// const histories = (sessionStorage.getItem(HISTORY_KEY) || '').split(',');
// let timer = null;
// 判断路由是否已经被点击过,暂时不用
// const isHistoryPush = location => {
//     const index = histories.lastIndexOf(location.pathname);
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//         if (index > -1) {
//             histories.splice(index + 1);
//         } else {
//             histories.push(location.pathname);
//         }
//         sessionStorage.setItem(HISTORY_KEY, histories.join(','));
//     }, 50);
//     return index < 0;
// };

class AnimatRouter extends Component {
    constructor() {
        super();
    }
    static propTypes = {
        className: PropTypes.string,
        transitionKey: PropTypes.any,
        location: PropTypes.any,
        children: PropTypes.any
    };

    render() {
        const { className, location, children, transitionKey } = this.props;
        console.log(children);
        // const classNames = isHistoryPush(location) ? `back-${className}` : `forward-${className}`;
        // console.log(classNames);
        return (
            <TransitionGroup>
                <CSSTransition
                    key={transitionKey || location.pathname}
                    timeout={800}
                    classNames={className}
                    onEntered={(el) => {
                        console.log('onEntered', el);
                    }}
                    onEntering={(el) => {
                        console.log('onEntering', el);
                    }}
                    onEnter={(el) => {
                        console.log('onEnter', el);
                    }}
                    onExited={() => { console.log('exited'); }}
                >
                    <Switch location={location}>{children}</Switch>
                </CSSTransition>
            </TransitionGroup>
        );
    }
}

export default withRouter(AnimatRouter);