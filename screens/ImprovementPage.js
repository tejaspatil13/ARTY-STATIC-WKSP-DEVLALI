import React, { useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { FormContext } from '../utils/FormContext';
import { Ionicons } from '@expo/vector-icons';

const ImprovementPage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);

  // Ensure the data structure is initialized properly
  useEffect(() => {
    if (!formData[0]?.improvement_in_wksp_tech || formData[0].improvement_in_wksp_tech.length < 2) {
      setFormData(prev => {
        const newFormData = [...prev];
        newFormData[0] = {
          ...newFormData[0],
          improvement_in_wksp_tech: [
            { id: Date.now() + 1, point: '' },
            { id: Date.now() + 2, point: '' },
          ],
        };
        return newFormData;
      });
    }
  }, []);

  // Function to add a new improvement point
  const addPoint = () => {
    setFormData(prev => {
      const newFormData = [...prev];
      newFormData[0] = {
        ...newFormData[0],
        improvement_in_wksp_tech: [
          ...newFormData[0].improvement_in_wksp_tech,
          { id: Date.now(), point: '' },
        ],
      };
      return newFormData;
    });
  };

  // Function to remove an improvement point
  const removePoint = (id) => {
    if (formData[0].improvement_in_wksp_tech.length > 2) {
      setFormData(prev => {
        const newFormData = [...prev];
        newFormData[0] = {
          ...newFormData[0],
          improvement_in_wksp_tech: newFormData[0].improvement_in_wksp_tech.filter(point => point.id !== id),
        };
        return newFormData;
      });
    }
  };

  // Configure navigation header
  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Improvement Page',
      headerTitleAlign: 'center',
      headerTitleStyle: { fontSize: 22, fontWeight: 'bold', color: '#333' },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Main')} style={styles.homeButton}>
          <Ionicons name="home" size={28} color="#000" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.sectionTitle}>
          25. Improvement in Wksp Tech Processes and Functioning/Welfare of Tps.
        </Text>

        {formData[0]?.improvement_in_wksp_tech?.map((point, index) => (
          <View key={point.id} style={styles.inputRow}>
            <Text style={styles.subLabel}>{`(${String.fromCharCode(97 + index)})`}</Text>
            <TextInput
              style={styles.input}
              placeholder={`Enter improvement point (${String.fromCharCode(97 + index)})`}
              value={point.point}
              onChangeText={t => {
                const updatedPoints = formData[0].improvement_in_wksp_tech.map(p =>
                  p.id === point.id ? { ...p, point: t } : p
                );
                setFormData(prev => {
                  const newFormData = [...prev];
                  newFormData[0] = { ...newFormData[0], improvement_in_wksp_tech: updatedPoints };
                  return newFormData;
                });
              }}
            />
            {formData[0].improvement_in_wksp_tech.length > 2 && (
              <TouchableOpacity onPress={() => removePoint(point.id)} style={styles.deleteButton}>
                <Ionicons name="trash" size={24} color="red" />
              </TouchableOpacity>
            )}
          </View>
        ))}

        <TouchableOpacity onPress={addPoint} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Improvement Point</Text>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <Button title="← Previous" onPress={() => navigation.navigate('LiquorIssue')} color="#757575" />
          <Button title="Next →" onPress={() => navigation.navigate('Awareness')} color="#2196F3" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f5f5f5' },
  container: { flexGrow: 1, padding: 20 },

  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  subLabel: { fontSize: 14, fontWeight: 'bold', marginBottom: 5, color: '#555' },
  inputRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, backgroundColor: '#fff' },
  deleteButton: { marginLeft: 10 },

  addButton: { padding: 12, backgroundColor: '#34d399', borderRadius: 5, alignItems: 'center', marginTop: 20 },
  addButtonText: { color: '#fff', fontWeight: 'bold' },

  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 },

  homeButton: { marginLeft: 15 },
});

export default ImprovementPage;
