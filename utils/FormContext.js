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
    mtStrengthFields: [{ id: 1, name: '' }],

    // Office Sealing
    office_sealed: '',
    store_sealed: '',

    // Ration Checking
    ration_observations: '',

    // Cook Houses
    cookHouseObservations: [{ cook_house: '', appliances: '', staff: '' }],

    // Fire Equipment Check Page
    fireEquipment: [{ fire_point_location: '', fire_type: '', fire_serviceability: '', observations: '' }],

    // Food Tasting
    foodTasting: [
      { cookHouse: "A PI", meal: "Breakfast", quality: "", improvement: "" },
      { cookHouse: "A PI", meal: "Lunch", quality: "", improvement: "" },
      { cookHouse: "A PI", meal: "Dinner", quality: "", improvement: "" },
      { cookHouse: "B PI", meal: "Breakfast", quality: "", improvement: "" },
      { cookHouse: "B PI", meal: "Lunch", quality: "", improvement: "" },
      { cookHouse: "B PI", meal: "Dinner", quality: "", improvement: "" },
    ],

    // Land Matters
    defense_land_check: '',
    remarks: '',

    // Defense Land Survey
    defenseLandSurvey: {
      RP: false,
      QM: false,
      observations: [],
    },

    // Guard Check
    guards: [{ id: 1, type: '', day: '', night: '' }],

    // Health & Hygiene Page
    healthHygiene: {
      "Cleanliness of JCO Mess": '',
      "Persons sleeping on ground": '',
      "Cleanliness of bathroom and latrines": '',
      "Cleanliness of OR Cook House": '',
      "Disposal of Kitchen Wastage": '',
      "Cleanliness of Barracks/Toilets": '',
      "Personnel Maintenance": '',
      "Availability of Drinking Water for Troops": '',
      "Cleanliness of Civilian Tea Room": '',
      "Anti-Malaria/Dengue Precautions": '',
    },

    // 📌 CCTV Locations (NEW)
    cctvLocations: [
      { id: 1, location: '', total: '', serviceable: '', unserviceable: '', remarks: '' },
    ],

    // 📌 Medical Visit Data (NEW)
    medicalVisitTime: '',
    medicalVisitObservations: [{ id: 1, text: '' }],

    // 📌 Roll Call Data
    rollCallLocation: '',
    rollCallBriefing: '',

    // 📌 Sale of CSD Grocery & Liquor
    csdGrocerySale: '',
    csdLiquorSale: '',

    // ✅ QTR Visit Data
    qtrVisitRows: [{ id: 1, qtrNo: '', problem: '', remarks: '' }],

    // ✅ Mobile Check Data
    mobileCheckRows: [{ id: 1, rank: '', name: '', makeType: '', mobNo: '', bannedApp: '', remarks: '' }],

    // ✅ Liquor Issue Data
    liquorIssueReport: '',

    // ✅ Improvement Page Data
    improvementPointA: '',
    improvementPointB: '',

    // ✅ Awareness Page Data
    awareness: {
      gfo: '',
      gfoUnit: '',
      dutyOfficer: '',
      qrtJco: '',
      dutyNco: '',
    },

    // ✅ Handover Duties Data
    handoverDuties: {
      handoverNo: '',
      handoverRank: '',
      handoverName: '',
      handoverDate: '',
      handoverTime: '',
    },
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};
