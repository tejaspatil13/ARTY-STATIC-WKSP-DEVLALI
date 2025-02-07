import React, { useContext } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { FormContext } from '../utils/FormContext';
import { Ionicons } from '@expo/vector-icons';

const GuardDetailsPage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity 
          onPress={() => navigation.navigate('MainScreen')}
          style={styles.headerButton}
        >
          <Ionicons name="home-outline" size={24} color="#2196F3" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>2. Kote Guard Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Mounted at (hrs)"
        value={formData.koteGuardTime}
        onChangeText={t => handleInputChange('koteGuardTime', t)}
      />
      <TextInput
        style={styles.input}
        placeholder="Findings"
        value={formData.koteGuardFindings}
        onChangeText={t => handleInputChange('koteGuardFindings', t)}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="← Previous"
          onPress={() => navigation.navigate('DutyHandover')}
          color="#757575"
        />
        <Button
          title="Next →"
          onPress={() => navigation.navigate('MTBriefing')}
          color="#2196F3"
        />
      </View>
    </ScrollView>
  );
};

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
  headerButton: {
    marginLeft: 15,
    padding: 5,
  }
});

export default GuardDetailsPage;