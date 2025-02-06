import React from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';

const MainScreen = ({ navigation }) => {
  // Generate an array of page numbers from 2 to 28
  const pages = Array.from({ length: 27 }, (_, i) => i + 2);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* App Title */}
      <Text style={styles.title}>ARTY STATIC WKSP DEVLALI - DUTY JCO FORM</Text>

      {/* Start Duty Handover Button */}
      <View style={styles.buttonContainer}>
        <Button
          title="Start Duty Handover"
          onPress={() => navigation.navigate('DutyHandover')}
          color="#2196F3"
        />
      </View>

      {/* Buttons for Other Pages */}
      {pages.map((page) => (
        <View key={page} style={styles.buttonContainer}>
          <Button
            title={`Go to Page ${page}`}
            onPress={() => navigation.navigate(`Page${page}`)}
            color="#4CAF50"
          />
        </View>
      ))}
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  buttonContainer: {
    width: '80%',
    marginVertical: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
});

export default MainScreen;