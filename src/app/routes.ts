import { SFC, ComponentClass } from 'react';
import { createHashHistory } from 'history';
import DashboardPane from './../components/DashboardPane/DashboardPane';
import TopicPane from './../components/TopicPane/TopicPane';

/* Routes
-----------------------------------------*/
export function routes() {
    const result = createActionResult;

    return [
        {
            path: '/',
            action: middleware,
            children: [
                {
                    path: '/',
                    action: result(DashboardPane)
                },
                {
                    path: '/topics/:topicId',
                    action: result(TopicPane)
                },
            ]
        }
    ];
}


/* history
-------------------------------- */
export const history = createHashHistory({
    hashType: 'hashbang'
});


/* Helper
------------------------------------ */
class RoutingError extends Error { }

export function createActionResult(component: SFC<any> | ComponentClass<any>) {
    return (context: any): IEntity.IRoute => {
        const { query, params } = context;
        return {
            query,
            params,
            component,
            path: history.location.pathname
        };
    };
}


/* Middleware
--------------------------------------- */
/*
 * NOTE: child.componentがない時点でunivarsal-router側で
 * 例外が捕捉されRouterのcatchが呼ばれるが、わかりやすさのために明示的に捕捉してる
 */
export async function middleware(ctx: any) {
    try {
        const child = await ctx.next();
        if (!child) throw new RoutingError();
        return child;
    } catch (e) {
        throw new RoutingError(e);
    }
};

export default routes();

