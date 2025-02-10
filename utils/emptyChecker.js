export const validateFormData = (formData) => {
  const emptyFields = [];

  formData.forEach((form, formIndex) => {
    // Helper function to check if value is empty
    const isEmpty = (value) => {
      if (Array.isArray(value)) return value.length === 0;
      if (typeof value === "object" && value !== null) return false;
      return value === "" || value === null || value === undefined;
    };

    // Helper function to process nested objects
    const checkObject = (obj, parentPath) => {
      Object.entries(obj).forEach(([key, value]) => {
        const currentPath = parentPath ? `${parentPath}.${key}` : key;

        if (Array.isArray(value)) {
          // Handle arrays of objects
          value.forEach((item, index) => {
            if (typeof item === "object" && item !== null) {
              Object.entries(item).forEach(([itemKey, itemValue]) => {
                if (isEmpty(itemValue)) {
                  emptyFields.push({
                    formIndex,
                    path: `${currentPath}[${index}].${itemKey}`,
                    parentObject: currentPath,
                  });
                }
              });
            }
          });
        } else if (typeof value === "object" && value !== null) {
          // Handle nested objects
          Object.entries(value).forEach(([nestedKey, nestedValue]) => {
            if (isEmpty(nestedValue)) {
              emptyFields.push({
                formIndex,
                path: `${currentPath}.${nestedKey}`,
                parentObject: currentPath,
              });
            } else if (
              typeof nestedValue === "object" &&
              nestedValue !== null
            ) {
              checkObject(nestedValue, `${currentPath}.${nestedKey}`);
            }
          });
        } else if (isEmpty(value)) {
          emptyFields.push({
            formIndex,
            path: currentPath,
            parentObject: parentPath || "root",
          });
        }
      });
    };

    // Start checking from the root object
    checkObject(form, "");
  });

  return emptyFields;
};

// Example usage:
// const emptyFields = validateFormData(formData);
// console.log('Empty fields:', emptyFields);
