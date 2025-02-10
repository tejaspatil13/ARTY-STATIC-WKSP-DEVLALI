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
    ensureMinimumFields("csd_items");
    ensureMinimumFields("card_items");
  }, []);

  const ensureMinimumFields = (section) => {
    setFormData((prev) =>
      prev.map((item, index) =>
        index === 0
          ? {
              ...item,
              csd_checks: {
                ...item.csd_checks,
                [section]: {
                  ...item.csd_checks?.[section],
                  ...Array.from(
                    {
                      length:
                        3 -
                        Object.keys(item.csd_checks?.[section] || {}).length,
                    },
                    (_, i) => ({
                      [`${section === "csd_items" ? "csdItem" : "cardItem"}${
                        i +
                        Object.keys(item.csd_checks?.[section] || {}).length +
                        1
                      }`]: "",
                    })
                  ).reduce((acc, cur) => ({ ...acc, ...cur }), {}),
                },
              },
            }
          : item
      )
    );
  };

  const addField = (section) => {
    setFormData((prev) =>
      prev.map((item, index) =>
        index === 0
          ? {
              ...item,
              csd_checks: {
                ...item.csd_checks,
                [section]: {
                  ...item.csd_checks[section],
                  [`${section === "csd_items" ? "csdItem" : "cardItem"}${
                    Object.keys(item.csd_checks[section] || {}).length + 1
                  }`]: "",
                },
              },
            }
          : item
      )
    );
  };

  const removeField = (section, fieldName) => {
    setFormData((prev) =>
      prev.map((item, index) => {
        if (index !== 0) return item;

        const updatedItems = { ...item.csd_checks[section] };
        delete updatedItems[fieldName];

        if (Object.keys(updatedItems).length < 3) {
          Alert.alert("Cannot Remove", "Minimum 3 fields are required");
          return item;
        }

        const reorderedItems = Object.values(updatedItems).reduce(
          (acc, cur, i) => {
            acc[`${section === "csd_items" ? "csdItem" : "cardItem"}${i + 1}`] =
              cur;
            return acc;
          },
          {}
        );

        return {
          ...item,
          csd_checks: {
            ...item.csd_checks,
            [section]: reorderedItems,
          },
        };
      })
    );
  };

  const handleInputChange = (section, field, value) => {
    setFormData((prev) =>
      prev.map((item, index) =>
        index === 0
          ? {
              ...item,
              csd_checks: {
                ...item.csd_checks,
                [section]: {
                  ...item.csd_checks[section],
                  [field]: value,
                },
              },
            }
          : item
      )
    );
  };

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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
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
