import AsyncStorage from '@react-native-community/async-storage';

const USER_KEY = '@usuario:key';
/**
 * Save user data on async storage
 */
async function saveUser(user) {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    return JSON.stringify(user);
  } catch (error) {
    console.log('error', error);
    return 'Error de sintaxis';
  }
}

/**
 * Get user data with async storage
 */
async function getUser() {
  try {
    const item = await AsyncStorage.getItem(USER_KEY);
    return JSON.parse(item);
  } catch (error) {
    console.log('Error al recuperar: ', error.message);
    return 'Error de sintaxis';
  }
}

/**
 * Get user data with async storage
 */
async function deleteUser() {
  try {
    await AsyncStorage.removeItem(USER_KEY);
    const item = await AsyncStorage.getItem(USER_KEY);
    return item == null;
  } catch (error) {
    console.log('Error al eliminar: ', error.message);
    return 'Error de sintaxis';
  }
}

export { saveUser, getUser, deleteUser };
