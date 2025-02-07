import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
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
            style={styles.input}
            placeholder={`(${String.fromCharCode(97 + index)})`}
            value={field.name}
            onChangeText={(text) => {
              const updatedFields = [...strengthFields];
              updatedFields[index].name = text;
              setStrengthFields(updatedFields);
              setFormData(prev => ({ ...prev, mtStrengthFields: updatedFields }));
            }}
          />
          <TouchableOpacity onPress={() => removeStrengthField(field.id)} style={styles.removeButton}>
            <Text style={styles.removeButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* Add More Button */}
      <TouchableOpacity onPress={addStrengthField} style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add More</Text>
      </TouchableOpacity>

      {/* Navigation Buttons */}
      {/* Navigation Buttons */}
<View style={styles.buttonContainer}>
  <Button title="← Previous" onPress={() => navigation.goBack()} color="#757575" />
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
  },
  removeButton: {
    backgroundColor: 'red',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginLeft: 10,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
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
});

export default MTBriefingPage;
