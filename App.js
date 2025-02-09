import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { FormProvider } from "./utils/FormContext";
import AppNavigator from "./navigation/AppNavigator";
import * as Per from "expo-permissions";
const App = () => {
  useEffect(() => {
    const getPermissions = async () => {
      const { status } = await Per.askAsync(Per.MEDIA_LIBRARY);
      if (status !== "granted") {
        alert(
          "Permission to access media library is required to save the file."
        );
      }
    };
    getPermissions();
  }, []);

  return (
    <FormProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </FormProvider>
  );
};

export default App;
