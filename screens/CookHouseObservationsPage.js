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

const CookHouseObservationsPage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);

  const handleInputChange = (index, field, value) => {
    const updatedObservations = [...formData[0].cookHouseObservations];
    updatedObservations[index][field] = value;
    setFormData((prevData) =>
      prevData?.map((item, index) => ({
        ...item,
        cookHouseObservations: updatedObservations,
      }))
    );
  };

  const handleAddRow = () => {
    setFormData((prevData) =>
      prevData.map((item) => ({
        ...item,
        cookHouseObservations: [
          ...item.cookHouseObservations,
          { cook_house: "", appliances: "", staff: "" },
        ],
      }))
    );
  };

  const handleRemoveRow = (index) => {
    setFormData((prevData) =>
      prevData.map((item) => ({
        ...item,
        cookHouseObservations: item.cookHouseObservations.filter(
          (_, i) => i !== index
        ),
      }))
    );
  };

  // Set up the title and home icon (same as DutyHandoverPage)
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Cook House Observations",
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
      <Text style={styles.sectionTitle}>7. Cook House Observations</Text>

      {formData[0].cookHouseObservations.map((row, index) => (
        <View key={`view-${index}`} style={styles.card}>
          <Text style={styles.label}>Cook House</Text>
          <TextInput
            multiline={true}
            style={styles.input}
            placeholder="Enter Cook House"
            value={row.cook_house}
            onChangeText={(text) =>
              handleInputChange(index, "cook_house", text)
            }
          />

          <Text style={styles.label}>Serviceability of Appliances</Text>
          <TextInput
            multiline={true}
            style={styles.input}
            placeholder="Enter Appliance Status"
            value={row.appliances_status}
            onChangeText={(text) =>
              handleInputChange(index, "appliances_status", text)
            }
          />

          <Text style={styles.label}>Staff Adequacy</Text>
          <TextInput
            multiline={true}
            style={styles.input}
            placeholder="Enter Staff Details"
            value={row.staff_details}
            onChangeText={(text) =>
              handleInputChange(index, "staff_details", text)
            }
          />

          {formData[0].cookHouseObservations.length > 1 && (
            <TouchableOpacity
              key={index}
              onPress={() => handleRemoveRow(index)}
              style={styles.removeButton}
            >
              <Text style={styles.removeButtonText}>Remove Entry</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      <TouchableOpacity onPress={handleAddRow} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Another Entry</Text>
      </TouchableOpacity>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          title="← Previous"
          onPress={() => navigation.navigate("RationCheck")}
          color="#757575"
        />
        <Button
          title="Next →"
          onPress={() => navigation.navigate("FireEquipmentCheck")}
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

export default CookHouseObservationsPage;
