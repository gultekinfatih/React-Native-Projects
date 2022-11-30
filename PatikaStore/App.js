import {View, Text, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import Products from './src/components/Products/Products';
import SearchBar from './src/components/SearchBar/SearchBar';
import data from './src/data.json';

const App = () => {
  const renderProduct = ({item}) => <Products products={item} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PatikaStore</Text>
      <SearchBar />
      <FlatList
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        data={data}
        renderItem={renderProduct}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    color: '#800080',
    fontSize: 30,
    fontWeight: 'bold',
    margin: 5,
  },
});
