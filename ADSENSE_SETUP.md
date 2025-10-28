# Google AdSense Integration Guide

## ✅ What's Already Set Up

Your website is configured with Google AdSense:

- **Publisher ID**: `ca-pub-9258915549707323`
- **AdSense Script**: Already loaded in `src/app/layout.tsx`
- **AdSense Component**: Created at `components/AdSense.tsx`
- **Example Ads**: Added to About page

## 📝 Next Steps to Start Earning

### 1. Create Ad Units in Google AdSense Dashboard

1. Go to [Google AdSense](https://www.google.com/adsense/)
2. Navigate to: **Ads** → **By ad unit** → **Display ads**
3. Create ad units for different positions:
   - **Header/Top Ad** (Horizontal banner - 728x90 or responsive)
   - **In-Content Ad** (Rectangle - 300x250 or responsive)
   - **Sidebar Ad** (Vertical - 160x600 or responsive)
4. Copy the **Ad Slot ID** for each unit (looks like: `1234567890`)

### 2. Add Ad Slot IDs to Your Pages

Replace the placeholder `YOUR_AD_SLOT_1` and `YOUR_AD_SLOT_2` in your pages with actual slot IDs:

```tsx
// Example in src/app/about/page.tsx
<AdSense adSlot="1234567890" adFormat="horizontal" />
```

### 3. How to Use the AdSense Component

```tsx
import AdSense from '../../../components/AdSense'

// Basic usage
<AdSense adSlot="YOUR_AD_SLOT_ID" />

// Horizontal banner ad
<AdSense adSlot="YOUR_AD_SLOT_ID" adFormat="horizontal" />

// Custom styling
<AdSense
  adSlot="YOUR_AD_SLOT_ID"
  adFormat="auto"
  className="my-custom-class"
/>
```

### 4. Where to Place Ads

Good ad placements for maximum revenue:

- **Top of pages** (after h1 title)
- **Middle of content** (between sections)
- **Sidebar** (if you have one)
- **Bottom of articles**
- **Between quote cards** (on homepage)

### 5. Deploy and Wait

1. Commit your changes with ad slot IDs
2. Deploy to Vercel/production
3. **Important**: Ads won't show immediately
   - First ads can take 24-48 hours to appear
   - AdSense needs to review your site
   - Ads only show on live sites (not localhost)

## 🚀 Adding Ads to Other Pages

### Homepage Example (`src/app/page.tsx`):

```tsx
import AdSense from '../components/AdSense'

// Add after the title
<AdSense adSlot="YOUR_HOMEPAGE_AD_SLOT" adFormat="horizontal" />

// Or between quote cards
<div className="my-8">
  <AdSense adSlot="YOUR_CONTENT_AD_SLOT" />
</div>
```

### Contact Page Example:

```tsx
import AdSense from "../../../components/AdSense";

// Add before or after contact form
<div className="mb-8">
  <AdSense adSlot="YOUR_CONTACT_AD_SLOT" />
</div>;
```

## 📊 Tracking Revenue

- Check your earnings in [AdSense Dashboard](https://www.google.com/adsense/)
- Payment threshold: $100 minimum
- Payments are monthly (around 21st-26th of each month)

## ⚠️ Important Notes

- **Don't click your own ads** (violates AdSense policies)
- Ads need **real traffic** to display and earn
- **Content must comply** with [AdSense policies](https://support.google.com/adsense/answer/48182)
- **GDPR compliance**: Cookie consent is handled in your privacy policy

## 🔧 Troubleshooting

### Ads not showing?

- Wait 24-48 hours after deployment
- Check AdSense dashboard for approval status
- Ensure site is live (not localhost)
- Verify ad slot IDs are correct

### Low earnings?

- Increase traffic (SEO, social media, content marketing)
- Experiment with ad placements
- Create more content pages
- Target high-value keywords

## 📁 Files Modified

- `src/app/layout.tsx` - AdSense script loaded
- `components/AdSense.tsx` - Reusable ad component
- `src/app/about/page.tsx` - Example ad placements

## 🎯 Next Actions

1. [ ] Create ad units in AdSense dashboard
2. [ ] Replace `YOUR_AD_SLOT_1` and `YOUR_AD_SLOT_2` with real slot IDs
3. [ ] Add ads to homepage and other pages
4. [ ] Deploy to production
5. [ ] Monitor AdSense dashboard for approval and earnings
