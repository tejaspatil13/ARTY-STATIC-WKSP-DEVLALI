import React, { useContext } from "react";
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

const HandoverDutiesPage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);

  // Ensure `handoverDuties` exists in `formData[0]`
  const handoverDuties = formData[0]?.handoverDuties || {
    no: "",
    rank: "",
    name: "",
    date: "",
    time: "",
  };

  // Handle input change while keeping the array structure intact
  const handleInputChange = (field, value) => {
    setFormData((prev) => {
      if (!prev[0]) return [{ handoverDuties: { [field]: value } }]; // Ensure first entry exists

      return prev.map((item, index) =>
        index === 0
          ? {
              ...item,
              handoverDuties: {
                ...item.handoverDuties,
                [field]: value,
              },
            }
          : item
      );
    });
  };

  // Set up the home icon and center the title
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Handover Duties",
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
      {/* Handover Details Section */}
      <Text style={styles.sectionTitle}>27. Handover Duties</Text>

      <Text style={styles.subSectionTitle}>
        I am handing over my duties to:
      </Text>

      <Text style={styles.label}>No</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter No"
        value={handoverDuties.no}
        onChangeText={(t) => handleInputChange("no", t)}
      />

      <Text style={styles.label}>Rank</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Rank"
        value={handoverDuties.rank}
        onChangeText={(t) => handleInputChange("rank", t)}
      />

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        value={handoverDuties.name}
        onChangeText={(t) => handleInputChange("name", t)}
      />

      {/* Date and Time Input */}
      <Text style={styles.label}>Date</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Date (DD/MM/YYYY)"
        value={handoverDuties.date}
        onChangeText={(t) => handleInputChange("date", t)}
      />

      <Text style={styles.label}>Time</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Time (HH:MM)"
        value={handoverDuties.time}
        onChangeText={(t) => handleInputChange("time", t)}
      />

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          title="← Previous"
          onPress={() => navigation.navigate("Awareness")}
          color="#757575"
        />
        <Button
          title=" Submit "
          onPress={() => navigation.navigate("PDFPreview")}
          color="#07d363"
        />
      </View>
    </ScrollView>
  );
};

// Styles
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
  subSectionTitle: {
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

export default HandoverDutiesPage;
