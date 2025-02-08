import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { FormContext } from '../utils/FormContext';

const DefenseLandSurveyPage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);
  const [observations, setObservations] = useState(formData.defenseLandSurvey.observations || []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      defenseLandSurvey: { ...prev.defenseLandSurvey, [field]: value },
    }));
  };

  const toggleCheckbox = (field) => {
    setFormData((prev) => ({
      ...prev,
      defenseLandSurvey: {
        ...prev.defenseLandSurvey,
        [field]: !prev.defenseLandSurvey[field],
      },
    }));
  };

  const addObservation = () => {
    const newObservations = [...observations, { id: observations.length + 1, text: '' }];
    setObservations(newObservations);
    setFormData((prev) => ({
      ...prev,
      defenseLandSurvey: { ...prev.defenseLandSurvey, observations: newObservations },
    }));
  };

  const updateObservation = (id, text) => {
    const newObservations = observations.map((obs) =>
      obs.id === id ? { ...obs, text } : obs
    );
    setObservations(newObservations);
    setFormData((prev) => ({
      ...prev,
      defenseLandSurvey: { ...prev.defenseLandSurvey, observations: newObservations },
    }));
  };

  const deleteObservation = (id) => {
    const newObservations = observations.filter((obs) => obs.id !== id);
    setObservations(newObservations);
    setFormData((prev) => ({
      ...prev,
      defenseLandSurvey: { ...prev.defenseLandSurvey, observations: newObservations },
    }));
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Defense Land Survey',
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
      <Text style={styles.sectionTitle}>12. Defense Land Survey</Text>

      <Text style={styles.label}>
        I visited def land survey No. 36,38,40,41,43,59 along with a rep of the RP/QM and made entry in the Def land visit register. I have the following to report:
      </Text>

      {/* Checkbox Section */}
      <View style={styles.checkboxContainer}>
        <View style={styles.checkboxRow}>
          <Checkbox
            value={formData.defenseLandSurvey.RP || false}
            onValueChange={() => toggleCheckbox('RP')}
          />
          <Text style={styles.checkboxLabel}>RP (Regimental Police)</Text>
        </View>
        <View style={styles.checkboxRow}>
          <Checkbox
            value={formData.defenseLandSurvey.QM || false}
            onValueChange={() => toggleCheckbox('QM')}
          />
          <Text style={styles.checkboxLabel}>QM (Quartermaster)</Text>
        </View>
      </View>

      {/* Dynamic Observations */}
      <Text style={styles.label}>Observations/Findings:</Text>
      {observations.map((obs, index) => (
        <View key={obs.id} style={styles.observationRow}>
          <Text style={styles.observationLabel}>{index + 1}.</Text>
          <TextInput
            style={styles.observationInput}
            placeholder={`Observation ${index + 1}`}
            value={obs.text}
            onChangeText={(text) => updateObservation(obs.id, text)}
          />
          <TouchableOpacity onPress={() => deleteObservation(obs.id)} style={styles.deleteButton}>
            <Ionicons name="trash" size={20} color="red" />
          </TouchableOpacity>
        </View>
      ))}

      <Button title="Add Observation" onPress={addObservation} color="#2196F3" />

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="← Previous" onPress={() => navigation.navigate('LandMatters')} color="#757575" />
        <Button title="Next →" onPress={() => navigation.navigate('QuarterGdKote')} color="#2196F3" />
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
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#555',
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 14,
    color: '#555',
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

export default DefenseLandSurveyPage;
