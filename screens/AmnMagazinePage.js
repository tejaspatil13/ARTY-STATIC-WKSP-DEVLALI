import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { FormContext } from '../utils/FormContext';
import { Ionicons } from '@expo/vector-icons';

const AmnMagazinePage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);
  const [rows, setRows] = useState([{ id: 1, amn: '', firstLine: '', secondLine: '', trg: '', usedCartridges: '', remarks: '' }]);

  // Add a new row
  const addRow = () => {
    const newRow = { id: rows.length + 1, amn: '', firstLine: '', secondLine: '', trg: '', usedCartridges: '', remarks: '' };
    setRows([...rows, newRow]);
  };

  // Handle input change for a specific row and field
  const handleInputChange = (id, field, value) => {
    const updatedRows = rows.map(row =>
      row.id === id ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
    setFormData(prev => ({ ...prev, amnMagazineRows: updatedRows }));
  };

  // Set up the home icon and center the title
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Amn Magazine',
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
      {/* Amn Magazine Section */}
      <Text style={styles.sectionTitle}>14. Amn Magazine</Text>
      <Text style={styles.label}>I have physically checked the Amn Magazine on:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter date"
        value={formData.amnMagazineDate}
        onChangeText={t => setFormData(prev => ({ ...prev, amnMagazineDate: t }))}
      />

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Ser</Text>
        <Text style={styles.headerText}>Amn</Text>
        <Text style={styles.headerText}>1st Line</Text>
        <Text style={styles.headerText}>2nd Line</Text>
        <Text style={styles.headerText}>Trg</Text>
        <Text style={styles.headerText}>Used Cartridges</Text>
        <Text style={styles.headerText}>Remarks</Text>
      </View>

      {/* Table Rows */}
      {rows.map((row, index) => (
        <View key={row.id} style={styles.tableRow}>
          <Text style={styles.rowText}>{index + 1}</Text>
          <TextInput
            style={styles.rowInput}
            placeholder="Amn"
            value={row.amn}
            onChangeText={t => handleInputChange(row.id, 'amn', t)}
          />
          <TextInput
            style={styles.rowInput}
            placeholder="1st Line"
            value={row.firstLine}
            onChangeText={t => handleInputChange(row.id, 'firstLine', t)}
          />
          <TextInput
            style={styles.rowInput}
            placeholder="2nd Line"
            value={row.secondLine}
            onChangeText={t => handleInputChange(row.id, 'secondLine', t)}
          />
          <TextInput
            style={styles.rowInput}
            placeholder="Trg"
            value={row.trg}
            onChangeText={t => handleInputChange(row.id, 'trg', t)}
          />
          <TextInput
            style={styles.rowInput}
            placeholder="Used Cartridges"
            value={row.usedCartridges}
            onChangeText={t => handleInputChange(row.id, 'usedCartridges', t)}
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
        <Button title="← Previous" onPress={() => navigation.navigate('QuarterGdKote')} color="#757575" />
        <Button title="Next →" onPress={() => navigation.navigate('CSDSampleChecks')} color="#2196F3" />
      </View>
    </ScrollView>
  );
};

// Styles (same as QuarterGdKotePage)
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

export default AmnMagazinePage;