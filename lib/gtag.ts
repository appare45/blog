export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GTAG_TRACKING_ID;

export const pageView = (url: string) => {
  (window as any).gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};
