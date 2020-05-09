const baseURL = "http://127.0.0.1:1414";

function get(url, params) {
  return request(url, params);
}
function create(url, params) {
  return request(url, params, "POST");
}
function update(url, params) {
  return request(url, params, "PUT");
}
function remove(url, params) {
  return request(url, params, "DELETE");
}

async function request(url, params, method = "GET") {
  const options = {
    headers: {
      "Content-Type": "application/json", // we will be sending JSON
    },
    method,
  };

  if (params != undefined) {
    if (method === "GET") {
      url += "?" + objectToQueryString(params);
    } else {
      options.body = JSON.stringify(params);
    }
  }

  const response = await fetch(baseURL + url, options);

  if (response.status !== 200)
    return generateErrorResponse(
      "The server responded with an unexpected status."
    );

  const result = await response.json();

  return result;
}

// converts an object into a query string
// ex: {authorId : 'abc123'} -> &authorId=abc123
function objectToQueryString(obj) {
  return Object.keys(obj)
    .map((key) => key + "=" + obj[key])
    .join("&");
}
function generateErrorResponse(message) {
  return {
    status: "error",
    message,
  };
}

export default {
  get,
  create,
  update,
  remove,
};
