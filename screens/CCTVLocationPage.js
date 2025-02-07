import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FormContext } from '../utils/FormContext';

const CCTVLocationPage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);
  const [locations, setLocations] = useState(formData.cctvLocations || [{ id: 1, location: '', total: '', serviceable: '', unserviceable: '', remarks: '' }]);

  const handleInputChange = (id, field, value) => {
    const updatedLocations = locations.map((loc) =>
      loc.id === id ? { ...loc, [field]: value } : loc
    );
    setLocations(updatedLocations);
    setFormData((prev) => ({ ...prev, cctvLocations: updatedLocations }));
  };

  const addLocationField = () => {
    const newField = { id: locations.length + 1, location: '', total: '', serviceable: '', unserviceable: '', remarks: '' };
    const updatedFields = [...locations, newField];
    setLocations(updatedFields);
    setFormData((prev) => ({ ...prev, cctvLocations: updatedFields }));
  };

  const removeLocationField = (id) => {
    const updatedFields = locations.filter((field) => field.id !== id);
    setLocations(updatedFields);
    setFormData((prev) => ({ ...prev, cctvLocations: updatedFields }));
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'CCTV Locations',
      headerTitleAlign: 'center',
      headerTitleStyle: { fontSize: 22, fontWeight: 'bold', color: '#333' },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Main')} style={styles.homeButton}>
          <Ionicons name="home" size={28} color="#000" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>CCTV Locations</Text>
      {locations.map((loc) => (
        <View key={loc.id} style={styles.fieldGroup}>
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={loc.location}
            onChangeText={(text) => handleInputChange(loc.id, 'location', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Total"
            keyboardType="numeric"
            value={loc.total}
            onChangeText={(text) => handleInputChange(loc.id, 'total', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Serviceable"
            keyboardType="numeric"
            value={loc.serviceable}
            onChangeText={(text) => handleInputChange(loc.id, 'serviceable', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Unserviceable"
            keyboardType="numeric"
            value={loc.unserviceable}
            onChangeText={(text) => handleInputChange(loc.id, 'unserviceable', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Remarks"
            value={loc.remarks}
            onChangeText={(text) => handleInputChange(loc.id, 'remarks', text)}
          />
          <TouchableOpacity onPress={() => removeLocationField(loc.id)} style={styles.removeButton}>
            <Text style={styles.removeButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity onPress={addLocationField} style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add Location</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <Button title="← Previous" onPress={() => navigation.goBack()} color="#757575" />
        <Button title="Next →" onPress={() => navigation.navigate('NextPage')} color="#2196F3" />
      </View>
    </ScrollView>
  );
};

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
  fieldGroup: {
    marginBottom: 15,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  removeButton: {
    backgroundColor: 'red',
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
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

export default CCTVLocationPage;
