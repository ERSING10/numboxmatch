import { Dimensions, StyleSheet } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const safePadding = 50; 
const CELL_SIZE = Math.floor((windowWidth - safePadding) / 8); 

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
    width: CELL_SIZE,  // Dinamik genişlik
    height: CELL_SIZE, // Dinamik yükseklik
    borderWidth: 1, 
    borderColor: '#BDBDBD', 
    alignItems: 'center', 
    justifyContent: 'center',
    margin: 1, 
    borderRadius: 4, 
  },
  cellText: {
    fontSize: 22,
    fontWeight: 'bold', 
    color: '#333333',
  },
});