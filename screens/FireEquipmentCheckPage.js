import React, { useContext } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import { FormContext } from '../utils/FormContext';

const FireEquipmentCheckPage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);

  const handleInputChange = (index, field, value) => {
    const updatedFireEquipment = [...formData.fireEquipment];
    updatedFireEquipment[index][field] = value;
    setFormData(prev => ({ ...prev, fireEquipment: updatedFireEquipment }));
  };

  const handleAddField = () => {
    setFormData(prev => ({
      ...prev,
      fireEquipment: [
        ...prev.fireEquipment,
        { fire_point_location: '', fire_type: '', fire_serviceability: '', observations: '' }
      ]
    }));
  };

  const handleRemoveField = (index) => {
    const updatedFireEquipment = [...formData.fireEquipment];
    updatedFireEquipment.splice(index, 1);
    setFormData(prev => ({ ...prev, fireEquipment: updatedFireEquipment }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>8. Fire Equipment Check</Text>

      {formData.fireEquipment.map((item, index) => (
        <View key={index} style={styles.inputContainer}>
          <Text style={styles.label}>Fire Point Location</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Fire Point Location"
            value={item.fire_point_location}
            onChangeText={t => handleInputChange(index, 'fire_point_location', t)}
          />

          <Text style={styles.label}>Type of Fire Equipment</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Fire Equipment Type"
            value={item.fire_type}
            onChangeText={t => handleInputChange(index, 'fire_type', t)}
          />

          <Text style={styles.label}>Serviceability Status</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Serviceability Status"
            value={item.fire_serviceability}
            onChangeText={t => handleInputChange(index, 'fire_serviceability', t)}
          />

          <Text style={styles.label}>Observations/Remarks</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Observations"
            value={item.observations}
            onChangeText={t => handleInputChange(index, 'observations', t)}
          />

          <Button title="Remove" onPress={() => handleRemoveField(index)} color="red" />
        </View>
      ))}

      <Button title="Add Fire Equipment" onPress={handleAddField} color="#4CAF50" />

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="← Previous" onPress={() => navigation.goBack()} color="#757575" />
        <Button title="Next →" onPress={() => navigation.navigate('FoodTasting')} color="#2196F3" />
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
  inputContainer: {
    marginBottom: 15,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
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
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
});

export default FireEquipmentCheckPage;
