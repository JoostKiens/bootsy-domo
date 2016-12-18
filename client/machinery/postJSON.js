export default function postJSON(path, json) {
  return fetch(path, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(json)
  })
}
