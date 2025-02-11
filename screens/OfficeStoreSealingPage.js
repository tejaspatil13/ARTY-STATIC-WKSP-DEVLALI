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
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { FormContext } from "../utils/FormContext";

const QuarterGdKotePage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);
  const [rows, setRows] = useState(
    formData[0].quarter_gd_kote?.quarterGdKoteRows || [
      { id: 1, held: "", armsOut: "", armsIn: "", remarks: "", ate: "" },
    ]
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showATEPicker, setShowATEPicker] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [date, setDate] = useState(new Date());
  const [ateTime, setATETime] = useState(new Date());

  const handleInputChange = (id, field, value) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
    updateFormData(updatedRows);
  };

  const updateFormData = (updatedRows) => {
    setFormData((prevState) => {
      const newState = [...prevState];
      newState[0].quarter_gd_kote = {
        ...newState[0].quarter_gd_kote,
        quarterGdKoteRows: updatedRows,
      };
      return newState;
    });
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      setFormData((prevState) => {
        const newState = [...prevState];
        newState[0].quarter_gd_kote = {
          ...newState[0].quarter_gd_kote,
          koteCheckDate: selectedDate.toISOString().split("T")[0],
        };
        return newState;
      });
    }
  };

  const handleATEChange = (event, selectedTime) => {
    setShowATEPicker(false);
    if (selectedTime && selectedRowId) {
      setATETime(selectedTime);
      const timeString = selectedTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      handleInputChange(selectedRowId, "ate", timeString);
    }
  };

  const addRow = () => {
    const newRow = {
      id: Date.now(),
      type: "",
      held: "",
      armsOut: "",
      armsIn: "",
      remarks: "",
      ate: "",
    };
    const updatedRows = [...rows, newRow];
    setRows(updatedRows);
    updateFormData(updatedRows);
  };

  const deleteRow = (id) => {
    if (rows.length > 1) {
      const updatedRows = rows.filter((row) => row.id !== id);
      setRows(updatedRows);
      updateFormData(updatedRows);
    }
  };

  useEffect(() => {
    if (!formData[0].quarter_gd_kote) {
      setFormData((prevState) => {
        const newState = [...prevState];
        newState[0].quarter_gd_kote = {
          koteCheckDate: "",
          quarterGdKoteRows: [
            { id: 1, held: "", armsOut: "", armsIn: "", remarks: "", ate: "" },
          ],
        };
        return newState;
      });
    }
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Quarter Gd & Kote",
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

  if (!formData[0].quarter_gd_kote) {
    return null;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>13. Quarter Gd & Kote</Text>

      <Text style={styles.label}>
        I have physically checked the Arms in Kote on:
      </Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <TextInput
          style={styles.input}
          placeholder="Select Date"
          value={formData[0].quarter_gd_kote.koteCheckDate}
          editable={false}
        />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {rows.map((row) => (
        <View key={row.id} style={styles.card}>
          <View style={styles.rowHeader}>
            <Text style={styles.rowTitle}>Entry {row.id}</Text>
            {rows.length > 1 && (
              <TouchableOpacity
                onPress={() => deleteRow(row.id)}
                style={styles.deleteButton}
              >
                <Ionicons name="trash-outline" size={24} color="#ff5252" />
              </TouchableOpacity>
            )}
          </View>

          <Text style={styles.label}>Type</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Type"
            value={row.type}
            onChangeText={(t) => handleInputChange(row.id, "type", t)}
          />

          <Text style={styles.label}>Held</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Held"
            value={row.held}
            onChangeText={(t) => handleInputChange(row.id, "held", t)}
          />

          <Text style={styles.label}>Arms Out of Kote</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Arms Out"
            value={row.armsOut}
            onChangeText={(t) => handleInputChange(row.id, "armsOut", t)}
          />

          <Text style={styles.label}>Arms In Kote</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Arms In"
            value={row.armsIn}
            onChangeText={(t) => handleInputChange(row.id, "armsIn", t)}
          />

          <Text style={styles.label}>ATE Time</Text>
          <TouchableOpacity
            onPress={() => {
              setSelectedRowId(row.id);
              setShowATEPicker(true);
            }}
          >
            <TextInput
              style={styles.input}
              placeholder="HH:MM"
              value={row.ate}
              editable={false}
            />
          </TouchableOpacity>

          <Text style={styles.label}>Remarks</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Remarks"
            value={row.remarks}
            onChangeText={(t) => handleInputChange(row.id, "remarks", t)}
            multiline
          />
        </View>
      ))}

      {showATEPicker && (
        <DateTimePicker
          value={ateTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleATEChange}
        />
      )}

      <TouchableOpacity onPress={addRow} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Entry</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <Button
          title="← Previous"
          onPress={() => navigation.goBack()}
          color="#757575"
        />
        <Button
          title="Next →"
          onPress={() => navigation.navigate("Next")}
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
  card: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  rowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  deleteButton: {
    padding: 4,
  },
  addButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 15,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 30,
  },
  homeButton: {
    marginLeft: 15,
  },
});

export default QuarterGdKotePage;
