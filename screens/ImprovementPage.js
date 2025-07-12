import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { FormContext } from "../utils/FormContext";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import XLSX from "xlsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Sharing from "expo-sharing";

const ImprovementPage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);

  useEffect(() => {
    if (
      !formData[0]?.improvement_in_wksp_tech ||
      formData[0].improvement_in_wksp_tech.length < 2
    ) {
      setFormData((prev) => {
        const newFormData = [...prev];
        newFormData[0] = {
          ...newFormData[0],
          improvement_in_wksp_tech: [
            { id: Date.now() + 1, point: "", status: "Pending" },
            { id: Date.now() + 2, point: "", status: "Pending" },
          ],
        };
        return newFormData;
      });
    }
  }, []);

  const addPoint = () => {
    setFormData((prev) => {
      const newFormData = [...prev];
      newFormData[0] = {
        ...newFormData[0],
        improvement_in_wksp_tech: [
          ...newFormData[0].improvement_in_wksp_tech,
          { id: Date.now(), point: "", status: "Pending" },
        ],
      };
      return newFormData;
    });
  };

  const removePoint = (id) => {
    if (formData[0].improvement_in_wksp_tech.length > 2) {
      setFormData((prev) => {
        const newFormData = [...prev];
        newFormData[0] = {
          ...newFormData[0],
          improvement_in_wksp_tech:
            newFormData[0].improvement_in_wksp_tech.filter(
              (point) => point.id !== id
            ),
        };
        return newFormData;
      });
    }
  };

  const toggleStatus = (id, status) => {
    setFormData((prev) => {
      const newFormData = [...prev];
      newFormData[0] = {
        ...newFormData[0],
        improvement_in_wksp_tech: newFormData[0].improvement_in_wksp_tech.map(
          (point) => (point.id === id ? { ...point, status } : point)
        ),
      };
      return newFormData;
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Improvement Page",
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

  const createExcel = async () => {
    const fileName = "Improvement_Workshop_Tech.xlsx";

    const processArrayData = (arrayData, dutyStartDate, dutyEndDate) => {
      return arrayData.map((item) => ({
        dutyStartDate,
        dutyEndDate,
        ...item,
      }));
    };

    try {
      alert("Please Wait, creating the excel which could take time");

      // Retrieve data from AsyncStorage
      const storedData = await AsyncStorage.getItem("formData");
      if (!storedData) {
        alert("No data found in storage");
        return;
      }

      const formData = JSON.parse(storedData);
      const improvementData = [];

      // Extract only the 25th section's data
      formData.forEach((entry) => {
        const { dutyStartDate, dutyEndDate, improvement_in_wksp_tech } = entry;
        improvementData.push(
          ...processArrayData(
            improvement_in_wksp_tech || [],
            dutyStartDate,
            dutyEndDate
          )
        );
      });

      // Create a new workbook
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(improvementData);
      XLSX.utils.book_append_sheet(wb, ws, "Improvement_Workshop_Tech");

      // Convert workbook to base64
      const wbOut = XLSX.write(wb, { type: "base64", bookType: "xlsx" });

      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

      if (!permissions.granted) {
        alert("Please allow access to save the file");
        return;
      }

      // Create and save the file in selected directory
      const uri = await FileSystem.StorageAccessFramework.createFileAsync(
        permissions.directoryUri,
        fileName,
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );

      await FileSystem.writeAsStringAsync(uri, wbOut, {
        encoding: FileSystem.EncodingType.Base64,
      });

      alert("File saved successfully!");
    } catch (error) {
      alert("Error creating Excel file, Contact the maker!");
      console.error(error);
    }
  };

  const clearData = () => {
    setFormData((prevData) =>
      prevData.map((entry) => ({
        ...entry,
        improvement_in_wksp_tech: [
          {
            id: 1,
            point: "",
            status: "Pending",
          },
          {
            id: 2,
            point: "",
            status: "Pending",
          },
        ],
      }))
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.sectionTitle}>
          25. Improvement in Wksp Tech Processes and Functioning/Welfare of Tps.
        </Text>

        {formData[0]?.improvement_in_wksp_tech?.map((point, index) => (
          <View key={point.id} style={styles.inputCon}>
            <View style={styles.inputRow}>
              <Text style={styles.subLabel}>{`(${String.fromCharCode(
                97 + index
              )})`}</Text>
              <TextInput
                multiline
                style={styles.input}
                placeholder="Enter improvement point"
                value={point.point}
                onChangeText={(t) => {
                  const updatedPoints =
                    formData[0].improvement_in_wksp_tech.map((p) =>
                      p.id === point.id ? { ...p, point: t } : p
                    );
                  setFormData((prev) => {
                    const newFormData = [...prev];
                    newFormData[0] = {
                      ...newFormData[0],
                      improvement_in_wksp_tech: updatedPoints,
                    };
                    return newFormData;
                  });
                }}
              />
            </View>
            <View style={styles.radioLine}>
              <View style={styles.radioGroup}>
                <TouchableOpacity
                  style={styles.radioButton}
                  onPress={() => toggleStatus(point.id, "Completed")}
                >
                  <Ionicons
                    name={
                      point.status === "Completed"
                        ? "radio-button-on"
                        : "radio-button-off"
                    }
                    size={20}
                    color="green"
                  />
                  <Text>Completed</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.radioButton}
                  onPress={() => toggleStatus(point.id, "Pending")}
                >
                  <Ionicons
                    name={
                      point.status === "Pending"
                        ? "radio-button-on"
                        : "radio-button-off"
                    }
                    size={20}
                    color="red"
                  />
                  <Text>Pending</Text>
                </TouchableOpacity>
              </View>

              {formData[0].improvement_in_wksp_tech.length > 2 && (
                <TouchableOpacity
                  style={{ marginLeft: 10 }}
                  onPress={() => removePoint(point.id)}
                >
                  <Ionicons name="trash" size={24} color="red" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}

        <TouchableOpacity onPress={addPoint} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Improvement Point</Text>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <Button
            title="← Previous"
            onPress={() => navigation.navigate("LiquorIssue")}
            color="#757575"
          />
          <Button
            title="Next →"
            onPress={() => navigation.navigate("Awareness")}
            color="#2196F3"
          />
        </View>
      </ScrollView>
      <View style={styles.bottomButtons}>
        <TouchableOpacity onPress={createExcel} style={styles.excelButton}>
          <Text style={styles.addButtonText}>Make Excel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={clearData} style={styles.excelButton}>
          <Text style={styles.addButtonText}>Clear Section</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottomButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingBlock: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  safeArea: { flex: 1, backgroundColor: "#f5f5f5" },
  container: { flexGrow: 1, padding: 20 },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  subLabel: {
    margin: "auto",
  },
  inputCon: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    elevation: 10,
    marginBottom: 10,
  },
  inputRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    gap: 15,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
  },
  radioLine: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  radioGroup: { flexDirection: "row", gap: 10 },
  radioButton: { flexDirection: "row", alignItems: "center", gap: 5 },
  addButton: {
    backgroundColor: "#34d399",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  excelButton: {
    backgroundColor: "#34d399",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    width: "45%",
  },
  addButtonText: { color: "#fff", fontWeight: "bold" },
  homeButton: { marginLeft: 15 },
});

export default ImprovementPage;
