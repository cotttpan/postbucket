import { Enhancer } from 'quex';
export default function combineEnhancer(enhancers: Function[]) {
    return enhancer as Enhancer<IAppState>;
    function enhancer(name: string, task: Function) {
        return enhancers.reduce((enhancedTask, enhancer) => enhancer(name, enhancedTask), task);
    };
}
