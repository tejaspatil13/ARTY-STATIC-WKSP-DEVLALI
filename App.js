import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { FormProvider } from "./utils/FormContext";
import AppNavigator from "./navigation/AppNavigator";
import PDFGenerator from "./PDF/PDFGenerator";

const App = () => {
  return (
    <FormProvider>
      <NavigationContainer>
        <AppNavigator />
        <PDFGenerator />
      </NavigationContainer>
    </FormProvider>
  );
};

export default App;
