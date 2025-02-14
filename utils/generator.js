import * as FileSystem from "expo-file-system";
import XLSX from "xlsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { PermissionsAndroid } from "react-native";
import * as Sharing from "expo-sharing"; // For sharing the file

const fileName = "Daily_Report.xlsx";
const fileUri = FileSystem.documentDirectory + fileName;

const flattenObject = (obj, prefix = "") => {
  return Object.keys(obj).reduce((acc, key) => {
    const propName = prefix ? `${prefix}_${key}` : key;

    if (
      typeof obj[key] === "object" &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
      return { ...acc, ...flattenObject(obj[key], propName) };
    } else {
      return { ...acc, [propName]: obj[key] };
    }
  }, {});
};

const processArrayData = (arrayData, date) => {
  return arrayData.map((item) => ({
    Date: date,
    ...flattenObject(item),
  }));
};

export const createAndAppendExcel = async () => {
  try {
    // const granted = await PermissionsAndroid.request(
    //   PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    //   {
    //     title: "Storage Permission",
    //     message: "App needs access to storage to save reports",
    //     buttonNeutral: "Ask Me Later",
    //     buttonNegative: "Cancel",
    //     buttonPositive: "OK",
    //   }
    // );
    // console.log(granted)
    // if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
    //   alert("Storage permission is required");
    // }

    alert("Please Wait...");

    // Retrieve data from AsyncStorage
    const storedData = await AsyncStorage.getItem("formData");
    if (!storedData) {
      alert("No data found in storage");
      return;
    }

    const formData = JSON.parse(storedData);

    // Create a new workbook every time
    const wb = XLSX.utils.book_new();

    // Aggregate data for each sheet
    const dutyHandoverData = [];
    const guardDetailsData = [];
    const mtBriefingData = [];
    const guardCheckData = [];
    const officeSealingData = [];
    const rationCheckData = [];
    const cookHouseData = [];
    const fireEquipData = [];
    const foodData = [];
    const healthData = [];
    const landData = [];
    const defenseDataRows = [];
    const quarterData = [];
    const amnData = [];
    const csdData = [];
    const tssData = [];
    const securityData = [];
    const cctvData = [];
    const devlaliData = [];
    const rollCallData = [];
    const saleData = [];
    const qtrData = [];
    const mobileData = [];
    const liquorData = [];
    const improvementData = [];
    const awarenessData = [];
    const handoverData = [];

    // Process each form data entry
    formData.forEach((entry) => {
      const { date } = entry;

      // 1. Duty Handover Sheet
      dutyHandoverData.push({
        Date: date,
        ...flattenObject(entry.duty_handover),
      });

      // 2. Guard Details Sheet
      guardDetailsData.push({
        Date: date,
        ...flattenObject(entry.guard_details),
      });

      // 3. MT Briefing Sheet
      if (entry.mt_briefing?.mtStrengthFields?.length > 0) {
        entry.mt_briefing.mtStrengthFields.forEach((field) => {
          mtBriefingData.push({
            Date: date,
            Text: "I mounted the kote guard and found",
            Time: entry.mt_briefing.mt_time,
            Strength: entry.mt_briefing.mt_strength,
            ...field,
          });
        });
      }

      // 4. Guard Check Sheet
      if (entry.guard_check?.length > 0) {
        guardCheckData.push(...processArrayData(entry.guard_check, date));
      }

      // 5. Office Sealing Sheet
      officeSealingData.push({
        Date: date,
        ...flattenObject(entry.office_sealing),
      });

      // 6. Ration Check Sheet
      rationCheckData.push({
        Date: date,
        ...flattenObject(entry.ration_check),
      });

      // 7. Cook Houses Sheet
      if (entry.cookHouseObservations?.length > 0) {
        entry.cookHouseObservations.forEach((obs) => {
          cookHouseData.push({
            Date: date,
            CookHouse: obs.cook_house,
            AppliancesStatus: obs.appliances_status,
            StaffDetails: obs.staff_details,
          });
        });
      }

      // 8. Fire Equipment Check Sheet
      if (entry.fire_equipment_check?.length > 0) {
        fireEquipData.push(
          ...processArrayData(entry.fire_equipment_check, date)
        );
      }

      // 9. Food Tasting Sheet
      if (entry.foodTasting?.length > 0) {
        foodData.push(...processArrayData(entry.foodTasting, date));
      }

      // 10. Health and Hygiene Sheet
      if (entry.health_hygiene?.length > 0) {
        healthData.push(...processArrayData(entry.health_hygiene, date));
      }

      // 11. Land Matters Sheet
      if (entry.land_matters?.length > 0) {
        landData.push(...processArrayData(entry.land_matters, date));
      }

      // 12. Defense Land Survey Sheet
      if (entry.defense_land_survey) {
        const { defense_land_survey } = entry;
        if (defense_land_survey.observations?.length > 0) {
          defense_land_survey.observations.forEach((obs) => {
            defenseDataRows.push({
              Date: date,
              Text: defense_land_survey.text,
              RP_Present: defense_land_survey.RP ? "Yes" : "No",
              QM_Present: defense_land_survey.QM ? "Yes" : "No",
              Observation: obs.text,
            });
          });
        } else {
          defenseDataRows.push({
            Date: date,
            Text: defense_land_survey.text,
            RP_Present: defense_land_survey.RP ? "Yes" : "No",
            QM_Present: defense_land_survey.QM ? "Yes" : "No",
            Observation: "",
          });
        }
      }

      // 13. Quarter Guard & Kote Sheet
      if (entry.quarter_gd_kote?.quarterGdKoteRows?.length > 0) {
        quarterData.push(
          ...processArrayData(entry.quarter_gd_kote.quarterGdKoteRows, date)
        );
      }

      // 14. AMN Magazine Sheet
      if (entry.amn_magazine?.amnMagazineRows?.length > 0) {
        entry.amn_magazine.amnMagazineRows.forEach((row) => {
          amnData.push({
            Date: date,
            Text: entry.amn_magazine.text,
            CheckDate: entry.amn_magazine.amnMagazineCheckDate,
            ...row,
          });
        });
      }

      // 15. CSD Checks Sheet
      const { csd_items, card_items } = entry.csd_checks;
      for (const key in csd_items) {
        csdData.push({
          Date: date,
          Category: "CSD Items",
          Value: csd_items[key],
        });
      }
      for (const key in card_items) {
        csdData.push({
          Date: date,
          Category: "Liquor/Grocery Card",
          Value: card_items[key],
        });
      }

      // 16. TSS Sheet
      if (entry.tss?.columns?.length > 0) {
        entry.tss.columns.forEach((column) => {
          tssData.push({
            Date: date,
            Text: entry.tss.text,
            ...column,
          });
        });
      }

      // 17. Security Measures Sheet
      securityData.push({
        Date: date,
        Text: entry.security_measures.text,
        CheckTime: entry.security_measures.checkTime,
        Measures: entry.security_measures.measures
          .map((m) => `${m.text}: ${m.check ? "Yes" : "No"} - ${m.observation}`)
          .join("; "),
      });

      // 18. CCTV Locations Sheet
      if (entry.cctv_locations?.length > 0) {
        cctvData.push(...processArrayData(entry.cctv_locations, date));
      }

      // 19. Devlali Visit Sheet
      if (entry.devlali_visit?.observations?.length > 0) {
        entry.devlali_visit.observations.forEach((obs) => {
          devlaliData.push({
            Date: date,
            Time: entry.devlali_visit.time,
            Observation: obs.text,
          });
        });
      }

      // 20. Roll Call Sheet
      rollCallData.push({
        Date: date,
        AttendanceMessage: `I have attended the Roll Call at ${date}`,
        ...flattenObject(entry.roll_call),
      });

      // 21. Sale of CSD Sheet
      saleData.push({
        Date: date,
        ...flattenObject(entry.sale_of_csd),
      });

      // 22. QTR Visit Sheet
      if (entry.qtr_visit?.length > 0) {
        qtrData.push(...processArrayData(entry.qtr_visit, date));
      }

      // 23. Mobile Check Sheet
      if (entry.mobileCheckRows?.length > 0) {
        mobileData.push(...processArrayData(entry.mobileCheckRows, date));
      }

      // 24. Liquor Issue Sheet
      liquorData.push({
        Date: date,
        text: "I have supervised the Rum issue & have these to report",
        ...flattenObject(entry.liquorIssue),
      });

      // 25. Improvement in Workshop Tech Sheet
      if (entry.improvement_in_wksp_tech?.length > 0) {
        improvementData.push(
          ...processArrayData(entry.improvement_in_wksp_tech, date)
        );
      }

      // 26. Awareness Sheet
      awarenessData.push({
        Date: date,
        ...flattenObject(entry.awareness),
      });

      // 27. Handover Duties Sheet
      handoverData.push({
        Date: date,
        text: "I am handling over mu duties to",
        ...flattenObject(entry.handoverDuties),
      });
    });

    // Create sheets with aggregated data
    if (dutyHandoverData.length > 0) {
      const dutyHandoverSheet = XLSX.utils.json_to_sheet(dutyHandoverData);
      XLSX.utils.book_append_sheet(wb, dutyHandoverSheet, "duty_handover");
    }

    if (guardDetailsData.length > 0) {
      const guardDetailsSheet = XLSX.utils.json_to_sheet(guardDetailsData);
      XLSX.utils.book_append_sheet(wb, guardDetailsSheet, "guard_details");
    }

    if (mtBriefingData.length > 0) {
      const mtBriefingSheet = XLSX.utils.json_to_sheet(mtBriefingData);
      XLSX.utils.book_append_sheet(wb, mtBriefingSheet, "mt_briefing");
    }

    if (guardCheckData.length > 0) {
      const guardCheckSheet = XLSX.utils.json_to_sheet(guardCheckData);
      XLSX.utils.book_append_sheet(wb, guardCheckSheet, "guard_check");
    }

    if (officeSealingData.length > 0) {
      const officeSealingSheet = XLSX.utils.json_to_sheet(officeSealingData);
      XLSX.utils.book_append_sheet(wb, officeSealingSheet, "office_sealing");
    }

    if (rationCheckData.length > 0) {
      const rationCheckSheet = XLSX.utils.json_to_sheet(rationCheckData);
      XLSX.utils.book_append_sheet(wb, rationCheckSheet, "ration_check");
    }

    if (cookHouseData.length > 0) {
      const cookHouseSheet = XLSX.utils.json_to_sheet(cookHouseData);
      XLSX.utils.book_append_sheet(wb, cookHouseSheet, "cook_houses");
    }

    if (fireEquipData.length > 0) {
      const fireEquipSheet = XLSX.utils.json_to_sheet(fireEquipData);
      XLSX.utils.book_append_sheet(wb, fireEquipSheet, "fire_equipment");
    }

    if (foodData.length > 0) {
      const foodSheet = XLSX.utils.json_to_sheet(foodData);
      XLSX.utils.book_append_sheet(wb, foodSheet, "food_tasting");
    }

    if (healthData.length > 0) {
      const healthSheet = XLSX.utils.json_to_sheet(healthData);
      XLSX.utils.book_append_sheet(wb, healthSheet, "health_hygiene");
    }

    if (landData.length > 0) {
      const landSheet = XLSX.utils.json_to_sheet(landData);
      XLSX.utils.book_append_sheet(wb, landSheet, "land_matters");
    }

    if (defenseDataRows.length > 0) {
      const defenseSheet = XLSX.utils.json_to_sheet(defenseDataRows);
      XLSX.utils.book_append_sheet(wb, defenseSheet, "defense_land_survey");
    }

    if (quarterData.length > 0) {
      const quarterSheet = XLSX.utils.json_to_sheet(quarterData);
      XLSX.utils.book_append_sheet(wb, quarterSheet, "quarter_guard_kote");
    }

    if (amnData.length > 0) {
      const amnSheet = XLSX.utils.json_to_sheet(amnData);
      XLSX.utils.book_append_sheet(wb, amnSheet, "amn_magazine");
    }

    if (csdData.length > 0) {
      const csdSheet = XLSX.utils.json_to_sheet(csdData);
      XLSX.utils.book_append_sheet(wb, csdSheet, "csd_checks");
    }

    if (tssData.length > 0) {
      const tssSheet = XLSX.utils.json_to_sheet(tssData);
      XLSX.utils.book_append_sheet(wb, tssSheet, "tss");
    }

    if (securityData.length > 0) {
      const securitySheet = XLSX.utils.json_to_sheet(securityData);
      XLSX.utils.book_append_sheet(wb, securitySheet, "security_measures");
    }

    if (cctvData.length > 0) {
      const cctvSheet = XLSX.utils.json_to_sheet(cctvData);
      XLSX.utils.book_append_sheet(wb, cctvSheet, "cctv_locations");
    }

    if (devlaliData.length > 0) {
      const devlaliSheet = XLSX.utils.json_to_sheet(devlaliData);
      XLSX.utils.book_append_sheet(wb, devlaliSheet, "devlali_visit");
    }

    if (rollCallData.length > 0) {
      const rollCallSheet = XLSX.utils.json_to_sheet(rollCallData);
      XLSX.utils.book_append_sheet(wb, rollCallSheet, "roll_call");
    }

    if (saleData.length > 0) {
      const saleSheet = XLSX.utils.json_to_sheet(saleData);
      XLSX.utils.book_append_sheet(wb, saleSheet, "sale_of_csd");
    }

    if (qtrData.length > 0) {
      const qtrSheet = XLSX.utils.json_to_sheet(qtrData);
      XLSX.utils.book_append_sheet(wb, qtrSheet, "qtr_visit");
    }

    if (mobileData.length > 0) {
      const mobileSheet = XLSX.utils.json_to_sheet(mobileData);
      XLSX.utils.book_append_sheet(wb, mobileSheet, "mobile_check");
    }

    if (liquorData.length > 0) {
      const liquorSheet = XLSX.utils.json_to_sheet(liquorData);
      XLSX.utils.book_append_sheet(wb, liquorSheet, "liquor_issue");
    }

    if (improvementData.length > 0) {
      const improvementSheet = XLSX.utils.json_to_sheet(improvementData);
      XLSX.utils.book_append_sheet(
        wb,
        improvementSheet,
        "improvement_in_workshop"
      );
    }

    if (awarenessData.length > 0) {
      const awarenessSheet = XLSX.utils.json_to_sheet(awarenessData);
      XLSX.utils.book_append_sheet(wb, awarenessSheet, "awareness");
    }

    if (handoverData.length > 0) {
      const handoverSheet = XLSX.utils.json_to_sheet(handoverData);
      XLSX.utils.book_append_sheet(wb, handoverSheet, "handover_duties");
    }

    // Convert workbook to base64
    const wbOut = XLSX.write(wb, { type: "base64", bookType: "xlsx" });

    // Write to a temporary file
    await FileSystem.writeAsStringAsync(fileUri, wbOut, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Share the file
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri, {
        mimeType:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        dialogTitle: "Export Daily Report",
      });
    } else {
      alert("Sharing is not available on this platform");
    }

    alert("Excel file created and ready to export!");
  } catch (error) {
    alert("Error creating Excel file, Contact the maker!");
    console.log(error);
  }
};

export default createAndAppendExcel;
