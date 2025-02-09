import React, { useContext, useLayoutEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FormContext } from "../utils/FormContext";
import { Ionicons } from "@expo/vector-icons";

const CSDSampleChecksPage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);

  const updateNestedField = (section, field, value) => {
    setFormData((prevData) => {
      const newData = [...prevData];
      if (!newData[0].csd_checks) {
        newData[0].csd_checks = {
          csd_items: {},
          card_items: {},
        };
      }
      newData[0] = {
        ...newData[0],
        csd_checks: {
          ...newData[0].csd_checks,
          [section]: {
            ...newData[0].csd_checks[section],
            [field]: value,
          },
        },
      };
      return newData;
    });
  };

  const addField = (section) => {
    const currentItems = formData[0]?.csd_checks?.[section] || {};
    const itemCount = Object.keys(currentItems).length;

    if (itemCount >= 3) {
      Alert.alert("Maximum Limit", "Cannot add more than 3 items");
      return;
    }

    const newFieldName =
      section === "csd_items"
        ? `csdItem${itemCount + 1}`
        : `cardItem${itemCount + 1}`;

    updateNestedField(section, newFieldName, "");
  };

  const removeField = (section, fieldName) => {
    const currentItems = formData[0]?.csd_checks?.[section] || {};
    const itemCount = Object.keys(currentItems).length;

    if (itemCount <= 3) {
      Alert.alert(
        "Minimum Required",
        "Cannot remove. Minimum 3 items required"
      );
      return;
    }

    setFormData((prevData) => {
      const newData = [...prevData];
      const updatedSection = { ...newData[0].csd_checks[section] };
      delete updatedSection[fieldName];

      newData[0] = {
        ...newData[0],
        csd_checks: {
          ...newData[0].csd_checks,
          [section]: updatedSection,
        },
      };
      return newData;
    });
  };

  const renderFields = (section, label) => {
    const items = formData[0]?.csd_checks?.[section] || {};

    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.label}>{label}</Text>
        {Object.entries(items).map(([fieldName, value]) => (
          <View key={fieldName} style={styles.fieldContainer}>
            <TextInput
              style={styles.fieldInput}
              placeholder={`Item ${fieldName.replace(/[^0-9]/g, "")}`}
              value={value}
              onChangeText={(text) =>
                updateNestedField(section, fieldName, text)
              }
            />
            {Object.keys(items).length > 3 && (
              <TouchableOpacity
                onPress={() => removeField(section, fieldName)}
                style={styles.removeButton}
              >
                <Ionicons name="trash" size={24} color="red" />
              </TouchableOpacity>
            )}
          </View>
        ))}
        <TouchableOpacity
          onPress={() => addField(section)}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>Add Item</Text>
        </TouchableOpacity>
      </View>
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "CSD Sample Checks",
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
      <Text style={styles.sectionTitle}>15. CSD Sample Checks</Text>

      {renderFields("csd_items", "(a) CSD Items:")}
      {renderFields("card_items", "(b) Liquor/Grocery Card:")}

      <View style={styles.buttonContainer}>
        <Button
          title="← Previous"
          onPress={() => navigation.navigate("AmnMagazine")}
          color="#757575"
        />
        <Button
          title="Next →"
          onPress={() => navigation.navigate("TSS")}
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
  sectionContainer: {
    marginBottom: 20,
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
  fieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  fieldInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
  },
  removeButton: {
    marginLeft: 10,
    padding: 5,
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
    padding: 12,
    backgroundColor: "#34d399",
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default CSDSampleChecksPage;
