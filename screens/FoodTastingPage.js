import React, { useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FormContext } from '../utils/FormContext';

const FoodTastingPage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);

  const handleInputChange = (index, field, value) => {
    const updatedFoodTasting = [...formData.foodTasting];
    updatedFoodTasting[index][field] = value;
    setFormData(prev => ({ ...prev, foodTasting: updatedFoodTasting }));
  };

  // Set up the home icon and center the title
  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Food Tasting',
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
      <Text style={styles.sectionTitle}>9. Food Tasting Observations</Text>

      {formData.foodTasting.map((item, index) => (
        <View key={index} style={styles.foodTastingContainer}>
          <Text style={styles.label}>Cook House</Text>
          <TextInput
            style={styles.input}
            value={item.cookHouse}
            editable={false} // Keep it static
          />

          <Text style={styles.label}>Meal</Text>
          <TextInput
            style={styles.input}
            value={item.meal}
            editable={false} // Keep it static
          />

          <Text style={styles.label}>Quality of Food</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter food quality"
            value={item.quality}
            onChangeText={t => handleInputChange(index, 'quality', t)}
          />

          <Text style={styles.label}>Points for Improvement</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter improvement points"
            value={item.improvement}
            onChangeText={t => handleInputChange(index, 'improvement', t)}
          />
        </View>
      ))}

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="← Previous" onPress={() => navigation.navigate('FireEquipmentCheck')} color="#757575" />
        <Button title="Next →" onPress={() => navigation.navigate('HealthHygiene')} color="#2196F3" />
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
  foodTastingContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
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

export default FoodTastingPage;
