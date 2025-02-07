import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import Screens
import MainScreen from '../screens/MainScreen';
import DutyHandoverPage from '../screens/DutyHandoverPage';
import MTBriefingPage from '../screens/MTBriefingPage';
import GuardDetailsPage from '../screens/GuardDetailsPage';
import GuardCheckPage from '../screens/GuardCheckPage';
import OfficeStoreSealingPage from '../screens/OfficeStoreSealingPage';
import RationCheckPage from '../screens/RationCheckPage';
import CookHouseObservationsPage from '../screens/CookHouseObservationsPage';
import FireEquipmentCheckPage from '../screens/FireEquipmentCheckPage';
import FoodTastingPage from '../screens/FoodTastingPage'; 
import HealthHygienePage from '../screens/HealthHygienePage';
import LandMattersPage from '../screens/LandMattersPage';
import DefenseLandSurveyPage from '../screens/DefenseLandSurveyPage';
import MedicalVisitPage from '../screens/MedicalVisitPage';
import CCTVLocationPage from '../screens/CCTVLocationPage';



const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Main" component={MainScreen} options={{ title: 'Main' }} />
      <Stack.Screen name="DutyHandover" component={DutyHandoverPage} options={{ title: 'Duty Handover' }} />
      <Stack.Screen name="GuardDetails" component={GuardDetailsPage} />  
      <Stack.Screen name="MTBriefing" component={MTBriefingPage} options={{ title: 'MT Briefing' }} /> 
      <Stack.Screen name="GuardCheck" component={GuardCheckPage} options={{ title: 'Guard Check' }} />
      <Stack.Screen name="OfficeStoreSealing" component={OfficeStoreSealingPage} options={{ title: 'Office & Store Sealing' }} />
      <Stack.Screen name="RationCheck" component={RationCheckPage} options={{ title: 'Ration Check' }} />
      <Stack.Screen name="CookHouseObservations" component={CookHouseObservationsPage} options={{ title: 'Cook House Observations' }} />
      <Stack.Screen name="FireEquipmentCheck" component={FireEquipmentCheckPage} options={{ title: 'Fire Equipment Check' }} />
      <Stack.Screen name="FoodTasting" component={FoodTastingPage} options={{ title: 'Food Tasting' }} />
      <Stack.Screen name="HealthHygiene" component={HealthHygienePage} options={{ title: 'Health & Hygiene' }} />
      <Stack.Screen name="MainScreen" component={MainScreen} options={{ title: 'MainScreen' }} />
      <Stack.Screen name="LandMatters" component={LandMattersPage} options={{ title: 'Land Matters' }} />
      <Stack.Screen name="DefenseLandSurvey" component={DefenseLandSurveyPage} options={{ title: 'Defence Land Survey' }} />
      <Stack.Screen name="MedicalVisit" component={MedicalVisitPage} options={{ title: 'MH Devlali Visit' }} />
      <Stack.Screen name="CCTVLocation" component={CCTVLocationPage} options={{ title: 'CCTV Location' }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
