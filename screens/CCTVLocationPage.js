import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FormContext } from "../utils/FormContext";

const CCTVLocationPage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);

  // Ensure cctv_locations structure exists
  const cctvLocations = formData[0]?.cctv_locations || [
    {
      location: "",
      total: "",
      serviceable: "",
      unserviceable: "",
      remarks: "",
    },
  ];

  // Handle input change for CCTV locations
  const handleInputChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedFormData = [...prev];

      if (!updatedFormData[0]) {
        updatedFormData[0] = { cctv_locations: [] };
      }

      updatedFormData[0].cctv_locations[index] = {
        ...updatedFormData[0].cctv_locations[index],
        [field]: value,
      };

      return updatedFormData;
    });
  };

  // Add new location field
  const addLocationField = () => {
    setFormData((prev) => {
      const updatedFormData = [...prev];
      if (!updatedFormData[0].cctv_locations) {
        updatedFormData[0].cctv_locations = [];
      }
      updatedFormData[0].cctv_locations.push({
        location: "",
        total: "",
        serviceable: "",
        unserviceable: "",
        remarks: "",
      });
      return updatedFormData;
    });
  };

  // Remove location field
  const removeLocationField = (index) => {
    setFormData((prev) => {
      const updatedFormData = [...prev];
      updatedFormData[0].cctv_locations =
        updatedFormData[0].cctv_locations.filter((_, i) => i !== index);
      return updatedFormData;
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "CCTV Locations",
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>18. CCTV Locations</Text>
      {cctvLocations.map((loc, index) => (
        <View key={index} style={styles.fieldGroup}>
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={loc.location}
            onChangeText={(text) => handleInputChange(index, "location", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Total"
            keyboardType="numeric"
            value={loc.total}
            onChangeText={(text) => handleInputChange(index, "total", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Serviceable"
            keyboardType="numeric"
            value={loc.serviceable}
            onChangeText={(text) =>
              handleInputChange(index, "serviceable", text)
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Unserviceable"
            keyboardType="numeric"
            value={loc.unserviceable}
            onChangeText={(text) =>
              handleInputChange(index, "unserviceable", text)
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Remarks"
            value={loc.remarks}
            onChangeText={(text) => handleInputChange(index, "remarks", text)}
          />
          {cctvLocations.length > 1 && (
            <TouchableOpacity
              onPress={() => removeLocationField(index)}
              style={styles.removeButton}
            >
              <Text style={styles.removeButtonText}>Remove Entry</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      <TouchableOpacity onPress={addLocationField} style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add Location</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <Button
          title="← Previous"
          onPress={() => navigation.navigate("SecurityMeasures")}
          color="#757575"
        />
        <Button
          title="Next →"
          onPress={() => navigation.navigate("MedicalVisit")}
          color="#2196F3"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: "#f5f5f5" },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  fieldGroup: {
    marginBottom: 15,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  removeButton: {
    backgroundColor: "#ff5c5c",
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  removeButtonText: { color: "white", fontWeight: "bold" },
  addButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  homeButton: { marginLeft: 15 },
});

export default CCTVLocationPage;
