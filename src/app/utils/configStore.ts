import { applyMiddleware, createStore, Store } from 'redux';
import { fromJS } from 'immutable';
import { createLogger } from 'redux-logger';
import rootReducer from '../data/reducer';
import thunk from 'redux-thunk';

const isDebuggingInChrome = process.env.NODE_ENV === 'development' && !!window.navigator.userAgent;

const logger = createLogger({
    predicate: () => isDebuggingInChrome,
    stateTransformer: data => fromJS(data).toJS(),
    collapsed: true,
    duration: true
});

const configureStore = (callback: (value: Store<any, any>) => void) =>
    new Promise(() => {
        try {
            const store = createStore(rootReducer, applyMiddleware(
                logger, thunk
            ));
            if (callback) callback(store);
        } catch (e) {
            console.log(e);
        }
    });
export default configureStore;
