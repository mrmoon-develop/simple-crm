import React, { createContext, useReducer } from 'react';
import { saveUser, deleteUser } from '../storage/userAsyncStorage';
import { ToastAndroid } from 'react-native';

const initialState = {
  user: {
    id: '',
    name: '',
    type: '',
    email: '',
    password: '',
    phone: '',
    company_id: '',
  },
  activo: false,
};

const userReducer = (state = initialState, payload) => {
  console.log('payload', payload);
  switch (payload.type) {
    case 'sing-in':
      console.log('Bienvenidos al sistema');
      return { ...state, user: payload.data, activo: true };
    case 'sign':
      saveUser(payload.data).then((msg) => {
        console.log('user guardado');
      });
      ToastAndroid.show('Inicio de sesión exitoso', ToastAndroid.SHORT);

      return { ...state, user: payload.data, activo: true };
    case 'logout':
      deleteUser().then((msg) => {
        console.log(msg);
      });

      ToastAndroid.show('Cerrando sesion', ToastAndroid.SHORT);

      return { ...state, user: payload.data, activo: false };
    default:
      return state;
  }
};

const UserContext = createContext(initialState);

function UserProvider(props) {
  const [login, loginAction] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={[login, loginAction]}>
      {props.children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
