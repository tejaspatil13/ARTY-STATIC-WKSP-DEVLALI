import React, { useContext } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { FormContext } from '../utils/FormContext';
import { Ionicons } from '@expo/vector-icons';

const RollCallPage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);

  // Handle input change for roll call location and briefing
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Set up the home icon and center the title
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Roll Call',
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
      {/* Roll Call Section */}
      <Text style={styles.sectionTitle}>20. Roll Call</Text>

      {/* Roll Call Location */}
      <Text style={styles.label}>I attended the Roll Call at:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Roll Call Location"
        value={formData.rollCallLocation}
        onChangeText={t => handleInputChange('rollCallLocation', t)}
      />

      {/* Briefing Details */}
      <Text style={styles.label}>Briefed tps on the following aspects:</Text>
      <TextInput
        style={styles.largeInput}
        placeholder="Enter briefing details..."
        value={formData.rollCallBriefing}
        onChangeText={t => handleInputChange('rollCallBriefing', t)}
        multiline={true}
        numberOfLines={10}
        textAlignVertical="top"
      />

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="← Previous" onPress={() => navigation.navigate('MedicalVisit')} color="#757575" />
        <Button title="Next →" onPress={() => navigation.navigate('SaleCSD')} color="#2196F3" />
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
    marginBottom: 10,
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
  largeInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    height: 150,
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

export default RollCallPage;
