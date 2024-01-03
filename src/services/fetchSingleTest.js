export const fetchTestData = async (testId) => {
  let token = localStorage.getItem("user_token");

  var formdata = new FormData();
  formdata.append("test_id", testId);

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `http://127.0.0.1:205/test?token=${token}`,
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
    throw error; // Rethrow the error if needed
  }
};

export const fetchHtmlContent = async (url) => {
  try {
    let token = localStorage.getItem("user_token");

    const response = await fetch(
      `http://127.0.0.1:205/get-html?token=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.html_content;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const fetchProjectTests = async (project_id) => {
  let token = localStorage.getItem("user_token");

  var formdata = new FormData();
  formdata.append("project_id", project_id);

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `http://127.0.0.1:205/project?token=${token}`,
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
    throw error; // Rethrow the error if needed
  }
};
