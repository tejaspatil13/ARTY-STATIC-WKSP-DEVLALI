import React, { useContext, useEffect } from "react";
import { View, Text, Button, ScrollView, StyleSheet } from "react-native";
import { FormContext } from "../utils/FormContext";
import * as XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as ImagePicker from "expo-image-picker";
const MainScreen = ({ navigation }) => {
  // Generate an array of page numbers from 2 to 28
  const pages = Array.from({ length: 27 }, (_, i) => i + 2);
  const { formData, setFormData } = useContext(FormContext);

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
  //         koteGuardTime: formData.koteGuardTime,
  //         koteGuardFindings: formData.koteGuardFindings,
  //       },
  //     ]);
  //     addSheet(
  //       "MT Briefing",
  //       formData.mtStrengthFields.map((item) => ({
  //         mt_time: formData.mt_time,
  //         mt_strength: formData.mt_strength,
  //         id: item.id,
  //         name: item.name,
  //       }))
  //     );
  //     addSheet("Office & Store Sealing", [
  //       {
  //         office_sealed: formData.office_sealed,
  //         store_sealed: formData.store_sealed,
  //       },
  //     ]);
  //     addSheet("Ration Checking", [
  //       { ration_observations: formData.ration_observations },
  //     ]);
  //     addSheet("Cook House Observations", formData.cookHouseObservations);
  //     addSheet("Fire Equipment Check", formData.fireEquipment);
  //     addSheet("Food Tasting", formData.foodTasting);

  //     // Convert workbook to binary string
  //     const excelData = XLSX.write(workbook, {
  //       type: "base64",
  //       bookType: "xlsx",
  //     });
  //     const fileUri = FileSystem.documentDirectory + "data.xlsx";

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

  const jsonDataArray = [
    {
      date: "2025-02-06",
      jcNumber: "009",
      rank: "A",
      name: "John",
      startTime: "08:00",
      startDate: "2025-02-06",
      endTime: "16:00",
      endDate: "2025-02-06",
      prevJCNumber: "000",
      prevRank: "B",
      prevName: "Doe",
      koteGuardTime: "12:00",
      koteGuardFindings: "All clear",
      mt_time: "14:00",
      mt_strength: "10",
      mtStrengthFields: [{ id: 1, name: "Alex" }],
      office_sealed: "Yes",
      store_sealed: "No",
      ration_observations: "Sufficient",
      cookHouseObservations: [
        { cook_house: "A", appliances: "Functional", staff: "3" },
      ],
      fireEquipment: [
        {
          fire_point_location: "Front",
          fire_type: "Extinguisher",
          fire_serviceability: "Good",
          observations: "None",
        },
      ],
      foodTasting: [
        {
          cookHouse: "A PI",
          meal: "Breakfast",
          quality: "Good",
          improvement: "None",
        },
        {
          cookHouse: "A PI",
          meal: "Lunch",
          quality: "Average",
          improvement: "More seasoning",
        },
      ],
    },
    {
      date: "2025-02-07",
      jcNumber: "0010",
      rank: "B",
      name: "Jane",
      startTime: "09:00",
      startDate: "2025-02-07",
      endTime: "17:00",
      endDate: "2025-02-07",
      prevJCNumber: "001",
      prevRank: "A",
      prevName: "John",
      koteGuardTime: "13:00",
      koteGuardFindings: "Minor issues",
      mt_time: "15:00",
      mt_strength: "12",
      mtStrengthFields: [{ id: 2, name: "Sam" }],
      office_sealed: "No",
      store_sealed: "Yes",
      ration_observations: "Low stock",
      cookHouseObservations: [
        { cook_house: "B", appliances: "Needs repair", staff: "2" },
      ],
      fireEquipment: [
        {
          fire_point_location: "Back",
          fire_type: "Hose",
          fire_serviceability: "Needs maintenance",
          observations: "Leak detected",
        },
      ],
      foodTasting: [
        {
          cookHouse: "B PI",
          meal: "Dinner",
          quality: "Excellent",
          improvement: "None",
        },
      ],
    },
  ];

  const exportJsonToExcel = async () => {
    try {
      const fileUri = FileSystem.documentDirectory + "data.xlsx";
      let workbook;

      // Check if the file exists
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (fileInfo.exists) {
        // Read the existing file
        const existingData = await FileSystem.readAsStringAsync(fileUri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        // Parse the existing workbook
        workbook = XLSX.read(existingData, { type: "base64" });
      } else {
        // Create a new workbook if file doesn't exist
        workbook = XLSX.utils.book_new();
      }

      // Function to add or append data to a sheet
      const addOrAppendSheet = (sheetName, newData) => {
        if (workbook.Sheets[sheetName]) {
          // Retrieve existing data from the sheet (if any)
          let existingSheetData =
            XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]) || [];
          // Merge the existing data with the new data
          const mergedData = existingSheetData.concat(newData);
          // Convert merged data to a new worksheet
          const newWorksheet = XLSX.utils.json_to_sheet(mergedData);
          // Update the sheet in the workbook
          workbook.Sheets[sheetName] = newWorksheet;
        } else {
          // Create a new worksheet if sheet doesn't exist
          const newWorksheet = XLSX.utils.json_to_sheet(newData);
          XLSX.utils.book_append_sheet(workbook, newWorksheet, sheetName);
        }
      };

      // Prepare your sheet data arrays
      const dutyHandoverData = jsonDataArray.map((data) => ({
        Date: data.startDate,
        ...data,
      }));
      const koteGuardData = jsonDataArray.map((data) => ({
        Date: data.startDate,
        koteGuardTime: data.koteGuardTime,
        koteGuardFindings: data.koteGuardFindings,
      }));
      const mtBriefingData = jsonDataArray.flatMap((data) =>
        data.mtStrengthFields.map((item) => ({
          Date: data.startDate,
          mt_time: data.mt_time,
          mt_strength: data.mt_strength,
          id: item.id,
          name: item.name,
        }))
      );
      const officeStoreData = jsonDataArray.map((data) => ({
        Date: data.startDate,
        office_sealed: data.office_sealed,
        store_sealed: data.store_sealed,
      }));
      const rationData = jsonDataArray.map((data) => ({
        Date: data.startDate,
        ration_observations: data.ration_observations,
      }));
      const cookHouseData = jsonDataArray.flatMap((data) =>
        data.cookHouseObservations.map((item) => ({
          Date: data.startDate,
          ...item,
        }))
      );
      const fireEquipmentData = jsonDataArray.flatMap((data) =>
        data.fireEquipment.map((item) => ({
          Date: data.startDate,
          ...item,
        }))
      );
      const foodTastingData = jsonDataArray.flatMap((data) =>
        data.foodTasting.map((item) => ({
          Date: data.startDate,
          ...item,
        }))
      );
      const imageData = jsonDataArray.map((data) => ({
        Date: data.startDate,
        Image_Path: data.imagePath,
      }));

      // Append or add each sheet
      addOrAppendSheet("Duty Handover", dutyHandoverData);
      addOrAppendSheet("Kote Guard Details", koteGuardData);
      addOrAppendSheet("MT Briefing", mtBriefingData);
      addOrAppendSheet("Office & Store Sealing", officeStoreData);
      addOrAppendSheet("Ration Checking", rationData);
      addOrAppendSheet("Cook House Observations", cookHouseData);
      addOrAppendSheet("Fire Equipment Check", fireEquipmentData);
      addOrAppendSheet("Food Tasting", foodTastingData);
      addOrAppendSheet("Images", imageData);

      // Convert the updated workbook to binary string
      const excelData = XLSX.write(workbook, {
        type: "base64",
        bookType: "xlsx",
      });

      // Write the updated data back to the file
      await FileSystem.writeAsStringAsync(fileUri, excelData, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Share the file
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
      } else {
        alert("Sharing is not available on this device");
      }
    } catch (error) {
      console.error("Error exporting to Excel:", error);
    }
  };

  useEffect(() => {
    console.log(jsonDataArray[0].imagePath);
  }, [jsonDataArray]);

  // const exportJsonToExcel = async () => {
  //   try {
  //     const workbook = XLSX.utils.book_new();

  //     jsonDataArray.forEach((data) => {
  //       const sheetName = data.date;
  //       const sheetData = [
  //         {
  //           ...data,
  //           mtStrengthFields: JSON.stringify(data.mtStrengthFields),
  //           cookHouseObservations: JSON.stringify(data.cookHouseObservations),
  //           fireEquipment: JSON.stringify(data.fireEquipment),
  //           foodTasting: JSON.stringify(data.foodTasting),
  //         },
  //       ];

  //       const worksheet = XLSX.utils.json_to_sheet(sheetData);
  //       XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  //     });

  //     const excelData = XLSX.write(workbook, {
  //       type: "base64",
  //       bookType: "xlsx",
  //     });
  //     const fileUri = FileSystem.documentDirectory + "data.xlsx";

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
      headerTitle: 'MAIN PAGE', // Set the title
      headerTitleAlign: 'center', // Center the title
      headerLeft: () => null, // Remove the back button
    });
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* App Title */}
      <Text style={styles.title}>DUTY JCO FORM</Text>


      <View style={styles.buttonContainer}>
        <Button
          title="Make Sheet"
          onPress={() => exportJsonToExcel()}
          />
      {/* Buttons for Navigation */}
      <View style={styles.buttonContainer}>
        <Button
          title="1. Start Duty Handover"
          onPress={() => navigation.navigate('DutyHandover')}
          color="#2196F3"
        />
        <Button
          title="2. Guard Details"
          onPress={() => navigation.navigate('GuardDetails')}
          color="#2196F3"
        />
        <Button
          title="3. MT Briefing"
          onPress={() => navigation.navigate('MTBriefing')}
          color="#2196F3"
        />
        <Button
          title="4. Guard Check"
          onPress={() => navigation.navigate('GuardCheck')}
          color="#2196F3"
        />
        <Button
          title="5. Office Store Sealing"
          onPress={() => navigation.navigate('OfficeStoreSealing')}
          color="#2196F3"
        />
        <Button
          title="6. Ration Check"
          onPress={() => navigation.navigate('RationCheck')}
          color="#2196F3"
        />
        <Button
          title="7. Cook House Observations"
          onPress={() => navigation.navigate('CookHouseObservations')}
          color="#2196F3"
        />
        <Button
          title="8. Fire Equipment Check"
          onPress={() => navigation.navigate('FireEquipmentCheck')}
          color="#2196F3"
        />


        <Button
          title="Food Tasting"
          onPress={() => navigation.navigate('FoodTasting')}

          color="#2196F3"
        />

        <Button
          title="Health & Hygiene"
          onPress={() => navigation.navigate('HealthHygiene')}
          color="#2196F3"
        />

        <Button
          title="Land Matters"
          onPress={() => navigation.navigate('LandMatters')}
          color="#2196F3"
        />

        <Button
          title="Defence Land Survey"
          onPress={() => navigation.navigate('DefenseLandSurvey')}
          color="#2196F3"
        />

        <Button
          title="MH Devlali Visit"
          onPress={() => navigation.navigate('MedicalScreen')}
          color="#2196F3"
        />

        <Button
          title="CCTV Location"
          onPress={() => navigation.navigate('CCTVLocation')}
          color="#2196F3"
        />

      </View>


   
     

        <Button
          title="9. Food Tasting"
          onPress={() => navigation.navigate('FoodTasting')}
          color="#2196F3"
        />
        <Button
          title="10. Health & Hygiene"
          onPress={() => navigation.navigate('HealthHygiene')}
          color="#2196F3"
        />
        <Button
          title="20. Roll Call"
          onPress={() => navigation.navigate('RollCall')}
          color="#2196F3"
        />
        <Button
          title="21. Sale of CSD"
          onPress={() => navigation.navigate('SaleCSD')}
          color="#2196F3"
        />
        <Button
          title="22. Qtr Visit Page"
          onPress={() => navigation.navigate('QtrVisit')}
          color="#2196F3"
        />
        <Button
          title="23. Mobile Check"
          onPress={() => navigation.navigate('MobileCheck')}
          color="#2196F3"
        />
        <Button
          title="24. Liquor Issue"
          onPress={() => navigation.navigate('LiquorIssue')}
          color="#2196F3"
        />
        <Button
          title="25. Improvement in Wksp"
          onPress={() => navigation.navigate('Improvement')}
          color="#2196F3"
        />
        <Button
          title="26. Awareness"
          onPress={() => navigation.navigate('Awareness')}
          color="#2196F3"
        />
        <Button
          title="27. Handover Duties"
          onPress={() => navigation.navigate('HandoverDuties')}
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
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#333",
  },
  buttonContainer: {
    width: '80%',
    marginVertical: 70,
    gap: 30,
    borderRadius: 5,
    overflow: "hidden",
  },
});

export default MainScreen;
