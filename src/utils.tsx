import { configFields, ConfigValueType } from "./configModel";
import { ConfigFormValues } from "./pages/ConfigCreate";

export const renderValue = ( value: any) => {
    if (Array.isArray(value) && typeof value[0] === 'object') {
      return value.map((row) =>
        Object.entries(row).map(([subkey, subvalue], index) =>
          <div key={index}>
            {`${subkey}: ${subvalue}`}
          </div>
        )
      );
    } else if (Array.isArray(value) && typeof value[0] !== 'object') {
      return value.join(", ")
    } 
    return value?.toString();
  };


export const checkValues = (data: ConfigFormValues) => {
  const newData = { ...data };

  for (const field of configFields) {
    const value = data[field.key];

    if (field.type === 'number') {
      newData[field.key] = Number(value);
    } else if (field.type === 'boolean') {
      newData[field.key] = value ? value.toString().toLowerCase() === 'true' : false;
    } else if (field.type === 'array') {
      newData[field.key] = value.split(',');
    }
  }
  return newData;
};


export const validateField = (type: ConfigValueType) => {
  return (value: string) => {
    switch (type) {
      case 'number':
        return Number.isFinite(Number(value)) || 'Введите число';
      case 'boolean':
        return (
          ['true', 'false'].includes(value.toLowerCase()) || 'Введите true или false'
        );
      default:
        return true;
    }
  };
};
