// input fields object example
// ==============
// {
// "employees_1_role"
// "employees_1_full_name"
// "employees_1_image"
// "employees_6_role"
// "employees_6_full_name"
// "employees_6_image"
// }
// repeaterFieldName: "employees"

export const getFieldsRepeater = (fields: any = {}, repeaterFieldName = "") => {
  const count =
    repeaterFieldName && fields[repeaterFieldName]
      ? fields[repeaterFieldName]
      : 0;
  if (!Object.keys(fields).length || !count) return null;

  const items: any = [];

  for (let i = 0; i <= count; i++) {
    for (const key in fields) {
      const fieldPrefixName = `${repeaterFieldName}_${i}_`;
      if (key?.startsWith(fieldPrefixName)) {
        // const fieldName = key.replace(fieldPrefixName, "");

        items[i] = {
          ...items[i],
          // [fieldName]: fields[`${fieldPrefixName}${fieldName}`],
          [key]: fields[key],
          // _key: key,
        };
      }
    }
  }

  return items;
};
