
let api =
  "https://shopherenewthings.myshopify.com/admin/api/2024-04/themes/124903391309/assets.json?asset[key]=templates/index.json";
let token = "shpua_00742a26cb14828eaac92944eab2e3ff";

async function fetchJsonData(api, token) {
  try {
    const response = await fetch(api, {
      headers: {
        "X-Shopify-Access-Token": token,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("data: ", data);
    return data;
  } catch (error) {
    console.error("Error fetching JSON response:", error);
    return null;
  }
}

async function processAndFormatJson() {
  try {
    const jsonResponse = await fetchJsonData(api, token);
    if (!jsonResponse) {
      throw new Error("Failed to fetch JSON data");
    }

    // Parse the 'value' field from the JSON response
    const parsedData = JSON.parse(jsonResponse.asset.value);

    // Object to store section type counts
    const typeCounts = {};
    const newSections = {};
    const newOrder = [];

    // Process each section
    Object.keys(parsedData.sections).forEach((sectionKey) => {
      const section = parsedData.sections[sectionKey];
      const { type } = section;

      // Increment section type count
      typeCounts[type] = (typeCounts[type] || 0) + 1;

      // Rename section key if there are multiple sections of the same type
      const newSectionKey = `${type}-${typeCounts[type]}`;
      newSections[newSectionKey] = section;

      // Update the order array with the new section key
      const orderIndex = parsedData.order.indexOf(sectionKey);
      if (orderIndex !== -1) {
        newOrder[orderIndex] = newSectionKey;
      }

      // Process block order
      if (section.blocks) {
        const newBlocks = {};
        const newBlockOrder = [];
        const blockTypeCounts = {};

        Object.keys(section.blocks).forEach((blockKey) => {
          const block = section.blocks[blockKey];
          const blockType = block.type;

          // Increment block type count
          blockTypeCounts[blockType] = (blockTypeCounts[blockType] || 0) + 1;

          // Rename block key
          const newBlockKey = `${blockType}-${blockTypeCounts[blockType]}`;
          newBlocks[newBlockKey] = block;
          newBlockOrder.push(newBlockKey);
        });

        section.blocks = newBlocks;
        section.block_order = newBlockOrder;
      }
    });

    // Update the sections and order in the parsed data
    parsedData.sections = newSections;
    parsedData.order = newOrder;

    // Convert processed data back to JSON string with proper formatting
    let formattedJsonString = JSON.stringify(parsedData, null, 2);

    return formattedJsonString;
  } catch (error) {
    console.error("Error processing and formatting JSON:", error);
    return null;
  }
}

async function updateJsonData(apix, token, newData) {
  let payload = {
    asset: {
      key: "templates/index.json",
      value: newData,
    },
  };
  payload = JSON.stringify(payload);
  console.log("Payload:", payload);
  try {
    const response = await fetch(apix, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": token,
      },
      body: payload,
    });
    console.log("response", response);
    if (!response.ok) {
      throw new Error(`Failed to update data. Status: ${response.status}`);
    }

    console.log("Data updated successfully.");
    return true;
  } catch (error) {
    console.error("Error updating data:", error);
    return false;
  }
}

// Example usage
async function main() {
  try {
    const formattedJsonString = await processAndFormatJson();
    console.log("Formatted JSON string:", formattedJsonString);
    if (!formattedJsonString) {
      throw new Error("Failed to get formatted JSON string.");
    }
    let apix =
      "https://shopherenewthings.myshopify.com/admin/api/2024-04/themes/124903391309/assets.json";
    const updateResult = await updateJsonData(apix, token, formattedJsonString);
    if (updateResult) {
      console.log("JSON data updated successfully.");
    } else {
      console.error("Failed to update JSON data.");
    }
  } catch (error) {
    console.error("Main function error:", error);
  }
}

main();
