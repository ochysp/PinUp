// @flow

/* Type Definitions for Flow, can be ignored if Flow is not used. */

export type AccountNr = string;

export type User = {
  login: string,
  firstname: string,
  lastname: string,
  accountNr: AccountNr
};

/* Use the exported functions to call the API. 
 * If necessary, adapt the backend address below:
 */

const backend = "https://pinuphero.herokuapp.com/";

export function getAccountDetails(
  token: string
): Promise<{ accountNr: string, amount: number, owner: User }> {
  return getAuthenticatedJson(`/accounts`, token).then(parseJSON);
}

export function getAccount(
  accountNr: AccountNr,
  token: string
): Promise<{
  accountNr: AccountNr,
  owner: { firstname: string, lastname: string }
}> {
  return getAuthenticatedJson(`/accounts/${accountNr}`, token).then(parseJSON);
}

export function transfer(
  target: AccountNr,
  amount: number,
  token: string
): Promise<TransferResult> {
  return postAuthenticatedJson("/accounts/transactions", token, {
    target,
    amount
  }).then(parseJSON);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error: Object = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

function getAuthenticatedJson(endpoint: string, token: string) {
  return fetch(`${backend}${endpoint}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json"
    }
  }).then(checkStatus);
}

function postJson(endpoint: string, params: Object) {
  return fetch(`${backend}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(params)
  }).then(checkStatus);
}

function postAuthenticatedJson(
  endpoint: string,
  token: string,
  params: Object
) {
  return fetch(`${backend}${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(params)
  }).then(checkStatus);
}
