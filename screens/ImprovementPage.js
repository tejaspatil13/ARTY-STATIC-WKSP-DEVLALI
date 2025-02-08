import React, { useContext } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { FormContext } from '../utils/FormContext';
import { Ionicons } from '@expo/vector-icons';

const ImprovementPage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);

  // Handle input change for improvement points
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Set up the home icon and center the title
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Improvement in Wksp Tech Processes',
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
      {/* Improvement Section */}
      <Text style={styles.sectionTitle}>25. Improvement in Wksp Tech Processes and Functioning/Welfare of Tps.</Text>

      {/* Points Observed */}
      <Text style={styles.label}>Points observed are as follows (Min two compulsory):</Text>

      {/* Point (a) */}
      <Text style={styles.subLabel}>(a)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter improvement point (a)"
        value={formData.improvementPointA}
        onChangeText={t => handleInputChange('improvementPointA', t)}
      />

      {/* Point (b) */}
      <Text style={styles.subLabel}>(b)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter improvement point (b)"
        value={formData.improvementPointB}
        onChangeText={t => handleInputChange('improvementPointB', t)}
      />

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="← Previous" onPress={() => navigation.navigate('LiquorIssue')} color="#757575" />
        <Button title="Next →" onPress={() => navigation.navigate('Awareness')} color="#2196F3" />
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
  subLabel: {
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

export default ImprovementPage;
