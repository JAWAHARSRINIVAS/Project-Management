import React, { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  userInfo: localStorage.getItem('UserInfo')
    ? JSON.parse(localStorage.getItem('UserInfo'))
    : null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'USER_SIGNIN':
        localStorage.setItem('USerInfo', JSON.stringify(action.payload));
      return { ...state, userInfo: action.payload };
    default:
      return state;
  }
};

export default function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <div>
      <Store.Provider value={value}>{props.children}</Store.Provider>
    </div>
  );
}
