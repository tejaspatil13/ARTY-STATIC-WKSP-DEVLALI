import React, { useContext, useEffect, useState } from "react";
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
import Checkbox from "expo-checkbox";
import { FormContext } from "../utils/FormContext";

const DefenseLandSurveyPage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);
  const [observations, setObservations] = useState(
    formData[0].defense_land_survey?.observations || []
  );

  const removeObservation = (index) => {
    if (observations.length > 1) {
      // Ensure we keep at least one observation
      const newObservations = observations.filter((_, i) => i !== index);
      setObservations(newObservations);
      setFormData((prevState) => {
        const newState = [...prevState];
        newState[0].defense_land_survey = {
          ...newState[0].defense_land_survey,
          observations: newObservations,
        };
        return newState;
      });
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prevState) => {
      const newState = [...prevState];
      newState[0].defense_land_survey = {
        ...newState[0].defense_land_survey,
        [field]: value,
      };
      return newState;
    });
  };

  const toggleCheckbox = (field) => {
    setFormData((prevState) => {
      const newState = [...prevState];
      newState[0].defense_land_survey = {
        ...newState[0].defense_land_survey,
        [field]: !newState[0].defense_land_survey[field],
      };
      return newState;
    });
  };

  const addObservation = () => {
    const newObservations = [...observations, { text: "" }];
    setObservations(newObservations);
    setFormData((prevState) => {
      const newState = [...prevState];
      newState[0].defense_land_survey = {
        ...newState[0].defense_land_survey,
        observations: newObservations,
      };
      return newState;
    });
  };

  const updateObservation = (index, text) => {
    const newObservations = observations.map((obs, i) =>
      i === index ? { ...obs, text } : obs
    );
    setObservations(newObservations);
    setFormData((prevState) => {
      const newState = [...prevState];
      newState[0].defense_land_survey = {
        ...newState[0].defense_land_survey,
        observations: newObservations,
      };
      return newState;
    });
  };

  // Initialize defense_land_survey if it doesn't exist
  useEffect(() => {
    if (!formData[0].defense_land_survey) {
      setFormData((prevState) => {
        const newState = [...prevState];
        newState[0].defense_land_survey = {
          text: "I visited def land survey No. 36,38,40,41,43,59 along with a rep of the RP/QM and made entry in the Def land visit register. I have the following to report",
          RP: false,
          QM: false,
          observations: [{ text: "" }],
        };
        return newState;
      });
    }
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Defense Land Survey",
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

  if (!formData[0].defense_land_survey) {
    return null; // or a loading indicator
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>12. Defense Land Survey</Text>

      <Text style={styles.label}>{formData[0].defense_land_survey.text}</Text>

      <View style={styles.checkboxContainer}>
        <View style={styles.checkboxRow}>
          <Checkbox
            value={formData[0].defense_land_survey.RP || false}
            onValueChange={() => toggleCheckbox("RP")}
          />
          <Text style={styles.checkboxLabel}>RP (Regimental Police)</Text>
        </View>
        <View style={styles.checkboxRow}>
          <Checkbox
            value={formData[0].defense_land_survey.QM || false}
            onValueChange={() => toggleCheckbox("QM")}
          />
          <Text style={styles.checkboxLabel}>QM (Quartermaster)</Text>
        </View>
      </View>

      <Text style={styles.label}>Observations/Findings:</Text>
      {observations.map((obs, index) => (
        <View key={index} style={styles.observationRow}>
          <Text style={styles.observationLabel}>{index + 1}.</Text>
          <TextInput
            multiline={true}
            style={styles.observationInput}
            placeholder={`Observation `}
            value={obs.text}
            onChangeText={(text) => updateObservation(index, text)}
          />
          {observations.length > 1 && (
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeObservation(index)}
            >
              <Ionicons name="trash" size={20} color="red" />
            </TouchableOpacity>
          )}
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={addObservation}>
        <Text style={styles.addButtonText}>Add Observation</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <Button
          title="← Previous"
          onPress={() => navigation.navigate("LandMatters")}
          color="#757575"
        />
        <Button
          title="Next →"
          onPress={() => navigation.navigate("QuarterGdKote")}
          color="#2196F3"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  removeButton: {
    paddingLeft: 10,
  },
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
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
    textAlignVertical: "top",
  },
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 14,
    color: "#555",
  },
  observationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  observationLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  observationInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
  },
  addButton: {
    backgroundColor: "#34d399",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
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
    borderRadius: 8,
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

export default DefenseLandSurveyPage;
