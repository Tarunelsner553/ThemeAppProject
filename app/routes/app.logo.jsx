import React, { useState } from 'react';
import {
  Card,
  Layout,
  Page,
  Button,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";


export default function Logo() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async() => {
    if (selectedFile) {
      console.log('Selected file:', selectedFile);
    } else {
      console.log('No file selected');
    }
  };

  return (
    <>
      <Page>
        <TitleBar title="Change Your Theme Logo" />
        <Layout>
          <Layout.Section>
            <Card>
              <div className="logo" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <input type="file" onChange={handleFileChange} />
                <Button onClick={handleSubmit}>Submit</Button>
              </div>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
      <div>

      </div>
    </>

  );
}
