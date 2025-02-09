import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const EmptyFieldsPopup = ({ visible, onClose, emptyFields, addFunction }) => {
  function handleField(path) {
    // Helper function to check if a path matches a pattern with any array index
    const matchesPattern = (path, pattern) => {
      // Correct handling of array indices in both bracket and dot notation
      const regexPattern = pattern
        .replace(/\[\d+\]/g, "\\[\\d+\\]?") // Matches both "field[0]" and "field"
        .replace(/\.\d+\./g, "(\\.\\d+\\.)?"); // Matches both "field.0.subfield" and "field.subfield"
      return new RegExp(`^${regexPattern}$`).test(path);
    };

    // MT Briefing arrays
    if (matchesPattern(path, "mt_briefing.mtStrengthFields.\\d+.name")) {
      return "Handling MT briefing strength fields";
    }

    // Guard check arrays
    if (
      matchesPattern(path, "guard_check\\[\\d+\\]\\.guard") ||
      matchesPattern(path, "guard_check\\[\\d+\\]\\.dayInfo") ||
      matchesPattern(path, "guard_check\\[\\d+\\]\\.nightInfo")
    ) {
      return "Handling guard check field";
    }

    // Cookhouse observations arrays
    if (
      matchesPattern(path, "cookHouseObservations\\[\\d+\\]\\.cook_house") ||
      matchesPattern(
        path,
        "cookHouseObservations\\[\\d+\\]\\.appliances_status"
      ) ||
      matchesPattern(path, "cookHouseObservations\\[\\d+\\]\\.staff_details")
    ) {
      return "Handling cookhouse observations field";
    }

    // Fire equipment check arrays
    if (
      matchesPattern(path, "fire_equipment_check\\[\\d+\\]\\.location") ||
      matchesPattern(path, "fire_equipment_check\\[\\d+\\]\\.type") ||
      matchesPattern(path, "fire_equipment_check\\[\\d+\\]\\.status") ||
      matchesPattern(path, "fire_equipment_check\\[\\d+\\]\\.remarks")
    ) {
      return "Handling fire equipment check field";
    }

    // Food tasting arrays
    if (
      matchesPattern(path, "foodTasting\\[\\d+\\]\\.quality") ||
      matchesPattern(path, "foodTasting\\[\\d+\\]\\.improvement")
    ) {
      return "Handling food tasting field";
    }

    // Health hygiene arrays
    if (
      matchesPattern(path, "health_hygiene\\[\\d+\\]\\.observation") ||
      matchesPattern(path, "health_hygiene\\[\\d+\\]\\.remark")
    ) {
      return "Handling health hygiene field";
    }

    // Land matters arrays
    if (
      matchesPattern(path, "land_matters\\[\\d+\\]\\.location") ||
      matchesPattern(path, "land_matters\\[\\d+\\]\\.time") ||
      matchesPattern(path, "land_matters\\[\\d+\\]\\.remark")
    ) {
      return "Handling land matters field";
    }

    // Defense land survey arrays
    if (matchesPattern(path, "defense_land_survey.observations.\\d+.text")) {
      return "Handling defense land survey field";
    }

    // Quarter GD Kote arrays
    if (
      matchesPattern(path, "quarter_gd_kote.quarterGdKoteRows.\\d+.held") ||
      matchesPattern(path, "quarter_gd_kote.quarterGdKoteRows.\\d+.type") ||
      matchesPattern(path, "quarter_gd_kote.quarterGdKoteRows.\\d+.armsOut") ||
      matchesPattern(path, "quarter_gd_kote.quarterGdKoteRows.\\d+.armsIn") ||
      matchesPattern(path, "quarter_gd_kote.quarterGdKoteRows.\\d+.remarks")
    ) {
      return "Handling quarter GD kote field";
    }

    // Ammunition magazine arrays
    if (
      matchesPattern(path, "amn_magazine.amnMagazineRows.\\d+.amn") ||
      matchesPattern(path, "amn_magazine.amnMagazineRows.\\d+.firstLine") ||
      matchesPattern(path, "amn_magazine.amnMagazineRows.\\d+.secondLine") ||
      matchesPattern(path, "amn_magazine.amnMagazineRows.\\d+.trg") ||
      matchesPattern(
        path,
        "amn_magazine.amnMagazineRows.\\d+.usedCartridges"
      ) ||
      matchesPattern(path, "amn_magazine.amnMagazineRows.\\d+.remarks")
    ) {
      return "Handling ammunition magazine field";
    }

    // TSS columns arrays
    if (
      matchesPattern(path, "tss.columns.\\d+.item") ||
      matchesPattern(path, "tss.columns.\\d+.cat_part_no") ||
      matchesPattern(path, "tss.columns.\\d+.grnd_bal") ||
      matchesPattern(path, "tss.columns.\\d+.ledger_bal") ||
      matchesPattern(path, "tss.columns.\\d+.remarks")
    ) {
      return "Handling TSS field";
    }

    // CCTV locations arrays
    if (
      matchesPattern(path, "cctv_locations\\[\\d+\\]\\.location") ||
      matchesPattern(path, "cctv_locations\\[\\d+\\]\\.total") ||
      matchesPattern(path, "cctv_locations\\[\\d+\\]\\.serviceable") ||
      matchesPattern(path, "cctv_locations\\[\\d+\\]\\.unserviceable") ||
      matchesPattern(path, "cctv_locations\\[\\d+\\]\\.remarks")
    ) {
      return "Handling CCTV locations field";
    }

    // Devlali visit arrays
    if (matchesPattern(path, "devlali_visit.observations.\\d+.text")) {
      return "Handling Devlali visit observations field";
    }

    // Quarter visit arrays
    if (
      matchesPattern(path, "qtr_visit\\[\\d+\\]\\.qtr_no_and_location") ||
      matchesPattern(path, "qtr_visit\\[\\d+\\]\\.problem") ||
      matchesPattern(path, "qtr_visit\\[\\d+\\]\\.remarks")
    ) {
      return "Handling quarter visit field";
    }

    // Mobile check arrays
    if (
      matchesPattern(path, "mobileCheckRows\\[\\d+\\]\\.rank") ||
      matchesPattern(path, "mobileCheckRows\\[\\d+\\]\\.name") ||
      matchesPattern(path, "mobileCheckRows\\[\\d+\\]\\.makeAndType") ||
      matchesPattern(path, "mobileCheckRows\\[\\d+\\]\\.mobNo") ||
      matchesPattern(
        path,
        "mobileCheckRows\\[\\d+\\]\\.bannedAppAndPpoCalls"
      ) ||
      matchesPattern(path, "mobileCheckRows\\[\\d+\\]\\.remarks")
    ) {
      return "Handling mobile check field";
    }

    // Improvement in workshop tech arrays
    if (matchesPattern(path, "improvement_in_wksp_tech\\[\\d+\\]\\.point")) {
      return "Handling improvement in workshop tech field";
    }

    // Handle non-array fields with switch
    switch (path) {
      // Duty Handover
      case "duty_handover.jcNumber":
      case "duty_handover.rank":
      case "duty_handover.name":
      case "duty_handover.startTime":
      case "duty_handover.startDate":
      case "duty_handover.endTime":
      case "duty_handover.endDate":
      case "duty_handover.prevJCNumber":
      case "duty_handover.prevRank":
      case "duty_handover.prevName":
        return "Handling duty handover field";

      // Guard Details
      case "guard_details.koteGuardTime":
      case "guard_details.koteGuardFindings":
        return "Handling guard details field";

      // MT Briefing
      case "mt_briefing.mt_time":
      case "mt_briefing.mt_strength":
        return "Handling MT briefing field";

      // Office Sealing
      case "office_sealing.office_sealed_at":
      case "office_sealing.store_sealed_at":
        return "Handling office sealing field";

      // Ration Check
      case "ration_check.ration_observations":
        return "Handling ration check field";

      // CSD Checks - Static Fields
      case "csd_checks.csd_items.csdItem1":
      case "csd_checks.csd_items.csdItem2":
      case "csd_checks.csd_items.csdItem3":
      case "csd_checks.card_items.cardItem1":
      case "csd_checks.card_items.cardItem2":
      case "csd_checks.card_items.cardItem3":
        return "Handling CSD checks field";

      // Security Measures
      case "security_measures.checkTime":
        return "Handling security measures field";

      // Devlali Visit
      case "devlali_visit.time":
        return "Handling Devlali visit field";

      // Roll Call
      case "roll_call.location":
      case "roll_call.details":
        return "Handling roll call field";

      // Sale of CSD
      case "sale_of_csd.grocery_amount":
      case "sale_of_csd.liquor_amount":
        return "Handling sale of CSD field";

      // Liquor Issue
      case "liquorIssue.text":
        return "Handling liquor issue field";

      // Awareness
      case "awareness.rankAndName":
      case "awareness.unit":
      case "awareness.dutyOfficer":
      case "awareness.QRT_JCO":
      case "awareness.NCO":
        return "Handling awareness field";

      // Handover Duties
      case "handoverDuties.no":
      case "handoverDuties.rank":
      case "handoverDuties.name":
      case "handoverDuties.date":
      case "handoverDuties.time":
        return "Handling handover duties field";

      default:
        return "Unknown field: " + path;
    }
  }

  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Missing fields</Text>
          {emptyFields?.length === 0 ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <FlatList
              data={emptyFields}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Text style={styles.fieldText}>{`${handleField(
                  item.path
                )}`}</Text>
              )}
            />
          )}
          <View style={{ display: "flex", flexDirection: "row" }}>
            <TouchableOpacity style={styles.actionButton} onPress={addFunction}>
              <Text style={styles.buttonText}>Add Anyway</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={onClose}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    backgroundColor: "#34d399", // Green color
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5, // Small spacing between buttons
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    maxHeight: "80%",
    width: "70%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  fieldText: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: "center",
  },
});

export default EmptyFieldsPopup;
