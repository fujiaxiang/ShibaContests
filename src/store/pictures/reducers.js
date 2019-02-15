import {
    GET_PICS_FAILURE, GET_PICS_SUCCESS, GET_PICS_REQUEST, CHOOSE_PICTURE
} from '../types';

const DEFAULT_STATE = {
    pictures: [],
    showing: [],
    n_shown: 0,
    isLoading: false,
    game_ended: false,
    winner: ''
};

export default (state = DEFAULT_STATE, action = {}) => {
    switch (action.type) {
        case GET_PICS_REQUEST: return {
            ...state,
            pictures: [],
            isLoading: true,
        };
        case GET_PICS_SUCCESS: 
            var pictures = action.payload.slice()
            var showing = pictures.slice();
            if (state.winner){
                showing.push(state.winner);
            }
            return {
                ...state,
                pictures: pictures,
                showing: showing,
                winner: state.winner,
                n_shown: state.n_shown + pictures.length,
                isLoading: false,
            };
        case GET_PICS_FAILURE: return {
            ...state,
            isLoading: false,
        };
        case CHOOSE_PICTURE: 
            return {
                ...state,
                winner: action.payload,
            };
        default: return state;
    }
}