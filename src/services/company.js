export const fetchCompany = async (uid) => {
  let token = localStorage.getItem("user_token");

  var formdata = new FormData();
  formdata.append("uid", uid);

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      "http://127.0.0.1:205/company?token=" + token,
      requestOptions
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    // console.log(data);
    return data; // Return the data here
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error if you want to handle it outside
  }
};
