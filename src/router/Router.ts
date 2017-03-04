/*
* universal-router: path matchingとmatchした場合のroute.actionを叩く。actionの結果はPromiseで返って来る。
* history: browser historyを模したライブラリ。pathの更新をlistenできる。

# routerのざっくりした仕組み
- history.listenでpathの変更を監視
- 変更があればstateを更新してcomponentをrender
*/
import { Component, createElement, SFC, ComponentClass } from 'react';
import { resolve, Routes } from 'universal-router';
import * as qs from 'query-string';
import { History, Location } from 'history';

interface State {
    component: SFC<any> | ComponentClass<any>;
}

interface Props {
    history: History;
    routes: Routes<any, any>;
    fallbackView?: SFC<any>;
    onLocationChange?: (location: IEntity.IRoute) => void;
}

export default class Router extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            component: this.props.fallbackView || this.defaultFallbackView,
        };

        this.handleRouting(props.history.location);
        props.history.listen(this.handleRouting);
    }

    defaultFallbackView = () => createElement('div', {}, '...NotFound');

    handleRouting = (location: Location) => {
        const ctx = {
            path: location.pathname,
            query: qs.parse(location.search)
        };

        resolve(this.props.routes, ctx)
            .then((result: IEntity.IRoute) => {
                const { onLocationChange } = this.props;
                onLocationChange && onLocationChange(result);
                this.setState({ component: result.component });
            })
            .catch(e => {
                console.error(e);
                this.setState({ component: this.props.fallbackView || this.defaultFallbackView });
            });
    }

    render() {
        let component = this.state.component || this.props.fallbackView || this.defaultFallbackView;
        return createElement(component as SFC<any>);
    }
}