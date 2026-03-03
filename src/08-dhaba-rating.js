/**
 * 🍛 Highway Dhaba Rating System - Higher-Order Functions
 *
 * Highway pe dhabas ki rating system bana raha hai. Higher-order functions
 * (HOF) use karne hain — aise functions jo doosre functions ko parameter
 * mein lete hain YA return karte hain.
 *
 * Functions:
 *
 *   1. createFilter(field, operator, value)
 *      - Returns a FUNCTION that filters objects
 *      - Operators: ">", "<", ">=", "<=", "==="
 *      - e.g., createFilter("rating", ">=", 4) returns a function that
 *        takes an object and returns true if object.rating >= 4
 *      - Unknown operator => return function that always returns false
 *
 *   2. createSorter(field, order = "asc")
 *      - Returns a COMPARATOR function for Array.sort()
 *      - order "asc" => ascending, "desc" => descending
 *      - Works with both numbers and strings
 *
 *   3. createMapper(fields)
 *      - fields: array of field names, e.g., ["name", "rating"]
 *      - Returns a function that takes an object and returns a new object
 *        with ONLY the specified fields
 *      - e.g., createMapper(["name"])({name: "Dhaba", rating: 4}) => {name: "Dhaba"}
 *
 *   4. applyOperations(data, ...operations)
 *      - data: array of objects
 *      - operations: any number of functions to apply SEQUENTIALLY
 *      - Each operation takes an array and returns an array
 *      - Apply first operation to data, then second to result, etc.
 *      - Return final result
 *      - Agar data not array, return []
 *
 * Hint: HOF = functions that take functions as arguments or return functions.
 *   createFilter returns a function. applyOperations takes functions as args.
 *
 * @example
 *   const highRated = createFilter("rating", ">=", 4);
 *   highRated({ name: "Punjab Dhaba", rating: 4.5 }) // => true
 *
 *   const byRating = createSorter("rating", "desc");
 *   [{ rating: 3 }, { rating: 5 }].sort(byRating)
 *   // => [{ rating: 5 }, { rating: 3 }]
 */
export function createFilter(field, operator, value) {
  // Your code here

  const operatorsMap = {
    ">": (a, b) => a > b,
    "<": (a, b) => a < b,
    ">=": (a, b) => a >= b,
    "<=": (a, b) => a <= b,
    "===": (a, b) => a === b
  }
  const fieldOfObj = field
  const valueOfCondition = value
  const operatorApplied = operator


  function filteredObj(obj = {}) {

    if (!operatorsMap.hasOwnProperty(operatorApplied)) {
      return false
    }


    const mapFun = operatorsMap[operatorApplied]


    return mapFun(obj[fieldOfObj], valueOfCondition)

  }


  return filteredObj


}

export function createSorter(field, order = "asc") {
  // Your code here



  function comparator(a, b) {

    const valA = a[field]
    const valB = b[field]

    if (typeof valA === "number" && typeof valB === "number") {
      return order === "asc"
        ? valA - valB
        : valB - valA
    }

    if (typeof valA === "string" && typeof valB === "string") {
      return order === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA)
    }

    return 0

  }

  return comparator


}

export function createMapper(fields) {
  // Your code here

  const fieldsArray = fields

  function mapperOne(obj = {}) {

    const returnObj = {}

    for (const field of fieldsArray) {
      if (obj.hasOwnProperty(field)) {
        returnObj[field] = obj[field]
      }
    }

    return returnObj
  }

  return mapperOne


}

export function applyOperations(data, ...operations) {
  // Your code here

  if (!Array.isArray(data)) return []

  return operations.reduce((acc, curr) => {
    return curr(acc)
  }, data)


}
