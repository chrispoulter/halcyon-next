import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import { getItem, setItem, removeItem } from '../../utils/storage';

const getInitialState = () => {
    const accessToken = getItem('accessToken');

    if (!accessToken) {
        return {
            accessToken: undefined,
            currentUser: undefined
        };
    }

    const currentUser = jwtDecode(accessToken);

    return {
        accessToken,
        currentUser
    };
};

const slice = createSlice({
    name: 'auth',
    initialState: getInitialState(),
    reducers: {
        setToken: (state, { payload: { accessToken, persist } }) => {
            console.log('setToken', accessToken, persist);
            state.accessToken = accessToken;
            state.currentUser = jwtDecode(accessToken);
            setItem('accessToken', accessToken, persist);
        },
        removeToken: state => {
            console.log('removeToken');
            state.accessToken = undefined;
            state.currentUser = undefined;
            removeItem('accessToken');
        }
    }
});

export const { setToken, removeToken } = slice.actions;

export const authReducer = slice.reducer;

export const selectCurrentUser = state => state.auth.currentUser;
