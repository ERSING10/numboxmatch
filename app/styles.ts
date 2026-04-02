import { Dimensions, StyleSheet } from 'react-native';
const windowWidth = Math.min(Dimensions.get('window').width, 400); 
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

  overlay: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10, // Ekranın en üstünde dursun
  },
  gameOverText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ff4444',
    marginBottom: 20,
  },
  restartButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
  },
  restartText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  }
});