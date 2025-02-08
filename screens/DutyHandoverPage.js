import React, { useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  
import { FormContext } from '../utils/FormContext';

const DutyHandoverPage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Duty Handover', 
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
      <Text style={styles.sectionTitle}>1. Duty JCO Handover</Text>

      <Text style={styles.label}>JC No.</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter JC No."
        value={formData.jcNumber}
        onChangeText={t => handleInputChange('jcNumber', t)}
      />

      <Text style={styles.label}>Rank</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Rank"
        value={formData.rank}
        onChangeText={t => handleInputChange('rank', t)}
      />

      <Text style={styles.label}>Name of the Duty JCO</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        value={formData.name}
        onChangeText={t => handleInputChange('name', t)}
      />

      <Text style={styles.label}>Duty Start Time and Date</Text>
      <View style={styles.timeContainer}>
        <TextInput
          style={[styles.input, styles.timeInput]}
          placeholder="Start Time (HH:MM)"
          value={formData.startTime}
          onChangeText={t => handleInputChange('startTime', t)}
        />
        <TextInput
          style={[styles.input, styles.dateInput]}
          placeholder="Start Date (DD/MM/YYYY)"
          value={formData.startDate}
          onChangeText={t => handleInputChange('startDate', t)}
        />
      </View>

      <Text style={styles.label}>Duty End Time and Date</Text>
      <View style={styles.timeContainer}>
        <TextInput
          style={[styles.input, styles.timeInput]}
          placeholder="End Time (HH:MM)"
          value={formData.endTime}
          onChangeText={t => handleInputChange('endTime', t)}
        />
        <TextInput
          style={[styles.input, styles.dateInput]}
          placeholder="End Date (DD/MM/YYYY)"
          value={formData.endDate}
          onChangeText={t => handleInputChange('endDate', t)}
        />
      </View>

      <Text style={styles.subSection}>Took Over Duty From</Text>

      <Text style={styles.label}>Previous JC No.</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Previous JC No."
        value={formData.prevJCNumber}
        onChangeText={t => handleInputChange('prevJCNumber', t)}
      />

      <Text style={styles.label}>Previous Rank</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Previous Rank"
        value={formData.prevRank}
        onChangeText={t => handleInputChange('prevRank', t)}
      />

      <Text style={styles.label}>Previous JCO's Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Previous JCO Name"
        value={formData.prevName}
        onChangeText={t => handleInputChange('prevName', t)}
      />

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapperLeft}>
          <Button title="← Previous" onPress={() => navigation.navigate('Main')} color="#757575" />
        </View>
        <View style={styles.buttonWrapperRight}>
          <Button title="Next →" onPress={() => navigation.navigate('GuardDetails')} color="#2196F3" />
        </View>
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
  timeContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  timeInput: {
    flex: 1,
  },
  dateInput: {
    flex: 2,
  },
  subSection: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  buttonWrapperLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  buttonWrapperRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  homeButton: {
    marginLeft: 15,
  },
});

export default DutyHandoverPage;
