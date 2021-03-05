import { fromJS } from 'immutable';

// Constants
import { CONSTANTS } from './constants';

export interface pokemonStateType {
    isLoading: boolean,
    list: Object,
    activePage: number,
    countInPage: number,
    details: Object,
    detailsModalIsShown: boolean
}

const pokemonState: pokemonStateType = {
    isLoading: false,
    list: {},
    activePage: 1,
    countInPage: 10,
    details: {},
    detailsModalIsShown: false
}

const initialState = fromJS(pokemonState);

const reducer = (state = initialState, action: any): any => {
    switch (action.type) {
        case CONSTANTS.ON_DATA_LOADING:
            return state.set('isLoading', action.payload.isLoading);

        case CONSTANTS.ON_LIST_DATA:
            return state.set('list', action.payload.listData);

        case CONSTANTS.ON_SET_COUNT_IN_PAGE:
            return state.set('countInPage', action.payload.countInPage);

        case CONSTANTS.ON_SET_ACTIVE_PAGE:
            return state.set('activePage', action.payload.activePage);

        case CONSTANTS.ON_SHOW_DETAIL:
            return state.set('detailsModalIsShown', action.payload.show);

        case CONSTANTS.ON_DETAIL_DATA:
            return state.set('details', action.payload.detailData);

        default:
            return state;
    }
};

export default reducer;