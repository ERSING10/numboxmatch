import { StyleSheet } from 'react-native';
import { BLOCK_SIZE } from './constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#FAFAFA', 
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  board: {
    borderWidth: 2,
    borderColor: '#424242', 
    backgroundColor: '#EEEEEE', 
    padding: 2,
    borderRadius: 8, 
  },
  row: {
    flexDirection: 'row', 
  },
  cell: {
    width: BLOCK_SIZE, 
    height: BLOCK_SIZE, 
    borderWidth: 1, 
    borderColor: '#BDBDBD', // hücrelerin kendi aralarındaki ince çizgiler
    alignItems: 'center', 
    justifyContent: 'center',
    margin: 1, // hücreler arasına boşluk
    borderRadius: 4, 
  },
  cellText: {
    fontSize: 22,
    fontWeight: 'bold', 
    color: '#333333',
  },
});