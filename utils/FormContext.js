import React, { createContext, useState } from 'react';

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    // Page 1: Duty Handover Details
    jcNumber: '',
    rank: '',
    name: '',
    startTime: '',
    startDate: '',
    endTime: '',
    endDate: '',
    prevJCNumber: '',
    prevRank: '',
    prevName: '',
    
    // Page 2: Kote Guard Details
    koteGuardTime: '',
    koteGuardFindings: '',
    
    // MT Briefing Page Data
    mt_time: '',
    mt_strength: '',
    mtStrengthFields: [{ id: 1, name: '' }], // Dynamic strength fields

    //office sealling
  office_sealed: '',
  store_sealed: '',

    //ration checking
    ration_observations: '',

    //cook houses
    cookHouseObservations: [{ cook_house: '', appliances: '', staff: '' }],

    // Fire Equipment Check Page
    fireEquipment: [{ fire_point_location: '', fire_type: '', fire_serviceability: '', observations: '' }],

    //food tasting
    foodTasting: [
    { cookHouse: "A PI", meal: "Breakfast", quality: "", improvement: "" },
    { cookHouse: "A PI", meal: "Lunch", quality: "", improvement: "" },
    { cookHouse: "A PI", meal: "Dinner", quality: "", improvement: "" },
    { cookHouse: "B PI", meal: "Breakfast", quality: "", improvement: "" },
    { cookHouse: "B PI", meal: "Lunch", quality: "", improvement: "" },
    { cookHouse: "B PI", meal: "Dinner", quality: "", improvement: "" },  ],

    // land matters
    defense_land_check: '',
    remarks: '',

    //defenseLandSurvey
    defenseLandSurvey: {
      RP: false,
      QM: false,
      observations: [],
    },

  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};