import React, { useContext, useEffect } from "react";
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

const LandMattersPage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);

  const handleInputChange = (index, field, value) => {
    setFormData((prevState) => {
      const newState = [...prevState];
      newState[0].land_matters[index][field] = value;
      return newState;
    });
  };

  const addLandMatter = () => {
    setFormData((prevState) => {
      const newState = [...prevState];
      if (!newState[0].land_matters) {
        newState[0].land_matters = [];
      }
      newState[0].land_matters.push({
        location: "",
        time: "",
        remark: "",
      });
      return newState;
    });
  };

  const removeLandMatter = (index) => {
    setFormData((prevState) => {
      const newState = [...prevState];
      newState[0].land_matters.splice(index, 1);
      return newState;
    });
  };

  // Initialize land_matters if it doesn't exist
  useEffect(() => {
    if (!formData[0].land_matters || formData[0].land_matters.length === 0) {
      setFormData((prevState) => {
        const newState = [...prevState];
        newState[0].land_matters = [
          {
            location: "",
            time: "",
            remark: "",
          },
        ];
        return newState;
      });
    }
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Land Matters",
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

  if (!formData[0].land_matters) {
    return null; // or a loading indicator
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>11. Land Matters</Text>

      {formData[0].land_matters.map((entry, index) => (
        <View key={index} style={styles.entryContainer}>
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Location"
            value={entry.location}
            onChangeText={(text) => handleInputChange(index, "location", text)}
          />

          <Text style={styles.label}>Time</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Time"
            value={entry.time}
            onChangeText={(text) => handleInputChange(index, "time", text)}
          />

          <Text style={styles.label}>Remark</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Remark"
            value={entry.remark}
            onChangeText={(text) => handleInputChange(index, "remark", text)}
            multiline={true}
            numberOfLines={3}
          />

          {formData[0].land_matters.length > 1 && (
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeLandMatter(index)}
            >
              <Text style={styles.removeButtonText}>Remove Entry</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={addLandMatter}>
        <Text style={styles.addButtonText}>Add Entry</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <Button
          title="← Previous"
          onPress={() => navigation.navigate("HealthHygiene")}
          color="#757575"
        />
        <Button
          title="Next →"
          onPress={() => navigation.navigate("DefenseLandSurvey")}
          color="#2196F3"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
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
  entryContainer: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
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
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    // borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: "#ff5252",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 30,
  },
  navButton: {
    backgroundColor: "#2196F3",
    padding: 12,
    // borderRadius: 8,
    width: "45%",
    alignItems: "center",
  },
  navButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  homeButton: {
    marginLeft: 15,
  },
});

export default LandMattersPage;
