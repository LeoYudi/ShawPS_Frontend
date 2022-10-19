async function fetch_https(method, api_url, route, body = undefined) {
  return new Promise((res, rej) => {
    fetch(`${api_url}${route}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(data => res(data.json()))
      .catch(error => rej(error));
  });
}

export { fetch_https };