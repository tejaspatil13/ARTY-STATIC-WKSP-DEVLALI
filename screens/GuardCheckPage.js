import React, { useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { FormContext } from '../utils/FormContext';

const GuardCheckPage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);
  const guards = formData.guards;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Guard Check',
      headerTitleAlign: 'center',
      headerTitleStyle: { fontSize: 22, fontWeight: 'bold', color: '#333' },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Main')} style={styles.homeButton}>
          <Ionicons name="home" size={28} color="#000" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleGuardChange = (index, field, value) => {
    const updatedGuards = [...guards];
    updatedGuards[index][field] = value;
    setFormData((prev) => ({ ...prev, guards: updatedGuards }));
  };

  const addGuard = () => {
    const newGuard = { id: guards.length + 1, type: '', day: '', night: '' };
    setFormData((prev) => ({ ...prev, guards: [...guards, newGuard] }));
  };

  const removeGuard = (id) => {
    const filteredGuards = guards.filter((guard) => guard.id !== id);
    setFormData((prev) => ({ ...prev, guards: filteredGuards }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>4. Guard Check</Text>

      {guards.map((guard, index) => (
        <View key={guard.id} style={styles.guardContainer}>
          <Text style={styles.label}>Guard</Text>
          <Picker
            selectedValue={guard.type}
            style={styles.picker}
            onValueChange={(value) => handleGuardChange(index, 'type', value)}
          >
            <Picker.Item label="Select Guard" value="" />
            <Picker.Item label="Main Gate" value="Main Gate" />
            <Picker.Item label="Kote" value="Kote" />
            <Picker.Item label='"A" PL' value='"A" PL' />
            <Picker.Item label='"B" PL' value='"B" PL' />
            <Picker.Item label="CSD" value="CSD" />
            <Picker.Item label="Dhobi Ghat" value="Dhobi Ghat" />
            <Picker.Item label="Peer Baba" value="Peer Baba" />
            <Picker.Item label="SDP" value="SDP" />
          </Picker>

          <Text style={styles.label}>Day</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Day Info"
            value={guard.day}
            onChangeText={(value) => handleGuardChange(index, 'day', value)}
          />

          <Text style={styles.label}>Night</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Night Info"
            value={guard.night}
            onChangeText={(value) => handleGuardChange(index, 'night', value)}
          />

          <Button title="Remove" onPress={() => removeGuard(guard.id)} color="red" />
        </View>
      ))}

      <Button title="+ Add More" onPress={addGuard} color="#007BFF" />

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="← Previous" onPress={() => navigation.navigate('MTBriefing')} color="#757575" />
        <Button title="Next →" onPress={() => navigation.navigate('OfficeStoreSealing')} color="#2196F3" />
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
  guardContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#555',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  homeButton: {
    marginLeft: 15,
  },
});

export default GuardCheckPage;
