import React, { useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  
import { FormContext } from '../utils/FormContext';

const RationCheckPage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Set up title and home button
  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Ration Check', 
      headerTitleAlign: 'center', 
      headerTitleStyle: { 
        fontSize: 22, 
        fontWeight: 'bold', 
        color: '#333' 
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
      {/* Section Title */}
      <Text style={styles.sectionTitle}>6. Ration Check</Text>

      {/* Observations Input */}
      <Text style={styles.label}>Observations</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Enter observations..."
        value={formData.ration_observations}
        onChangeText={text => handleInputChange('ration_observations', text)}
        multiline
      />

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="← Previous" onPress={() => navigation.goBack()} color="#757575" />
        <Button title="Next →" onPress={() => navigation.navigate('CookHouseObservations')} color="#2196F3" />
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
    marginBottom: 5,
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
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  homeButton: {
    marginLeft: 15,
  },
});

export default RationCheckPage;
