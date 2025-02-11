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

const FireEquipmentCheckPage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);

  const handleInputChange = (index, field, value) => {
    const updatedFireEquipment = [...formData[0].fire_equipment_check];
    updatedFireEquipment[index][field] = value;
    setFormData((prev) => {
      const updatedFormData = [...prev];
      updatedFormData[0].fire_equipment_check = updatedFireEquipment;
      return updatedFormData;
    });
  };

  const handleAddField = () => {
    setFormData((prev) => {
      const updatedFormData = [...prev];
      updatedFormData[0].fire_equipment_check.push({
        location: "",
        type: "",
        status: "",
        remarks: "",
      });
      return updatedFormData;
    });
  };

  const handleRemoveField = (index) => {
    setFormData((prev) => {
      const updatedFormData = [...prev];
      updatedFormData[0].fire_equipment_check.splice(index, 1);
      return updatedFormData;
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Fire Equipment Check",
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
      <Text style={styles.sectionTitle}>8. Fire Equipment Check</Text>

      {formData[0].fire_equipment_check?.map((item, index) => (
        <View key={index} style={styles.inputContainer}>
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Location"
            value={item.location}
            onChangeText={(t) => handleInputChange(index, "location", t)}
          />

          <Text style={styles.label}>Type</Text>
          <TextInput
            multiline={true}
            style={styles.input}
            placeholder="Enter Equipment Type"
            value={item.type}
            onChangeText={(t) => handleInputChange(index, "type", t)}
          />

          <Text style={styles.label}>Status</Text>
          <TextInput
            multiline={true}
            style={styles.input}
            placeholder="Enter Status"
            value={item.status}
            onChangeText={(t) => handleInputChange(index, "status", t)}
          />

          <Text style={styles.label}>Remarks</Text>
          <TextInput
            multiline={true}
            style={styles.input}
            placeholder="Enter Remarks"
            value={item.remarks}
            onChangeText={(t) => handleInputChange(index, "remarks", t)}
          />
          {formData[0].fire_equipment_check.length > 1 && (
            <Button
              title="Remove"
              onPress={() => handleRemoveField(index)}
              color="#ff5c5c"
            />
          )}
        </View>
      ))}

      <Button
        title="Add Fire Equipment"
        onPress={handleAddField}
        color="#34d399"
      />

      <View style={styles.buttonContainer}>
        <Button
          title="← Previous"
          onPress={() => navigation.navigate("CookHouseObservations")}
          color="#757575"
        />
        <Button
          title="Next →"
          onPress={() => navigation.navigate("FoodTasting")}
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
  inputContainer: {
    marginBottom: 15,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
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
    marginBottom: 10,
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

export default FireEquipmentCheckPage;
