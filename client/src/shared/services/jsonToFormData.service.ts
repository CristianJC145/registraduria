// const JsonToFormDataService = {
//     convertJsonToFormData: (jsonData: Record<string, any>) => {
//       const formData = new FormData();
  
//       Object.entries(jsonData).forEach(([key, value]) => {
//         console.log("data json", value)
//         if (Array.isArray(value)) {
//           value.forEach((element, index) => {
//             formData.append(`${key}[${index}]`, element);
//           });
//         } else {
//           formData.append(key, value);
//         }
//       });
  
//       return formData;
//     },
// };
  
// export default JsonToFormDataService;