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

const processArrayData = (arrayData, dutyStartDate, dutyEndDate) => {
  return arrayData.map((item) => ({
    dutyStartDate: dutyStartDate,
    dutyEndDate: dutyEndDate,
    ...flattenObject(item),
  }));
};

export const createAndAppendExcel = async () => {
  try {
    alert("Please Wait, creating the excel which could take time");

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
      const { dutyStartDate, dutyEndDate } = entry;

      // 1. Duty Handover Sheet
      dutyHandoverData.push({
        dutyStartDate: dutyStartDate,
        dutyEndDate: dutyEndDate,
        ...flattenObject(entry.duty_handover || {}),
      });

      // 2. Guard Details Sheet
      guardDetailsData.push({
        dutyStartDate: dutyStartDate,
        dutyEndDate: dutyEndDate,
        ...flattenObject(entry.guard_details || {}),
      });

      // 3. MT Briefing Sheet
      if (entry.mt_briefing?.mtStrengthFields?.length > 0) {
        entry.mt_briefing.mtStrengthFields.forEach((field) => {
          mtBriefingData.push({
            dutyStartDate: dutyStartDate,
            dutyEndDate: dutyEndDate,
            Text: "I mounted the kote guard and found",
            Time: entry.mt_briefing.mt_time,
            Strength: entry.mt_briefing.mt_strength,
            ...field,
          });
        });
      } else {
        mtBriefingData.push({
          dutyStartDate: dutyStartDate,
          dutyEndDate: dutyEndDate,
          Text: "I mounted the kote guard and found",
          Time: "",
          Strength: "",
        });
      }

      // 4. Guard Check Sheet
      guardCheckData.push(
        ...processArrayData(entry.guard_check || [], dutyStartDate, dutyEndDate)
      );

      // 5. Office Sealing Sheet
      officeSealingData.push({
        dutyStartDate: dutyStartDate,
        dutyEndDate: dutyEndDate,
        ...flattenObject(entry.office_sealing || {}),
      });

      // 6. Ration Check Sheet
      rationCheckData.push({
        dutyStartDate: dutyStartDate,
        dutyEndDate: dutyEndDate,
        ...flattenObject(entry.ration_check || {}),
      });

      // 7. Cook Houses Sheet
      if (entry.cookHouseObservations?.length > 0) {
        entry.cookHouseObservations.forEach((obs) => {
          cookHouseData.push({
            dutyStartDate: dutyStartDate,
            dutyEndDate: dutyEndDate,
            CookHouse: obs.cook_house,
            AppliancesStatus: obs.appliances_status,
            StaffDetails: obs.staff_details,
          });
        });
      } else {
        cookHouseData.push({
          dutyStartDate: dutyStartDate,
          dutyEndDate: dutyEndDate,
          CookHouse: "",
          AppliancesStatus: "",
          StaffDetails: "",
        });
      }

      // 8. Fire Equipment Check Sheet
      fireEquipData.push(
        ...processArrayData(
          entry.fire_equipment_check || [],
          dutyStartDate,
          dutyEndDate
        )
      );

      // 9. Food Tasting Sheet
      foodData.push(
        ...processArrayData(entry.foodTasting || [], dutyStartDate, dutyEndDate)
      );

      // 10. Health and Hygiene Sheet
      healthData.push(
        ...processArrayData(
          entry.health_hygiene || [],
          dutyStartDate,
          dutyEndDate
        )
      );

      // 11. Land Matters Sheet
      landData.push(
        ...processArrayData(
          entry.land_matters || [],
          dutyStartDate,
          dutyEndDate
        )
      );

      // 12. Defense Land Survey Sheet
      if (entry.defense_land_survey) {
        const { defense_land_survey } = entry;
        if (defense_land_survey.observations?.length > 0) {
          defense_land_survey.observations.forEach((obs) => {
            defenseDataRows.push({
              dutyStartDate: dutyStartDate,
              dutyEndDate: dutyEndDate,
              Text: defense_land_survey.text,
              RP_Present: defense_land_survey.RP ? "Yes" : "No",
              QM_Present: defense_land_survey.QM ? "Yes" : "No",
              Observation: obs.text,
            });
          });
        } else {
          defenseDataRows.push({
            dutyStartDate: dutyStartDate,
            dutyEndDate: dutyEndDate,
            Text: defense_land_survey.text,
            RP_Present: defense_land_survey.RP ? "Yes" : "No",
            QM_Present: defense_land_survey.QM ? "Yes" : "No",
            Observation: "",
          });
        }
      } else {
        defenseDataRows.push({
          dutyStartDate: dutyStartDate,
          dutyEndDate: dutyEndDate,
          Text: "",
          RP_Present: "",
          QM_Present: "",
          Observation: "",
        });
      }

      // 13. Quarter Guard & Kote Sheet
      quarterData.push(
        ...processArrayData(
          entry.quarter_gd_kote?.quarterGdKoteRows || [],
          dutyStartDate,
          dutyEndDate
        )
      );

      // 14. AMN Magazine Sheet
      if (entry.amn_magazine?.amnMagazineRows?.length > 0) {
        entry.amn_magazine.amnMagazineRows.forEach((row) => {
          amnData.push({
            dutyStartDate: dutyStartDate,
            dutyEndDate: dutyEndDate,
            Text: entry.amn_magazine.text,
            CheckDate: entry.amn_magazine.amnMagazineCheckDate,
            ...row,
          });
        });
      } else {
        amnData.push({
          dutyStartDate: dutyStartDate,
          dutyEndDate: dutyEndDate,
          Text: "",
          CheckDate: "",
        });
      }

      // 15. CSD Checks Sheet
      const { csd_items = {}, card_items = {} } = entry.csd_checks || {};
      for (const key in csd_items) {
        csdData.push({
          dutyStartDate: dutyStartDate,
          dutyEndDate: dutyEndDate,
          Category: "CSD Items",
          Value: csd_items[key],
        });
      }
      for (const key in card_items) {
        csdData.push({
          dutyStartDate: dutyStartDate,
          dutyEndDate: dutyEndDate,
          Category: "Liquor/Grocery Card",
          Value: card_items[key],
        });
      }

      // 16. TSS Sheet
      if (entry.tss?.columns?.length > 0) {
        entry.tss.columns.forEach((column) => {
          tssData.push({
            dutyStartDate: dutyStartDate,
            dutyEndDate: dutyEndDate,
            Text: entry.tss.text,
            ...column,
          });
        });
      } else {
        tssData.push({
          dutyStartDate: dutyStartDate,
          dutyEndDate: dutyEndDate,
          Text: "",
        });
      }

      // 17. Security Measures Sheet
      securityData.push({
        dutyStartDate: dutyStartDate,
        dutyEndDate: dutyEndDate,
        Text: entry.security_measures?.text || "",
        CheckTime: entry.security_measures?.checkTime || "",
        Measures:
          entry.security_measures?.measures
            ?.map(
              (m) => `${m.text}: ${m.check ? "Yes" : "No"} - ${m.observation}`
            )
            ?.join("; ") || "",
      });

      // 18. CCTV Locations Sheet
      cctvData.push(
        ...processArrayData(
          entry.cctv_locations || [],
          dutyStartDate,
          dutyEndDate
        )
      );

      // 19. Devlali Visit Sheet
      if (entry.devlali_visit?.observations?.length > 0) {
        entry.devlali_visit.observations.forEach((obs) => {
          devlaliData.push({
            dutyStartDate: dutyStartDate,
            dutyEndDate: dutyEndDate,
            Time: entry.devlali_visit.time,
            Observation: obs.text,
          });
        });
      } else {
        devlaliData.push({
          dutyStartDate: dutyStartDate,
          dutyEndDate: dutyEndDate,
          Time: "",
          Observation: "",
        });
      }

      // 20. Roll Call Sheet
      rollCallData.push({
        dutyStartDate: dutyStartDate,
        dutyEndDate: dutyEndDate,
        AttendanceMessage: `I have attended the Roll Call at ${
          (dutyStartDate, dutyEndDate)
        }`,
        ...flattenObject(entry.roll_call || {}),
      });

      // 21. Sale of CSD Sheet
      saleData.push({
        dutyStartDate: dutyStartDate,
        dutyEndDate: dutyEndDate,
        ...flattenObject(entry.sale_of_csd || {}),
      });

      // 22. QTR Visit Sheet
      qtrData.push(
        ...processArrayData(entry.qtr_visit || [], dutyStartDate, dutyEndDate)
      );

      // 23. Mobile Check Sheet
      mobileData.push(
        ...processArrayData(
          entry.mobileCheckRows || [],
          dutyStartDate,
          dutyEndDate
        )
      );

      // 24. Liquor Issue Sheet
      liquorData.push({
        dutyStartDate: dutyStartDate,
        dutyEndDate: dutyEndDate,
        text: "I have supervised the Rum issue & have these to report",
        ...flattenObject(entry.liquorIssue || {}),
      });

      // 25. Improvement in Workshop Tech Sheet
      improvementData.push(
        ...processArrayData(
          entry.improvement_in_wksp_tech || [],
          dutyStartDate,
          dutyEndDate
        )
      );

      // 26. Awareness Sheet
      awarenessData.push({
        dutyStartDate: dutyStartDate,
        dutyEndDate: dutyEndDate,
        ...flattenObject(entry.awareness || {}),
      });

      // 27. Handover Duties Sheet
      handoverData.push({
        dutyStartDate: dutyStartDate,
        dutyEndDate: dutyEndDate,
        text: "I am handling over my duties to",
        ...flattenObject(entry.handoverDuties || {}),
      });
    });

    // Create sheets with aggregated data
    const dutyHandoverSheet = XLSX.utils.json_to_sheet(dutyHandoverData);
    XLSX.utils.book_append_sheet(wb, dutyHandoverSheet, "duty_handover");

    const guardDetailsSheet = XLSX.utils.json_to_sheet(guardDetailsData);
    XLSX.utils.book_append_sheet(wb, guardDetailsSheet, "guard_details");

    const mtBriefingSheet = XLSX.utils.json_to_sheet(mtBriefingData);
    XLSX.utils.book_append_sheet(wb, mtBriefingSheet, "mt_briefing");

    const guardCheckSheet = XLSX.utils.json_to_sheet(guardCheckData);
    XLSX.utils.book_append_sheet(wb, guardCheckSheet, "guard_check");

    const officeSealingSheet = XLSX.utils.json_to_sheet(officeSealingData);
    XLSX.utils.book_append_sheet(wb, officeSealingSheet, "office_sealing");

    const rationCheckSheet = XLSX.utils.json_to_sheet(rationCheckData);
    XLSX.utils.book_append_sheet(wb, rationCheckSheet, "ration_check");

    const cookHouseSheet = XLSX.utils.json_to_sheet(cookHouseData);
    XLSX.utils.book_append_sheet(wb, cookHouseSheet, "cook_houses");

    const fireEquipSheet = XLSX.utils.json_to_sheet(fireEquipData);
    XLSX.utils.book_append_sheet(wb, fireEquipSheet, "fire_equipment");

    const foodSheet = XLSX.utils.json_to_sheet(foodData);
    XLSX.utils.book_append_sheet(wb, foodSheet, "food_tasting");

    const healthSheet = XLSX.utils.json_to_sheet(healthData);
    XLSX.utils.book_append_sheet(wb, healthSheet, "health_hygiene");

    const landSheet = XLSX.utils.json_to_sheet(landData);
    XLSX.utils.book_append_sheet(wb, landSheet, "land_matters");

    const defenseSheet = XLSX.utils.json_to_sheet(defenseDataRows);
    XLSX.utils.book_append_sheet(wb, defenseSheet, "defense_land_survey");

    const quarterSheet = XLSX.utils.json_to_sheet(quarterData);
    XLSX.utils.book_append_sheet(wb, quarterSheet, "quarter_guard_kote");

    const amnSheet = XLSX.utils.json_to_sheet(amnData);
    XLSX.utils.book_append_sheet(wb, amnSheet, "amn_magazine");

    const csdSheet = XLSX.utils.json_to_sheet(csdData);
    XLSX.utils.book_append_sheet(wb, csdSheet, "csd_checks");

    const tssSheet = XLSX.utils.json_to_sheet(tssData);
    XLSX.utils.book_append_sheet(wb, tssSheet, "tss");

    const securitySheet = XLSX.utils.json_to_sheet(securityData);
    XLSX.utils.book_append_sheet(wb, securitySheet, "security_measures");

    const cctvSheet = XLSX.utils.json_to_sheet(cctvData);
    XLSX.utils.book_append_sheet(wb, cctvSheet, "cctv_locations");

    const devlaliSheet = XLSX.utils.json_to_sheet(devlaliData);
    XLSX.utils.book_append_sheet(wb, devlaliSheet, "devlali_visit");

    const rollCallSheet = XLSX.utils.json_to_sheet(rollCallData);
    XLSX.utils.book_append_sheet(wb, rollCallSheet, "roll_call");

    const saleSheet = XLSX.utils.json_to_sheet(saleData);
    XLSX.utils.book_append_sheet(wb, saleSheet, "sale_of_csd");

    const qtrSheet = XLSX.utils.json_to_sheet(qtrData);
    XLSX.utils.book_append_sheet(wb, qtrSheet, "qtr_visit");

    const mobileSheet = XLSX.utils.json_to_sheet(mobileData);
    XLSX.utils.book_append_sheet(wb, mobileSheet, "mobile_check");

    const liquorSheet = XLSX.utils.json_to_sheet(liquorData);
    XLSX.utils.book_append_sheet(wb, liquorSheet, "liquor_issue");

    const improvementSheet = XLSX.utils.json_to_sheet(improvementData);
    XLSX.utils.book_append_sheet(
      wb,
      improvementSheet,
      "improvement_in_workshop"
    );

    const awarenessSheet = XLSX.utils.json_to_sheet(awarenessData);
    XLSX.utils.book_append_sheet(wb, awarenessSheet, "awareness");

    const handoverSheet = XLSX.utils.json_to_sheet(handoverData);
    XLSX.utils.book_append_sheet(wb, handoverSheet, "handover_duties");

    // Convert workbook to base64
    const wbOut = XLSX.write(wb, { type: "base64", bookType: "xlsx" });

    const permissions =
      await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

    if (!permissions.granted) {
      alert("Please allow access to save the file");
      return;
    }

    // Create and save the file in selected directory
    const uri = await FileSystem.StorageAccessFramework.createFileAsync(
      permissions.directoryUri,
      fileName,
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    await FileSystem.writeAsStringAsync(uri, wbOut, {
      encoding: FileSystem.EncodingType.Base64,
    });

    alert("File saved successfully!");

    // Share the file
    // if (await Sharing.isAvailableAsync()) {
    //   await Sharing.shareAsync(fileUri, {
    //     mimeType:
    //       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    //     dialogTitle: "Export Daily Report",
    //   });
    // } else {
    //   alert("Sharing is not available on this platform");
    // }
  } catch (error) {
    alert("Error creating Excel file, Contact the maker!");
    console.log(error);
  }
};

export default createAndAppendExcel;
