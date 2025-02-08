import React, { useContext, useState } from "react";
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
import { RadioButton } from "react-native-paper";
import { FormContext } from "../utils/FormContext";

const SecurityMeasuresPage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);
  const [securityMeasures, setSecurityMeasures] = useState(
    formData.securityMeasures || []
  );

  const handleInputChange = (id, value) => {
    const updatedMeasures = securityMeasures.map((item) =>
      item.id === id ? { ...item, description: value } : item
    );
    setSecurityMeasures(updatedMeasures);
    setFormData((prev) => ({ ...prev, securityMeasures: updatedMeasures }));
  };

  const toggleRadioButton = (id, value) => {
    setFormData((prev) => {
      const updatedValues = { ...prev.securityMeasuresRadios };
      updatedValues[id] = value;
      return { ...prev, securityMeasuresRadios: updatedValues };
    });
  };

  const addMeasure = () => {
    const newId = securityMeasures.length + 1;
    const newMeasure = { id: newId, description: "" };
    const updatedMeasures = [...securityMeasures, newMeasure];
    setSecurityMeasures(updatedMeasures);
    setFormData((prev) => ({ ...prev, securityMeasures: updatedMeasures }));
  };

  const removeMeasure = (id) => {
    const updatedMeasures = securityMeasures.filter((item) => item.id !== id);
    setSecurityMeasures(updatedMeasures);
    setFormData((prev) => ({ ...prev, securityMeasures: updatedMeasures }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>17. Security Measures</Text>
      <Text style={styles.subTitle}>
        I have checked the premises of ASW AOR at
      </Text>
      <TextInput
        style={styles.inputTime}
        placeholder="HH:MM"
        keyboardType="numeric"
        value={formData.securityMeasuresTime || ""}
        onChangeText={(text) =>
          setFormData((prev) => ({ ...prev, securityMeasuresTime: text }))
        }
      />
      <Text style={styles.subTitle}> hrs as under:</Text>

      {[
        "Any Salesmen/Beggars found in AOR",
        "I have checked unit AoR for unauthorized occupation of def land",
      ].map((text, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.label}>{String.fromCharCode(97 + index)})</Text>
          <Text style={styles.fixedText}>{text}</Text>
          <RadioButton.Group
            onValueChange={(value) => toggleRadioButton(text, value)}
            value={formData.securityMeasuresRadios?.[text] || ""}
          >
            <View style={styles.radioButtonContainer}>
              <RadioButton value="yes" />
              <Text>Yes</Text>
              <RadioButton value="no" />
              <Text>No</Text>
            </View>
          </RadioButton.Group>
        </View>
      ))}

      {securityMeasures.map((measure, index) => (
        <View key={measure.id} style={styles.card}>
          <Text style={styles.label}>{String.fromCharCode(99 + index)})</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter additional measure"
            value={measure.description}
            onChangeText={(text) => handleInputChange(measure.id, text)}
          />
          <RadioButton.Group
            onValueChange={(value) => toggleRadioButton(measure.id, value)}
            value={formData.securityMeasuresRadios?.[measure.id] || ""}
          >
            <View style={styles.radioButtonContainer}>
              <RadioButton value="yes" />
              <Text>Yes</Text>
              <RadioButton value="no" />
              <Text>No</Text>
            </View>
          </RadioButton.Group>
          <TouchableOpacity
            onPress={() => removeMeasure(measure.id)}
            style={styles.removeButton}
          >
            <Ionicons name="trash" size={20} color="red" />
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity onPress={addMeasure} style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add More</Text>
      </TouchableOpacity>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          title="← Previous"
          onPress={() => navigation.goBack()}
          color="#757575"
        />
        <Button
          title="Next →"
          onPress={() => navigation.navigate("CCTVLocation")}
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
    padding: 5,
    backgroundColor: "#fff",
    marginBottom: 10,
    textAlign: "center",
    width: 80,
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
  fixedText: {
    flex: 1,
    fontSize: 14,
    color: "#555",
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
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