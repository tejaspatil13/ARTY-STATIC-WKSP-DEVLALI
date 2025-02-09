import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FormContext } from "../utils/FormContext";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native";

const QuarterGdKotePage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);
  const [rows, setRows] = useState(
    formData[0].quarter_gd_kote?.quarterGdKoteRows || [
      { id: 1, held: "", armsOut: "", armsIn: "", remarks: "" },
    ]
  );

  const addRow = () => {
    const newRow = {
      id: rows.length + 1,
      held: "",
      armsOut: "",
      armsIn: "",
      remarks: "",
    };
    const updatedRows = [...rows, newRow];
    setRows(updatedRows);
    updateFormData(updatedRows);
  };

  const handleInputChange = (id, field, value) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
    updateFormData(updatedRows);
  };

  const deleteRow = (id) => {
    if (rows.length > 1) {
      const updatedRows = rows.filter((row) => row.id !== id);
      setRows(updatedRows);
      updateFormData(updatedRows);
    }
  };

  const updateFormData = (updatedRows) => {
    setFormData((prevState) => {
      const newState = [...prevState];
      newState[0].quarter_gd_kote = {
        ...newState[0].quarter_gd_kote,
        quarterGdKoteRows: updatedRows,
      };
      return newState;
    });
  };

  const handleDateChange = (value) => {
    setFormData((prevState) => {
      const newState = [...prevState];
      newState[0].quarter_gd_kote = {
        ...newState[0].quarter_gd_kote,
        koteCheckDate: value,
      };
      return newState;
    });
  };

  // Initialize quarter_gd_kote if it doesn't exist
  useEffect(() => {
    if (!formData[0].quarter_gd_kote) {
      setFormData((prevState) => {
        const newState = [...prevState];
        newState[0].quarter_gd_kote = {
          koteCheckDate: "",
          quarterGdKoteRows: [
            { id: 1, held: "", armsOut: "", armsIn: "", remarks: "" },
          ],
        };
        return newState;
      });
    }
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Quarter Gd & Kote",
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

  if (!formData[0].quarter_gd_kote) {
    return null; // or a loading indicator
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>13. Quarter Gd & Kote</Text>

      <Text style={styles.label}>
        I have physically checked the Arms in Kote on:
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter date"
        value={formData[0].quarter_gd_kote.koteCheckDate}
        onChangeText={handleDateChange}
      />

      {rows.map((row) => (
        <View key={row.id} style={styles.card}>
          <View style={styles.rowHeader}>
            <Text style={styles.rowTitle}>Entry #{row.id}</Text>
            {rows.length > 1 && (
              <TouchableOpacity
                onPress={() => deleteRow(row.id)}
                style={styles.deleteButton}
              >
                <Ionicons name="trash-outline" size={24} color="#ff5252" />
              </TouchableOpacity>
            )}
          </View>

          <Text style={styles.label}>Held</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Held"
            value={row.held}
            onChangeText={(t) => handleInputChange(row.id, "held", t)}
          />

          <Text style={styles.label}>Type</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Type"
            value={row.type}
            onChangeText={(t) => handleInputChange(row.id, "type", t)}
          />

          <Text style={styles.label}>Arms Out of Kote</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Arms Out"
            value={row.armsOut}
            onChangeText={(t) => handleInputChange(row.id, "armsOut", t)}
          />

          <Text style={styles.label}>Arms In Kote</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Arms In"
            value={row.armsIn}
            onChangeText={(t) => handleInputChange(row.id, "armsIn", t)}
          />

          <Text style={styles.label}>Remarks</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Remarks"
            value={row.remarks}
            onChangeText={(t) => handleInputChange(row.id, "remarks", t)}
            multiline
          />
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={addRow}>
        <Text style={styles.addButtonText}>Add New Entry</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <Button
          title="← Previous"
          onPress={() => navigation.navigate("DefenseLandSurvey")}
          color="#757575"
        />
        <Button
          title="Next →"
          onPress={() => navigation.navigate("AmnMagazine")}
          color="#2196F3"
        />
      </View>
    </ScrollView>
  );
};

// Styles
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

export default QuarterGdKotePage;
