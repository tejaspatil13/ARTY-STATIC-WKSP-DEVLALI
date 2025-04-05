import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { FormContext } from "../utils/FormContext";

const FoodTastingPage = ({ navigation }) => {
  const { formData, setFormData } = useContext(FormContext);

  // Handle input change
  const handleInputChange = (index, field, value) => {
    const updatedFoodTasting = [...formData[0].foodTasting];
    updatedFoodTasting[index][field] = value;
    setFormData((prevData) =>
      prevData?.map((item) => ({
        ...item,
        foodTasting: updatedFoodTasting,
      }))
    );
  };

  // Function to capture image from the camera
  const handleImagePick = async (index) => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const updatedFoodTasting = [...formData[0].foodTasting];
      updatedFoodTasting[index].image = result.assets[0].uri;
      setFormData((prevData) =>
        prevData?.map((item) => ({
          ...item,
          foodTasting: updatedFoodTasting,
        }))
      );
    }
  };

  // Set up the home icon and center the title
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Food Tasting",
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
    <View>
      <Text style={styles.sectionTitle}>9. Food Tasting Observations</Text>
      <FlatList
        data={formData[0].foodTasting}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.container}>
            <View style={styles.foodTastingContainer}>
              <Text style={styles.label}>Cook House</Text>
              <TextInput
                style={styles.input}
                value={item.cookHouse}
                editable={false}
              />

              <Text style={styles.label}>Meal</Text>
              <TextInput
                style={styles.input}
                value={item.meal}
                editable={false}
              />

              <Text style={styles.label}>Quality of Food</Text>
              <TextInput
                style={styles.input}
                multiline={true}
                placeholder="Enter food quality"
                value={item.quality}
                onChangeText={(t) => handleInputChange(index, "quality", t)}
              />

              <Text style={styles.label}>Points for Improvement</Text>
              <TextInput
                style={styles.input}
                multiline={true}
                placeholder="Enter improvement points"
                value={item.improvement}
                onChangeText={(t) => handleInputChange(index, "improvement", t)}
              />

              {/* Image Upload Section */}
              <TouchableOpacity
                style={styles.imageButton}
                onPress={() => handleImagePick(index)}
              >
                <Ionicons name="camera" size={24} color="white" />
                <Text style={styles.imageButtonText}>Add Image</Text>
              </TouchableOpacity>

              {/* Display Selected Image */}
              {item.image && (
                <Image
                  source={{ uri: item.image }}
                  style={styles.imagePreview}
                />
              )}
            </View>
          </View>
        )}
        ListFooterComponent={
          <View style={styles.buttonContainer}>
            <Button
              title="← Previous"
              onPress={() => navigation.navigate("FireEquipmentCheck")}
              color="#757575"
            />
            <Button
              title="Next →"
              onPress={() => navigation.navigate("HealthHygiene")}
              color="#2196F3"
            />
          </View>
        }
      />
    </View>
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
    color: "#333",
    marginLeft: 10,
    paddingTop: 20,
  },
  foodTastingContainer: {
    marginBottom: 0,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
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
  imageButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    marginVertical: 10,
  },
  imageButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginTop: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    marginBottom: 50,
    paddingInline: 10,
  },
  homeButton: {
    marginLeft: 15,
  },
});

export default FoodTastingPage;
