import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Importing Ionicons
import { FormContext } from "../utils/FormContext";
import DateTimePicker from "@react-native-community/datetimepicker";

const MTBriefingPage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);
  const [strengthFields, setStrengthFields] = useState(
    formData[0].mt_briefing.mtStrengthFields || [{ id: 1, name: "" }]
  );
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onTimeChange = (event, selected) => {
    setShowTimePicker(false);
    if (selected) {
      setSelectedDate(selected);
      const formattedTime = selected.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      handleInputChange("mt_time", formattedTime);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prevData) =>
      prevData?.map((item, index) => ({
        ...item,
        mt_briefing: {
          ...item.mt_briefing, // Keep existing data
          [field]: value, // Update only the specific field
        },
      }))
    );
  };

  const addStrengthField = () => {
    const newField = { id: Date.now(), name: "" }; // Unique ID using timestamp
    const updatedFields = [...strengthFields, newField];
    setStrengthFields(updatedFields);
    setFormData((prevData) => {
      if (!Array.isArray(prevData)) return prevData;
      return prevData.map((item) => ({
        ...item,
        mt_briefing: {
          ...item.mt_briefing,
          mtStrengthFields: updatedFields ?? [],
        },
      }));
    });
  };

  const removeStrengthField = (id) => {
    const updatedFields = strengthFields.filter((field) => field.id !== id);
    setStrengthFields(updatedFields);
    setFormData((prevData) => {
      if (!Array.isArray(prevData)) return prevData; // Ensure prevData is an array
      return prevData.map((item) => ({
        ...item,
        mt_briefing: {
          ...item.mt_briefing,
          mtStrengthFields: updatedFields ?? [], // Ensure mtStrengthFields is always an array
        },
      }));
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "MT Briefing",
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
      {/* Section Title */}
      <Text style={styles.sectionTitle}>3. MT Briefing</Text>

      {/* Time Input */}
      <Text style={styles.label}>Time</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Time"
        value={formData[0].mt_briefing.mt_time}
        onChangeText={(t) => handleInputChange("mt_time", t)}
        onPress={() => setShowTimePicker(true)}
      />

      {showTimePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="time"
          onChange={onTimeChange}
          is24Hour={true}
        />
      )}

      {/* Strength Input */}
      <Text style={styles.label}>Strength</Text>
      <TextInput
        multiline={true}
        style={styles.input}
        placeholder="Enter Strength"
        value={formData[0].mt_briefing.mt_strength}
        onChangeText={(t) => handleInputChange("mt_strength", t)}
      />

      {/* Strength Details Section */}
      <Text style={styles.label}>Details:</Text>
      {strengthFields?.map((field, index) => (
        <View key={field.id} style={styles.fieldRow}>
          <TextInput
            multiline={true}
            key={`input-${field.id}`}
            style={styles.fullWidthInput}
            placeholder={`(${String.fromCharCode(97 + index)}) Enter details`}
            value={field.name}
            onChangeText={(text) => {
              const updatedFields = [...strengthFields];
              updatedFields[index].name = text;
              setStrengthFields(updatedFields);
              handleInputChange("mtStrengthFields", updatedFields);
            }}
          />
          {formData[0].mt_briefing.mtStrengthFields.length > 1 && (
            <TouchableOpacity
              key={`delete-${field.id}`} // Unique key for delete button
              onPress={() => removeStrengthField(field.id)}
              style={styles.removeButton}
            >
              <Ionicons name="trash" size={24} color="white" />
              {/* Trash bin icon */}
            </TouchableOpacity>
          )}
        </View>
      ))}

      {/* Add More Button */}
      <TouchableOpacity onPress={addStrengthField} style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add More</Text>
      </TouchableOpacity>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          title="← Previous"
          onPress={() => navigation.navigate("GuardDetails")}
          color="#757575"
        />
        <Button
          title="Next →"
          onPress={() => navigation.navigate("GuardCheck")}
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
  fieldRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
  },
  fullWidthInput: {
    flex: 1, // Makes the input take full width
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
  },
  removeButton: {
    backgroundColor: "#ff5c5c",
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#34d399",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
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

export default MTBriefingPage;
