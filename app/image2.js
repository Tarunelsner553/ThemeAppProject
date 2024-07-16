/*------------------------
Libraries
------------------------*/
const axios = require("axios");
const fs = require("fs").promises; // Use fs.promises for async file operations
const FormData = require("form-data");
const path = require("path");

async function uploadImageToShopify() {
  try {
    /*------------------------
    Download the file.
    ------------------------*/
    const imagePath = path.join(__dirname, "assets", "new.jpg");
    const file = await fs.readFile(imagePath);
    const fileSize = (await fs.stat(imagePath)).size;

    /*------------------------
    Create staged upload.
    ------------------------*/
    const stagedUploadsQuery = `mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
      stagedUploadsCreate(input: $input) {
        stagedTargets {
          resourceUrl
          url
          parameters {
            name
            value
          }
        }
        userErrors {
          field
          message
        }
      }
    }`;

    const imageName = `image-${Math.floor(Math.random() * 100000)}`;

    const stagedUploadsVariables = {
      input: {
        filename: imageName,
        httpMethod: "POST",
        mimeType: "image/jpeg",
        resource: "FILE",
      },
    };

    const stagedUploadsQueryResult = await axios.post(
      `https://shopherenewthings.myshopify.com/admin/api/2023-04/graphql.json`,
      {
        query: stagedUploadsQuery,
        variables: stagedUploadsVariables,
      },
      {
        headers: {
          "X-Shopify-Access-Token": `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`,
        },
      }
    );

    const target =
      stagedUploadsQueryResult.data.data.stagedUploadsCreate.stagedTargets[0];
    const params = target.parameters;
    const url = target.url;
    const resourceUrl = target.resourceUrl;

    /*------------------------
    Post to temp target.
    ------------------------*/
    const form = new FormData();

    params.forEach(({ name, value }) => {
      form.append(name, value);
    });

    form.append("file", file, { filename: "myImage.jpg" });

    const headers = {
      ...form.getHeaders(),
    };

    if (url.includes("amazon")) {
      headers["Content-Length"] = fileSize + 5000;
    }

    await axios.post(url, form, {
      headers,
    });

    /*------------------------
    Create the file.
    ------------------------*/
    const createFileQuery = `mutation fileCreate($files: [FileCreateInput!]!) {
      fileCreate(files: $files) {
        files {
          alt
        }
        userErrors {
          field
          message
        }
      }
    }`;

    const createFileVariables = {
      files: {
        alt: "alt-tag",
        contentType: "IMAGE",
        originalSource: resourceUrl,
      },
    };

    const createFileQueryResult = await axios.post(
      `https://shopherenewthings.myshopify.com/admin/api/2023-04/graphql.json`,
      {
        query: createFileQuery,
        variables: createFileVariables,
      },
      {
        headers: {
          "X-Shopify-Access-Token": `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`,
        },
      }
    );

    console.log("File created in Shopify:", createFileQueryResult.data);
  } catch (error) {
    console.error("Error in uploadImageToShopify:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
    }
  }
}

// Call the function
console.log("Starting script...");
uploadImageToShopify().then(() => console.log("Script finished"));
