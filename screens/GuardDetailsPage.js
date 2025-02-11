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

const GuardDetailsPage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);

  const handleInputChange = (field, value) => {
    setFormData((prevData) =>
      prevData?.map((item, index) => ({
        ...item,
        guard_details: {
          ...item.guard_details, // Keep existing data
          [field]: value, // Update only the specific field
        },
      }))
    );
  };

  // Set up the title and home button
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Guard Details",
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
      <Text style={styles.sectionTitle}>2. Kote Guard Details</Text>

      <Text style={styles.label}>Mounted at (hrs)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter time"
        value={formData[0].guard_details.koteGuardTime}
        onChangeText={(t) => handleInputChange("koteGuardTime", t)}
      />

      <Text style={styles.label}>Findings</Text>
      <TextInput
        multiline={true}
        style={styles.input}
        placeholder="Enter findings"
        value={formData[0].guard_details.koteGuardFindings}
        onChangeText={(t) => handleInputChange("koteGuardFindings", t)}
      />

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          title="← Previous"
          onPress={() => navigation.navigate("DutyHandover")}
          color="#757575"
        />
        <Button
          title="Next →"
          onPress={() => navigation.navigate("MTBriefing")}
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

export default GuardDetailsPage;
