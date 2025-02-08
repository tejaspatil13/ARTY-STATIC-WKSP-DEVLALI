import React, { createContext, useState } from "react";

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
    jcNumber: "",
    rank: "",
    name: "",
    startTime: "",
    startDate: "",
    endTime: "",
    endDate: "",
    prevJCNumber: "",
    prevRank: "",
    prevName: "",

    // Page 2: Kote Guard Details
    koteGuardTime: "",
    koteGuardFindings: "",

    // MT Briefing Page Data
    mt_time: "",
    mt_strength: "",
    mtStrengthFields: [{ id: 1, name: "" }], // Dynamic strength fields

    //office sealling
    office_sealed: "",
    store_sealed: "",

    //ration checking
    ration_observations: "",

    //cook houses
    cookHouseObservations: [{ cook_house: "", appliances: "", staff: "" }],

    // Fire Equipment Check Page
    fireEquipment: [
      {
        fire_point_location: "",
        fire_type: "",
        fire_serviceability: "",
        observations: "",
      },
    ],
    jcNumber: "",
    rank: "",
    name: "",
    startTime: "",
    startDate: "",
    endTime: "",
    endDate: "",
    prevJCNumber: "",
    prevRank: "",
    prevName: "",

    // Page 2: Kote Guard Details
    koteGuardTime: "",
    koteGuardFindings: "",

    // MT Briefing Page Data
    mt_time: "",
    mt_strength: "",
    mtStrengthFields: [{ id: 1, name: "" }],

    // Office Sealing
    office_sealed: "",
    store_sealed: "",

    // Ration Checking
    ration_observations: "",

    // Cook Houses
    cookHouseObservations: [{ cook_house: "", appliances: "", staff: "" }],

    // Fire Equipment Check
    fireEquipment: [
      {
        fire_point_location: "",
        fire_type: "",
        fire_serviceability: "",
        observations: "",
      },
    ],

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
    // Mobile Check Page
    mobileCheckRows: [
      {
        id: 1,
        rank: "",
        name: "",
        makeType: "",
        mobNo: "",
        bannedApp: "",
        remarks: "",
      },
    ],

    // QTR Visit Page
    qtrVisitRows: [{ id: 1, qtrNo: "", problem: "", remarks: "" }],

    // Roll Call Page
    rollCallLocation: "",
    rollCallBriefing: "",

    // Sale of CSD
    csdGrocerySale: "",
    csdLiquorSale: "",

    // Liquor Issue
    liquorIssueReport: "",

    // Improvement Page
    improvementPointA: "",
    improvementPointB: "",

    // Awareness Page
    gfo: "",
    dutyOfficer: "",
    qrtJco: "",
    dutyNco: "",

    // Handover Duties
    handoverNo: "",
    handoverRank: "",
    handoverName: "",
    handoverDate: "",
    handoverTime: "",

    // Quarter Gd & Kote
    koteCheckDate: "",
    quarterGdKoteRows: [
      { id: 1, held: "", armsOut: "", armsIn: "", remarks: "" },
    ],

    // Amn Magazine
    amnMagazineDate: "",
    amnMagazineRows: [
      {
        id: 1,
        amn: "",
        firstLine: "",
        secondLine: "",
        trg: "",
        usedCartridges: "",
        remarks: "",
      },
    ],

    // CSD Sample Checks
    csdItem1: "",
    csdItem2: "",
    csdItem3: "",
    cardItem1: "",
    cardItem2: "",
    cardItem3: "",

    // Defense Land
    defense_land_check: "",
    remarks: "",
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
    // **TSS Page (New)**
    tssItems: [
      {
        id: 1,
        ser: "",
        item: "",
        catPartNo: "",
        grndBal: "",
        ledgerBal: "",
        remarks: "",
      },
    ],
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};
