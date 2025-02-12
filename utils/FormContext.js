import React, { createContext, useEffect, useState } from "react";

// Request storage permissions (needed on Android)
export const FormContext = createContext();

export const fileContext = createContext();

import AsyncStorage from "@react-native-async-storage/async-storage";

export const FormProvider = ({ children }) => {
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
        text: "I mounted the kote guard and found",
        mt_time: "",
        mt_strength: "",
        mtStrengthFields: [{ id: 1, name: "" }],
      },

      // Guard Check
      guard_check: [{ id: 1, guard: "", dayInfo: "", nightInfo: "" }],

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
          { id: 1, held: "", type: "", armsOut: "", armsIn: "", remarks: "" },
        ],
      },

      // Amn magazine
      amn_magazine: {
        text: "I have physically cheked the Amn Magazine on",
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

      // csd checks
      csd_checks: {
        csd_items: {
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
            observation: "",
            text: "Any salesmen/beggars found in AOR",
            check: false,
          },
          {
            observation: "",
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
        date: "",
        time: "",
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

  // Filled data

  // const [formData, setFormData] = useState([
  //   {
  //     date: "9/2/2025",

  //     // Page 1: Duty Handover Details
  //     duty_handover: {
  //       jcNumber: "a",
  //       rank: "Captain",
  //       name: "John Doe",
  //       startTime: "08:00",
  //       startDate: "9/2/2025",
  //       endTime: "16:00",
  //       endDate: "9/2/2025",
  //       prevJCNumber: "JC122",
  //       prevRank: "Lieutenant",
  //       prevName: "Jane Doe",
  //     },

  //     // Page 2: Kote Guard Details
  //     guard_details: {
  //       koteGuardTime: "09:00",
  //       koteGuardFindings: "Guard duty completed successfully, no issues.",
  //     },

  //     // MT Briefing Page Data
  //     mt_briefing: {
  //       mt_time: "10:00",
  //       mt_strength: "50",
  //       mtStrengthFields: [
  //         { id: 1, name: "Truck 1" },
  //         { id: 2, name: "Truck 2" },
  //       ],
  //     },

  //     // Guard Check
  //     guard_check: [
  //       { id: 1, guard: "Guard A", dayInfo: "Clear", nightInfo: "Clear" },
  //       // { id: 2, guard: "Guard B", dayInfo: "Alert", nightInfo: "Alert" },
  //     ],

  //     // Office Sealing
  //     office_sealing: {
  //       office_sealed_at: "09:30",
  //       store_sealed_at: "10:00",
  //     },

  //     // Ration Checking
  //     ration_check: {
  //       ration_observations: "Rations are in good condition, no issues found.",
  //     },

  //     // Cook Houses
  //     cookHouseObservations: [
  //       {
  //         cook_house: "A PI",
  //         appliances_status: "Working",
  //         staff_details: "Sufficient staff on duty.",
  //       },
  //       {
  //         cook_house: "B PI",
  //         appliances_status: "Not Working",
  //         staff_details: "Need repair.",
  //       },
  //     ],

  //     // Fire Equipment Check
  //     fire_equipment_check: [
  //       {
  //         location: "Main Hall",
  //         type: "Extinguisher",
  //         status: "Serviceable",
  //         remarks: "All good",
  //       },
  //       {
  //         location: "Kitchen",
  //         type: "Hose",
  //         status: "Unserviceable",
  //         remarks: "Repair needed",
  //       },
  //     ],

  //     // Food Tasting
  //     foodTasting: [
  //       {
  //         cookHouse: "A PI",
  //         meal: "Breakfast",
  //         quality: "Good",
  //         improvement: "None",
  //       },
  //       {
  //         cookHouse: "A PI",
  //         meal: "Lunch",
  //         quality: "Excellent",
  //         improvement: "None",
  //       },
  //       {
  //         cookHouse: "B PI",
  //         meal: "Dinner",
  //         quality: "Fair",
  //         improvement: "Better seasoning",
  //       },
  //     ],

  //     // Health and Hygiene
  //     health_hygiene: [
  //       {
  //         field: "Cleanliness of JCO Mess",
  //         observation: "Clean",
  //         remark: "No issues.",
  //       },
  //       {
  //         field: "Cleanliness of Barracks/Toilets",
  //         observation: "Clean",
  //         remark: "Well maintained.",
  //       },
  //     ],

  //     // Land Matters
  //     land_matters: [
  //       {
  //         location: "Area A",
  //         time: "11:00",
  //         remark: "Clear, no obstructions.",
  //       },
  //       {
  //         location: "Area B",
  //         time: "13:00",
  //         remark: "Minor issue with land clearance.",
  //       },
  //     ],

  //     // Defense Land Survey
  //     defense_land_survey: {
  //       text: "I visited def land survey No. 36,38,40,41,43,59 along with a rep of the RP/QM and made entry in the Def land visit register. I have the following to report.",
  //       RP: true,
  //       QM: false,
  //       observations: [{ text: "Survey completed without major issues." }],
  //     },

  //     // Quarter Gd & Kote
  //     quarter_gd_kote: {
  //       koteCheckDate: "9/2/2025",
  //       quarterGdKoteRows: [
  //         {
  //           id: 1,
  //           held: "Yes",
  //           type: "Routine",
  //           armsOut: "No",
  //           armsIn: "Yes",
  //           remarks: "Normal check.",
  //         },
  //       ],
  //     },

  //     // Ammunition Magazine
  //     amn_magazine: {
  //       text: "I have physically checked the Amn Magazine on",
  //       amnMagazineCheckDate: "9/2/2025",
  //       amnMagazineRows: [
  //         {
  //           id: 1,
  //           amn: "5.56mm",
  //           firstLine: "Full",
  //           secondLine: "Full",
  //           trg: "Complete",
  //           usedCartridges: "None",
  //           remarks: "All good.",
  //         },
  //       ],
  //     },

  //     // CSD Checks
  //     csd_checks: {
  //       csd_items: {
  //         csdItem1: "Item A",
  //         csdItem2: "Item B",
  //         csdItem3: "Item C",
  //       },
  //       card_items: {
  //         cardItem1: "Card A",
  //         cardItem2: "Card B",
  //         cardItem3: "Card C",
  //       },
  //     },

  //     // TSS
  //     tss: {
  //       text: "I have physically checked the following sample items as per my trade-work (minimum three) and matched the ground and ledger balance",
  //       columns: [
  //         {
  //           id: 1,
  //           item: "Sample Item 1",
  //           cat_part_no: "1234",
  //           grnd_bal: "50",
  //           ledger_bal: "50",
  //           remarks: "Match",
  //         },
  //         {
  //           id: 2,
  //           item: "Sample Item 2",
  //           cat_part_no: "5678",
  //           grnd_bal: "30",
  //           ledger_bal: "30",
  //           remarks: "Match",
  //         },
  //       ],
  //     },

  //     // Security Measures
  //     security_measures: {
  //       text: "I have checked the premises of ASW AOR on",
  //       checkTime: "9/2/2025 15:00",
  //       measures: [
  //         { text: "Any salesmen/beggars found in AOR", check: true },
  //         {
  //           text: "I have checked init AoR for authorized occupation of def land",
  //           check: false,
  //         },
  //       ],
  //     },

  //     // CCTV Locations
  //     cctv_locations: [
  //       {
  //         location: "Entrance",
  //         total: "5",
  //         serviceable: "4",
  //         unserviceable: "1",
  //         remarks: "Minor issue.",
  //       },
  //       {
  //         location: "Kitchen",
  //         total: "2",
  //         serviceable: "2",
  //         unserviceable: "0",
  //         remarks: "All good.",
  //       },
  //     ],

  //     // Devlali Visit
  //     devlali_visit: {
  //       time: "9/2/2025 14:00",
  //       observations: [{ id: 1, text: "Observation 1: Well-maintained." }],
  //     },

  //     // Roll Call
  //     roll_call: {
  //       location: "Building A",
  //       details: "Roll Call completed successfully at 9:00 AM.",
  //     },

  //     // Sale of CSD
  //     sale_of_csd: {
  //       grocery_amount: "500",
  //       liquor_amount: "200",
  //     },

  //     // OTR Visit
  //     qtr_visit: [
  //       {
  //         id: 1,
  //         qtr_no_and_location: "Qtr 101, Sector 5",
  //         problem: "Water leakage",
  //         remarks: "Needs fixing.",
  //       },
  //     ],

  //     // Mobile Check Page
  //     mobileCheckRows: [
  //       {
  //         id: 1,
  //         rank: "Private",
  //         name: "Sam",
  //         makeAndType: "Samsung Galaxy",
  //         mobNo: "9876543210",
  //         bannedAppAndPpoCalls: "None",
  //         remarks: "All fine.",
  //       },
  //     ],

  //     // Liquor Issue
  //     liquorIssue: { text: "Liquor issue checked and verified for all units." },

  //     // Improvement in Workshop Tech
  //     improvement_in_wksp_tech: [
  //       { id: 1, point: "Need better tools for repair work." },
  //       { id: 2, point: "Improve workshop cleanliness." },
  //     ],

  //     // Awareness
  //     awareness: {
  //       rankAndName: "Sergeant James",
  //       unit: "Unit A",
  //       dutyOfficer: "Captain Smith",
  //       QRT_JCO: "Lieutenant Lee",
  //       NCO: "Sergeant Johnson",
  //     },

  //     // Handover Duties
  //     handoverDuties: {
  //       no: "a",
  //       rank: "Captain",
  //       name: "John Doe",
  //       date: "9/2/2025",
  //       time: "08:00 AM",
  //     },
  //   },
  // ]);

  // useEffect(() => {
  //   const saveFormData = async () => {
  //     try {
  //       const res = await AsyncStorage.getItem("formData");
  //       const parsedData = JSON.parse(res);

  //       const date = new Date().toLocaleDateString("en-IN");
  //       const oldData = saveFormData();

  //       if (date === oldData.date) setFormData(oldData);
  //     } catch (error) {
  //       return null;
  //     }
  //   };
  //   saveFormData();
  // }, []);

  useEffect(() => {
    const saveData = async () => {
      try {
        const jsonValue = JSON.stringify(formData);
        await AsyncStorage.setItem("formData", jsonValue);
      } catch (error) {
        console.log("Error saving data:", error);
      }
    };
    saveData();
  }, [formData]);

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};
