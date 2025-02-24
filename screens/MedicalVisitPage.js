import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FormContext } from '../utils/FormContext';

const MedicalVisitPage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);
  const [observations, setObservations] = useState(formData.medicalVisitObservations || []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addObservation = () => {
    const newObservations = [...observations, { id: observations.length + 1, text: '' }];
    setObservations(newObservations);
    setFormData((prev) => ({ ...prev, medicalVisitObservations: newObservations }));
  };

  const updateObservation = (id, text) => {
    const updatedObservations = observations.map((obs) =>
      obs.id === id ? { ...obs, text } : obs
    );
    setObservations(updatedObservations);
    setFormData((prev) => ({ ...prev, medicalVisitObservations: updatedObservations }));
  };

  const removeObservation = (id) => {
    const updatedObservations = observations.filter((obs) => obs.id !== id);
    setObservations(updatedObservations);
    setFormData((prev) => ({ ...prev, medicalVisitObservations: updatedObservations }));
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
          <Text style={styles.observationLabel}>{index + 1}.</Text>
          <TextInput
            style={styles.observationInput}
            placeholder={`Observation ${index + 1}`}
            value={obs.text}
            onChangeText={(text) => updateObservation(obs.id, text)}
          />
          <TouchableOpacity onPress={() => removeObservation(obs.id)} style={styles.deleteButton}>
            <Ionicons name="trash" size={20} color="red" />
          </TouchableOpacity>
        </View>
      ))}

      <Button title="Add Observation" onPress={addObservation} color="#2196F3" />

      {/* Navigation Buttons */}
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
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  observationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  observationLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  observationInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
  },
  deleteButton: {
    marginLeft: 10,
    padding: 5,
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
