import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FormContext } from '../utils/FormContext';

const MedicalVisitPage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);
  const [observations, setObservations] = useState(formData.medicalVisitObservations || [{ id: 1, text: '' }]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addObservation = () => {
    const newObservation = { id: observations.length + 1, text: '' };
    const updatedObservations = [...observations, newObservation];
    setObservations(updatedObservations);
    setFormData(prev => ({ ...prev, medicalVisitObservations: updatedObservations }));
  };

  const removeObservation = (id) => {
    const updatedObservations = observations.filter(obs => obs.id !== id);
    setObservations(updatedObservations);
    setFormData(prev => ({ ...prev, medicalVisitObservations: updatedObservations }));
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Medical Visit (MH Devlali)',
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
      <Text style={styles.sectionTitle}>19. Medical Visit (MH Devlali)</Text>

      <Text style={styles.label}>Time</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Time"
        value={formData.medicalVisitTime}
        onChangeText={(t) => handleInputChange('medicalVisitTime', t)}
      />

      <Text style={styles.label}>Observations</Text>
      {observations.map((obs, index) => (
        <View key={obs.id} style={styles.observationRow}>
          <TextInput
            style={styles.input}
            placeholder={`Observation ${index + 1}`}
            value={obs.text}
            onChangeText={(text) => {
              const updatedObservations = [...observations];
              updatedObservations[index].text = text;
              setObservations(updatedObservations);
              setFormData(prev => ({ ...prev, medicalVisitObservations: updatedObservations }));
            }}
          />
          <TouchableOpacity onPress={() => removeObservation(obs.id)} style={styles.removeButton}>
            <Text style={styles.removeButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity onPress={addObservation} style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add Observation</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <Button title="← Previous" onPress={() => navigation.navigate('DefenseLandSurvey')} color="#757575" />
        <Button title="Next →" onPress={() => navigation.navigate('RollCall')} color="#2196F3" />
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
  observationRow: {
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
  homeButton: {
    marginLeft: 15,
  },
});

export default MedicalVisitPage;
