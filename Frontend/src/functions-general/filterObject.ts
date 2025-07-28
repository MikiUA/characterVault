interface PredicateKeyValue { (key: string, value: any): boolean };

// function filterObject_filterfunction(object: Object, filterFunction: Function) {
//     return Object.fromEntries(
//         Object.entries(object).filter(([key, value]) => {
//             return filterFunction(key, value);
//         })
//     )
// }

// function filterObject_includesSting(object = {}, string = '') {
//     string = string.toLowerCase();
//     return Object.fromEntries(
//         Object.entries(object).filter(([key, value]) => {
//             key = key.toLowerCase();
//             if (key.includes(string) || (typeof (value) === 'string' && value.toLowerCase().includes(string))) return true;
//             else return false;
//         })
//     )
// }

export default function filterObject(object: Object, filter: string | PredicateKeyValue) {
    let filterFunction: PredicateKeyValue;
    if (typeof (filter) === 'string') {
        filter = filter.toLowerCase();
        // @ts-ignore
        filterFunction = (key, value) => (key.toLowerCase().includes(filter) || (typeof (value) === 'string' && value.toLowerCase().includes(filter)))
    }
    else filterFunction = filter;
    return Object.fromEntries(
        Object.entries(object).filter(([key, value]) => {
            return filterFunction(key, value);
        })
    )
}