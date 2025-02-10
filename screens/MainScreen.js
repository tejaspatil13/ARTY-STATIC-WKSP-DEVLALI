import React, { useContext, useEffect } from "react";
import { View, Text, Button, ScrollView, StyleSheet } from "react-native";
import { FormContext } from "../utils/FormContext";
import * as FileSystem from "expo-file-system";
import XLSX from "xlsx";
import { shareAsync } from "expo-sharing";
import createAndAppendExcel, { requestPermission } from "../utils/generator";

const fileName = "Daily_Report.xlsx";
const downloadsUri = FileSystem.documentDirectory + fileName; // Internal storage

const MainScreen = ({ navigation }) => {
  // Generate an array of page numbers from 2 to 28
  // const pages = Array.from({ length: 27 }, (_, i) => i + 2);
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
      console.error("Error deleting Excel file:", error);
    }
  };

  // const exportJsonToExcel = async () => {
  //   try {
  //     const workbook = XLSX.utils.book_new();

  //     // Function to add sheet data
  //     const addSheet = (sheetName, data) => {
  //       const worksheet = XLSX.utils.json_to_sheet(data);
  //       XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  //     };

  //     // Create sheets for each section
  //     addSheet("Duty Handover", [{ ...formData }]);
  //     addSheet("Kote Guard Details", [
  //       {
  //         koteGuardTime: formData?.koteGuardTime,
  //         koteGuardFindings: formData?.koteGuardFindings,
  //       },
  //     ]);
  //     addSheet(
  //       "MT Briefing",
  //       formData?.mtStrengthFields.map((item) => ({
  //         mt_time: formData?.mt_time,
  //         mt_strength: formData?.mt_strength,
  //         id: item.id,
  //         name: item.name,
  //       }))
  //     );
  //     addSheet("Office & Store Sealing", [
  //       {
  //         office_sealed: formData?.office_sealed,
  //         store_sealed: formData?.store_sealed,
  //       },
  //     ]);
  //     addSheet("Ration Checking", [
  //       { ration_observations: formData?.ration_observations },
  //     ]);
  //     addSheet("Cook House Observations", formData?.cookHouseObservations);
  //     addSheet("Fire Equipment Check", formData?.fireEquipment);
  //     addSheet("Food Tasting", formData?.foodTasting);

  //     // Convert workbook to binary string
  //     const excelData = XLSX.write(workbook, {
  //       type: "base64",
  //       bookType: "xlsx",
  //     });
  //     const fileUri = FileSystem.documentDirectory + "data?.xlsx";

  //     // Write the file
  //     await FileSystem.writeAsStringAsync(fileUri, excelData, {
  //       encoding: FileSystem.EncodingType.Base64,
  //     });

  //     // Share the file
  //     if (await Sharing.isAvailableAsync()) {
  //       await Sharing.shareAsync(fileUri);
  //     } else {
  //       alert("Sharing is not available on this device");
  //     }
  //   } catch (error) {
  //     console.error("Error exporting to Excel:", error);
  //   }
  // };

  // const exportJsonToExcel = async () => {
  //   try {
  //     const fileUri = FileSystem.documentDirectory + "data?.xlsx";
  //     let workbook;

  //     // Check if the file exists
  //     const fileInfo = await FileSystem.getInfoAsync(fileUri);
  //     if (fileInfo.exists) {
  //       // Read the existing file
  //       const existingData = await FileSystem.readAsStringAsync(fileUri, {
  //         encoding: FileSystem.EncodingType.Base64,
  //       });
  //       workbook = XLSX.read(existingData, { type: "base64" });
  //     } else {
  //       workbook = XLSX.utils.book_new();
  //     }

  //     const addOrAppendSheet = (sheetName, newData) => {
  //       if (workbook.Sheets[sheetName]) {
  //         let existingSheetData =
  //           XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]) || [];
  //         // Merge the existing data with the new data
  //         const mergedData = existingSheetData?.concat(newData);
  //         // Convert merged data to a new worksheet
  //         const newWorksheet = XLSX.utils.json_to_sheet(mergedData);
  //         workbook.Sheets[sheetName] = newWorksheet;
  //       } else {
  //         const newWorksheet = XLSX.utils.json_to_sheet(newData);
  //         XLSX.utils.book_append_sheet(workbook, newWorksheet, sheetName);
  //       }
  //     };

  //     // Prepare your sheet data arrays
  //     const dutyHandoverData = formData?.map((data) => ({
  //       Date: data?.startDate,
  //       ...data,
  //     }));
  //     const koteGuardData = formData?.map((data) => ({
  //       Date: data?.startDate,
  //       koteGuardTime: data?.koteGuardTime,
  //       koteGuardFindings: data?.koteGuardFindings,
  //     }));
  //     const mtBriefingData = formData?.flatMap((data) =>
  //       data?.mtStrengthFields.map((item) => ({
  //         Date: data?.startDate,
  //         mt_time: data?.mt_time,
  //         mt_strength: data?.mt_strength,
  //         id: item.id,
  //         name: item.name,
  //       }))
  //     );
  //     const officeStoreData = formData?.map((data) => ({
  //       Date: data?.startDate,
  //       office_sealed: data?.office_sealed,
  //       store_sealed: data?.store_sealed,
  //     }));
  //     const rationData = formData?.map((data) => ({
  //       Date: data?.startDate,
  //       ration_observations: data?.ration_observations,
  //     }));
  //     const cookHouseData = formData?.flatMap((data) =>
  //       data?.cookHouseObservations.map((item) => ({
  //         Date: data?.startDate,
  //         ...item,
  //       }))
  //     );
  //     const fireEquipmentData = formData?.flatMap((data) =>
  //       data?.fireEquipment.map((item) => ({
  //         Date: data?.startDate,
  //         ...item,
  //       }))
  //     );
  //     const foodTastingData = formData?.flatMap((data) =>
  //       data?.foodTasting.map((item) => ({
  //         Date: data?.startDate,
  //         ...item,
  //       }))
  //     );
  //     // const imageData = formData?.map((data) => ({
  //     //   Date: data?.startDate,
  //     //   Image_Path: data?.imagePath,
  //     // }));

  //     addOrAppendSheet("Duty Handover", dutyHandoverData);
  //     addOrAppendSheet("Kote Guard Details", koteGuardData);
  //     addOrAppendSheet("MT Briefing", mtBriefingData);
  //     addOrAppendSheet("Office & Store Sealing", officeStoreData);
  //     addOrAppendSheet("Ration Checking", rationData);
  //     addOrAppendSheet("Cook House Observations", cookHouseData);
  //     addOrAppendSheet("Fire Equipment Check", fireEquipmentData);
  //     addOrAppendSheet("Food Tasting", foodTastingData);
  //     addOrAppendSheet("Mobile Check", mobileCheckData);
  //     addOrAppendSheet("Quarter Visit", qtrVisitData);
  //     addOrAppendSheet("CCTV Check", cctvData);
  //     addOrAppendSheet("Guard Check", guardCheckData);

  //     const excelData = XLSX.write(workbook, {
  //       type: "base64",
  //       bookType: "xlsx",
  //     });

  //     await FileSystem.writeAsStringAsync(fileUri, excelData, {
  //       encoding: FileSystem.EncodingType.Base64,
  //     });

  //     if (await Sharing.isAvailableAsync()) {
  //       await Sharing.shareAsync(fileUri);
  //     } else {
  //       alert("Sharing is not available on this device");
  //     }
  //   } catch (error) {
  //     console.error("Error exporting to Excel:", error);
  //   }
  // };

  // Set navigation options to remove the back button and center the title

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "MAIN PAGE", // Set the title
      headerTitleAlign: "center", // Center the title
      headerLeft: () => null, // Remove the back button
    });
  }, [navigation]);

  const date = new Date().toLocaleDateString("en-IN");

  useEffect(() => {
    setFormData((prevData) =>
      prevData?.map((item, index) => ({
        ...item,
        date: date,
      }))
    );
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* App Title */}
      <Text style={styles.title}>DUTY JCO FORM</Text>

      <View style={styles.buttonContainer}>
        {/* <Button
          title="Make Sheet"
          onPress={() => createAndAppendExcel(formData)}
        /> */}

        <Button
          title="Export File"
          onPress={() => requestPermission(pFileUri)}
        />
        {/* Buttons for Navigation */}

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
       <Button
        title="PDF Preview"
        onPress={() => navigation.navigate("PDFPreview")}
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
