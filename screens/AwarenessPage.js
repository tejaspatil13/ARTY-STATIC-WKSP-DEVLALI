import React, { useContext } from "react";
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

const AwarenessPage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);

  // Handle input change for Awareness Page fields
  const handleInputChange = (field, value) => {
    setFormData((prev) => {
      // Ensure prev is an array and initialize if undefined
      const updatedData =
        Array.isArray(prev) && prev.length > 0
          ? [...prev]
          : [{ awareness: {} }];

      updatedData[0] = {
        ...updatedData[0],
        awareness: { ...updatedData[0].awareness, [field]: value },
      };

      return updatedData;
    });
  };

  // Set up the home icon and center the title
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Awareness",
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
      {/* Awareness Section */}
      <Text style={styles.sectionTitle}>26. Awareness</Text>

      {/* Rank and Name */}
      <Text style={styles.label}>(a)GFO: Rank and Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Rank and Name"
        value={formData[0]?.awareness?.rankAndName || ""}
        onChangeText={(t) => handleInputChange("rankAndName", t)}
      />

      <Text style={styles.label}>Unit:</Text>
      <TextInput
        multiline={true}
        style={styles.input}
        placeholder="Unit"
        value={formData[0]?.awareness?.unit || ""}
        onChangeText={(t) => handleInputChange("unit", t)}
      />

      {/* Duty Officer */}
      <Text style={styles.label}>(b) Duty Officer: Rank and Name</Text>
      <TextInput
        multiline={true}
        style={styles.input}
        placeholder="Enter Duty Officer Rank and Name"
        value={formData[0]?.awareness?.dutyOfficer || ""}
        onChangeText={(t) => handleInputChange("dutyOfficer", t)}
      />

      {/* QRT JCO */}
      <Text style={styles.label}>(c) QRT JCO: Rank and Name</Text>
      <TextInput
        multiline={true}
        style={styles.input}
        placeholder="Enter QRT JCO Rank and Name"
        value={formData[0]?.awareness?.QRT_JCO || ""}
        onChangeText={(t) => handleInputChange("QRT_JCO", t)}
      />

      {/* Duty NCO */}
      <Text style={styles.label}>(d) Duty NCO: Rank and Name</Text>
      <TextInput
        multiline={true}
        style={styles.input}
        placeholder="Enter Duty NCO Rank and Name"
        value={formData[0]?.awareness?.NCO || ""}
        onChangeText={(t) => handleInputChange("NCO", t)}
      />

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          title="← Previous"
          onPress={() => navigation.navigate("Improvement")}
          color="#757575"
        />
        <Button
          title="Next →"
          onPress={() => navigation.navigate("HandoverDuties")}
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  homeButton: {
    marginLeft: 15,
  },
});

export default AwarenessPage;
