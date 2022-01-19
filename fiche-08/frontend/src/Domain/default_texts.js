

class default_texts {

  async addText(text) {
    if (!text || text.content.trim().length === 0 || text.level==="default") return false;
    try {
      const options = {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(text), // body data type must match "Content-Type" header
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch("/api/texts", options); // fetch return a promise => we wait for the response

      if (!response.ok) {
        throw new Error(
          "fetch error : " + response.status + " : " + response.statusText
        );
      }
      const newText = await response.json(); // json() returns a promise => we wait for the data
      return true;
    } catch (err) {
        return err;
    }
  }

  async selectRandomText(level) {
    if (!level) return;
    try {

      const response = await fetch(`/api/texts/${level}`); // fetch return a promise => we wait for the response

      if (!response.ok) {
        throw new Error(
          "fetch error : " + response.status + " : " + response.statusText
        );
      }
      const text = await response.json(); // json() returns a promise => we wait for the data
      return text;
    } catch (err) {
      console.error("selectRandomText::error: ", err);
    }
  }
}

export default default_texts;
