import React, { createContext, useEffect, useState } from "react";

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  // const [formData, setFormData] = useState({
  //   date: "",

  //   // Page 1: Duty Handover Details
  //   jcNumber: "",
  //   rank: "",
  //   name: "",
  //   startTime: "",
  //   startDate: "",
  //   endTime: "",
  //   endDate: "",
  //   prevJCNumber: "",
  //   prevRank: "",
  //   prevName: "",

  //   // Page 2: Kote Guard Details
  //   koteGuardTime: "",
  //   koteGuardFindings: "",

  //   // MT Briefing Page Data
  //   mt_time: "",
  //   mt_strength: "",
  //   mtStrengthFields: [{ id: 1, name: "" }],

  //   // Office Sealing
  //   office_sealed: "",
  //   store_sealed: "",

  //   // Ration Checking
  //   ration_observations: "",

  //   // Cook Houses
  //   cookHouseObservations: [{ cook_house: "", appliances: "", staff: "" }],
  //   jcNumber: "",
  //   rank: "",
  //   name: "",
  //   startTime: "",
  //   startDate: "",
  //   endTime: "",
  //   endDate: "",
  //   prevJCNumber: "",
  //   prevRank: "",
  //   prevName: "",

  //   // Page 2: Kote Guard Details
  //   koteGuardTime: "",
  //   koteGuardFindings: "",

  //   // MT Briefing Page Data
  //   mt_time: "",
  //   mt_strength: "",
  //   mtStrengthFields: [{ id: 1, name: "" }], // Dynamic strength fields

  //   //office sealling
  //   office_sealed: "",
  //   store_sealed: "",

  //   //ration checking
  //   ration_observations: "",

  //   //cook houses
  //   cookHouseObservations: [{ cook_house: "", appliances: "", staff: "" }],

  //   // Fire Equipment Check Page
  //   fireEquipment: [
  //     {
  //       fire_point_location: "",
  //       fire_type: "",
  //       fire_serviceability: "",
  //       observations: "",
  //     },
  //   ],
  //   jcNumber: "",
  //   rank: "",
  //   name: "",
  //   startTime: "",
  //   startDate: "",
  //   endTime: "",
  //   endDate: "",
  //   prevJCNumber: "",
  //   prevRank: "",
  //   prevName: "",

  //   // Page 2: Kote Guard Details
  //   koteGuardTime: "",
  //   koteGuardFindings: "",

  //   // MT Briefing Page Data
  //   mt_time: "",
  //   mt_strength: "",
  //   mtStrengthFields: [{ id: 1, name: "" }],

  //   // Office Sealing
  //   office_sealed: "",
  //   store_sealed: "",

  //   // Ration Checking
  //   ration_observations: "",

  //   // Cook Houses
  //   cookHouseObservations: [{ cook_house: "", appliances: "", staff: "" }],

  //   // Fire Equipment Check
  //   fireEquipment: [
  //     {
  //       fire_point_location: "",
  //       fire_type: "",
  //       fire_serviceability: "",
  //       observations: "",
  //     },
  //   ],

  //   // Food Tasting
  //   foodTasting: [
  //     { cookHouse: "A PI", meal: "Breakfast", quality: "", improvement: "" },
  //     { cookHouse: "A PI", meal: "Lunch", quality: "", improvement: "" },
  //     { cookHouse: "A PI", meal: "Dinner", quality: "", improvement: "" },
  //     { cookHouse: "B PI", meal: "Breakfast", quality: "", improvement: "" },
  //     { cookHouse: "B PI", meal: "Lunch", quality: "", improvement: "" },
  //     { cookHouse: "B PI", meal: "Dinner", quality: "", improvement: "" },
  //   ],

  //   // Land Matters
  //   defense_land_check: "",
  //   remarks: "",

  //   // Defense Land Survey
  //   // Mobile Check Page
  //   mobileCheckRows: [
  //     {
  //       id: 1,
  //       rank: "",
  //       name: "",
  //       makeType: "",
  //       mobNo: "",
  //       bannedApp: "",
  //       remarks: "",
  //     },
  //   ],

  //   // QTR Visit Page
  //   qtrVisitRows: [{ id: 1, qtrNo: "", problem: "", remarks: "" }],

  //   // Roll Call Page
  //   rollCallLocation: "",
  //   rollCallBriefing: "",

  //   // Sale of CSD
  //   csdGrocerySale: "",
  //   csdLiquorSale: "",

  //   // Liquor Issue
  //   liquorIssueReport: "",

  //   // Improvement Page
  //   improvementPointA: "",
  //   improvementPointB: "",

  //   // Awareness Page
  //   gfo: "",
  //   dutyOfficer: "",
  //   qrtJco: "",
  //   dutyNco: "",

  //   // Handover Duties
  //   handoverNo: "",
  //   handoverRank: "",
  //   handoverName: "",
  //   handoverDate: "",
  //   handoverTime: "",

  //   // Quarter Gd & Kote
  //   koteCheckDate: "",
  //   quarterGdKoteRows: [
  //     { id: 1, held: "", armsOut: "", armsIn: "", remarks: "" },
  //   ],

  //   // Amn Magazine
  //   amnMagazineDate: "",
  //   amnMagazineRows: [
  //     {
  //       id: 1,
  //       amn: "",
  //       firstLine: "",
  //       secondLine: "",
  //       trg: "",
  //       usedCartridges: "",
  //       remarks: "",
  //     },
  //   ],

  //   // CSD Sample Checks
  //   csdItem1: "",
  //   csdItem2: "",
  //   csdItem3: "",
  //   cardItem1: "",
  //   cardItem2: "",
  //   cardItem3: "",

  //   // Defense Land
  //   defense_land_check: "",
  //   remarks: "",
  //   defenseLandSurvey: {
  //     RP: false,
  //     QM: false,
  //     observations: [],
  //   },

  //   // Guard Check
  //   guards: [{ id: 1, type: "", day: "", night: "" }],

  //   // Health & Hygiene Page
  //   healthHygiene: {
  //     "Cleanliness of JCO Mess": "",
  //     "Persons sleeping on ground": "",
  //     "Cleanliness of bathroom and latrines": "",
  //     "Cleanliness of OR Cook House": "",
  //     "Disposal of Kitchen Wastage": "",
  //     "Cleanliness of Barracks/Toilets": "",
  //     "Personnel Maintenance": "",
  //     "Availability of Drinking Water for Troops": "",
  //     "Cleanliness of Civilian Tea Room": "",
  //     "Anti-Malaria/Dengue Precautions": "",
  //   },

  //   // 📌 CCTV Locations (NEW)
  //   cctvLocations: [
  //     {
  //       id: 1,
  //       location: "",
  //       total: "",
  //       serviceable: "",
  //       unserviceable: "",
  //       remarks: "",
  //     },
  //   ],

  //   // 📌 Medical Visit Data (NEW)
  //   medicalVisitTime: "",
  //   medicalVisitObservations: [{ id: 1, text: "" }],

  //   // 📌 Roll Call Data
  //   rollCallLocation: "",
  //   rollCallBriefing: "",

  //   // 📌 Sale of CSD Grocery & Liquor
  //   csdGrocerySale: "",
  //   csdLiquorSale: "",

  //   // ✅ QTR Visit Data
  //   qtrVisitRows: [{ id: 1, qtrNo: "", problem: "", remarks: "" }],

  //   // ✅ Mobile Check Data
  //   mobileCheckRows: [
  //     {
  //       id: 1,
  //       rank: "",
  //       name: "",
  //       makeType: "",
  //       mobNo: "",
  //       bannedApp: "",
  //       remarks: "",
  //     },
  //   ],

  //   // ✅ Liquor Issue Data
  //   liquorIssueReport: "",

  //   // ✅ Improvement Page Data
  //   improvementPointA: "",
  //   improvementPointB: "",

  //   // ✅ Awareness Page Data
  //   awareness: {
  //     gfo: "",
  //     gfoUnit: "",
  //     dutyOfficer: "",
  //     qrtJco: "",
  //     dutyNco: "",
  //   },

  //   // ✅ Handover Duties Data
  //   handoverDuties: {
  //     handoverNo: "",
  //     handoverRank: "",
  //     handoverName: "",
  //     handoverDate: "",
  //     handoverTime: "",
  //   },
  //   // **TSS Page (New)**
  //   tssItems: [
  //     {
  //       id: 1,
  //       ser: "",
  //       item: "",
  //       catPartNo: "",
  //       grndBal: "",
  //       ledgerBal: "",
  //       remarks: "",
  //     },
  //   ],
  // });

  const [formData, setFormData] = useState([
    {
      date: "",

      // Page 1: Duty Handover Details
      duty_handover: {
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
      },

      // Page 2: Kote Guard Details
      guard_details: {
        koteGuardTime: "",
        koteGuardFindings: "",
      },

      // MT Briefing Page Data
      mt_briefing: {
        mt_time: "",
        mt_strength: "",
        mtStrengthFields: [{ id: 1, name: "" }],
      },

      // Guard Check
      guard_check: [{ guard: "", dayInfo: "", nightInfo: "" }],

      // Office Sealing
      office_sealing: {
        office_sealed_at: "",
        store_sealed_at: "",
      },

      // Ration Checking
      ration_check: {
        ration_observations: "",
      },

      // Cook Houses
      cookHouseObservations: [
        { cook_house: "", appliances_status: "", staff_details: "" },
      ],

      // Fire equipment check
      fire_equipment_check: [
        { location: "", type: "", status: "", remarks: "" },
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

      // health and hygiene
      health_hygiene: [
        {
          field: "Cleanliness of JCO Mess",
          observation: "",
          remark: "",
        },
        {
          field: "Persons sleeping on ground",
          observation: "",
          remark: "",
        },
        {
          field: "Cleanliness of bathroom and latrines",
          observation: "",
          remark: "",
        },
        {
          field: "Cleanliness of OR Cook House",
          observation: "",
          remark: "",
        },
        {
          field: "Disposal of Kitchen Wastage",
          observation: "",
          remark: "",
        },
        {
          field: "Cleanliness of Barracks/Toilets",
          observation: "",
          remark: "",
        },
        {
          field: "Personnel Maintenance",
          observation: "",
          remark: "",
        },
        {
          field: "Availability of Drinking Water for Troops",
          observation: "",
          remark: "",
        },
        {
          field: "Cleanliness of Civilian Tea Room",
          observation: "",
          remark: "",
        },
        {
          field: "Anti-Malaria/Dengue Precautions",
          observation: "",
          remark: "",
        },
      ],

      // Land Matters
      land_matters: [
        {
          location: "",
          time: "",
          remark: "",
        },
      ],

      // defense land survey
      defense_land_survey: {
        text: "I visited def land survey No. 36,38,40,41,43,59 along with a rep of the RP/QM and made entry in the Def land visit register. I have the following to report",
        RP: false,
        QM: false,
        observations: [{ text: "" }],
      },

      // Quarter Gd & Kote
      quarter_gd_kote: {
        koteCheckDate: "",
        quarterGdKoteRows: [
          { id: 1, held: "", armsOut: "", armsIn: "", remarks: "" },
        ],
      },

      // Amn magazine
      amn_magazine: {
        amnMagazineCheckDate: "",
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
      },

      // CSA checks
      csa_checks: {
        csa_items: {
          csdItem1: "",
          csdItem2: "",
          csdItem3: "",
        },
        card_items: {
          cardItem1: "",
          cardItem2: "",
          cardItem3: "",
        },
      },
      // TSS
      tss: {
        text: "I have physically checked the following sample items as per my trade-work (minimum three) and matched the ground and ledger balance",
        columns: [
          {
            id: 1,
            item: "",
            cat_part_no: "",
            grnd_bal: "",
            ledger_bal: "",
            remarks: "",
          },
        ],
      },

      // security measures
      security_measures: {
        text: "I have checked the premises of ASW AOR on",
        checkTime: "",
        measures: [
          {
            text: "Any salesmen/beggars found in AOR",
            check: false,
          },
          {
            text: "I have checked init AoR for authorized occupation of def land",
            check: false,
          },
        ],
      },

      // cctv_locations
      cctv_locations: [
        {
          location: "",
          total: "",
          serviceable: "",
          unserviceable: "",
          remarks: "",
        },
      ],

      // devlali visit
      devlali_visit: {
        time: "",
        observations: [{ id: 1, text: "" }],
      },

      // roll call
      roll_call: {
        location: "",
        details: "",
      },

      // sale of csd
      sale_of_csd: {
        grocery_amount: "",
        liquor_amount: "",
      },

      // OTR visit
      qtr_visit: [{ id: 1, qtr_no_and_location: "", problem: "", remarks: "" }],

      // Mobile Check Page
      mobileCheckRows: [
        {
          id: 1,
          rank: "",
          name: "",
          makeAndType: "",
          mobNo: "",
          bannedAppAndPpoCalls: "",
          remarks: "",
        },
      ],

      //liquor issue
      liquorIssue: { text: "" },

      // improvement in wksp tech
      improvement_in_wksp_tech: [
        { id: 1, point: "" },
        { id: 2, point: "" },
      ],

      // awareness
      awareness: {
        rankAndName: "",
        unit: "",
        dutyOfficer: "",
        QRT_JCO: "",
        NCO: "",
      },

      // handover duties
      handoverDuties: { no: "", rank: "", name: "", date: "", time: "" },
    },
  ]);

  useEffect(() => {
    console.log(Array.isArray(formData), "as");
    // formData?.map((item) => console.log(item));
    console.log(formData[0]?.duty_handover);
  }, [formData]);

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};
