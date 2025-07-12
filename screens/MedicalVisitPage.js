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
import { Ionicons } from "@expo/vector-icons";
import { FormContext } from "../utils/FormContext";
import DateTimePicker from "@react-native-community/datetimepicker";

const MedicalVisitPage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());

  const devlaliVisitData = formData[0]?.devlali_visit || {
    time: "",
    observations: [{ id: 1, text: "" }],
  };

  const [observations, setObservations] = useState(
    devlaliVisitData.observations
  );

  const handleTimeChange = (event, selected) => {
    setShowTimePicker(false);
    if (selected) {
      setSelectedTime(selected);
      const timeString = selected.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      setFormData((prev) => {
        const updatedFormData = [...prev];
        if (!updatedFormData[0].devlali_visit) {
          updatedFormData[0].devlali_visit = {
            time: "",
            observations: [{ id: 1, text: "" }],
          };
        }
        updatedFormData[0].devlali_visit.time = timeString;
        return updatedFormData;
      });
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "MH Devlali Visit",
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
      <Text style={styles.sectionTitle}>19. MH Devlali Visit</Text>

      <Text style={styles.label}>Time</Text>
      <TouchableOpacity onPress={() => setShowTimePicker(true)}>
        <TextInput
          style={styles.input}
          placeholder="HH:MM"
          value={devlaliVisitData.time}
          editable={false}
        />
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleTimeChange}
        />
      )}

      <Text style={styles.label}>Observations</Text>
      {observations.map((obs, index) => (
        <View key={obs.id} style={styles.observationRow}>
          <Text style={styles.observationLabel}>{index + 1}.</Text>
          <TextInput
            multiline={true}
            style={styles.observationInput}
            placeholder={`Observation ${index + 1}`}
            value={obs.text}
            onChangeText={(text) => {
              const updatedObservations = observations.map((o) =>
                o.id === obs.id ? { ...o, text } : o
              );
              setObservations(updatedObservations);
              setFormData((prev) => {
                const updatedFormData = [...prev];
                updatedFormData[0].devlali_visit.observations =
                  updatedObservations;
                return updatedFormData;
              });
            }}
          />
          {observations.length > 1 && (
            <TouchableOpacity
              onPress={() => {
                const updatedObservations = observations.filter(
                  (o) => o.id !== obs.id
                );
                setObservations(updatedObservations);
                setFormData((prev) => {
                  const updatedFormData = [...prev];
                  updatedFormData[0].devlali_visit.observations =
                    updatedObservations;
                  return updatedFormData;
                });
              }}
              style={styles.deleteButton}
            >
              <Ionicons name="trash" size={20} color="red" />
            </TouchableOpacity>
          )}
        </View>
      ))}

      <Button
        title="Add Observation"
        onPress={() => {
          const newObservations = [
            ...observations,
            { id: Date.now(), text: "" },
          ];
          setObservations(newObservations);
          setFormData((prev) => {
            const updatedFormData = [...prev];
            updatedFormData[0].devlali_visit.observations = newObservations;
            return updatedFormData;
          });
        }}
        color="#34d399"
      />

      <View style={styles.buttonContainer}>
        <Button
          title="← Previous"
          onPress={() => navigation.navigate("CCTVLocation")}
          color="#757575"
        />
        <Button
          title="Next →"
          onPress={() => navigation.navigate("RollCall")}
          color="#2196F3"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  container: { flexGrow: 1, padding: 20, backgroundColor: "#f5f5f5" },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 10, color: "#555" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
    fontSize: 16,
    marginBottom: 10,
  },
  observationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  observationLabel: { fontSize: 16, fontWeight: "bold", marginRight: 10 },
  observationInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
  },
  deleteButton: { marginLeft: 10, padding: 5 },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  homeButton: { marginLeft: 15 },
});

export default MedicalVisitPage;
