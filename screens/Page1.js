import React, { useContext } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import { FormContext } from '../utils/FormContext';

const Page1 = () => {
  const { formData, setFormData } = useContext(FormContext);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleMTBriefingChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      mtBriefingStr: {
        ...prevData.mtBriefingStr,
        [field]: value,
      },
    }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>1. Duty JCO Details</Text>
      <TextInput
        style={styles.input}
        placeholder="JC Number"
        value={formData.jcNumber}
        onChangeText={(text) => handleInputChange('jcNumber', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Rank"
        value={formData.rank}
        onChangeText={(text) => handleInputChange('rank', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={formData.name}
        onChangeText={(text) => handleInputChange('name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="From Time"
        value={formData.fromTime}
        onChangeText={(text) => handleInputChange('fromTime', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="From Date"
        value={formData.fromDate}
        onChangeText={(text) => handleInputChange('fromDate', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="To Time"
        value={formData.toTime}
        onChangeText={(text) => handleInputChange('toTime', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="To Date"
        value={formData.toDate}
        onChangeText={(text) => handleInputChange('toDate', text)}
      />

      <Text style={styles.sectionTitle}>2. Kote Guard Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Mounted at (hrs)"
        value={formData.koteGuardTime}
        onChangeText={(text) => handleInputChange('koteGuardTime', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Findings"
        value={formData.koteGuardFindings}
        onChangeText={(text) => handleInputChange('koteGuardFindings', text)}
      />

      <Text style={styles.sectionTitle}>3. MT Briefing</Text>
      <TextInput
        style={styles.input}
        placeholder="Time"
        value={formData.mtBriefingTime}
        onChangeText={(text) => handleInputChange('mtBriefingTime', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Str (a)"
        value={formData.mtBriefingStr.a}
        onChangeText={(text) => handleMTBriefingChange('a', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Str (b)"
        value={formData.mtBriefingStr.b}
        onChangeText={(text) => handleMTBriefingChange('b', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Str (c)"
        value={formData.mtBriefingStr.c}
        onChangeText={(text) => handleMTBriefingChange('c', text)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default Page1;