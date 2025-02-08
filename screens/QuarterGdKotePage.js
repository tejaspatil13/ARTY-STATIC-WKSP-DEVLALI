import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { FormContext } from '../utils/FormContext';
import { Ionicons } from '@expo/vector-icons';

const QuarterGdKotePage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);
  const [rows, setRows] = useState([{ id: 1, typeOfArms: '', held: '', armsOut: '', armsIn: '', remarks: '' }]);

  // Add a new row
  const addRow = () => {
    const newRow = { id: rows.length + 1, typeOfArms: '', held: '', armsOut: '', armsIn: '', remarks: '' };
    setRows([...rows, newRow]);
  };

  // Handle input change for a specific row and field
  const handleInputChange = (id, field, value) => {
    const updatedRows = rows.map(row =>
      row.id === id ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
    setFormData(prev => ({ ...prev, quarterGdKoteRows: updatedRows }));
  };

  // Delete a row
  const deleteRow = (id) => {
    const updatedRows = rows.filter(row => row.id !== id);
    setRows(updatedRows);
    setFormData(prev => ({ ...prev, quarterGdKoteRows: updatedRows }));
  };

  // Set up the home icon and center the title
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Quarter Gd & Kote',
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
      {/* Quarter Gd & Kote Section */}
      <Text style={styles.sectionTitle}>13. Quarter Gd & Kote</Text>
      <Text style={styles.label}>I have physically checked the Arms in Kote on:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter date"
        value={formData.koteCheckDate}
        onChangeText={t => setFormData(prev => ({ ...prev, koteCheckDate: t }))}
      />

      {/* Table Rows */}
      {rows.map((row, index) => (
        <View key={row.id} style={styles.card}>
          <View style={styles.rowHeader}>
            <Text style={styles.label}>Type of Arms</Text>
            <TouchableOpacity onPress={() => deleteRow(row.id)}>
              <Ionicons name="trash" size={24} color="red" />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter Type of Arms"
            value={row.typeOfArms}
            onChangeText={t => handleInputChange(row.id, 'typeOfArms', t)}
          />

          <Text style={styles.label}>Held</Text>
          <TextInput
            style={styles.input}
            placeholder="Held"
            value={row.held}
            onChangeText={t => handleInputChange(row.id, 'held', t)}
          />

          <Text style={styles.label}>Arms Out of Kote</Text>
          <TextInput
            style={styles.input}
            placeholder="Arms Out"
            value={row.armsOut}
            onChangeText={t => handleInputChange(row.id, 'armsOut', t)}
          />

          <Text style={styles.label}>Arms In Kote</Text>
          <TextInput
            style={styles.input}
            placeholder="Arms In"
            value={row.armsIn}
            onChangeText={t => handleInputChange(row.id, 'armsIn', t)}
          />

          <Text style={styles.label}>Remarks</Text>
          <TextInput
            style={styles.input}
            placeholder="Remarks"
            value={row.remarks}
            onChangeText={t => handleInputChange(row.id, 'remarks', t)}
          />
        </View>
      ))}

      {/* Add Row Button */}
      <TouchableOpacity onPress={addRow} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Another Entry</Text>
      </TouchableOpacity>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="← Previous" onPress={() => navigation.navigate('DefenseLandSurvey')} color="#757575" />
        <Button title="Next →" onPress={() => navigation.navigate('AmnMagazine')} color="#2196F3" />
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
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  homeButton: {
    marginLeft: 15,
  },
  addButton: {
    padding: 12,
    backgroundColor: '#34d399',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default QuarterGdKotePage;
