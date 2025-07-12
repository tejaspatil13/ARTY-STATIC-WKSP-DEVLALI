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

const OfficeStoreSealingPage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);
  const [showOfficePicker, setShowOfficePicker] = useState(false);
  const [showStorePicker, setShowStorePicker] = useState(false);
  const [officeTime, setOfficeTime] = useState(new Date());
  const [storeTime, setStoreTime] = useState(new Date());

  const handleInputChange = (field, value) => {
    setFormData((prevData) =>
      prevData?.map((item) => ({
        ...item,
        office_sealing: {
          ...item.office_sealing,
          [field]: value,
        },
      }))
    );
  };

  const onOfficeTimeChange = (event, selectedTime) => {
    setShowOfficePicker(false);
    if (selectedTime) {
      setOfficeTime(selectedTime);
      const formattedTime = selectedTime.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      handleInputChange("office_sealed_at", formattedTime);
    }
  };

  const onStoreTimeChange = (event, selectedTime) => {
    setShowStorePicker(false);
    if (selectedTime) {
      setStoreTime(selectedTime);
      const formattedTime = selectedTime.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      handleInputChange("store_sealed_at", formattedTime);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Office & Store Sealing",
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
      <Text style={styles.sectionTitle}>5. Office & Store Sealing</Text>

      <Text style={styles.label}>Office Sealed At</Text>
      <TouchableOpacity onPress={() => setShowOfficePicker(true)}>
        <TextInput
          style={styles.input}
          placeholder="HH:MM"
          value={formData[0].office_sealing.office_sealed_at}
          editable={false}
        />
      </TouchableOpacity>
      {showOfficePicker && (
        <DateTimePicker
          value={officeTime}
          mode="time"
          display="default"
          onChange={onOfficeTimeChange}
          is24Hour={true}
        />
      )}

      <Text style={styles.label}>Store Sealed At</Text>
      <TouchableOpacity onPress={() => setShowStorePicker(true)}>
        <TextInput
          style={styles.input}
          placeholder="HH:MM"
          value={formData[0].office_sealing.store_sealed_at}
          editable={false}
        />
      </TouchableOpacity>
      {showStorePicker && (
        <DateTimePicker
          value={storeTime}
          mode="time"
          display="default"
          onChange={onStoreTimeChange}
          is24Hour={true}
        />
      )}

      <View style={styles.buttonContainer}>
        <Button
          title="← Previous"
          onPress={() => navigation.navigate("GuardCheck")}
          color="#757575"
        />
        <Button
          title="Next →"
          onPress={() => navigation.navigate("RationCheck")}
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  homeButton: {
    marginLeft: 15,
  },
});

export default OfficeStoreSealingPage;
