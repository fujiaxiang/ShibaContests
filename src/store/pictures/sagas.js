import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
    GET_PICS_FAILURE,
    GET_PICS_REQUEST,
    GET_PICS_SUCCESS,
} from '../types';

const API = 'https://us-central1-react-training-101.cloudfunctions.net/api/shibes?';

function* getPictures(action) {
    try {
        const url = API + `count=${action.payload}`;
        const response = yield call(axios.get, url);
        yield put({
            type: GET_PICS_SUCCESS,
            payload: response.data,
        });
    } catch (err) {
        console.error(err);
        yield put({ type: GET_PICS_FAILURE });
    }
}

export default function* () {
    yield takeEvery(GET_PICS_REQUEST, getPictures);
};
