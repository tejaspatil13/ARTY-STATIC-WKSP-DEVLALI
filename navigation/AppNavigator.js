import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Import Screens
import MainScreen from "../screens/MainScreen";
import DutyHandoverPage from "../screens/DutyHandoverPage";
import MTBriefingPage from "../screens/MTBriefingPage";
import GuardDetailsPage from "../screens/GuardDetailsPage";
import GuardCheckPage from "../screens/GuardCheckPage";
import OfficeStoreSealingPage from "../screens/OfficeStoreSealingPage";
import RationCheckPage from "../screens/RationCheckPage";
import CookHouseObservationsPage from "../screens/CookHouseObservationsPage";
import FireEquipmentCheckPage from "../screens/FireEquipmentCheckPage";
import FoodTastingPage from "../screens/FoodTastingPage";
import HealthHygienePage from "../screens/HealthHygienePage";
import LandMattersPage from "../screens/LandMattersPage";
import MedicalVisitPage from "../screens/MedicalVisitPage";
import CCTVLocationPage from "../screens/CCTVLocationPage";
import HandoverDutiesPage from "../screens/HandoverDutiesPage";
import AwarenessPage from "../screens/AwarenessPage";
import ImprovementPage from "../screens/ImprovementPage";
import LiquorIssuePage from "../screens/LiquorIssuePage";
import RollCallPage from "../screens/RollCallPage";
import SaleCSDPage from "../screens/SaleCSDPage";
import QtrVisitPage from "../screens/QtrVisitPage";
import MobileCheckPage from "../screens/MobileCheckPage";
import CSDSampleChecksPage from "../screens/CSDSampleChecksPage";
import QuarterGdKotePage from "../screens/QuarterGdKotePage";
import AmnMagazinePage from "../screens/AmnMagazinePage";
import TSSPage from "../screens/TSSPage";
import SecurityMeasuresPage from "../screens/SecurityMeasuresPage";
import DefenseLandSurveyPage from "../screens/DefenseLandSurveyPage";
import PDFPreviewPage from "../screens/PDFPreviewPage";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Main" component={MainScreen} options={{ title: "Main" }} />
      <Stack.Screen name="DutyHandover" component={DutyHandoverPage} options={{ title: "Duty Handover" }} />
      <Stack.Screen name="GuardDetails" component={GuardDetailsPage} />
      <Stack.Screen name="MTBriefing" component={MTBriefingPage} options={{ title: "MT Briefing" }} />
      <Stack.Screen name="GuardCheck" component={GuardCheckPage} options={{ title: "Guard Check" }} />
      <Stack.Screen name="OfficeStoreSealing" component={OfficeStoreSealingPage} options={{ title: "Office & Store Sealing" }} />
      <Stack.Screen name="RationCheck" component={RationCheckPage} options={{ title: "Ration Check" }} />
      <Stack.Screen name="CookHouseObservations" component={CookHouseObservationsPage} options={{ title: "Cook House Observations" }} />
      <Stack.Screen name="FireEquipmentCheck" component={FireEquipmentCheckPage} options={{ title: "Fire Equipment Check" }} />
      <Stack.Screen name="FoodTasting" component={FoodTastingPage} options={{ title: "Food Tasting" }} />
      <Stack.Screen name="HealthHygiene" component={HealthHygienePage} options={{ title: "Health & Hygiene" }} />
      <Stack.Screen name="LandMatters" component={LandMattersPage} options={{ title: "Land Matters" }} />
      <Stack.Screen name="DefenseLandSurvey" component={DefenseLandSurveyPage} options={{ title: "Defence Land Survey" }} />
      <Stack.Screen name="MedicalVisit" component={MedicalVisitPage} options={{ title: "MH Devlali Visit" }} />
      <Stack.Screen name="CCTVLocation" component={CCTVLocationPage} options={{ title: "CCTV Location" }} />
      <Stack.Screen name="HandoverDuties" component={HandoverDutiesPage} options={{ title: "Handover Duties" }} />
      <Stack.Screen name="Awareness" component={AwarenessPage} options={{ title: "Awareness" }} />
      <Stack.Screen name="Improvement" component={ImprovementPage} options={{ title: "Improvement" }} />
      <Stack.Screen name="LiquorIssue" component={LiquorIssuePage} options={{ title: "Liquor Issue" }} />
      <Stack.Screen name="RollCall" component={RollCallPage} options={{ title: "Roll Call" }} />
      <Stack.Screen name="SaleCSD" component={SaleCSDPage} options={{ title: "Sale CSD" }} />
      <Stack.Screen name="QtrVisit" component={QtrVisitPage} options={{ title: "Quarter Visit" }} />
      <Stack.Screen name="MobileCheck" component={MobileCheckPage} options={{ title: "Mobile Check" }} />
      <Stack.Screen name="SecurityMeasures" component={SecurityMeasuresPage} options={{ title: "Security Measures" }} />
      <Stack.Screen name="CSDSampleChecks" component={CSDSampleChecksPage} options={{ title: "CSD Sample Checks" }} />
      <Stack.Screen name="QuarterGdKote" component={QuarterGdKotePage} options={{ title: "Quarter GD Kote" }} />
      <Stack.Screen name="AmnMagazine" component={AmnMagazinePage} options={{ title: "Ammunition Magazine" }} />
      <Stack.Screen name="TSS" component={TSSPage} options={{ title: "TSS" }} />
      <Stack.Screen name="PDFPreview" component={PDFPreviewPage} options={{ title: "PDFPreview" }} />

    </Stack.Navigator>
  );
};

export default AppNavigator;
