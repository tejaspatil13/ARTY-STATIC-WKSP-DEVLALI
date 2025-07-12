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
import { FormContext } from "../utils/FormContext";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

const RollCallPage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());

  const handleInputChange = (field, value) => {
    setFormData((prevData) =>
      prevData.map((item, index) =>
        index === 0
          ? {
              ...item,
              roll_call: {
                ...(item.roll_call || {}),
                [field]: value,
              },
            }
          : item
      )
    );
  };

  const onDateChange = (event, selected) => {
    setShowDatePicker(false);
    if (selected) {
      setSelectedDate(selected);
      const formattedDate = selected.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      handleInputChange("date", formattedDate);
    }
  };

  const onTimeChange = (event, selected) => {
    setShowTimePicker(false);
    if (selected) {
      setSelectedTime(selected);
      const formattedTime = selected.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      handleInputChange("time", formattedTime);
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Roll Call",
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

  useEffect(() => {
    if (!formData[0]?.roll_call) {
      setFormData((prevData) => {
        const updatedForm = {
          ...prevData[0],
          roll_call: {
            date: "",
            time: "",
            details: "",
            date: new Date().toLocaleDateString("en-GB"),
            time: new Date().toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }),
          },
        };
        return [updatedForm, ...prevData.slice(1)];
      });
    }
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>20. Roll Call</Text>

      <Text style={styles.label}>I attended the Roll Call at:</Text>
      <TouchableOpacity onPress={() => setShowTimePicker(true)}>
        <TextInput
          style={styles.input}
          placeholder="Enter Roll Call Time"
          value={formData[0]?.roll_call?.time || ""}
          editable={false}
        />
      </TouchableOpacity>

      {showTimePicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          is24Hour={true}
          onChange={onTimeChange}
        />
      )}

      <Text style={styles.label}>On:</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <TextInput
          style={styles.input}
          placeholder="Enter Roll Call Date"
          value={formData[0]?.roll_call?.date || ""}
          editable={false}
        />
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          onChange={onDateChange}
        />
      )}

      <Text style={styles.label}>Briefed tps on the following aspects:</Text>
      <TextInput
        style={styles.largeInput}
        placeholder="Enter briefing details..."
        value={formData[0]?.roll_call?.details || ""}
        onChangeText={(value) => handleInputChange("details", value)}
        multiline={true}
      />

      <View style={styles.buttonContainer}>
        <Button
          title="← Previous"
          onPress={() => navigation.navigate("MedicalVisit")}
          color="#757575"
        />
        <Button
          title="Next →"
          onPress={() => navigation.navigate("SaleCSD")}
          color="#2196F3"
        />
      </View>
    </ScrollView>
  );
};

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
  },
  largeInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
    textAlignVertical: "top",
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

export default RollCallPage;
