import { createSelector } from 'reselect';

const getList = (state: any) => {
    return state.get('list');
};

const getIsLoading = (state: any) => {
    return state.get('isLoading');
};

const getCountInPage = (state: any) => {
    return state.get('countInPage');
};

const getActivePage = (state: any) => {
    return state.get('activePage');
};

const getShowDetail = (state: any) => {
    return state.get('detailsModalIsShown');
};

const getDetails = (state: any) => {
    return state.get('details');
};

// SELECTORS

export const pokemonListSelector = createSelector([getList], list => {
    const listData = list && list.toJS ? list.toJS() : {};
    return listData.results !== undefined ? listData.results : [];
});

export const isLoadingSelector = createSelector([getIsLoading], isLoading => isLoading);

export const getCountInPageSelector = createSelector([getCountInPage], countInPage => countInPage);

export const getActivePageSelector = createSelector([getActivePage], activePage => activePage);

export const getShowDetailSelector = createSelector([getShowDetail], show => show);

export const pokemonListCountSelector = createSelector([getList], list => {
    const listData = list && list.toJS ? list.toJS() : {};
    return listData.count !== undefined ? listData.count : 0;
});

export const getDetailsSelector = createSelector([getDetails], details => details && details.toJS ? details.toJS() : {});
