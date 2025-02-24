import React, { useContext } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { FormContext } from '../utils/FormContext';
import { Ionicons } from '@expo/vector-icons';

const SaleCSDPage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);

  // Handle input change for CSD sale
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Set up the home icon and center the title
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Sale of CSD',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Main')} style={styles.homeButton}>
          <Ionicons name="home" size={28} color="#000" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Sale of CSD Section */}
      <Text style={styles.sectionTitle}>21. Sale of CSD Grocery & Liquor</Text>

      {/* Grocery Sale */}
      <Text style={styles.label}>Sale of CSD Grocery (Rs.):</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        value={formData.csdGrocerySale}
        onChangeText={(text) => handleInputChange('csdGrocerySale', text)}
        keyboardType="numeric"
      />

      {/* Liquor Sale */}
      <Text style={styles.label}>Sale of Liquor (Rs.):</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        value={formData.csdLiquorSale}
        onChangeText={(text) => handleInputChange('csdLiquorSale', text)}
        keyboardType="numeric"
      />

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RollCall')}>
          <Text style={styles.buttonText}>← Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.nextButton]} onPress={() => navigation.navigate('QtrVisit')}>
          <Text style={styles.buttonText}>Next →</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#757575',
    marginHorizontal: 5,
  },
  nextButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  homeButton: {
    marginLeft: 15,
  },
});

export default SaleCSDPage;
