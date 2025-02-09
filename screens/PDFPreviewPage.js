
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from "react-native";
import { FormContext } from "../utils/FormContext";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { WebView } from "react-native-webview";
import { Ionicons } from '@expo/vector-icons';
import React, { useContext, useEffect } from "react";


const currentDate = new Date().toLocaleDateString("en-GB"); // Format: DD/MM/YYYY







const PDFPreviewPage = () => { ({ navigation }) => {


    useEffect(() => {
        navigation.setOptions({
          headerTitle: "Fire Equipment Check",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: "bold",
            color: "#333",
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Main")}
              style={styles.homeButton}
            >
              <Ionicons name="home" size={28} color="#000" />
            </TouchableOpacity>
          ),
        });
      }, [navigation]);
};
  const { formData } = useContext(FormContext);
  const form = formData[0] || {}; // Ensure form data exists

  // Generate HTML for PDF Preview
  const htmlContent = `
  <html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; padding: 20px; background-color: #f8f8f8; }
      .form-container { border: 3px solid black; padding: 20px; background: white; border-radius: 8px;; }
      h1 { text-align: center; text-transform: uppercase; border-bottom: 2px solid black; padding-bottom: 10px;  margin-bottom: 50px }
      h2 { background-color: #f4f4f4; padding: 10px; border: 1px solid black; }
      table { width: 100%; border-collapse: collapse; margin-bottom: 10px; border: 2px solid black; }
      th, td { border: 1px solid black; padding: 8px; text-align: left; }
      p { padding: 5px; font-size: 16px; }
      .bold { font-weight: bold; color: #000; }
      
    </style>
  </head>
  <body>
    <div class="form-container">
      <h1>DUTY JCO FORM</h1>
  
      <p>
        1. I, JC <b>${form.duty_handover.jcNumber || "____"}</b>, Rank <b>${form.duty_handover.rank || "____"}</b>, 
        Name <b>${form.duty_handover.name || "____"}</b> was the duty JCO from <b>${form.duty_handover.startTime || "____"}</b> hrs, 
        on <b>${form.duty_handover.startDate || "____"}</b> to <b>${form.duty_handover.endTime || "____"}</b> hrs, on <b>${form.duty_handover.endDate || "____"}</b>.
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




      <h2>11. Land Matters</h2>
<p>I checked the defence land as follows:</p>

<table>
  <tr>
    <th>Ser</th>
    <th>Location</th>
    <th>Time</th>
    <th>Remarks</th>
  </tr>
  <tr>
    <td>(a)</td>
    <td>Peer Baba Area checked on</td>
    <td>${form.land_matters?.[0]?.time || "____"}</td>
    <td>${form.land_matters?.[0]?.remark || "____"}</td>
  </tr>
  <tr>
    <td>(b)</td>
    <td>Deolali Railway Stn Area checked on</td>
    <td>${form.land_matters?.[1]?.time || "____"}</td>
    <td>${form.land_matters?.[1]?.remark || "____"}</td>
  </tr>
  <tr>
    <td>(c)</td>
    <td>Cantonment Bd to PT Ground Area checked on</td>
    <td>${form.land_matters?.[2]?.time || "____"}</td>
    <td>${form.land_matters?.[2]?.remark || "____"}</td>
  </tr>
  <tr>
    <td>(d)</td>
    <td>A Pl Church and water tank Area checked</td>
    <td>${form.land_matters?.[3]?.time || "____"}</td>
    <td>${form.land_matters?.[3]?.remark || "____"}</td>
  </tr>
</table>

<h2>12. Defence Land Survey</h2>
<p>
  I visited Defence Land Survey No. 36, 38, 40, 41, 43 & 59 along with a rep of the RP/QM and made an entry in the Defence Land Visit Register. I have the following to report:
</p>
<ul>
  <li>(a) ${form.defense_land_survey?.observations[0]?.text || "____"}</li>
  <li>(b) ${form.defense_land_survey?.observations[1]?.text || "____"}</li>
  <li>(c) ${form.defense_land_survey?.observations[2]?.text || "____"}</li>
</ul>





      <h2>13. Quarter Gd & Kote</h2>
<p>I have physically checked the Arms in Kote on <b>${form.quarter_gd_kote.koteCheckDate || "____"}</b> and have the following to report:</p>
<table>
  <tr><th>Ser</th><th>Type</th><th>Arms Held</th><th>Arms Out of Kote</th><th>Arms In Kote</th><th>Remarks</th></tr>
  ${form.quarter_gd_kote.quarterGdKoteRows.map((row, index) => `
    <tr>
      <td>${String.fromCharCode(97 + index) || "a"}</td>
      <td>${row.type || "____"}</td>
      <td>${row.held || "____"}</td>
      <td>${row.armsOut || "____"}</td>
      <td>${row.armsIn || "____"}</td>
      <td>${row.remarks || "____"}</td>
    </tr>
  `).join("")}
</table>

  


<h2>14. Ammunition Magazine Check</h2>
<p>I have physically checked the ammunition magazine on <b>${form.amn_magazine.amnMagazineCheckDate || "____"}</b> and have the following to report:</p>
<table>
  <tr><th>Ser</th><th>Ammo</th><th>1st Line</th><th>2nd Line</th><th>Training</th><th>Used Cartridges</th><th>Remarks</th></tr>
  ${form.amn_magazine.amnMagazineRows.map((row, index) => `
    <tr>
      <td>${String.fromCharCode(97 + index) || "a"}</td>
      <td>${row.amn || "____"}</td>
      <td>${row.firstLine || "____"}</td>
      <td>${row.secondLine || "____"}</td>
      <td>${row.trg || "____"}</td>
      <td>${row.usedCartridges || "____"}</td>
      <td>${row.remarks || "____"}</td>
    </tr>
  `).join("")}
</table>

    

<h2>15. CSD Sample Checks</h2>
<p>I have physically checked the following sample items (minimum three):</p>

<h3>(a) CSD Items</h3>
<ul>
  <li>${form.csa_checks?.csa_items?.csdItem1 || "____"}</li>
  <li>${form.csa_checks?.csa_items?.csdItem2 || "____"}</li>
  <li>${form.csa_checks?.csa_items?.csdItem3 || "____"}</li>
</ul>

<h3>(b) Liquor/Grocery Card</h3>
<ul>
  <li>${form.csa_checks?.card_items?.cardItem1 || "____"}</li>
  <li>${form.csa_checks?.card_items?.cardItem2 || "____"}</li>
  <li>${form.csa_checks?.card_items?.cardItem3 || "____"}</li>
</ul>




<h2>16. TSS Sample Check</h2>
<p>I have physically checked the following sample items as per my trade-work (minimum three) and matched the ground and ledger balance:</p>
<table>
  <tr><th>Ser</th><th>Item</th><th>Cat Part No</th><th>Ground Balance</th><th>Ledger Balance</th><th>Remarks</th></tr>
  ${form.tss.columns.map((row, index) => `
    <tr>
      <td>${String.fromCharCode(97 + index) || "a"}</td>
      <td>${row.item || "____"}</td>
      <td>${row.cat_part_no || "____"}</td>
      <td>${row.grnd_bal || "____"}</td>
      <td>${row.ledger_bal || "____"}</td>
      <td>${row.remarks || "____"}</td>
    </tr>
  `).join("")}
</table>


<h2>17. Security Measures</h2>
<p>I have checked the premises of ASW AOR at <b>${form.security_measures?.checkTime || "____"}</b> hrs and observed:</p>
<ul>
  <li>Any Salesmen/Beggars found in AOR: <b>${form.security_measures?.measures[0]?.check ? "Yes" : "No"}</b></li>
  <li>Checked unit AOR for unauthorized occupation of def land: <b>${form.security_measures?.measures[1]?.check ? "Yes" : "No"}</b></li>
</ul>

<h2>18. CCTV Location</h2>
<table>
  <tr>
    <th>Location</th>
    <th>Total</th>
    <th>Serviceable</th>
    <th>Unserviceable</th>
    <th>Remarks</th>
  </tr>
  ${form.cctv_locations?.map(row => `
    <tr>
      <td>${row.location || "____"}</td>
      <td>${row.total || "____"}</td>
      <td>${row.serviceable || "____"}</td>
      <td>${row.unserviceable || "____"}</td>
      <td>${row.remarks || "____"}</td>
    </tr>
  `).join("")}
</table>

<h2>19. MH Devlali Visit</h2>
<p>I have visited MH Devlali at <b>${form.devlali_visit?.time || "____"}</b> hrs. The following observations were noted:</p>
<p><b>Remarks:</b> ${form.devlali_visit?.observations[0]?.text || "____"}</p>




<h2>20. Sale of CSD</h2>
<p>Grocery Rs. <b>${form.sale_of_csd.grocery_amount || "____"}</b> Liquor Rs. <b>${form.sale_of_csd.liquor_amount || "____"}</b></p>

<h2>21. Roll Call</h2>
<p>I attended the Roll Call at <b>${form.roll_call.location || "____"}</b> and briefed tps on the following aspects:</p>
<p><b>${form.roll_call.details || "____"}</b></p>






<h2>22. QTR Visit</h2>
<table>
  <tr>
    <th>S/No</th>
    <th>Qtr No & Loc</th>
    <th>Problem</th>
    <th>Remarks</th>
  </tr>
  ${form.qtr_visit.map((row, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${row.qtr_no_and_location || "____"}</td>
      <td>${row.problem || "____"}</td>
      <td>${row.remarks || "____"}</td>
    </tr>
  `).join("")}
