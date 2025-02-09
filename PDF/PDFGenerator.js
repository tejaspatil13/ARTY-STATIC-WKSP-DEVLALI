import React, { useContext } from "react";
import { View, Button, Alert } from "react-native";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { FormContext } from "../utils/FormContext";

const PDFGenerator = () => {
  const { formData } = useContext(FormContext);
  const form = formData[0]; // Get first form entry

  const generatePDF = async () => {
    const htmlContent = `
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { text-align: center; }
          h2 { background-color: #f4f4f4; padding: 10px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
          th, td { border: 1px solid black; padding: 8px; text-align: left; }
          .blank { color: red; font-weight: bold; }
        </style>
      </head>
      <body>
        <h1>ARTY STATIC WKSP DEVLALI DUTY JCO FORM</h1>

        <p>
          1. I, JC <b>${form.duty_handover.jcNumber || "____"}</b>, Rank <b>${form.duty_handover.rank || "____"}</b>, 
          Name <b>${form.duty_handover.name || "____"}</b> was the duty JCO from <b>${form.duty_handover.startTime || "____"}</b> hrs, 
          on <b>${form.duty_handover.startDate || "____"}</b> to <b>${form.duty_handover.endTime || "____"}</b> hrs, on <b>${form.duty_handover.endDate || "____"}</b>. 
          I took over the duty from JC- <b>${form.duty_handover.prevJCNumber || "____"}</b>, Rank <b>${form.duty_handover.prevRank || "____"}</b>, 
          Name <b>${form.duty_handover.prevName || "____"}</b>.
        </p>

        <p>2. I mounted the Kote guard at <b>${form.guard_details.koteGuardTime || "____"}</b> and Found <b>${form.guard_details.koteGuardFindings || "____"}</b>.</p>

        <h2>3. MT Briefing</h2>
        <p>Time: <b>${form.mt_briefing.mt_time || "____"}</b></p>
        <p>Strength: <b>${form.mt_briefing.mt_strength || "____"}</b></p>
        <ul>
          ${form.mt_briefing.mtStrengthFields.map((field, index) => `<li>(${index + 1}) ${field.name || "____"}</li>`).join("")}
        </ul>

        <h2>4. Day/Night Guard Check Observations</h2>
        <table>
          <tr><th>Location</th><th>Day</th><th>Night</th></tr>
          ${form.guard_check.map(row => `
            <tr>
              <td>${row.guard || "____"}</td>
              <td>${row.dayInfo || "____"}</td>
              <td>${row.nightInfo || "____"}</td>
            </tr>
          `).join("")}
        </table>

        <h2>5. Office and Store Sealing</h2>
        <p>Office sealed at: <b>${form.office_sealing.office_sealed_at || "____"}</b></p>
        <p>Store sealed at: <b>${form.office_sealing.store_sealed_at || "____"}</b></p>

        <h2>6. Fresh/Dry Ration and Meat Check</h2>
        <p>Observations: <b>${form.ration_check.ration_observations || "____"}</b></p>

        <h2>7. Cook Houses - Serviceability of Appliances & Staff Adequacy</h2>
        <table>
          <tr><th>Cook House</th><th>Serviceability</th><th>Staff Adequacy</th></tr>
          ${form.cookHouseObservations.map(row => `
            <tr>
              <td>${row.cook_house || "____"}</td>
              <td>${row.appliances_status || "____"}</td>
              <td>${row.staff_details || "____"}</td>
            </tr>
          `).join("")}
        </table>

        <h2>8. Fire Fighting Equipment Check</h2>
        <table>
          <tr><th>Location</th><th>Type</th><th>Serviceability</th><th>Remarks</th></tr>
          ${form.fire_equipment_check.map(row => `
            <tr>
              <td>${row.location || "____"}</td>
              <td>${row.type || "____"}</td>
              <td>${row.status || "____"}</td>
              <td>${row.remarks || "____"}</td>
            </tr>
          `).join("")}
        </table>

        <h2>9. Food Tasting Observations</h2>
        <table>
          <tr><th>Cook House</th><th>Meal</th><th>Quality</th><th>Improvement</th></tr>
          ${form.foodTasting.map(row => `
            <tr>
              <td>${row.cookHouse || "____"}</td>
              <td>${row.meal || "____"}</td>
              <td>${row.quality || "____"}</td>
              <td>${row.improvement || "____"}</td>
            </tr>
          `).join("")}
        </table>

        <h2>10. Health & Hygiene Check</h2>
        <table>
          <tr><th>Aspect</th><th>Observations</th><th>Remarks</th></tr>
          ${form.health_hygiene.map(row => `
            <tr>
              <td>${row.field}</td>
              <td>${row.observation || "____"}</td>
              <td>${row.remark || "____"}</td>
            </tr>
          `).join("")}
        </table>

        <h2>27. Handing Over of Duties</h2>
        <p>No: <b>${form.handoverDuties.no || "____"}</b></p>
        <p>Rank: <b>${form.handoverDuties.rank || "____"}</b></p>
        <p>Name: <b>${form.handoverDuties.name || "____"}</b></p>
        <p>Time: <b>${form.handoverDuties.time || "____"}</b></p>
        <p>Date: <b>${form.handoverDuties.date || "____"}</b></p>

        <h2>Signature</h2>
        <p>Signature of Duty JCO: __________________</p>
        <p>Sub Maj: __________________</p>
        <p>Adjt: __________________</p>
        <p>21C: __________________</p>
        <p>Comdt: __________________</p>
      </body>
      </html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      console.log("PDF saved at:", uri);
      await Sharing.shareAsync(uri);
    } catch (error) {
      Alert.alert("Error", "Failed to generate PDF");
      console.error(error);
    }
  };

  return (
    <View style={{ margin: 20 }}>
      <Button title="Generate PDF" onPress={generatePDF} />
    </View>
  );
};

export default PDFGenerator;
