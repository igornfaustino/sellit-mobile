import { StyleSheet } from 'react-native';
import constants from 'expo-constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: constants.statusBarHeight + 20,
    backgroundColor: '#f5f5d7'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    fontSize: 24,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'red'
  },
  headerText: {
    fontSize: 15
  },
  headerTextBold: {
    fontWeight: 'bold'
  }
});
