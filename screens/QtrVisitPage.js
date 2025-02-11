import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FormContext } from "../utils/FormContext";

const QtrVisitPage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);

  // Ensure correct data access
  const qtrVisitData = formData[0]?.qtr_visit || [
    { id: 1, qtr_no_and_location: "", problem: "", remarks: "" },
  ];
  const [rows, setRows] = useState(qtrVisitData);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "QTR Visit",
      headerTitleAlign: "center",
      headerTitleStyle: { fontSize: 22, fontWeight: "bold", color: "#333" },
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Main")}
          style={styles.homeButton}
        >
          <Ionicons name="home" size={28} color="#000" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  // Handle Input Change
  const handleInputChange = (id, field, value) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
    updateFormData(updatedRows);
  };

  // Add New Row
  const addRow = () => {
    const newRow = {
      id: Date.now(),
      qtr_no_and_location: "",
      problem: "",
      remarks: "",
    };
    const updatedRows = [...rows, newRow];
    setRows(updatedRows);
    updateFormData(updatedRows);
  };

  // Remove Row
  const removeRow = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
    updateFormData(updatedRows);
  };

  // Update Form Data
  const updateFormData = (updatedRows) => {
    setFormData((prev) => {
      const newFormData = [...prev];
      newFormData[0] = {
        ...newFormData[0],
        qtr_visit: updatedRows,
      };
      return newFormData;
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>22. QTR Visit</Text>

      {rows.map((row, index) => (
        <View key={row.id} style={styles.card}>
          <Text style={styles.label}>Qtr No & Location</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Qtr No & Location"
            value={row.qtr_no_and_location}
            onChangeText={(text) =>
              handleInputChange(row.id, "qtr_no_and_location", text)
            }
          />

          <Text style={styles.label}>Problem</Text>
          <TextInput
            style={styles.input}
            placeholder="Describe the Problem"
            value={row.problem}
            onChangeText={(text) => handleInputChange(row.id, "problem", text)}
          />

          <Text style={styles.label}>Remarks</Text>
          <TextInput
            style={styles.input}
            placeholder="Add Remarks"
            value={row.remarks}
            onChangeText={(text) => handleInputChange(row.id, "remarks", text)}
          />

          {qtrVisitData.length > 1 && (
            <TouchableOpacity
              onPress={() => removeRow(row.id)}
              style={styles.removeButton}
            >
              <Text style={styles.removeButtonText}>Remove Entry</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      <TouchableOpacity onPress={addRow} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Another Entry</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <Button
          title="← Previous"
          onPress={() => navigation.navigate("SaleCSD")}
          color="#757575"
        />
        <Button
          title="Next →"
          onPress={() => navigation.navigate("MobileCheck")}
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
    backgroundColor: "#f5f5f5",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  removeButton: {
    padding: 10,
    backgroundColor: "#ff5c5c",
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  addButton: {
    padding: 12,
    backgroundColor: "#34d399",
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  homeButton: {
    marginLeft: 15,
  },
});

export default QtrVisitPage;
