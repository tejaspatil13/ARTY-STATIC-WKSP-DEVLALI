import React, { useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FormContext } from '../utils/FormContext';

const OfficeStoreSealingPage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Set up title styling and home button like DutyHandoverPage.js
  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Office & Store Sealing', 
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
      {/* Office & Store Sealing Section */}
      <Text style={styles.sectionTitle}>5. Office & Store Sealing</Text>

      {/* Office Sealed At */}
      <Text style={styles.label}>Office Sealed At</Text>
      <TextInput
        style={styles.input}
        placeholder="HH:MM"
        value={formData.office_sealed}
        onChangeText={t => handleInputChange('office_sealed', t)}
        keyboardType="numeric"
      />

      {/* Store Sealed At */}
      <Text style={styles.label}>Store Sealed At</Text>
      <TextInput
        style={styles.input}
        placeholder="HH:MM "
        value={formData.store_sealed}
        onChangeText={t => handleInputChange('store_sealed', t)}
        keyboardType="numeric"
      />

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="← Previous" onPress={() => navigation.navigate('GuardCheck')} color="#757575" />
        <Button title="Next →" onPress={() => navigation.navigate('RationCheck')} color="#2196F3" />
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  homeButton: {
    marginLeft: 15,
  },
});

export default OfficeStoreSealingPage;
