import React, { useContext } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { FormContext } from '../utils/FormContext';
import { Ionicons } from '@expo/vector-icons';

const CSDSampleChecksPage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);

  // Handle input change for CSD sample checks
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Set up the home icon and center the title
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'CSD Sample Checks',
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
      {/* CSD Sample Checks Section */}
      <Text style={styles.sectionTitle}>15. CSD Sample Checks</Text>

      {/* CSD Items */}
      <Text style={styles.label}>(a) CSD Items:</Text>
      <TextInput
        style={styles.input}
        placeholder="Item (i)"
        value={formData.csdItem1}
        onChangeText={t => handleInputChange('csdItem1', t)}
      />
      <TextInput
        style={styles.input}
        placeholder="Item (ii)"
        value={formData.csdItem2}
        onChangeText={t => handleInputChange('csdItem2', t)}
      />
      <TextInput
        style={styles.input}
        placeholder="Item (iii)"
        value={formData.csdItem3}
        onChangeText={t => handleInputChange('csdItem3', t)}
      />

      {/* Liquor/Grocery Card */}
      <Text style={styles.label}>(b) Liquor/Grocery Card:</Text>
      <TextInput
        style={styles.input}
        placeholder="Card (i)"
        value={formData.cardItem1}
        onChangeText={t => handleInputChange('cardItem1', t)}
      />
      <TextInput
        style={styles.input}
        placeholder="Card (ii)"
        value={formData.cardItem2}
        onChangeText={t => handleInputChange('cardItem2', t)}
      />
      <TextInput
        style={styles.input}
        placeholder="Card (iii)"
        value={formData.cardItem3}
        onChangeText={t => handleInputChange('cardItem3', t)}
      />

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="← Previous" onPress={() => navigation.navigate('AmnMagazine')} color="#757575" />
        <Button title="Next →" onPress={() => navigation.navigate('TSS')} color="#2196F3" />
      </View>
    </ScrollView>
  );
};

// Styles (same as previous pages)
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  homeButton: {
    marginLeft: 15,
  },
});

export default CSDSampleChecksPage;