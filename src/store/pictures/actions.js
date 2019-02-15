import {
    GET_PICS_REQUEST,
    CHOOSE_PICTURE,
} from '../types';

export const getPictures = (count) => ({
    type: GET_PICS_REQUEST,
    payload: count,
});

export const choosePicture = (url) => ({
    type: CHOOSE_PICTURE,
    payload: url,
});
