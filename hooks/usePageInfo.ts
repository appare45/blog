import { useLocale } from "./useLocale";

export const usePageInfo = () => {
  const locale = useLocale();
  const pageInfo = {
    name: locale.t.name,
    siteTitle: locale.t.name,
    id: "appare45",
  };
  return pageInfo;
};
