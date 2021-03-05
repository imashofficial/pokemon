import { Dispatch } from 'redux';
import { api, errorHandler, formatPattern } from '../utils/api';
import { REQUEST_URL, METHOD } from '../utils/constants';
import { CONSTANTS } from './constants';
import { fromJS } from 'immutable';

// ACTIONS --------------------

export const isLoadingAction = (isLoading: boolean) => ({
    type: CONSTANTS.ON_DATA_LOADING,
    payload: {
        isLoading
    }
});

export const loadListDataAction = (listData: any) => ({
    type: CONSTANTS.ON_LIST_DATA,
    payload: {
        listData
    }
});

export const setCountInPageAction = (countInPage: number) => ({
    type: CONSTANTS.ON_SET_COUNT_IN_PAGE,
    payload: {
        countInPage
    }
});

export const setActivePageAction = (activePage: number) => ({
    type: CONSTANTS.ON_SET_ACTIVE_PAGE,
    payload: {
        activePage
    }
});

export const showDetailAction = (show: boolean) => ({
    type: CONSTANTS.ON_SHOW_DETAIL,
    payload: {
        show
    }
});

export const loadPokemonDataAction = (detailData: any) => ({
    type: CONSTANTS.ON_DETAIL_DATA,
    payload: {
        detailData
    }
});

// ASYNC ACTIONS --------------

export const loadListAsyncAction = (page: number, count: number) => (dispatch: Dispatch, getState: any) => {
    dispatch(isLoadingAction(true));
    return api(formatPattern(REQUEST_URL.POKEMON_LIST, {offset: (page - 1) * count, limit: count}), METHOD.GET)
        .then(res => {
            if (res && res.ok) {
                dispatch(loadListDataAction(fromJS(res.body)));
            }
        })
        .catch((error: any) => {
            errorHandler(error);
        }).finally(() => {
            dispatch(isLoadingAction(false));
        });
};

export const loadPokemonAsyncAction = (url: string) => (dispatch: Dispatch, getState: any) => {
    dispatch(isLoadingAction(true));
    return api(url, METHOD.GET, true)
        .then(res => {
            if (res && res.ok) {
                dispatch(loadPokemonDataAction(fromJS(res.body)));
                dispatch(showDetailAction(true));
            }
        })
        .catch((error: any) => {
            errorHandler(error);
        }).finally(() => {
            dispatch(isLoadingAction(false));
        });
};
