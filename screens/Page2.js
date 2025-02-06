import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Page2 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Page 2</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Page2;