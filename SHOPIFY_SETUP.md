# Shopify Integration Setup

## Environment Variables

Update your `.env.local` file with your Shopify store credentials:

```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store-name.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
```

## Getting Your Shopify Credentials

### 1. Store Domain
Your store domain is your Shopify store URL (e.g., `ecarepharm.myshopify.com`)

### 2. Storefront Access Token
1. Go to your Shopify Admin
2. Navigate to Apps > Manage private apps
3. Create a private app or use existing one
4. Enable Storefront API access
5. Copy the Storefront access token

## Features Integrated

- ✅ Product listing from Shopify
- ✅ Product detail pages
- ✅ Search and filtering
- ✅ Category management
- ✅ Cart functionality
- ✅ Wishlist functionality
- ✅ Static generation with ISR (60s revalidation)

## API Endpoints Used

- `products(first: 250)` - Get all products
- `productByHandle(handle: "...")` - Get single product
- GraphQL Storefront API 2023-07

## Fallback Behavior

If Shopify API fails or credentials are missing, the app will:
- Show empty product lists
- Display loading states
- Gracefully handle errors
- Continue to function with empty data

## Testing

1. Add your Shopify credentials to `.env.local`
2. Run `npm run dev`
3. Visit the homepage to see products from your Shopify store
4. Test product detail pages, search, and filtering