import React, { useContext, useEffect } from "react";
import { View, Text, Button, ScrollView, StyleSheet } from "react-native";
import { FormContext } from "../utils/FormContext";
import * as FileSystem from "expo-file-system";
import XLSX from "xlsx";
import { shareAsync } from "expo-sharing";
import createAndAppendExcel, { requestPermission } from "../utils/generator";
import AsyncStorage from "@react-native-async-storage/async-storage";

const fileName = "Daily_Report.xlsx";
const downloadsUri = FileSystem.documentDirectory + fileName; // Internal storage

const MainScreen = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);

  const fileName = "Daily_Report.xlsx";
  const fileUri = FileSystem.documentDirectory + fileName;
  const pFileUri =
    "file:///data/user/0/host.exp.exponent/files/Daily_Report.xlsx";

  const deleteExcelFile = async () => {
    try {
      const fileExists = await FileSystem.getInfoAsync(fileUri);

      if (fileExists.exists) {
        await FileSystem.deleteAsync(fileUri);
        console.log("Excel file deleted successfully.");
      } else {
        console.log("No Excel file found to delete.");
      }
    } catch (error) {
      console.log("Error deleting Excel file:", error);
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "MAIN PAGE", // Set the title
      headerTitleAlign: "center", // Center the title
      headerLeft: () => null, // Remove the back button
    });
  }, [navigation]);

  const date = new Date().toLocaleDateString("en-IN");

  // useEffect(() => {
  //   const loadFormData = async () => {
  //     try {
  //       const jsonValue = await AsyncStorage.getItem("formData");
  //       if (jsonValue !== null) {
  //         const parsedData = JSON.parse(jsonValue);
  //         const date = new Date().toLocaleDateString("en-IN");

  //         // Handle array of form data
  //         if (Array.isArray(parsedData)) {
  //           if (parsedData[0]?.date === date) {
  //             setFormData(parsedData);
  //           } else {
  //             const updatedData = parsedData.map((item) => ({
  //               ...item,
  //               date: date,
  //             }));
  //             setFormData(updatedData);
  //           }
  //         } else {
  //           // If no data or invalid data, initialize with default state
  //           setFormData((prevData) =>
  //             prevData.map((item) => ({
  //               ...item,
  //               date: date,
  //             }))
  //           );
  //         }
  //       }
  //     } catch (error) {
  //       console.log("Error loading data:", error);
  //     }
  //   };
  //   loadFormData();
  // }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* App Title */}
      <Text style={styles.title}>DUTY JCO FORM</Text>

      <View style={styles.buttonContainer}>
        {/* <Button title="delete Sheet" onPress={() => deleteExcelFile()} /> */}
        <View
          style={{
            gap: 5,
            padding: 10,
            border: "solid",
            borderColor: "black",
            borderWidth: 1,
            width: "100%",
            height: "fit-content",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>Current Date</Text>
          <Text style={{ fontSize: 20 }}>{date}</Text>
        </View>

        <Button
          color={"#34d399"}
          title="Export File"
          onPress={() => createAndAppendExcel()}
        />
        <Button
          title="PDF Preview"
          onPress={() => navigation.navigate("PDFPreview")}
          color="#34d399"
        />
        {/* Buttons for Navigation */}

        <Button
          title="1. Start Duty Handover"
          onPress={() => navigation.navigate("DutyHandover")}
          color="#2196F3"
        />
        <Button
          title="2. Guard Details"
          onPress={() => navigation.navigate("GuardDetails")}
          color="#2196F3"
        />
        <Button
          title="3. MT Briefing"
          onPress={() => navigation.navigate("MTBriefing")}
          color="#2196F3"
        />
        <Button
          title="4. Guard Check"
          onPress={() => navigation.navigate("GuardCheck")}
          color="#2196F3"
        />
        <Button
          title="5. Office Store Sealing"
          onPress={() => navigation.navigate("OfficeStoreSealing")}
          color="#2196F3"
        />
        <Button
          title="6. Ration Check"
          onPress={() => navigation.navigate("RationCheck")}
          color="#2196F3"
        />
        <Button
          title="7. Cook House Observations"
          onPress={() => navigation.navigate("CookHouseObservations")}
          color="#2196F3"
        />
        <Button
          title="8. Fire Equipment Check"
          onPress={() => navigation.navigate("FireEquipmentCheck")}
          color="#2196F3"
        />

        <Button
          title="9. Food Tasting"
          onPress={() => navigation.navigate("FoodTasting")}
          color="#2196F3"
        />

        <Button
          title="10. Health & Hygiene"
          onPress={() => navigation.navigate("HealthHygiene")}
          color="#2196F3"
        />

        <Button
          title="11. Land Matters"
          onPress={() => navigation.navigate("LandMatters")}
          color="#2196F3"
        />

        <Button
          title="12. Defence Land Survey"
          onPress={() => navigation.navigate("DefenseLandSurvey")}
          color="#2196F3"
        />

        <Button
          title="13. Quarter Gd Kote "
          onPress={() => navigation.navigate("QuarterGdKote")}
          color="#2196F3"
        />

        <Button
          title="14. Amn Magazine Page"
          onPress={() => navigation.navigate("AmnMagazine")}
          color="#2196F3"
        />

        <Button
          title="15. CSD Sample Checks"
          onPress={() => navigation.navigate("CSDSampleChecks")}
          color="#2196F3"
        />
        <Button
          title="16. TSS "
          onPress={() => navigation.navigate("TSS")}
          color="#2196F3"
        />

        <Button
          title="17. Security And Measure"
          onPress={() => navigation.navigate("SecurityMeasures")}
          color="#2196F3"
        />

        <Button
          title="18.CCTV Location"
          onPress={() => navigation.navigate("CCTVLocation")}
          color="#2196F3"
        />

        <Button
          title="19.MH Devlali Visit"
          onPress={() => navigation.navigate("MedicalVisit")}
          color="#2196F3"
        />

        <Button
          title="20. Roll Call"
          onPress={() => navigation.navigate("RollCall")}
          color="#2196F3"
        />
        <Button
          title="21. Sale of CSD"
          onPress={() => navigation.navigate("SaleCSD")}
          color="#2196F3"
        />
        <Button
          title="22. Qtr Visit Page"
          onPress={() => navigation.navigate("QtrVisit")}
          color="#2196F3"
        />
        <Button
          title="23. Mobile Check"
          onPress={() => navigation.navigate("MobileCheck")}
          color="#2196F3"
        />
        <Button
          title="24. Liquor Issue"
          onPress={() => navigation.navigate("LiquorIssue")}
          color="#2196F3"
        />
        <Button
          title="25. Improvement in Wksp"
          onPress={() => navigation.navigate("Improvement")}
          color="#2196F3"
        />
        <Button
          title="26. Awareness"
          onPress={() => navigation.navigate("Awareness")}
          color="#2196F3"
        />
        <Button
          title="27. Handover Duties"
          onPress={() => navigation.navigate("HandoverDuties")}
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  buttonContainer: {
    width: "80%",
    marginVertical: 70,
    gap: 30,
    borderRadius: 5,
    overflow: "hidden",
  },
});

export default MainScreen;
