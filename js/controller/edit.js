export function isiData(results) {  
  const inputMapping = [
      { id: 'name', path: 'name' },
      { id: 'description', path: 'description' },
      { id: 'category', path: 'category' },
      { id: 'image', path: 'image' }
  ];

  inputMapping.forEach(({ id, path }) => {
      const inputElement = document.getElementById(id);
      const value = getNestedValue(results, path);
      if (inputElement) {
          inputElement.value = value;
      }
  });
  console.log(results);
}
  
function getNestedValue(obj, path, index, property) {
    const value = path.split('.').reduce((value, key) => (value && value[key]) ? value[key] : '', obj);
  
    if (Array.isArray(value) && value.length > index && value[index].hasOwnProperty(property)) {
      return value[index][property];
    }
  
    return value;
}
