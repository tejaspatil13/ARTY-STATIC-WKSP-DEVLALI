import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { FormContext } from '../utils/FormContext';
import { Ionicons } from '@expo/vector-icons';

const QtrVisitPage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);
  const [rows, setRows] = useState([{ id: 1, qtrNo: '', problem: '', remarks: '' }]);

  // Add a new row
  const addRow = () => {
    const newRow = { id: rows.length + 1, qtrNo: '', problem: '', remarks: '' };
    setRows([...rows, newRow]);
  };

  // Handle input change for a specific row and field
  const handleInputChange = (id, field, value) => {
    const updatedRows = rows.map(row =>
      row.id === id ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
    setFormData(prev => ({ ...prev, qtrVisitRows: updatedRows }));
  };

  // Set up the home icon and center the title
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'QTR Visit',
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
      {/* QTR Visit Section */}
      <Text style={styles.sectionTitle}>22. QTR Visit</Text>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>S/No.</Text>
        <Text style={styles.headerText}>Qtr No & Loc</Text>
        <Text style={styles.headerText}>Problem</Text>
        <Text style={styles.headerText}>Remarks</Text>
      </View>

      {/* Table Rows */}
      {rows.map((row, index) => (
        <View key={row.id} style={styles.tableRow}>
          <Text style={styles.rowText}>{index + 1}</Text>
          <TextInput
            style={styles.rowInput}
            placeholder="Qtr No & Loc"
            value={row.qtrNo}
            onChangeText={t => handleInputChange(row.id, 'qtrNo', t)}
          />
          <TextInput
            style={styles.rowInput}
            placeholder="Problem"
            value={row.problem}
            onChangeText={t => handleInputChange(row.id, 'problem', t)}
          />
          <TextInput
            style={styles.rowInput}
            placeholder="Remarks"
            value={row.remarks}
            onChangeText={t => handleInputChange(row.id, 'remarks', t)}
          />
        </View>
      ))}

      {/* Add Row Button */}
      <Button title="Add Row" onPress={addRow} color="#2196F3" />

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="← Previous" onPress={() => navigation.navigate('SaleCSD')} color="#757575" />
        <Button title="Next →" onPress={() => navigation.navigate('MobileCheck')} color="#2196F3" />
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
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#555',
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  rowText: {
    fontSize: 12,
    color: '#333',
    flex: 1,
    textAlign: 'center',
    alignSelf: 'center',
  },
  rowInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 2,
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

export default QtrVisitPage;