import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import SignatureCanvas from "react-native-signature-canvas";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import { FormContext } from "../utils/FormContext";

export default function SignatureScreen({ navigation }) {
  const ref = useRef();
  const [people, setPeople] = useState(["JCO", "Maj", "Adjit", "2IC", "Comdt"]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [signatures, setSignatures] = useState({});
  const [currentSignature, setCurrentSignature] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newPerson, setNewPerson] = useState("");
  const { formData, setFormData } = useContext(FormContext);

  // Header
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Signature",
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#333",
      },
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Main")}
          style={tw`ml-4`}
        >
          <Ionicons name="home" size={28} color="#000" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (formData && Array.isArray(formData) && formData[0]?.signatures) {
      setSignatures(formData[0].signatures);
    }
  }, []);

  // Show saved signature when person is selected
  useEffect(() => {
    if (selectedPerson && signatures[selectedPerson]) {
      setCurrentSignature(signatures[selectedPerson]);
    } else {
      setCurrentSignature(null);
    }
  }, [selectedPerson, signatures]);

  const handleSignature = (signature) => {
    if (!selectedPerson) {
      Alert.alert("Select a person before saving signature");
      return;
    }
    setSignatures((prev) => ({ ...prev, [selectedPerson]: signature }));
    setCurrentSignature(signature);
    setIsLoading(false);
  };

  const handleEnd = () => {
    if (!selectedPerson) {
      Alert.alert("Please select a person to save signature for.");
      return;
    }
    setIsLoading(true);
    ref.current?.readSignature();
  };

  const handleClear = () => {
    setCurrentSignature(null);
    if (selectedPerson) {
      setSignatures((prev) => {
        const newSignatures = { ...prev };
        delete newSignatures[selectedPerson];
        return newSignatures;
      });
    }
  };

  const handleEmpty = () => {
    setIsLoading(false);
  };

  const handleError = (err) => {
    console.error("Signature error:", err);
    setIsLoading(false);
  };

  const handleAdd = () => {
    const trimmed = newPerson.trim();
    if (!trimmed) return;
    if (people.includes(trimmed)) {
      Alert.alert("Name already exists");
      return;
    }
    setPeople([...people, trimmed]);
    setNewPerson("");
  };

  const handleSave = () => {
    setFormData((prevData) =>
      prevData?.map((item) => ({
        ...item,
        signatures: { ...signatures },
      }))
    );
    Alert.alert("Saved", "Signatures have been saved to form data.");
  };

  return (
    <ScrollView contentContainerStyle={tw`bg-white h-full p-4`}>
      {/* Picker */}
      <View style={tw`bg-gray-100 rounded-lg overflow-hidden mb-4`}>
        <Picker
          selectedValue={selectedPerson}
          onValueChange={(value) => setSelectedPerson(value)}
          style={tw`h-14`}
        >
          <Picker.Item label="Select Person" enabled={false} value={null} />
          {people.map((person) => (
            <Picker.Item key={person} label={person} value={person} />
          ))}
        </Picker>
      </View>

      {/* Preview */}
      {currentSignature && (
        <View style={tw`mb-4 p-2 rounded-lg bg-gray-100 items-center`}>
          <Image
            source={{ uri: currentSignature }}
            style={tw`w-80 h-24`}
            resizeMode="contain"
          />
        </View>
      )}

      {/* Signature Pad */}
      {selectedPerson && (
        <SignatureCanvas
          ref={ref}
          style={tw`border border-gray-300 rounded-lg mb-4 h-60 overflow-hidden`}
          onOK={handleSignature}
          onEnd={handleEnd}
          onClear={handleClear}
          onEmpty={handleEmpty}
          onError={handleError}
          autoClear={true}
          backgroundColor="#fff"
          penColor="black"
          webStyle={`
            .m-signature-pad {
              box-shadow: none;
              border: none;
              margin: 0;
              padding: 0;
              height: 100%;
            }
            .m-signature-pad--body {
              margin: 0;
              padding: 0;
              height: 100%;
            }
            .m-signature-pad--footer {
              display: none !important;
              height: 0 !important;
              padding: 0 !important;
              margin: 0 !important;
            }
            .m-signature-pad--description {
              display: none;
            }
            body, html {
              margin: 0;
              padding: 0;
              height: 100%;
              overflow: hidden;
            }
          `}
        />
      )}

      {/* Signed List */}
      <Text style={tw`text-base font-semibold mt-4 mb-2`}>Signed List</Text>
      <View style={tw`border border-gray-300 rounded-lg mb-4 h-40`}>
        <ScrollView>
          <View style={tw`p-2`}>
            {people.map((person) => (
              <Text
                key={person}
                style={tw`text-sm mb-1 ${
                  signatures[person]
                    ? "text-green-600 font-bold"
                    : "text-gray-500"
                }`}
              >
                {person} {signatures[person] ? "✅" : ""}
              </Text>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Add Person */}
      <View style={tw`flex-row items-center gap-2 mb-4`}>
        <TextInput
          value={newPerson}
          onChangeText={setNewPerson}
          placeholder="Add new person"
          style={tw`flex-1 rounded-lg border border-gray-300 px-3 py-2`}
        />
        <TouchableOpacity
          style={tw`bg-[#34d399] px-4 py-2 rounded-lg ${
            people.includes(newPerson.trim()) || !newPerson ? "opacity-50" : ""
          }`}
          onPress={handleAdd}
          disabled={people.includes(newPerson.trim()) || !newPerson}
        >
          <Text style={tw`text-white font-bold`}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Save Button */}
      <TouchableOpacity
        style={tw`bg-[#34d399] py-3 rounded-lg mt-auto items-center`}
        onPress={handleSave}
      >
        <Text style={tw`text-white font-bold`}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
