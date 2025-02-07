import React, { useContext } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import { FormContext } from '../utils/FormContext';

const HealthHygienePage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);

  const fields = [
    "Cleanliness of JCO Mess",
    "Persons sleeping on ground",
    "Cleanliness of bathroom and latrines",
    "Cleanliness of OR Cook House",
    "Disposal of Kitchen Wastage",
    "Cleanliness of Barracks/Toilets",
    "Personnel Maintenance",
    "Availability of Drinking Water for Troops",
    "Cleanliness of Civilian Tea Room",
    "Anti-Malaria/Dengue Precautions",
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>Health & Hygiene Report</Text>

      <View style={styles.tableContainer}>
        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={styles.headerCell}>Aspect</Text>
          <Text style={styles.headerCell}>Observations</Text>
          <Text style={styles.headerCell}>Remarks</Text>
        </View>

        {/* Dynamic Fields */}
        {fields.map((item, index) => (
          <View key={index} style={styles.rowContainer}>
            <Text style={styles.cell}>{item}</Text>

            <TextInput
              style={styles.input}
              placeholder="Observation"
              value={formData[`observation_${index}`] || ''}
              onChangeText={text => handleInputChange(`observation_${index}`, text)}
            />

            <TextInput
              style={styles.input}
              placeholder="Remarks"
              value={formData[`remark_${index}`] || ''}
              onChangeText={text => handleInputChange(`remark_${index}`, text)}
            />
          </View>
        ))}
      </View>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="← Previous" onPress={() => navigation.goBack()} color="#757575" />
        <Button title="Next →" onPress={() => navigation.navigate('NextPageName')} color="#2196F3" />
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
    textAlign: 'center',
  },
  tableContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    elevation: 3,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerCell: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  cell: {
    flex: 2,
    fontSize: 14,
    color: '#333',
  },
  input: {
    flex: 2,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
});

export default HealthHygienePage;
