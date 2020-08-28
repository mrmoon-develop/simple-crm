import { StyleSheet } from 'react-native';
import color from './colors';
import colors from './colors';

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
    borderRadius: 60,
    fontWeight: 'bold',
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
    color: color.GRAY,
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
  userDetailsContainer: {
    textAlign: 'left',
    height: 20,
  },
  userDetailsText: {
    color: colors.WHITE,
    fontWeight: 'bold',
    fontSize: 20,
  },
  overlayText: {
    color: 'black',
    fontSize: 30,
  },
});

const newIssueFormStyles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.RED,
    padding: 30,
    borderBottomRightRadius: 20,
  },
  headerText: {
    color: colors.WHITE,
    fontWeight: 'bold',
    fontSize: 30,
  },
  marginVertical: {
    marginVertical: 10,
  },
  fieldText: {
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
  centerColItems: {
    alignItems: 'center',
  },
  sectionHeader: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  textArea: {
    height: 150,
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
});

const userStyles = StyleSheet.create({});
const pollStyles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '100',
  },
  rowPicker: {
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 30,
  },
  row: {
    marginBottom: 30,
  },
  center: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  textArea: {
    height: 150,
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  marginVertical: {
    marginVertical: 10,
  },
});

export {
  pollStyles,
  mainStyles,
  userStyles,
  loginStyles,
  splashStyles,
  newIssueFormStyles,
};
