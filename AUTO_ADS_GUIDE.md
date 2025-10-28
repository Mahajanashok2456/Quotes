# Google AdSense Auto Ads Setup Guide

## ✅ What's Already Done

Your website is configured for **Google AdSense Auto Ads**:

- ✅ **AdSense script loaded** in `src/app/layout.tsx`
- ✅ **Publisher ID**: `ca-pub-9258915549707323`
- ✅ **Manual ad placements removed** (Auto Ads will handle everything)

## 🚀 How to Enable Auto Ads

### Step 1: Log into AdSense Dashboard

1. Go to: https://www.google.com/adsense/
2. Sign in with your Google account

### Step 2: Enable Auto Ads

1. Click **Ads** in the left sidebar
2. Click **Auto ads**
3. You'll see your site listed (after AdSense approves it)
4. Toggle **Auto ads** to **ON**
5. Click **Apply to site**

### Step 3: Configure Auto Ads Settings (Optional)

You can control:

- **Ad formats**: Text, display, in-feed, in-article, etc.
- **Ad load**: Light, moderate, or heavy
- **Placements**: Where ads appear on pages

Click **Edit** next to your site to customize these settings.

### Step 4: Wait for Ads to Appear

- **First ads**: Can take 24-48 hours to show
- **Full optimization**: Up to a week
- **Ads only show on live sites** (not localhost)

## 🎯 How Auto Ads Work

AdSense will automatically:

- ✅ Choose optimal ad positions
- ✅ Test different placements
- ✅ Adjust based on performance
- ✅ Work on mobile and desktop
- ✅ Avoid cluttering your pages

## 📱 Where Ads Will Appear

Auto Ads typically place ads:

- Before/after page titles
- Between paragraphs
- In sidebars (if you have them)
- At the bottom of pages
- Between content sections

## 💡 Benefits of Auto Ads

- ✅ **Zero maintenance**: No coding required
- ✅ **AI-optimized**: Google's machine learning finds best placements
- ✅ **Responsive**: Works perfectly on all devices
- ✅ **Always up-to-date**: New ad formats automatically enabled
- ✅ **Better revenue**: Often earns more than manual placements

## ⚙️ Advanced Settings

### Control Which Pages Show Ads

In AdSense → Auto ads → Manage auto ads → Edit → Page exclusions

- Add URLs to exclude from showing ads
- Useful for login pages, checkout pages, etc.

### Ad Balance

In AdSense → Auto ads → Ad balance

- Reduce ad count while maintaining revenue
- Good for user experience optimization

## 📊 Monitoring Performance

1. Go to: **Reports** in AdSense dashboard
2. View:
   - **Earnings per page**
   - **Best performing ad units**
   - **Click-through rates**
   - **Revenue trends**

## ⚠️ Important Notes

- **Don't click your own ads** (violates AdSense policies)
- **Ads need real traffic** to display
- **First approval** can take 1-2 weeks
- **Payment threshold**: $100 minimum
- **Payments**: Monthly (around 21st-26th)

## 🔧 Troubleshooting

### Ads not showing?

- Wait 24-48 hours after enabling
- Check AdSense dashboard for approval status
- Ensure Auto Ads is toggled ON
- Verify site is live (not localhost)
- Check browser console for errors

### Too many/few ads?

- Adjust ad load in Auto ads settings
- Use ad balance slider to reduce ad count
- Add page exclusions if needed

## 📁 Technical Details

The AdSense script in your layout:

```tsx
<meta name="google-adsense-account" content="ca-pub-9258915549707323" />
<script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9258915549707323"
  crossOrigin="anonymous">
</script>
```

This is all you need! Auto Ads handles the rest.

## ✨ Next Steps

1. [ ] Log into AdSense Dashboard
2. [ ] Enable Auto Ads for your site
3. [ ] Deploy your site to production (if not already live)
4. [ ] Wait 24-48 hours for ads to appear
5. [ ] Monitor performance in AdSense Reports

---

**You're all set!** 🎉 AdSense Auto Ads will start showing once you enable them in the dashboard.
