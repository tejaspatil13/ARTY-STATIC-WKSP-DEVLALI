import React, { useContext, useEffect } from "react";
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
import { FormContext } from "../utils/FormContext";

const MobileCheckPage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);

  // Get mobileCheckRows from formData[0]
  const mobileCheckRows = formData[0]?.mobileCheckRows || [];

  const addRow = () => {
    const newRow = {
      id: Date.now(),
      rank: "",
      name: "",
      makeAndType: "",
      mobNo: "",
      bannedAppAndPpoCalls: "",
      remarks: "",
    };

    setFormData((prev) => {
      const updatedFormData = [...prev];
      updatedFormData[0] = {
        ...updatedFormData[0],
        mobileCheckRows: [...mobileCheckRows, newRow],
      };
      return updatedFormData;
    });
  };

  const handleInputChange = (id, field, value) => {
    const updatedRows = mobileCheckRows.map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    );

    setFormData((prev) => {
      const updatedFormData = [...prev];
      updatedFormData[0] = {
        ...updatedFormData[0],
        mobileCheckRows: updatedRows,
      };
      return updatedFormData;
    });
  };

  const deleteRow = (id) => {
    const updatedRows = mobileCheckRows.filter((row) => row.id !== id);

    setFormData((prev) => {
      const updatedFormData = [...prev];
      updatedFormData[0] = {
        ...updatedFormData[0],
        mobileCheckRows: updatedRows,
      };
      return updatedFormData;
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Mobile Check",
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>23. Mobile Check</Text>
      <Text style={styles.label}>
        I have surprised check the mobiles for banned app & PIO calls of fwg
        pers
      </Text>

      {mobileCheckRows.map((row, index) => (
        <View key={row.id} style={styles.card}>
          <View style={styles.rowHeader}>
            <Text style={styles.label}>Entry {index + 1}</Text>
            {mobileCheckRows.length > 1 && (
              <TouchableOpacity onPress={() => deleteRow(row.id)}>
                <Ionicons name="trash" size={24} color="red" />
              </TouchableOpacity>
            )}
          </View>

          <Text style={styles.label}>Rank</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Rank"
            value={row.rank}
            onChangeText={(t) => handleInputChange(row.id, "rank", t)}
          />

          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Name"
            value={row.name}
            onChangeText={(t) => handleInputChange(row.id, "name", t)}
          />

          <Text style={styles.label}>Make & Type</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Make & Type"
            value={row.makeAndType}
            onChangeText={(t) => handleInputChange(row.id, "makeAndType", t)}
          />

          <Text style={styles.label}>Mob No.</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Mob No."
            value={row.mobNo}
            onChangeText={(t) => handleInputChange(row.id, "mobNo", t)}
          />

          <Text style={styles.label}>Banned App & PIO Calls</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Banned App & PIO Calls"
            value={row.bannedAppAndPpoCalls}
            onChangeText={(t) =>
              handleInputChange(row.id, "bannedAppAndPpoCalls", t)
            }
          />

          <Text style={styles.label}>Remarks</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Remarks"
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
          onPress={() => navigation.navigate("QtrVisit")}
          color="#757575"
        />
        <Button
          title="Next →"
          onPress={() => navigation.navigate("LiquorIssue")}
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
  rowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
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
  homeButton: {
    marginLeft: 15,
  },
});

export default MobileCheckPage;
