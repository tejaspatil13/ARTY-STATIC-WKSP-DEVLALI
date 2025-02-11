import React, { useContext, useState, useEffect } from "react";
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

const AmnMagazinePage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);
  const [localRows, setLocalRows] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const currentData = formData[0]?.amn_magazine?.amnMagazineRows || [
      {
        id: 1,
        amn: "",
        firstLine: "",
        secondLine: "",
        trg: "",
        usedCartridges: "",
        remarks: "",
      },
    ];
    setLocalRows(currentData);
  }, [formData]);

  const addRow = () => {
    const newRow = {
      id: Date.now(),
      amn: "",
      firstLine: "",
      secondLine: "",
      trg: "",
      usedCartridges: "",
      remarks: "",
    };
    const updatedRows = [...localRows, newRow];
    setLocalRows(updatedRows);
    updateFormData(updatedRows);
  };

  const handleInputChange = (id, field, value) => {
    const updatedRows = localRows.map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    );
    setLocalRows(updatedRows);
    updateFormData(updatedRows);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      const formattedDate = selectedDate.toISOString().split("T")[0];
      setFormData((prev) =>
        prev.map((item, index) =>
          index === 0
            ? {
                ...item,
                amn_magazine: {
                  ...item.amn_magazine,
                  amnMagazineCheckDate: formattedDate,
                },
              }
            : item
        )
      );
    }
  };

  const updateFormData = (updatedRows) => {
    setFormData((prev) =>
      prev.map((item, index) =>
        index === 0
          ? {
              ...item,
              amn_magazine: {
                ...item.amn_magazine,
                amnMagazineRows: updatedRows,
              },
            }
          : item
      )
    );
  };

  const deleteRow = (id) => {
    const updatedRows = localRows.filter((row) => row.id !== id);
    setLocalRows(updatedRows);
    updateFormData(updatedRows);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Amn Magazine",
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
      <Text style={styles.sectionTitle}>14. Amn Magazine</Text>
      <Text style={styles.label}>
        I have physically checked the Amn Magazine on:
      </Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <TextInput
          style={styles.input}
          placeholder="Select Date"
          value={formData[0]?.amn_magazine?.amnMagazineCheckDate || ""}
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

      {localRows.map((row, index) => (
        <View key={row.id} style={styles.card}>
          <View style={styles.rowHeader}>
            <Text style={styles.label}>Entry {index + 1}</Text>
            {localRows.length > 1 && (
              <TouchableOpacity onPress={() => deleteRow(row.id)}>
                <Ionicons name="trash" size={24} color="red" />
              </TouchableOpacity>
            )}
          </View>

          <TextInput
            multiline={true}
            style={styles.input}
            placeholder="Amn"
            value={row.amn}
            onChangeText={(t) => handleInputChange(row.id, "amn", t)}
          />
          <TextInput
            multiline={true}
            style={styles.input}
            placeholder="1st Line"
            value={row.firstLine}
            onChangeText={(t) => handleInputChange(row.id, "firstLine", t)}
          />
          <TextInput
            multiline={true}
            style={styles.input}
            placeholder="2nd Line"
            value={row.secondLine}
            onChangeText={(t) => handleInputChange(row.id, "secondLine", t)}
          />
          <TextInput
            multiline={true}
            style={styles.input}
            placeholder="Trg"
            value={row.trg}
            onChangeText={(t) => handleInputChange(row.id, "trg", t)}
          />
          <TextInput
            multiline={true}
            style={styles.input}
            placeholder="Used Cartridges"
            value={row.usedCartridges}
            onChangeText={(t) => handleInputChange(row.id, "usedCartridges", t)}
          />
          <TextInput
            multiline={true}
            style={styles.input}
            placeholder="Remarks"
            value={row.remarks}
            onChangeText={(t) => handleInputChange(row.id, "remarks", t)}
          />
        </View>
      ))}

      <TouchableOpacity onPress={addRow} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Another Entry</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <Button
          title="← Previous"
          onPress={() => navigation.navigate("QuarterGdKote")}
          color="#757575"
        />
        <Button
          title="Next →"
          onPress={() => navigation.navigate("CSDSampleChecks")}
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
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  homeButton: {
    marginLeft: 15,
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
  rowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
});

export default AmnMagazinePage;
