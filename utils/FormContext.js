import React, { createContext, useState } from 'react';

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    jcNumber: '',
    rank: '',
    name: '',
    fromTime: '',
    fromDate: '',
    toTime: '',
    toDate: '',
    koteGuardTime: '',
    koteGuardFindings: '',
    mtBriefingTime: '',
    mtBriefingStr: { a: '', b: '', c: '' },
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};