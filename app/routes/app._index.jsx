import { useEffect } from "react";
import { json } from "@remix-run/node";
import { useActionData, useNavigation, useSubmit } from "@remix-run/react";
import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack,
  Link,
  InlineStack,
} from "@shopify/polaris";
import { useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  const products = [];

  for (let i = 0; i < 5; i++) {
    const color = ["Red", "Orange", "Yellow", "Green"][Math.floor(Math.random() * 4)];
    const response = await admin.graphql(
      `#graphql
        mutation populateProduct($input: ProductInput!) {
          productCreate(input: $input) {
            product {
              id
              title
              handle
              status
              variants(first: 10) {
                edges {
                  node {
                    id
                    price
                    barcode
                    createdAt
                  }
                }
              }
            }
          }
        }`,
      {
        variables: {
          input: {
            title: `${color} Snowboard ${i + 1}`,
          },
        },
      }
    );
    const responseJson = await response.json();
    const variantId = responseJson.data.productCreate.product.variants.edges[0].node.id;
    const variantResponse = await admin.graphql(
      `#graphql
        mutation shopifyRemixTemplateUpdateVariant($input: ProductVariantInput!) {
          productVariantUpdate(input: $input) {
            productVariant {
              id
              price
              barcode
              createdAt
            }
          }
        }`,
      {
        variables: {
          input: {
            id: variantId,
            price: Math.random() * 100,
          },
        },
      }
    );
    const variantResponseJson = await variantResponse.json();
    products.push({
      product: responseJson.data.productCreate.product,
      variant: variantResponseJson.data.productVariantUpdate.productVariant,
    });
  }

  return json({ products });
};

export default function Index() {
  const nav = useNavigation();
  const actionData = useActionData();
  const submit = useSubmit();
  const shopify = useAppBridge();
  const isLoading =
    ["loading", "submitting"].includes(nav.state) && nav.formMethod === "POST";

  useEffect(() => {
    if (actionData?.products) {
      shopify.toast.show("Products created successfully");
    }
  }, [actionData, shopify]);

  const generateProducts = () => submit({}, { replace: true, method: "POST" });

  return (
    <Page>
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="500">
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">
                    Congrats on creating a new Shopify app 🎉
                  </Text>
                  <Text variant="bodyMd" as="p">
                    This embedded app template uses{" "}
                    <Link
                      url="https://shopify.dev/docs/apps/tools/app-bridge"
                      target="_blank"
                      removeUnderline
                    >
                      App Bridge
                    </Link>{" "}
                    interface examples like an{" "}
                    <Link url="/app/additional" removeUnderline>
                      additional page in the app nav
                    </Link>
                    , as well as an{" "}
                    <Link
                      url="https://shopify.dev/docs/api/admin-graphql"
                      target="_blank"
                      removeUnderline
                    >
                      Admin GraphQL
                    </Link>{" "}
                    mutation demo, to provide a starting point for app
                    development.
                  </Text>
                </BlockStack>
                <BlockStack gap="200">
                  <Text as="h3" variant="headingMd">
                    Get started with products
                  </Text>
                  <Text as="p" variant="bodyMd">
                    Generate products with GraphQL and get the JSON output for
                    those products. Learn more about the{" "}
                    <Link
                      url="https://shopify.dev/docs/api/admin-graphql/latest/mutations/productCreate"
                      target="_blank"
                      removeUnderline
                    >
                      productCreate
                    </Link>{" "}
                    mutation in our API references.
                  </Text>
                </BlockStack>
                <InlineStack gap="300">
                  <Button loading={isLoading} onClick={generateProducts}>
                    Generate products
                  </Button>
                </InlineStack>
                {actionData?.products && (
                  <Text as="h3" variant="headingMd">
                    Products created successfully
                  </Text>
                )}
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
