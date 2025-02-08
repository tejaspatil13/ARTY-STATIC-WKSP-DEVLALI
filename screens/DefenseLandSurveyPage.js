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
import { Ionicons } from "@expo/vector-icons";
import { FormContext } from "../utils/FormContext";

const SecurityMeasuresPage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);

  const handleInputChange = (index, field, value) => {
    const updatedMeasures = [...formData.securityMeasures];
    updatedMeasures[index][field] = value;
    setFormData((prev) => ({ ...prev, securityMeasures: updatedMeasures }));
  };

  const handleAddRow = () => {
    setFormData((prev) => ({
      ...prev,
      securityMeasures: [
        ...(prev.securityMeasures || []),
        { timeChecked: "", description: "" },
      ],
    }));
  };

  const handleRemoveRow = (index) => {
    const updatedMeasures = formData.securityMeasures.filter(
      (_, i) => i !== index
    );
    setFormData((prev) => ({ ...prev, securityMeasures: updatedMeasures }));
  };

  const getSerialLetter = (index) => String.fromCharCode(97 + index) + ")";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>17. Security Measures</Text>
      <Text style={styles.subTitle}>
        I have checked the premises of ASW AOR at{" "}
      </Text>
      <TextInput
        style={styles.inputTime}
        placeholder="Enter time in hrs format"
        keyboardType="numeric"
        value={formData.securityMeasuresTime || ""}
        onChangeText={(text) =>
          setFormData((prev) => ({ ...prev, securityMeasuresTime: text }))
        }
      />
      <Text style={styles.subTitle}> hrs as under:</Text>

      {formData.securityMeasures.map((row, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.label}>{getSerialLetter(index)} Observation</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter observation"
            value={row.description}
            onChangeText={(text) =>
              handleInputChange(index, "description", text)
            }
          />

          <TouchableOpacity
            onPress={() => handleRemoveRow(index)}
            style={styles.removeButton}
          >
            <Ionicons name="trash" size={20} color="red" />
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity onPress={handleAddRow} style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add More</Text>
      </TouchableOpacity>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
<<<<<<< HEAD
        <Button
          title="← Previous"
          onPress={() => navigation.goBack()}
          color="#757575"
        />
        <Button
          title="Next →"
          onPress={() => navigation.navigate("NextPage")}
          color="#2196F3"
        />
=======
        <Button title="← Previous" onPress={() => navigation.navigate('LandMatters')} color="#757575" />
        <Button title="Next →" onPress={() => navigation.navigate('CCTVLocation')} color="#2196F3" />
>>>>>>> 7e0555e9bb5d9959f29eecdecefad2ecf62e12db
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
    marginBottom: 10,
    color: "#333",
  },
  subTitle: {
    fontSize: 16,
    color: "#555",
  },
  inputTime: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
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
    marginRight: 10,
    color: "#555",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
  },
  removeButton: {
    padding: 10,
    marginLeft: 10,
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
});

export default SecurityMeasuresPage;
