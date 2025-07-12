import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FormContext } from "../utils/FormContext";

const HealthHygienePage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);

  const handleInputChange = (index, field, value) => {
    setFormData((prev) => {
      return prev.map((entry, i) => {
        if (i === 0) {
          // Updating only the first object in the array
          const updatedHealthHygiene = [...entry.health_hygiene]; // Copy array
          updatedHealthHygiene[index] = {
            ...updatedHealthHygiene[index],
            [field]: value,
          }; // Update specific field

          return { ...entry, health_hygiene: updatedHealthHygiene }; // Return updated object
        }
        return entry; // Return other objects unchanged
      });
    });
  };

  // Set up the home icon and center the title
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Health & Hygiene Report",
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
      {/* Page Title with Number */}
      <Text style={styles.sectionTitle}>10. Health & Hygiene Report</Text>

      <View style={styles.tableContainer}>
        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={styles.headerCell}>Aspect</Text>
          <Text style={styles.headerCell}>Observations</Text>
          <Text style={styles.headerCell}>Remarks</Text>
        </View>

        {/* Dynamic Fields */}
        {formData[0].health_hygiene.map((item, index) => (
          <View key={index} style={styles.rowContainer}>
            <Text style={styles.cell}>{item.field}</Text>

            <TextInput
              multiline={true}
              style={styles.input}
              placeholder="Observation"
              value={item.observation}
              onChangeText={(text) =>
                handleInputChange(index, "observation", text)
              }
            />

            <TextInput
              multiline={true}
              style={styles.input}
              placeholder="Remarks"
              value={item.remark}
              onChangeText={(text) => handleInputChange(index, "remark", text)}
            />
          </View>
        ))}
      </View>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          title="← Previous"
          onPress={() => navigation.navigate("FoodTasting")}
          color="#757575"
        />
        <Button
          title="Next →"
          onPress={() => navigation.navigate("LandMatters")}
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
    textAlign: "left",
  },
  tableContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    elevation: 3,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f1f1f1",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerCell: {
    flex: 1,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  rowContainer: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    alignItems: "center",
    gap: 10,
  },
  cell: {
    flex: 2,
    fontSize: 14,
    color: "#333",
  },
  input: {
    flex: 2,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    backgroundColor: "#fff",
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

export default HealthHygienePage;
