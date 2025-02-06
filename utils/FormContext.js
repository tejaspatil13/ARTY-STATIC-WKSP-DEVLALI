import React, { createContext, useState } from 'react';

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
    
    // Page 3: MT Briefing
    mtBriefingTime: '',
    mtBriefingStr: { a: '', b: '', c: '' },
    
    // Other pages (add more fields as needed)
    guardChecks: {
      mainGateDay: false,
      mainGateNight: false,
      kote: false,
      aPl: false,
      bPl: false,
      csd: false,
      dhobiGhat: false,
      peerBabal: false,
      sdp: false
    },
    officeSealTime: '',
    storeSealTime: '',
    rationRemarks: ''
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};