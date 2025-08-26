const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

async function ShopifyData(query) {
  const URL = `https://${domain}/api/2023-07/graphql.json`;

  const options = {
    endpoint: URL,
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  };

  try {
    const data = await fetch(URL, options).then(response => {
      return response.json();
    });

    return data;
  } catch (error) {
    throw new Error("Products not fetched");
  }
}

export async function getProductsInCollection() {
  const query = `
    {
      products(first: 25) {
        edges {
          node {
            id
            title
            handle
            description
            images(first: 5) {
              edges {
                node {
                  originalSrc
                  altText
                }
              }
            }
            variants(first: 5) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                }
              }
            }
            productType
            tags
          }
        }
      }
    }`;

  const response = await ShopifyData(query);
  
  const allProducts = response.data.products.edges ? response.data.products.edges : [];

  return allProducts;
}

export async function getAllProducts() {
  const query = `
    {
      products(first: 250) {
        edges {
          node {
            id
            title
            handle
            description
            images(first: 5) {
              edges {
                node {
                  originalSrc
                  altText
                }
              }
            }
            variants(first: 5) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                }
              }
            }
            productType
            tags
          }
        }
      }
    }`;

  const response = await ShopifyData(query);
  
  const allProducts = response.data.products.edges ? response.data.products.edges : [];

  return allProducts;
}

export async function getProduct(handle) {
  const query = `
    {
      productByHandle(handle: "${handle}") {
        id
        title
        handle
        description
        images(first: 5) {
          edges {
            node {
              originalSrc
              altText
            }
          }
        }
        variants(first: 5) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
            }
          }
        }
        productType
        tags
      }
    }`;

  const response = await ShopifyData(query);
  
  const product = response.data.productByHandle ? response.data.productByHandle : [];

  return product;
}

export function formatShopifyProduct(product) {
  const { node } = product;
  const image = node.images.edges.length > 0 ? node.images.edges[0].node.originalSrc : '/placeholder.jpg';
  const price = node.variants.edges.length > 0 ? parseFloat(node.variants.edges[0].node.price.amount) : 0;
  const compareAtPrice = node.variants.edges.length > 0 && node.variants.edges[0].node.compareAtPrice 
    ? parseFloat(node.variants.edges[0].node.compareAtPrice.amount) 
    : null;

  return {
    id: node.id,
    title: node.title,
    handle: node.handle,
    description: node.description,
    image: image,
    images: node.images.edges.map(edge => edge.node.originalSrc),
    price: price,
    compareAtPrice: compareAtPrice,
    category: node.productType || (node.tags.length > 0 ? node.tags[0] : 'General'),
    tags: node.tags,
    variants: node.variants.edges.map(edge => edge.node)
  };
}