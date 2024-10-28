// BASE URL OF SERVER
export const ENV = {
  // serverUrl: 'http://127.0.0.1:8000/api/'
  // serverUrl: "https://gleammedstudies.com/api/",
  serverUrl: "https://admin.gleammedstudies.com/api/",
  public_key : "pk_test_51Pgc3BDz0ULGEM7NFB3LqPRh2cMdgaj0nlWaBiM7N4DyjWWTFs1biOjrYzKx9bI15ACUzb5TJYWsQP5pQ30I0qx300aqS02HuA"
};

export const LOGOUT_DURATION = {
  timeOut: 30 * 60 * 1000,
};

export const displayValue = (value, defaultValue) => {
  if (defaultValue === "") {
    return value !== null && value !== undefined ? value : "";
  } else {
    return value !== null && value !== undefined ? value : "N/A";
  }
};

