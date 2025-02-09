import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FormContext } from "../utils/FormContext";
import { Ionicons } from "@expo/vector-icons";

const AmnMagazinePage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);
  const [localRows, setLocalRows] = useState([]);

  // Initialize local state from formData on component mount
  useEffect(() => {
    const currentData = formData[0]?.amn_magazine?.amnMagazineRows || [
      {
        id: 1,
        amn: "",
        firstLine: "",
        secondLine: "",
        trg: "",
        usedCartridges: "",
        remarks: "",
      },
    ];
    setLocalRows(currentData);
  }, [formData]);

  // Add a new row
  const addRow = () => {
    const newRow = {
      id: localRows.length + 1,
      amn: "",
      firstLine: "",
      secondLine: "",
      trg: "",
      usedCartridges: "",
      remarks: "",
    };
    setLocalRows((prevRows) => [...prevRows, newRow]);
    updateFormData([...localRows, newRow]);
  };

  // Handle input change for a specific row and field
  const handleInputChange = (id, field, value) => {
    const updatedRows = localRows.map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    );
    setLocalRows(updatedRows);
    updateFormData(updatedRows);
  };

  // Handle date change
  const handleDateChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      [0]: {
        ...prev[0],
        amn_magazine: {
          ...prev[0].amn_magazine,
          amnMagazineCheckDate: value,
        },
      },
    }));
  };

  // Update form data
  const updateFormData = (updatedRows) => {
    setFormData((prev) => ({
      ...prev,
      [0]: {
        ...prev[0],
        amn_magazine: {
          ...prev[0].amn_magazine,
          amnMagazineRows: updatedRows,
        },
      },
    }));
  };

  // Delete a row
  const deleteRow = (id) => {
    const updatedRows = localRows.filter((row) => row.id !== id);
    setLocalRows(updatedRows);
    updateFormData(updatedRows);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Amn Magazine",
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#333",
      },
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>14. Amn Magazine</Text>
      <Text style={styles.label}>
        I have physically checked the Amn Magazine on:
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter date"
        value={formData[0]?.amn_magazine?.amnMagazineCheckDate || ""}
        onChangeText={handleDateChange}
      />

      {localRows.map((row, index) => (
        <View key={row.id} style={styles.card}>
          <View style={styles.rowHeader}>
            <Text style={styles.label}>Entry {index + 1}</Text>
            {localRows.length > 1 && (
              <TouchableOpacity onPress={() => deleteRow(row.id)}>
                <Ionicons name="trash" size={24} color="red" />
              </TouchableOpacity>
            )}
          </View>

          <TextInput
            style={styles.input}
            placeholder="Amn"
            value={row.amn}
            onChangeText={(t) => handleInputChange(row.id, "amn", t)}
          />
          <TextInput
            style={styles.input}
            placeholder="1st Line"
            value={row.firstLine}
            onChangeText={(t) => handleInputChange(row.id, "firstLine", t)}
          />
          <TextInput
            style={styles.input}
            placeholder="2nd Line"
            value={row.secondLine}
            onChangeText={(t) => handleInputChange(row.id, "secondLine", t)}
          />
          <TextInput
            style={styles.input}
            placeholder="Trg"
            value={row.trg}
            onChangeText={(t) => handleInputChange(row.id, "trg", t)}
          />
          <TextInput
            style={styles.input}
            placeholder="Used Cartridges"
            value={row.usedCartridges}
            onChangeText={(t) => handleInputChange(row.id, "usedCartridges", t)}
          />
          <TextInput
            style={styles.input}
            placeholder="Remarks"
            value={row.remarks}
            onChangeText={(t) => handleInputChange(row.id, "remarks", t)}
          />
        </View>
      ))}

      <TouchableOpacity onPress={addRow} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Another Entry</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <Button
          title="← Previous"
          onPress={() => navigation.navigate("QuarterGdKote")}
          color="#757575"
        />
        <Button
          title="Next →"
          onPress={() => navigation.navigate("CSDSampleChecks")}
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
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  homeButton: {
    marginLeft: 15,
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
  rowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
});

export default AmnMagazinePage;
