const extractPrefixedColumns = ({
    prefixedObject,
    prefix
}) => {
   const prefixRegexp = new RegExp(`^${prefix}_(.*)`);

   return Object.entries(prefixedObject).reduce(
       (acc, [key, value]) => {
           const match = key.match(prefixRegexp);
           if(match){
               acc[match[1]] = value;
           }
           return acc;
       }, {}
   );
};

export const Utils = {
    extractPrefixedColumns
};