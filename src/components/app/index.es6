import { Component, DOM } from 'react';

export default class extends Component {
    static displayName = 'app';

    render() {
        return DOM.div({
            className: 'app'
        }, 'app');
    }
}
