import React, { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  UserInfo: localStorage.getItem('UserInfo')
    ? JSON.parse(localStorage.getItem('UserInfo'))
    : null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'USER_SIGNIN':
      localStorage.setItem('UserInfo', JSON.stringify(action.payload));
      return { ...state, UserInfo: action.payload };
    default:
      return state;
  }
};

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
