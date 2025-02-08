import React, { useContext } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { FormContext } from '../utils/FormContext';
import { Ionicons } from '@expo/vector-icons';

const HandoverDutiesPage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);

  // Handle input change
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      handoverDuties: { ...prev.handoverDuties, [field]: value },
    }));
  };

  // Set up the home icon and center the title
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Handover Duties',
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
      {/* Handover Details Section */}
      <Text style={styles.sectionTitle}>I am handing over my duties to:</Text>

      <Text style={styles.label}>No</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter No"
        value={formData.handoverDuties.handoverNo}
        onChangeText={t => handleInputChange('handoverNo', t)}
      />

      <Text style={styles.label}>Rank</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Rank"
        value={formData.handoverDuties.handoverRank}
        onChangeText={t => handleInputChange('handoverRank', t)}
      />

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        value={formData.handoverDuties.handoverName}
        onChangeText={t => handleInputChange('handoverName', t)}
      />

      {/* Date and Time Input */}
      <Text style={styles.label}>Date</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Date (DD/MM/YYYY)"
        value={formData.handoverDuties.handoverDate}
        onChangeText={t => handleInputChange('handoverDate', t)}
      />

      <Text style={styles.label}>Time</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Time (HH:MM)"
        value={formData.handoverDuties.handoverTime}
        onChangeText={t => handleInputChange('handoverTime', t)}
      />

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="← Previous" onPress={() => navigation.navigate('Awareness')} color="#757575" />
        <Button title=" Submit " onPress={() => navigation.navigate('Main')} color="#07d363" />
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

export default HandoverDutiesPage;
