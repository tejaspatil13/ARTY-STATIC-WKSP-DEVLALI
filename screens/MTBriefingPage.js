import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importing Ionicons
import { FormContext } from '../utils/FormContext';

const MTBriefingPage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);
  const [strengthFields, setStrengthFields] = useState(formData.mtStrengthFields || [{ id: 1, name: '' }]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addStrengthField = () => {
    const newField = { id: strengthFields.length + 1, name: '' };
    const updatedFields = [...strengthFields, newField];
    setStrengthFields(updatedFields);
    setFormData(prev => ({ ...prev, mtStrengthFields: updatedFields }));
  };

  const removeStrengthField = (id) => {
    const updatedFields = strengthFields.filter(field => field.id !== id);
    setStrengthFields(updatedFields);
    setFormData(prev => ({ ...prev, mtStrengthFields: updatedFields }));
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'MT Briefing',
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
      {/* Section Title */}
      <Text style={styles.sectionTitle}>3. MT Briefing</Text>

      {/* Time Input */}
      <Text style={styles.label}>Time</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Time"
        value={formData.mt_time}
        onChangeText={t => handleInputChange('mt_time', t)}
      />

      {/* Strength Input */}
      <Text style={styles.label}>Strength</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Strength"
        value={formData.mt_strength}
        onChangeText={t => handleInputChange('mt_strength', t)}
      />

      {/* Strength Details Section */}
      <Text style={styles.label}>Details:</Text>
      {strengthFields.map((field, index) => (
        <View key={field.id} style={styles.fieldRow}>
          <TextInput
            style={styles.fullWidthInput}
            placeholder={`(${String.fromCharCode(97 + index)}) Enter details`}
            value={field.name}
            onChangeText={(text) => {
              const updatedFields = [...strengthFields];
              updatedFields[index].name = text;
              setStrengthFields(updatedFields);
              setFormData(prev => ({ ...prev, mtStrengthFields: updatedFields }));
            }}
          />
          <TouchableOpacity onPress={() => removeStrengthField(field.id)} style={styles.removeButton}>
            <Ionicons name="trash" size={24} color="white" /> {/* Trash bin icon */}
          </TouchableOpacity>
        </View>
      ))}

      {/* Add More Button */}
      <TouchableOpacity onPress={addStrengthField} style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add More</Text>
      </TouchableOpacity>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="← Previous" onPress={() => navigation.navigate('GuardDetails')} color="#757575" />
        <Button title="Next →" onPress={() => navigation.navigate('GuardCheck')} color="#2196F3" />
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
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  fullWidthInput: {
    flex: 1, // Makes the input take full width
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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

export default MTBriefingPage;
