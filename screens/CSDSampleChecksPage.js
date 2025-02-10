import React, { useContext, useEffect } from "react";
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

  useEffect(() => {
    console.log("Current Form Data:", JSON.stringify(formData, null, 2));
  }, [formData]);
  

  // Initialize minimum required fields on mount
  useEffect(() => {
    ensureMinimumFields("csd_items");
    ensureMinimumFields("card_items");
  }, []);

  // Ensure a minimum of 3 fields exist
  const ensureMinimumFields = (section) => {
    setFormData((prev) => {
      const currentItems = prev[0]?.csd_checks?.[section] || {};
      const itemCount = Object.keys(currentItems).length;

      if (itemCount < 3) {
        const updatedItems = { ...currentItems };
        for (let i = itemCount + 1; i <= 3; i++) {
          const fieldName =
            section === "csd_items" ? `csdItem${i}` : `cardItem${i}`;
          updatedItems[fieldName] = "";
        }

        return [
          {
            ...prev[0],
            csd_checks: {
              ...prev[0].csd_checks,
              [section]: updatedItems,
            },
          },
        ];
      }

      return prev;
    });
  };

  // Add new field dynamically
  const addField = (section) => {
    setFormData((prev) => {
      const currentItems = prev[0]?.csd_checks?.[section] || {};
      const itemCount = Object.keys(currentItems).length;
      const newFieldName =
        section === "csd_items"
          ? `csdItem${itemCount + 1}`
          : `cardItem${itemCount + 1}`;

      return [
        {
          ...prev[0],
          csd_checks: {
            ...prev[0].csd_checks,
            [section]: {
              ...prev[0].csd_checks[section],
              [newFieldName]: "",
            },
          },
        },
      ];
    });
  };

  // Remove field with minimum limit
  const removeField = (section, fieldName) => {
    setFormData((prev) => {
      const currentItems = prev[0]?.csd_checks?.[section] || {};
      const itemCount = Object.keys(currentItems).length;

      if (itemCount <= 3) {
        Alert.alert("Cannot Remove", "Minimum 3 fields are required");
        return prev;
      }

      const updatedItems = { ...currentItems };
      delete updatedItems[fieldName];

      // Reorder remaining fields
      const reorderedItems = {};
      let counter = 1;
      Object.values(updatedItems).forEach((value) => {
        const newFieldName =
          section === "csd_items" ? `csdItem${counter}` : `cardItem${counter}`;
        reorderedItems[newFieldName] = value;
        counter++;
      });

      return [
        {
          ...prev[0],
          csd_checks: {
            ...prev[0].csd_checks,
            [section]: reorderedItems,
          },
        },
      ];
    });
  };

  // Handle input change
  const handleInputChange = (section, field, value) => {
    setFormData((prev) => [
      {
        ...prev[0],
        csd_checks: {
          ...prev[0].csd_checks,
          [section]: {
            ...prev[0].csd_checks[section],
            [field]: value,
          },
        },
      },
    ]);
  };

  // Render input fields dynamically
  const renderFields = (section, label) => {
    const items = formData[0]?.csd_checks?.[section] || {};
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.label}>{label}</Text>
        {Object.keys(items).map((fieldName, index) => (
          <View key={fieldName} style={styles.fieldContainer}>
            <TextInput
              style={styles.fieldInput}
              placeholder={`Item ${index + 1}`}
              value={items[fieldName]}
              onChangeText={(t) => handleInputChange(section, fieldName, t)}
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

  // Customize screen header
  React.useLayoutEffect(() => {
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
