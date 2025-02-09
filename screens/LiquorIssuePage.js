import React, { useContext } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { FormContext } from '../utils/FormContext';
import { Ionicons } from '@expo/vector-icons';

const LiquorIssuePage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);

  // Ensure default data structure
  const liquorIssue = formData[0]?.liquorIssue || { text: '' };

  // Handle input change for liquor issue report
  const handleInputChange = (value) => {
    setFormData(prev => {
      const newFormData = [...prev];
      newFormData[0] = {
        ...newFormData[0],
        liquorIssue: { ...newFormData[0].liquorIssue, text: value },
      };
      return newFormData;
    });
  };

  // Set up the home icon and center the title
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Liquor Issue',
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
      {/* Liquor Issue Section */}
      <Text style={styles.sectionTitle}>24. Liquor Issue</Text>

      {/* Report Text Field */}
      <Text style={styles.label}>
        I have supervised the Rum Issue & have the following to report:
      </Text>
      <TextInput
        style={styles.largeInput}
        placeholder="Enter your report here..."
        value={liquorIssue.text}
        onChangeText={handleInputChange}
        multiline
        numberOfLines={10}
        textAlignVertical="top"
      />

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="← Previous" onPress={() => navigation.navigate('MobileCheck')} color="#757575" />
        <Button title="Next →" onPress={() => navigation.navigate('Improvement')} color="#2196F3" />
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
  largeInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    height: 150, // Set a fixed height for the large text field
    textAlignVertical: 'top', // Align text to the top
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

export default LiquorIssuePage;
