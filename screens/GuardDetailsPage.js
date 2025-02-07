<<<<<<< HEAD
import React, { useContext, useLayoutEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  
=======
import React, { useContext } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
>>>>>>> d7e76c7e36004204093334b24bfb936d2d2923d1
import { FormContext } from '../utils/FormContext';
import { Ionicons } from '@expo/vector-icons';

const GuardDetailsPage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

<<<<<<< HEAD
  // Set up the home icon and center the header title
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Guard Details', 
      headerTitleAlign: 'center',  // Center the header title
      headerTitleStyle: { 
        fontSize: 22, 
        fontWeight: 'bold', 
        color: '#333' 
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Main')} style={styles.homeButton}>
          <Ionicons name="home" size={28} color="#000" />
=======
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity 
          onPress={() => navigation.navigate('MainScreen')}
          style={styles.headerButton}
        >
          <Ionicons name="home-outline" size={24} color="#2196F3" />
>>>>>>> d7e76c7e36004204093334b24bfb936d2d2923d1
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
<<<<<<< HEAD
      {/* Left-aligned section title */}
=======
>>>>>>> d7e76c7e36004204093334b24bfb936d2d2923d1
      <Text style={styles.sectionTitle}>2. Kote Guard Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Mounted at (hrs)"
        value={formData.koteGuardTime}
        onChangeText={t => handleInputChange('koteGuardTime', t)}
      />
      <TextInput
        style={styles.input}
        placeholder="Findings"
        value={formData.koteGuardFindings}
        onChangeText={t => handleInputChange('koteGuardFindings', t)}
      />
<<<<<<< HEAD

=======
>>>>>>> d7e76c7e36004204093334b24bfb936d2d2923d1
      <View style={styles.buttonContainer}>
        <Button
          title="← Previous"
          onPress={() => navigation.navigate('DutyHandover')}
          color="#757575"
        />
        <Button
          title="Next →"
          onPress={() => navigation.navigate('MTBriefing')}
          color="#2196F3"
        />
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
<<<<<<< HEAD
  homeButton: {
    marginLeft: 15,
  },
=======
  headerButton: {
    marginLeft: 15,
    padding: 5,
  }
>>>>>>> d7e76c7e36004204093334b24bfb936d2d2923d1
});

export default GuardDetailsPage;

