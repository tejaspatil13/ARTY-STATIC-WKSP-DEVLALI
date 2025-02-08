import React from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';

const MainScreen = ({ navigation }) => {
  // Set navigation options to remove the back button and center the title
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'MAIN PAGE', // Set the title
      headerTitleAlign: 'center', // Center the title
      headerLeft: () => null, // Remove the back button
    });
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* App Title */}
      <Text style={styles.title}>DUTY JCO FORM</Text>

      {/* Buttons for Navigation */}
      <View style={styles.buttonContainer}>
        <Button
          title="1. Start Duty Handover"
          onPress={() => navigation.navigate('DutyHandover')}
          color="#2196F3"
        />
        <Button
          title="2. Guard Details"
          onPress={() => navigation.navigate('GuardDetails')}
          color="#2196F3"
        />
        <Button
          title="3. MT Briefing"
          onPress={() => navigation.navigate('MTBriefing')}
          color="#2196F3"
        />
        <Button
          title="4. Guard Check"
          onPress={() => navigation.navigate('GuardCheck')}
          color="#2196F3"
        />
        <Button
          title="5. Office Store Sealing"
          onPress={() => navigation.navigate('OfficeStoreSealing')}
          color="#2196F3"
        />
        <Button
          title="6. Ration Check"
          onPress={() => navigation.navigate('RationCheck')}
          color="#2196F3"
        />
        <Button
          title="7. Cook House Observations"
          onPress={() => navigation.navigate('CookHouseObservations')}
          color="#2196F3"
        />
        <Button
          title="8. Fire Equipment Check"
          onPress={() => navigation.navigate('FireEquipmentCheck')}
          color="#2196F3"
        />

        <Button
          title="9. Food Tasting"
          onPress={() => navigation.navigate('FoodTasting')}
          color="#2196F3"
        />

        <Button
          title="10. Health & Hygiene"
          onPress={() => navigation.navigate('HealthHygiene')}
          color="#2196F3"
        />
        

        <Button
          title="11. Land Matters"
          onPress={() => navigation.navigate('LandMatters')}
          color="#2196F3"
        />

        <Button
          title="12. Defence Land Survey"
          onPress={() => navigation.navigate('DefenseLandSurvey')}
          color="#2196F3"
        />

       <Button
          title="13. Quarter Gd Kote "
          onPress={() => navigation.navigate('QuarterGdKote')}
          color="#2196F3"
        />

       <Button
          title="14. Amn Magazine Page"
          onPress={() => navigation.navigate('AmnMagazine')}
          color="#2196F3"
        />

        <Button
          title="15. CSD Sample Checks"
          onPress={() => navigation.navigate('CSDSampleChecks')}
          color="#2196F3"
        />
        <Button
          title="16. TSS "
          onPress={() => navigation.navigate('TSS')}
          color="#2196F3"
        />




        <Button
          title="18.CCTV Location"
          onPress={() => navigation.navigate('CCTVLocation')}
          color="#2196F3"
        />

  
        
        <Button
          title="19.MH Devlali Visit"
          onPress={() => navigation.navigate('MedicalVisit')}
          color="#2196F3"
        />  
     
        <Button
          title="20. Roll Call"
          onPress={() => navigation.navigate('RollCall')}
          color="#2196F3"
        />
        <Button
          title="21. Sale of CSD"
          onPress={() => navigation.navigate('SaleCSD')}
          color="#2196F3"
        />
        <Button
          title="22. Qtr Visit Page"
          onPress={() => navigation.navigate('QtrVisit')}
          color="#2196F3"
        />
        <Button
          title="23. Mobile Check"
          onPress={() => navigation.navigate('MobileCheck')}
          color="#2196F3"
        />
        <Button
          title="24. Liquor Issue"
          onPress={() => navigation.navigate('LiquorIssue')}
          color="#2196F3"
        />
        <Button
          title="25. Improvement in Wksp"
          onPress={() => navigation.navigate('Improvement')}
          color="#2196F3"
        />
        <Button
          title="26. Awareness"
          onPress={() => navigation.navigate('Awareness')}
          color="#2196F3"
        />
        <Button
          title="27. Handover Duties"
          onPress={() => navigation.navigate('HandoverDuties')}
          color="#2196F3"
        />
      </View>

    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 70,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  buttonContainer: {
    width: '80%',
    marginVertical: 70,
    gap: 30,
    borderRadius: 5,
    overflow: 'hidden',
  },
});

export default MainScreen;