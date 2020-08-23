import { StyleSheet } from 'react-native';
import color from './colors';

//Estilos para SplashScreen
const splashStyles = StyleSheet.create({
  image: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.WHITE,
  },
});

//Estilos para LoginScreen
const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  logo: {
    paddingTop: 50,
    alignItems: 'center',
  },

  btnMain: {
    width: 280,
    marginTop: 40,
    marginBottom: 20,
    backgroundColor: color.BLUE,
    borderRadius: 60,
  },

  btnTransparent: {
    backgroundColor: 'rgba(52, 52, 52, 0)',
    borderColor: color.BLUE,
    width: 280,
    borderWidth: 2,
    marginBottom: 20,
    borderRadius: 60,
  },

  btnText: {
    textAlign: 'center',
    fontSize: 17,
    color: color.WHITE,
    paddingVertical: 15,
    // fontFamily: 'Poppins-Bold',
  },

  txtTransparent: {
    color: color.LIGHTPRIMARYCOLOR,
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 15,
    // fontFamily: 'Poppins-Light',
  },
});

const mainStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: color.BLUE,
    // paddingVertical: 15,
  },
  centerContent: {
    textAlign: 'center',
    justifyContent: 'center',
  },
  alignItems: {
    alignItems: 'center',
  },
  verticalRowMargin: {
    marginTop: 10,
    marginBottom: 10,
  },
});

const userStyles = StyleSheet.create({});

export { mainStyles, userStyles, loginStyles, splashStyles };
