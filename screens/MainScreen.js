import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button, ScrollView, StyleSheet } from "react-native";
import { FormContext } from "../utils/FormContext";
import * as FileSystem from "expo-file-system";
import createAndAppendExcel, { requestPermission } from "../utils/generator";
import { resetData } from "../utils/commanFunctions";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const fileName = "Daily_Report.xlsx";
const downloadsUri = FileSystem.documentDirectory + fileName; // Internal storage

const formatDate = (date) => {
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const MainScreen = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const onChangeStart = (event, selectedDate) => {
    setShowStartPicker(false);
    if (selectedDate) {
      if (new Date(selectedDate) > new Date(endDate)) {
        alert("Start date cannot be after end date");
        return null;
      }
      setStartDate(selectedDate); // Update local state
      setFormData((prevFormData) =>
        prevFormData.map((item) => {
          if (
            new Date(item.dutyEndDate) &&
            selectedDate > new Date(item.dutyEndDate)
          ) {
            alert("Start date cannot be after end date.");
            return item;
          }
          return {
            ...item,
            dutyStartDate: formatDate(selectedDate),
          };
        })
      );
    }
  };

  const onChangeEnd = (event, selectedDate) => {
    setShowEndPicker(false);

    if (selectedDate) {
      if (new Date(selectedDate) < new Date(startDate)) {
        alert("End date cannot be before start date");
        return null;
      }
      setEndDate(selectedDate); // Update local state
      setFormData((prevFormData) =>
        prevFormData.map((item) => {
          if (
            new Date(item.dutyStartDate) &&
            selectedDate < new Date(item.dutyStartDate)
          ) {
            alert("End date cannot be before start date.");
            return item;
          }
          return {
            ...item,
            dutyEndDate: formatDate(selectedDate),
          };
        })
      );
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "MAIN PAGE", // Set the title
      headerTitleAlign: "center", // Center the title
      headerLeft: () => null, // Remove the back button
    });
  }, [navigation]);

  useEffect(() => {
    if (formData[0].dutyStartDate) {
      const parsedStartDate = new Date(formData[0].dutyStartDate);
      if (!isNaN(parsedStartDate)) {
        setStartDate(parsedStartDate);
      }
    }

    if (formData[0].dutyEndDate) {
      const parsedEndDate = new Date(formData[0].dutyEndDate);
      if (!isNaN(parsedEndDate)) {
        setEndDate(parsedEndDate);
      }
    }
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* App Title */}
      <Text style={styles.title}>DUTY JCO FORM</Text>

      <View style={styles.buttonContainer}>
        <View style={styles.dateContainer}>
          {/* Duty Start Date */}
          <View>
            <Text style={{ textAlign: "center", marginBottom: 5 }}>
              Duty Start Date
            </Text>
            <Text
              style={styles.dateText}
              onPress={() => setShowStartPicker(true)}
            >
              {formData[0].dutyStartDate
                ? formData[0].dutyStartDate
                : formatDate(startDate)}
            </Text>
            {showStartPicker && (
              <DateTimePicker
                value={startDate}
                mode="date"
                display="default"
                onChange={onChangeStart}
              />
            )}
          </View>
          <View>
            {/* Duty End Date */}
            <Text style={{ textAlign: "center", marginBottom: 5 }}>
              Duty End Date
            </Text>
            <Text
              style={styles.dateText}
              onPress={() => setShowEndPicker(true)}
            >
              {formData[0].dutyEndDate
                ? formData[0].dutyEndDate
                : formatDate(endDate)}
            </Text>
            {showEndPicker && (
              <DateTimePicker
                value={endDate}
                mode="date"
                display="default"
                onChange={onChangeEnd}
              />
            )}
          </View>
        </View>

        <Button
          color={"#34d399"}
          title="Clear Fields"
          onPress={() => resetData(setFormData)}
          // onPress={() => AsyncStorage.clear()}
        />

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
  datePickerContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  dateContainer: {
    gap: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    alignItems: "center",
  },
  dateText: {
    fontSize: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#34d399",
    color: "white",
  },
});

export default MainScreen;
