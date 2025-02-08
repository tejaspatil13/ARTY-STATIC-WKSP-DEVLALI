import React, { useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FormContext } from '../utils/FormContext';

const TSSPage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);

  // Function to handle input change in a specific row
  const handleInputChange = (index, field, value) => {
    const updatedRows = [...formData.tssItems];
    updatedRows[index][field] = value;
    setFormData((prev) => ({ ...prev, tssItems: updatedRows }));
  };

  // Function to add a new row
  const handleAddRow = () => {
    setFormData((prev) => ({
      ...prev,
      tssItems: [
        ...prev.tssItems,
        { ser: '', item: '', catPartNo: '', grndBal: '', ledgerBal: '', remarks: '' },
      ],
    }));
  };

  // Function to remove a row
  const handleRemoveRow = (index) => {
    const updatedRows = formData.tssItems.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, tssItems: updatedRows }));
  };

  // Set up the title and home icon
  useEffect(() => {
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

      {formData.tssItems.map((row, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.label}>Serial No.</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Serial No"
            value={row.ser}
            onChangeText={(text) => handleInputChange(index, 'ser', text)}
          />

          <Text style={styles.label}>Item</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Item"
            value={row.item}
            onChangeText={(text) => handleInputChange(index, 'item', text)}
          />

          <Text style={styles.label}>Cat Part No.</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Cat Part No."
            value={row.catPartNo}
            onChangeText={(text) => handleInputChange(index, 'catPartNo', text)}
          />

          <Text style={styles.label}>Ground Balance</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Ground Balance"
            value={row.grndBal}
            onChangeText={(text) => handleInputChange(index, 'grndBal', text)}
          />

          <Text style={styles.label}>Ledger Balance</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Ledger Balance"
            value={row.ledgerBal}
            onChangeText={(text) => handleInputChange(index, 'ledgerBal', text)}
          />

          <Text style={styles.label}>Remarks</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Remarks"
            value={row.remarks}
            onChangeText={(text) => handleInputChange(index, 'remarks', text)}
          />

          {/* Remove Row Button */}
          <TouchableOpacity onPress={() => handleRemoveRow(index)} style={styles.removeButton}>
            <Ionicons name="trash" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ))}

      {/* Add Row Button */}
      <TouchableOpacity onPress={handleAddRow} style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add Another Entry</Text>
      </TouchableOpacity>

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
    marginBottom: 5,
    color: '#555',
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  removeButton: {
    padding: 10,
    backgroundColor: '#ff5c5c',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
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
