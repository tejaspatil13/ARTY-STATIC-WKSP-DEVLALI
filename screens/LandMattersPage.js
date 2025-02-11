import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { FormContext } from "../utils/FormContext";

const LandMattersPage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);
  const [showPicker, setShowPicker] = useState(null);

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
    return null;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>11. Land Matters</Text>

      {formData[0].land_matters.map((entry, index) => (
        <View key={index} style={styles.entryContainer}>
          <Text style={(styles.label, { marginBottom: 10 })}>
            Entry {index + 1}
          </Text>
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Location"
            value={entry.location}
            onChangeText={(text) => handleInputChange(index, "location", text)}
          />

          <Text style={styles.label}>Time</Text>
          <TouchableOpacity
            onPress={() => setShowPicker(index)}
            style={styles.input}
          >
            <Text>{entry.time || "Select Time"}</Text>
          </TouchableOpacity>
          {showPicker === index && (
            <DateTimePicker
              value={new Date()}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={(event, selectedDate) => {
                setShowPicker(null);
                if (selectedDate) {
                  const formattedTime = selectedDate.toLocaleTimeString(
                    "en-GB",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  );
                  handleInputChange(index, "time", formattedTime);
                }
              }}
            />
          )}

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
  removeButton: {
    backgroundColor: "#ff5252",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
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
  homeButton: {
    marginLeft: 15,
  },
});

export default LandMattersPage;
