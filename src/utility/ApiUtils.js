function CallApi(url, request) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(url, {
        method: "POST", // or 'GET', 'PUT', 'DELETE', etc.
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(request),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      resolve(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      reject(error); // Reject the promise with the error
    }
  });
}

export default CallApi;
