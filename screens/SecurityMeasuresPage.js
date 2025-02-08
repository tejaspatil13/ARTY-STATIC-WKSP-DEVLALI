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

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Security Measures",
      headerTitleAlign: "center",
      headerTitleStyle: { fontSize: 22, fontWeight: "bold", color: "#333" },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Main")} style={styles.homeButton}>
          <Ionicons name="home" size={28} color="#000" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleInputChange = (id, value) => {
    const updatedMeasures = securityMeasures.map((item) =>
      item.id === id ? { ...item, description: value } : item
    );
    setSecurityMeasures(updatedMeasures);
    setFormData((prev) => ({ ...prev, securityMeasures: updatedMeasures }));
  };

  const handleObservationChange = (id, value) => {
    setFormData((prev) => {
      const updatedObservations = { ...prev.securityMeasuresObservations };
      updatedObservations[id] = value;
      return { ...prev, securityMeasuresObservations: updatedObservations };
    });
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
      <Text style={styles.label}>I have checked the premises of ASW AOR at:</Text>
      <TextInput
        style={[styles.input, styles.fullWidth]}
        placeholder="HH:MM"
        keyboardType="numeric"
        value={formData.securityMeasuresTime || ""}
        onChangeText={(text) =>
          setFormData((prev) => ({ ...prev, securityMeasuresTime: text }))
        }
      />

      {["Any Salesmen/Beggars found in AOR", "Checked unit AoR for unauthorized occupation of def land"].map((text, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.serial}>{String.fromCharCode(97 + index)})</Text>
          <Text style={styles.fixedText}>{text}</Text>
          <RadioButton.Group
            onValueChange={(value) => toggleRadioButton(text, value)}
            value={formData.securityMeasuresRadios?.[text] || ""}
          >
            <View style={styles.radioButtonContainer}>
              <RadioButton value="yes" /><Text>Yes</Text>
              <RadioButton value="no" /><Text>No</Text>
            </View>
          </RadioButton.Group>
          <TextInput
            style={styles.observationInput}
            placeholder="Enter observations"
            multiline
            value={formData.securityMeasuresObservations?.[text] || ""}
            onChangeText={(text) => handleObservationChange(text, text)}
          />
        </View>
      ))}

      {securityMeasures.map((measure, index) => (
        <View key={measure.id} style={styles.card}>
          <Text style={styles.serial}>{String.fromCharCode(99 + index)})</Text>
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
              <RadioButton value="yes" /><Text>Yes</Text>
              <RadioButton value="no" /><Text>No</Text>
            </View>
          </RadioButton.Group>
          <TextInput
            style={styles.observationInput}
            placeholder="Enter observations"
            multiline
            value={formData.securityMeasuresObservations?.[measure.id] || ""}
            onChangeText={(text) => handleObservationChange(measure.id, text)}
          />
          <TouchableOpacity onPress={() => removeMeasure(measure.id)} style={styles.removeButton}>
            <Ionicons name="trash" size={20} color="red" />
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity onPress={addMeasure} style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add More</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <Button title="← Previous" onPress={() => navigation.navigate("TSS")} color="#757575" />
        <Button title="Next →" onPress={() => navigation.navigate("CCTVLocation")} color="#2196F3" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  homeButton: { marginLeft: 15 },
  container: { flexGrow: 1, padding: 20, backgroundColor: "#f5f5f5" },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10, color: "#333" },
  label: { fontSize: 16, color: "#555", marginBottom: 5 },
  fullWidth: { width: "100%" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, backgroundColor: "#fff", marginBottom: 10 },
  card: { backgroundColor: "#fff", padding: 15, borderRadius: 10, elevation: 3, marginBottom: 15 },
  serial: { fontSize: 16, fontWeight: "bold", color: "#555" },
  fixedText: { fontSize: 14, color: "#555", flex: 1 },
  radioButtonContainer: { flexDirection: "row", alignItems: "center" },
  observationInput: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, backgroundColor: "#fff", marginTop: 10 },
  addButton: { padding: 12, backgroundColor: "#34d399", borderRadius: 5, alignItems: "center", marginTop: 20 },
  addButtonText: { color: "#fff", fontWeight: "bold" },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 30 },
});

export default SecurityMeasuresPage;