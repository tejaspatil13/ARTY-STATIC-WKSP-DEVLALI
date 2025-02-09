import * as FileSystem from "expo-file-system";
import XLSX from "xlsx";
import { shareAsync } from "expo-sharing";

const fileName = "Daily_Report.xlsx";
const fileUri = FileSystem.documentDirectory + fileName;
const downloadDirectory = FileSystem.documentDirectory + "Downloads/";

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

export const createAndAppendExcel = async (formData) => {
  try {
    const fileName = "Daily_Report.xlsx";
    const fileUri = FileSystem.documentDirectory + fileName;
    let wb;

    // Check if file exists
    const fileExists = await FileSystem.getInfoAsync(fileUri);

    if (fileExists.exists) {
      const existingFile = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      wb = XLSX.read(existingFile, { type: "base64" });
    } else {
      wb = XLSX.utils.book_new();
    }

    // Process each form data entry
    formData.forEach((entry) => {
      const { date } = entry;

      // 1. Duty Handover Sheet
      const dutyHandoverData = {
        Date: date,
        ...flattenObject(entry.duty_handover),
      };
      const dutyHandoverSheet =
        wb.Sheets["duty_handover"] ||
        XLSX.utils.json_to_sheet([dutyHandoverData]);
      if (!wb.Sheets["duty_handover"]) {
        XLSX.utils.book_append_sheet(wb, dutyHandoverSheet, "duty_handover");
      } else {
        XLSX.utils.sheet_add_json(dutyHandoverSheet, [dutyHandoverData], {
          skipHeader: true,
          origin: -1,
        });
      }

      // 2. Guard Details Sheet
      const guardDetailsData = {
        Date: date,
        ...flattenObject(entry.guard_details),
      };
      const guardDetailsSheet =
        wb.Sheets["guard_details"] ||
        XLSX.utils.json_to_sheet([guardDetailsData]);
      if (!wb.Sheets["guard_details"]) {
        XLSX.utils.book_append_sheet(wb, guardDetailsSheet, "guard_details");
      } else {
        XLSX.utils.sheet_add_json(guardDetailsSheet, [guardDetailsData], {
          skipHeader: true,
          origin: -1,
        });
      }

      // 3. MT Briefing Sheet
      if (entry.mt_briefing?.mtStrengthFields?.length > 0) {
        const mtBriefingData = processArrayData(
          entry.mt_briefing.mtStrengthFields,
          date
        );
        const mtBriefingSheet =
          wb.Sheets["mt_briefing"] || XLSX.utils.json_to_sheet(mtBriefingData);
        if (!wb.Sheets["mt_briefing"]) {
          XLSX.utils.book_append_sheet(wb, mtBriefingSheet, "mt_briefing");
        } else {
          XLSX.utils.sheet_add_json(mtBriefingSheet, mtBriefingData, {
            skipHeader: true,
            origin: -1,
          });
        }
      }

      // 4. Guard Check Sheet
      if (entry.guard_check?.length > 0) {
        const guardCheckData = processArrayData(entry.guard_check, date);
        const guardCheckSheet =
          wb.Sheets["guard_check"] || XLSX.utils.json_to_sheet(guardCheckData);
        if (!wb.Sheets["guard_check"]) {
          XLSX.utils.book_append_sheet(wb, guardCheckSheet, "guard_check");
        } else {
          XLSX.utils.sheet_add_json(guardCheckSheet, guardCheckData, {
            skipHeader: true,
            origin: -1,
          });
        }
      }

      // 5. Office Sealing Sheet
      const officeSealingData = {
        Date: date,
        ...flattenObject(entry.office_sealing),
      };
      const officeSealingSheet =
        wb.Sheets["office_sealing"] ||
        XLSX.utils.json_to_sheet([officeSealingData]);
      if (!wb.Sheets["office_sealing"]) {
        XLSX.utils.book_append_sheet(wb, officeSealingSheet, "office_sealing");
      } else {
        XLSX.utils.sheet_add_json(officeSealingSheet, [officeSealingData], {
          skipHeader: true,
          origin: -1,
        });
      }

      // 6. Ration Check Sheet
      const rationCheckData = {
        Date: date,
        ...flattenObject(entry.ration_check),
      };
      const rationCheckSheet =
        wb.Sheets["ration_check"] ||
        XLSX.utils.json_to_sheet([rationCheckData]);
      if (!wb.Sheets["ration_check"]) {
        XLSX.utils.book_append_sheet(wb, rationCheckSheet, "ration_check");
      } else {
        XLSX.utils.sheet_add_json(rationCheckSheet, [rationCheckData], {
          skipHeader: true,
          origin: -1,
        });
      }

      // 7. Cook Houses Sheet
      if (entry.cookHouseObservations?.length > 0) {
        const cookHouseData = processArrayData(
          entry.cookHouseObservations,
          date
        );
        const cookHouseSheet =
          wb.Sheets["cook_houses"] || XLSX.utils.json_to_sheet(cookHouseData);
        if (!wb.Sheets["cook_houses"]) {
          XLSX.utils.book_append_sheet(wb, cookHouseSheet, "cook_houses");
        } else {
          XLSX.utils.sheet_add_json(cookHouseSheet, cookHouseData, {
            skipHeader: true,
            origin: -1,
          });
        }
      }

      // 8. Fire Equipment Check Sheet
      if (entry.fire_equipment_check?.length > 0) {
        const fireEquipData = processArrayData(
          entry.fire_equipment_check,
          date
        );
        const fireEquipSheet =
          wb.Sheets["fire_equipment"] ||
          XLSX.utils.json_to_sheet(fireEquipData);
        if (!wb.Sheets["fire_equipment"]) {
          XLSX.utils.book_append_sheet(wb, fireEquipSheet, "fire_equipment");
        } else {
          XLSX.utils.sheet_add_json(fireEquipSheet, fireEquipData, {
            skipHeader: true,
            origin: -1,
          });
        }
      }

      // 9. Food Tasting Sheet
      if (entry.foodTasting?.length > 0) {
        const foodData = processArrayData(entry.foodTasting, date);
        const foodSheet =
          wb.Sheets["food_tasting"] || XLSX.utils.json_to_sheet(foodData);
        if (!wb.Sheets["food_tasting"]) {
          XLSX.utils.book_append_sheet(wb, foodSheet, "food_tasting");
        } else {
          XLSX.utils.sheet_add_json(foodSheet, foodData, {
            skipHeader: true,
            origin: -1,
          });
        }
      }

      // 10. Health and Hygiene Sheet
      if (entry.health_hygiene?.length > 0) {
        const healthData = processArrayData(entry.health_hygiene, date);
        const healthSheet =
          wb.Sheets["health_hygiene"] || XLSX.utils.json_to_sheet(healthData);
        if (!wb.Sheets["health_hygiene"]) {
          XLSX.utils.book_append_sheet(wb, healthSheet, "health_hygiene");
        } else {
          XLSX.utils.sheet_add_json(healthSheet, healthData, {
            skipHeader: true,
            origin: -1,
          });
        }
      }

      // 11. Land Matters Sheet
      if (entry.land_matters?.length > 0) {
        const landData = processArrayData(entry.land_matters, date);
        const landSheet =
          wb.Sheets["land_matters"] || XLSX.utils.json_to_sheet(landData);
        if (!wb.Sheets["land_matters"]) {
          XLSX.utils.book_append_sheet(wb, landSheet, "land_matters");
        } else {
          XLSX.utils.sheet_add_json(landSheet, landData, {
            skipHeader: true,
            origin: -1,
          });
        }
      }

      // 12. Defense Land Survey Sheet
      const defenseData = {
        Date: date,
        ...flattenObject(entry.defense_land_survey),
      };
      const defenseSheet =
        wb.Sheets["defense_land_survey"] ||
        XLSX.utils.json_to_sheet([defenseData]);
      if (!wb.Sheets["defense_land_survey"]) {
        XLSX.utils.book_append_sheet(wb, defenseSheet, "defense_land_survey");
      } else {
        XLSX.utils.sheet_add_json(defenseSheet, [defenseData], {
          skipHeader: true,
          origin: -1,
        });
      }

      // 13. Quarter Guard & Kote Sheet
      if (entry.quarter_gd_kote?.quarterGdKoteRows?.length > 0) {
        const quarterData = processArrayData(
          entry.quarter_gd_kote.quarterGdKoteRows,
          date
        );
        const quarterSheet =
          wb.Sheets["quarter_guard_kote"] ||
          XLSX.utils.json_to_sheet(quarterData);
        if (!wb.Sheets["quarter_guard_kote"]) {
          XLSX.utils.book_append_sheet(wb, quarterSheet, "quarter_guard_kote");
        } else {
          XLSX.utils.sheet_add_json(quarterSheet, quarterData, {
            skipHeader: true,
            origin: -1,
          });
        }
      }

      // 14. AMN Magazine Sheet
      if (entry.amn_magazine?.amnMagazineRows?.length > 0) {
        const amnData = processArrayData(
          entry.amn_magazine.amnMagazineRows,
          date
        );
        const amnSheet =
          wb.Sheets["amn_magazine"] || XLSX.utils.json_to_sheet(amnData);
        if (!wb.Sheets["amn_magazine"]) {
          XLSX.utils.book_append_sheet(wb, amnSheet, "amn_magazine");
        } else {
          XLSX.utils.sheet_add_json(amnSheet, amnData, {
            skipHeader: true,
            origin: -1,
          });
        }
      }

      // 15. CSD Checks Sheet
      const csdData = [];
      const { csd_items, card_items } = entry.csd_checks;

      // Add rows for csd_items
      for (const key in csd_items) {
        csdData.push({
          Date: date,
          Category: "CSD Items",
          Value: csd_items[key],
        });
      }

      // Add rows for card_items (this loop should be outside the csd_items loop)
      for (const key in card_items) {
        csdData.push({
          Date: date,
          Category: "Liquor/Grocery Card",
          Value: card_items[key],
        });
      }

      // Create or append the csd checks sheet
      const csdSheet =
        wb.Sheets["csd_checks"] || XLSX.utils.json_to_sheet(csdData);

      if (!wb.Sheets["csd_checks"]) {
        // Create the sheet if it doesn't exist
        XLSX.utils.book_append_sheet(wb, csdSheet, "csd_checks");
      } else {
        // If the sheet exists, append the new data
        XLSX.utils.sheet_add_json(csdSheet, csdData, {
          skipHeader: true,
          origin: -1,
        });
      }

      // 16. TSS Sheet
      if (entry.tss?.columns?.length > 0) {
        const tssData = processArrayData(entry.tss.columns, date);
        const tssSheet = wb.Sheets["tss"] || XLSX.utils.json_to_sheet(tssData);
        if (!wb.Sheets["tss"]) {
          XLSX.utils.book_append_sheet(wb, tssSheet, "tss");
        } else {
          XLSX.utils.sheet_add_json(tssSheet, tssData, {
            skipHeader: true,
            origin: -1,
          });
        }
      }

      // 17. Security Measures Sheet
      const securityData = {
        Date: date,
        ...flattenObject(entry.security_measures),
      };
      const securitySheet =
        wb.Sheets["security_measures"] ||
        XLSX.utils.json_to_sheet([securityData]);
      if (!wb.Sheets["security_measures"]) {
        XLSX.utils.book_append_sheet(wb, securitySheet, "security_measures");
      } else {
        XLSX.utils.sheet_add_json(securitySheet, [securityData], {
          skipHeader: true,
          origin: -1,
        });
      }

      // 18. CCTV Locations Sheet
      if (entry.cctv_locations?.length > 0) {
        const cctvData = processArrayData(entry.cctv_locations, date);
        const cctvSheet =
          wb.Sheets["cctv_locations"] || XLSX.utils.json_to_sheet(cctvData);
        if (!wb.Sheets["cctv_locations"]) {
          XLSX.utils.book_append_sheet(wb, cctvSheet, "cctv_locations");
        } else {
          XLSX.utils.sheet_add_json(cctvSheet, cctvData, {
            skipHeader: true,
            origin: -1,
          });
        }
      }

      // 19. Devlali Visit Sheet
      const devlaliData = {
        Date: date,
        ...flattenObject(entry.devlali_visit),
      };
      const devlaliSheet =
        wb.Sheets["devlali_visit"] || XLSX.utils.json_to_sheet([devlaliData]);
      if (!wb.Sheets["devlali_visit"]) {
        XLSX.utils.book_append_sheet(wb, devlaliSheet, "devlali_visit");
      } else {
        XLSX.utils.sheet_add_json(devlaliSheet, [devlaliData], {
          skipHeader: true,
          origin: -1,
        });
      }

      // 20. Roll Call Sheet
      const rollCallData = {
        Date: date,
        AttendanceMessage: `I have attended the Roll Call at ${date}`, // Add the custom text with date
        ...flattenObject(entry.roll_call),
      };

      const rollCallSheet =
        wb.Sheets["roll_call"] || XLSX.utils.json_to_sheet([rollCallData]);

      if (!wb.Sheets["roll_call"]) {
        // Create the sheet if it doesn't exist
        XLSX.utils.book_append_sheet(wb, rollCallSheet, "roll_call");
      } else {
        // If the sheet exists, append the new data
        XLSX.utils.sheet_add_json(rollCallSheet, [rollCallData], {
          skipHeader: true,
          origin: -1,
        });
      }

      // 21. Sale of CSD Sheet
      const saleData = {
        Date: date,
        ...flattenObject(entry.sale_of_csd),
      };
      const saleSheet =
        wb.Sheets["sale_of_csd"] || XLSX.utils.json_to_sheet([saleData]);
      if (!wb.Sheets["sale_of_csd"]) {
        XLSX.utils.book_append_sheet(wb, saleSheet, "sale_of_csd");
      } else {
        XLSX.utils.sheet_add_json(saleSheet, [saleData], {
          skipHeader: true,
          origin: -1,
        });
      }

      // 22. QTR Visit Sheet
      if (entry.qtr_visit?.length > 0) {
        const qtrData = processArrayData(entry.qtr_visit, date);
        const qtrSheet =
          wb.Sheets["qtr_visit"] || XLSX.utils.json_to_sheet(qtrData);
        if (!wb.Sheets["qtr_visit"]) {
          XLSX.utils.book_append_sheet(wb, qtrSheet, "qtr_visit");
        } else {
          XLSX.utils.sheet_add_json(qtrSheet, qtrData, {
            skipHeader: true,
            origin: -1,
          });
        }
      }

      // 23. Mobile Check Sheet
      if (entry.mobileCheckRows?.length > 0) {
        const mobileData = processArrayData(entry.mobileCheckRows, date);
        const mobileSheet =
          wb.Sheets["mobile_check"] || XLSX.utils.json_to_sheet(mobileData);
        if (!wb.Sheets["mobile_check"]) {
          XLSX.utils.book_append_sheet(wb, mobileSheet, "mobile_check");
        } else {
          XLSX.utils.sheet_add_json(mobileSheet, mobileData, {
            skipHeader: true,
            origin: -1,
          });
        }
      }

      // 24. Liquor Issue Sheet
      const liquorData = {
        Date: date,
        text: "I have supervised the Rum issue & have these to report",
        ...flattenObject(entry.liquorIssue),
      };
      const liquorSheet =
        wb.Sheets["liquor_issue"] || XLSX.utils.json_to_sheet([liquorData]);
      if (!wb.Sheets["liquor_issue"]) {
        XLSX.utils.book_append_sheet(wb, liquorSheet, "liquor_issue");
      } else {
        XLSX.utils.sheet_add_json(liquorSheet, [liquorData], {
          skipHeader: true,
          origin: -1,
        });
      }

      // 25. Improvement in Workshop Tech Sheet
      if (entry.improvement_in_wksp_tech?.length > 0) {
        const improvementData = processArrayData(
          entry.improvement_in_wksp_tech,
          date
        );
        const improvementSheet =
          wb.Sheets["improvement_in_workshop"] ||
          XLSX.utils.json_to_sheet(improvementData);
        if (!wb.Sheets["improvement_in_workshop"]) {
          XLSX.utils.book_append_sheet(
            wb,
            improvementSheet,
            "improvement_in_workshop"
          );
        } else {
          XLSX.utils.sheet_add_json(improvementSheet, improvementData, {
            skipHeader: true,
            origin: -1,
          });
        }
      }

      // 26. Awareness Sheet
      const awarenessData = {
        Date: date,
        ...flattenObject(entry.awareness),
      };
      const awarenessSheet =
        wb.Sheets["awareness"] || XLSX.utils.json_to_sheet([awarenessData]);
      if (!wb.Sheets["awareness"]) {
        XLSX.utils.book_append_sheet(wb, awarenessSheet, "awareness");
      } else {
        XLSX.utils.sheet_add_json(awarenessSheet, [awarenessData], {
          skipHeader: true,
          origin: -1,
        });
      }

      // 27. Handover Duties Sheet
      const handoverData = {
        Date: date,
        text: "I am handling over mu duties to",
        ...flattenObject(entry.handoverDuties),
      };
      const handoverSheet =
        wb.Sheets["handover_duties"] ||
        XLSX.utils.json_to_sheet([handoverData]);
      if (!wb.Sheets["handover_duties"]) {
        XLSX.utils.book_append_sheet(wb, handoverSheet, "handover_duties");
      } else {
        XLSX.utils.sheet_add_json(handoverSheet, [handoverData], {
          skipHeader: true,
          origin: -1,
        });
      }
    });

    // Convert workbook to base64
    const wbOut = XLSX.write(wb, { type: "base64", bookType: "xlsx" });

    // Write to file
    await FileSystem.writeAsStringAsync(fileUri, wbOut, {
      encoding: FileSystem.EncodingType.Base64,
    });

    console.log("Excel file updated successfully with all 27 sheets:", fileUri);

    // Save the file to the Downloads folder
    await FileSystem.makeDirectoryAsync(downloadDirectory, {
      intermediates: true,
    }); // Ensure Downloads directory exists
    const downloadFileUri = downloadDirectory + fileName; // Full path for Downloads folder
    await FileSystem.writeAsStringAsync(downloadFileUri, wbOut, {
      encoding: FileSystem.EncodingType.Base64,
    });

    console.log("Excel file saved to Downloads folder:", downloadFileUri);

    // Share the file
    await shareAsync(fileUri, {
      mimeType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
  } catch (error) {
    console.error("Error updating Excel file:", error);
    throw error;
  }
};

export default createAndAppendExcel;
