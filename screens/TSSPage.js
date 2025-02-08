import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { FormContext } from '../utils/FormContext';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const TSSPage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);
  const [rows, setRows] = useState(formData.tssItems);

  // Function to handle input change in the dynamic table
  const handleInputChange = (id, field, value) => {
    const updatedRows = rows.map(row =>
      row.id === id ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
    setFormData(prev => ({ ...prev, tssItems: updatedRows }));
  };

  // Function to add a new row
  const addNewRow = () => {
    const newRow = {
      id: rows.length + 1,
      ser: '',
      item: '',
      catPartNo: '',
      grndBal: '',
      ledgerBal: '',
      remarks: '',
    };
    setRows([...rows, newRow]);
    setFormData(prev => ({ ...prev, tssItems: [...prev.tssItems, newRow] }));
  };

  // Set up the home icon and center the title
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'TSS - Sample Items',
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
      <Text style={styles.sectionTitle}>16. TSS</Text>
      <Text style={styles.label}>
        I have physically checked the following sample items as per my trade-work (minimum three)
        and matched the ground and ledger balance:
      </Text>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Ser</Text>
        <Text style={styles.headerText}>Item</Text>
        <Text style={styles.headerText}>Cat Part No</Text>
        <Text style={styles.headerText}>Grnd Bal</Text>
        <Text style={styles.headerText}>Ledger Bal</Text>
        <Text style={styles.headerText}>Remarks</Text>
      </View>

      {/* Table Rows */}
      {rows.map((row, index) => (
        <View key={row.id} style={styles.tableRow}>
          <Text style={styles.rowText}>{index + 1}</Text>
          <TextInput
            style={styles.rowInput}
            placeholder="Item"
            value={row.item}
            onChangeText={t => handleInputChange(row.id, 'item', t)}
          />
          <TextInput
            style={styles.rowInput}
            placeholder="Cat Part No"
            value={row.catPartNo}
            onChangeText={t => handleInputChange(row.id, 'catPartNo', t)}
          />
          <TextInput
            style={styles.rowInput}
            placeholder="Grnd Bal"
            value={row.grndBal}
            onChangeText={t => handleInputChange(row.id, 'grndBal', t)}
          />
          <TextInput
            style={styles.rowInput}
            placeholder="Ledger Bal"
            value={row.ledgerBal}
            onChangeText={t => handleInputChange(row.id, 'ledgerBal', t)}
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
      <Button title="Add Column" onPress={addNewRow} color="#4CAF50" />

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="← Previous" onPress={() => navigation.navigate('CSDSampleChecks')} color="#757575" />
        <Button title="Next →" onPress={() => navigation.navigate('SecurityMeasures')} color="#2196F3" />
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
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#555',
    textAlign: 'center',
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

export default TSSPage;
