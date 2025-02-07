import React, { useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FormContext } from '../utils/FormContext';

const LandMattersPage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);

  const handleInputChange = (index, field, value) => {
    const updatedLandMatters = [...(formData.landMatters || [])];
    updatedLandMatters[index][field] = value;
    setFormData(prev => ({ ...prev, landMatters: updatedLandMatters }));
  };

  const addLandMatter = () => {
    setFormData(prev => ({
      ...prev,
      landMatters: [...(prev.landMatters || []), { location: '', time: '', remark: '' }],
    }));
  };

  const removeLandMatter = index => {
    const updatedLandMatters = [...(formData.landMatters || [])];
    updatedLandMatters.splice(index, 1);
    setFormData(prev => ({ ...prev, landMatters: updatedLandMatters }));
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Land Matters',
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
      <Text style={styles.sectionTitle}>11. Land Matters</Text>

      {formData.landMatters?.map((entry, index) => (
        <View key={index} style={styles.entryContainer}>
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Location"
            value={entry.location}
            onChangeText={text => handleInputChange(index, 'location', text)}
          />

          <Text style={styles.label}>Time</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Time"
            value={entry.time}
            onChangeText={text => handleInputChange(index, 'time', text)}
          />

          <Text style={styles.label}>Remark</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Remark"
            value={entry.remark}
            onChangeText={text => handleInputChange(index, 'remark', text)}
          />

          <Button title="Remove" onPress={() => removeLandMatter(index)} color="red" />
        </View>
      ))}

      <Button title="Add Entry" onPress={addLandMatter} color="#4CAF50" />

      <View style={styles.buttonContainer}>
        <Button title="← Previous" onPress={() => navigation.goBack()} color="#757575" />
        <Button title="Next →" onPress={() => navigation.navigate('DefenseLandSurvey')} color="#2196F3" />
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
  entryContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
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
  homeButton: {
    marginLeft: 15,
  },
});

export default LandMattersPage;