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
import DateTimePicker from "@react-native-community/datetimepicker";

const SecurityMeasuresPage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Security Measures",
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

  const handleCheckTimeChange = (event, selected) => {
    setShowTimePicker(false);
    if (selected) {
      setSelectedTime(selected);
      const timeString = selected.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      setFormData((prev) => {
        const newData = [...prev];
        newData[0].security_measures.checkTime = timeString;
        return newData;
      });
    }
  };

  const handleMeasureToggle = (index) => {
    setFormData((prev) => {
      const newData = [...prev];
      newData[0].security_measures.measures[index].check =
        !newData[0].security_measures.measures[index].check;
      return newData;
    });
  };

  const addCustomMeasure = () => {
    setFormData((prev) => {
      const newData = [...prev];
      newData[0].security_measures.measures.push({
        text: "",
        check: false,
        observation: "",
      });
      return newData;
    });
  };

  const updateCustomMeasureText = (index, text) => {
    setFormData((prev) => {
      const newData = [...prev];
      newData[0].security_measures.measures[index].text = text;
      return newData;
    });
  };

  const updateObservationText = (index, text) => {
    setFormData((prev) => {
      const newData = [...prev];
      newData[0].security_measures.measures[index].observation = text;
      return newData;
    });
  };

  const removeMeasure = (index) => {
    setFormData((prev) => {
      const newData = [...prev];
      newData[0].security_measures.measures =
        newData[0].security_measures.measures.filter((_, i) => i !== index);
      return newData;
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>17. Security Measures</Text>
      <Text style={styles.label}>{formData[0].security_measures.text} at:</Text>
      <TouchableOpacity onPress={() => setShowTimePicker(true)}>
        <TextInput
          style={[styles.input, styles.fullWidth]}
          placeholder="HH:MM"
          value={formData[0].security_measures.checkTime}
          editable={false}
        />
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleCheckTimeChange}
        />
      )}

      {formData[0].security_measures.measures.map((measure, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.headerRow}>
            <Text style={styles.serial}>
              {String.fromCharCode(97 + index)})
            </Text>
            <View style={styles.textContainer}>
              {index < 2 ? (
                <Text style={styles.fixedText}>{measure.text}</Text>
              ) : (
                <TextInput
                  style={styles.measureInput}
                  placeholder="Enter additional measure"
                  value={measure.text}
                  onChangeText={(text) => updateCustomMeasureText(index, text)}
                />
              )}
            </View>
            {index >= 2 && (
              <TouchableOpacity
                onPress={() => removeMeasure(index)}
                style={styles.removeButton}
              >
                <Ionicons name="trash" size={20} color="red" />
              </TouchableOpacity>
            )}
          </View>
          <TextInput
            style={styles.input}
            placeholder="Observation"
            value={measure.observation}
            onChangeText={(text) => updateObservationText(index, text)}
          />
          <RadioButton.Group
            onValueChange={() => handleMeasureToggle(index)}
            value={measure.check ? "yes" : "no"}
          >
            <View style={styles.radioButtonContainer}>
              <View style={styles.radioOption}>
                <RadioButton value="yes" />
                <Text>Yes</Text>
              </View>
              <View style={styles.radioOption}>
                <RadioButton value="no" />
                <Text>No</Text>
              </View>
            </View>
          </RadioButton.Group>
        </View>
      ))}

      <TouchableOpacity onPress={addCustomMeasure} style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add More</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <Button
          title="← Previous"
          onPress={() => navigation.navigate("TSS")}
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

const styles = StyleSheet.create({
  homeButton: {
    marginLeft: 15,
  },
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
  label: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  fullWidth: {
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 15,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  serial: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    marginRight: 10,
  },
  fixedText: {
    fontSize: 14,
    color: "#555",
  },
  measureInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    backgroundColor: "#fff",
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  removeButton: {
    padding: 5,
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
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
});

export default SecurityMeasuresPage;
