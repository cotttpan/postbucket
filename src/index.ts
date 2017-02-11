/* tslint:disable:no-var-requires */

/* Store
---------------------------------*/
import creaetStore from 'quex';
import { initialState } from './app/state';

const store = creaetStore(initialState());

if (process.env.NODE_ENV === 'development') {
    const fixture = require('./app/helper/createProjectData').default;
    const projects = fixture({
        projectCount: 3,
        topicCountPerProject: 3,
        postCountPerTopic: 3,
    });

    store.setState({ projects });
}

/* Router
--------------------------------- */
import Router from './lib/router/Router';
import routes, { history } from './app/routes';
import { Session } from './mutation/index';

const onLocationChange = store.dispatch('ROUTER_LOCATION_UPDATE').use([
    Session.updateCurrentIds
]);

/* View
---------------------------------- */
import { createElement as $ } from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';

window.addEventListener('DOMContentLoaded', () => {
    if (process.env.NODE_ENV === 'development') {
        require('./lib/devtool').default(store);
        require('inferno-devtools');

        const DevTools = require('mobx-react-devtools').default;
        render($(DevTools, { position: { bottom: 0, right: 20 } }), document.getElementById('devtool'));
    }

    render(
        $(Provider, { ...state, usecase: store.usecase },
            $(Router, { routes, history, onLocationChange })
        ),
        document.getElementById('root')
    );
});
