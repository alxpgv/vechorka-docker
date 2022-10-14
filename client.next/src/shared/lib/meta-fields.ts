// input fields object example
// ==============-
// "employees_6_role"
// "employees_6_full_name"
// "employees_6_image"

// input item - fields object example
// {
//   image: null,
//   full_name: null,
//   role: null,
// };
export const getFieldsRepeater = (
  fields: any = {},
  groupName = "",
  item = {}
) => {
  const count = groupName && fields[groupName] ? fields[groupName] : 0;
  const itemKeys = Object.keys(item);
  if (!Object.keys(fields).length || !count || !itemKeys.length) return null;

  const items: any = [];

  for (let i = 0; i <= count; i++) {
    itemKeys.map((itemKey: any) => {
      const fieldName = `${groupName}_${i}_${itemKey}`;
      if (fields[fieldName]) {
        items[i] = {
          ...items[i],
          [itemKey]: fields[fieldName],
        };
      }
    });
  }
  return items;
};
