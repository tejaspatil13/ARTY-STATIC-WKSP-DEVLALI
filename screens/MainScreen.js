import React from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';

const MainScreen = ({ navigation }) => {
  const pages = Array.from({ length: 28 }, (_, i) => i + 1);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>ARTY STATIC WKSP DEVLALI - DUTY JCO FORM</Text>
      {pages.map((page) => (
        <View key={page} style={styles.buttonContainer}>
          <Button
            title={`Go to Page ${page}`}
            onPress={() => navigation.navigate(`Page${page}`)}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    marginVertical: 10,
  },
});

export default MainScreen;