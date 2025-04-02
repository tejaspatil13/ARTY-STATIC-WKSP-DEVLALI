export const resetData = (setFormData) => {
  setFormData((prevData) => [
    {
      date: new Date().toLocaleDateString("en-IN"),
      dutyStartDate: new Date().toLocaleDateString("en-IN"),
      dutyEndDate: new Date().toLocaleDateString("en-IN"),

      // Preserve "Improvement in Workshop Tech" section
      improvement_in_wksp_tech: prevData[0]?.improvement_in_wksp_tech || [
        { id: 1, point: "", status: "Pending" },
        { id: 2, point: "", status: "Pending" },
      ],

      // Reset all other sections
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
      guard_details: { koteGuardTime: "", koteGuardFindings: "" },
      mt_briefing: {
        text: "I mounted the kote guard and found",
        mt_time: "",
        mt_strength: "",
        mtStrengthFields: [{ id: 1, name: "" }],
      },
      guard_check: [{ id: 1, guard: "", dayInfo: "", nightInfo: "" }],
      office_sealing: { office_sealed_at: "", store_sealed_at: "" },
      ration_check: { ration_observations: "" },
      cookHouseObservations: [
        { cook_house: "", appliances_status: "", staff_details: "" },
      ],
      fire_equipment_check: [
        { location: "", type: "", status: "", remarks: "" },
      ],
      foodTasting: [
        {
          cookHouse: "A PI",
          meal: "Breakfast",
          quality: "",
          improvement: "",
        },
        { cookHouse: "A PI", meal: "Lunch", quality: "", improvement: "" },
        { cookHouse: "A PI", meal: "Dinner", quality: "", improvement: "" },
        {
          cookHouse: "B PI",
          meal: "Breakfast",
          quality: "",
          improvement: "",
        },
        { cookHouse: "B PI", meal: "Lunch", quality: "", improvement: "" },
        { cookHouse: "B PI", meal: "Dinner", quality: "", improvement: "" },
      ],
      health_hygiene: [
        { field: "Cleanliness of JCO Mess", observation: "", remark: "" },
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
      ],
      land_matters: [{ location: "", time: "", remark: "" }],
      defense_land_survey: {
        text: "I visited def land survey No. 36,38,40,41,43,59...",
        RP: false,
        QM: false,
        observations: [{ text: "" }],
      },
      quarter_gd_kote: {
        koteCheckDate: "",
        quarterGdKoteRows: [
          {
            id: 1,
            held: "",
            type: "",
            armsOut: "",
            armsIn: "",
            remarks: "",
          },
        ],
      },
      amn_magazine: {
        text: "I have physically checked the Amn Magazine on",
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
      csd_checks: {
        csd_items: { csdItem1: "", csdItem2: "", csdItem3: "" },
        card_items: { cardItem1: "", cardItem2: "", cardItem3: "" },
      },
      tss: {
        text: "I have physically checked the following sample items...",
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
      security_measures: {
        text: "I have checked the premises of ASW AOR on",
        checkTime: "",
        measures: [
          {
            observation: "",
            text: "Any salesmen/beggars found in AOR",
            check: false,
          },
        ],
      },
      cctv_locations: [
        {
          location: "",
          total: "",
          serviceable: "",
          unserviceable: "",
          remarks: "",
        },
      ],
      devlali_visit: { time: "", observations: [{ id: 1, text: "" }] },
      roll_call: { date: "", time: "", details: "" },
      sale_of_csd: { grocery_amount: "", liquor_amount: "" },
      qtr_visit: [{ id: 1, qtr_no_and_location: "", problem: "", remarks: "" }],
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
      liquorIssue: { text: "" },
      awareness: {
        rankAndName: "",
        unit: "",
        dutyOfficer: "",
        QRT_JCO: "",
        NCO: "",
      },
      handoverDuties: { no: "", rank: "", name: "", date: "", time: "" },
    },
  ]);
  alert("All fields are cleared!");
};