</table>





<h2>23. Mobile Check</h2>
<p>I have surprised checked the mobiles for banned apps & PIO calls of the following personnel:</p>
<table>
  <tr>
    <th>S/No</th>
    <th>Rank</th>
    <th>Name</th>
    <th>Make & Type</th>
    <th>Mob No.</th>
    <th>Banned App & PIO Calls</th>
    <th>Remarks</th>
  </tr>
  ${form.mobileCheckRows.map((row, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${row.rank || "____"}</td>
      <td>${row.name || "____"}</td>
      <td>${row.makeAndType || "____"}</td>
      <td>${row.mobNo || "____"}</td>
      <td>${row.bannedAppAndPpoCalls || "____"}</td>
      <td>${row.remarks || "____"}</td>
    </tr>
  `).join("")}
</table>


<h2>24. Liquor Issue</h2>
<p>I have supervised the Rum Issue & have the following to report:</p>
<textarea style="width: 100%; height: 100px; border: 1px solid black; padding: 10px;">
${form.liquorIssue.text || "Remark : "}
</textarea>

<h2>25. Improvement in Wksp Tech Processes and Functioning/Welfare of Tps</h2>
<p>Points observed are as follows (Minimum two compulsory):</p>
<ul>
  <li>(a) <b>${form.improvement_in_wksp_tech[0]?.point || "____________________"}</b></li>
  <li>(b) <b>${form.improvement_in_wksp_tech[1]?.point || "____________________"}</b></li>
</ul>


<h2>26. Awareness</h2>
<ul>
  <li>(a) GFO: Rank and Name <b>${form.awareness.rankAndName || "________"}</b></li>
  <li>(b) Duty Offr: Rank and Name <b>${form.awareness.dutyOfficer || "________"}</b></li>
  <li>(c) QRT JCO: Rank and Name <b>${form.awareness.QRT_JCO || "________"}</b></li>
  <li>(d) Duty NCO: Rank and Name <b>${form.awareness.NCO || "________"}</b></li>
</ul>



<h2>27. Handing Over of Duties</h2>
<p>I am handing over my duties to,</p>
<p>No: <b>${form.handoverDuties.no || "______"}</b> Rank: <b>${form.handoverDuties.rank || "______"}</b> Name: <b>${form.handoverDuties.name || "______"}</b></p>
<p>at <b>${form.handoverDuties.time || "______"}</b> on <b>${form.handoverDuties.date || "______"}</b>.</p>


<h2>28. Progress on Tasks Given by Sub Maj / Adjt / 2IC</h2>
<p>Date: <b>${currentDate}</b></p>

<h3>Signatures:</h3>
<p>Signature of Duty JCO: __________________</p>
<p>Sub Maj: ______________</p>
<p>Adjt: ______________</p>
<p>2IC: ______________</p>
<p>Comdt: ______________</p>


      
      
  
`  

  // Function to Generate and Share PDF
  const generatePDF = async () => {
    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      console.log("PDF saved at:", uri);
      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* WebView to Show PDF Preview */}
      <WebView originWhitelist={["*"]} source={{ html: htmlContent }} style={styles.webView} />
  
      {/* Buttons in Horizontal Row */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={"#"}>
          <Text style={styles.buttonText}>Add to Excel</Text>
        </TouchableOpacity>
  
        <TouchableOpacity style={styles.actionButton} onPress={generatePDF}>
          <Text style={styles.buttonText}>Generate PDF</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  
};

// Styles

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  webView: {
    flex: 1,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row", // Arrange buttons horizontally
    justifyContent: "space-between", // Space between buttons
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: "#34d399", // Green color
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    flex: 1, // Make buttons equal width
    marginHorizontal: 5, // Small spacing between buttons
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

  

export default PDFPreviewPage;