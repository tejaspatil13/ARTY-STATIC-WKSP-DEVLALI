import React from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';

const MainScreen = ({ navigation }) => {
  // Generate an array of page numbers from 2 to 28
  const pages = Array.from({ length: 27 }, (_, i) => i + 2);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* App Title */}
      <Text style={styles.title}> DUTY JCO FORM</Text>

      {/* Start Duty Handover Button */}
      <View style={styles.buttonContainer}>
        <Button
          title="Start Duty Handover"
          onPress={() => navigation.navigate('DutyHandover')}
          color="#2196F3"
        />
         <Button
          title="Guard Details"
          onPress={() => navigation.navigate('GuardDetails')}
          color="#2196F3"
        />
        <Button
          title="MT Briefing"
          onPress={() => navigation.navigate('MTBriefing')}
          color="#2196F3"
        />
         <Button
          title="Guard Check"
          onPress={() => navigation.navigate('GuardCheck')}
          color="#2196F3"
        />

       <Button
          title="Office Store Sealing"
          onPress={() => navigation.navigate('OfficeStoreSealing')}
          color="#2196F3"
        />
         <Button
          title="Ration Check"
          onPress={() => navigation.navigate('RationCheck')}
          color="#2196F3"
        />
        <Button
          title="Cook House Observations"
          onPress={() => navigation.navigate('CookHouseObservations')}
          color="#2196F3"
        />
         <Button
          title="Fire Equipment Check"
          onPress={() => navigation.navigate('FireEquipmentCheck')}
          color="#2196F3"
        />

        <Button
          title="Food Tasting"
          onPress={() => navigation.navigate('FoodTasting')}
          color="#2196F3"
        />

        <Button
          title="Health & Hygiene"
          onPress={() => navigation.navigate('HealthHygiene')}
          color="#2196F3"
        />

        <Button
          title="Land Matters"
          onPress={() => navigation.navigate('LandMatters')}
          color="#2196F3"
        />

        <Button
          title="Defence Land Survey"
          onPress={() => navigation.navigate('DefenseLandSurvey')}
          color="#2196F3"
        />

        <Button
          title="MH Devlali Visit"
          onPress={() => navigation.navigate('MedicalScreen')}
          color="#2196F3"
        />

        <Button
          title="CCTV Location"
          onPress={() => navigation.navigate('CCTVLocation')}
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
    gap:30,
    borderRadius: 5,
    overflow: 'hidden',
  },
});

export default MainScreen;