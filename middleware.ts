import createMiddleware from "next-intl/middleware";
import { defaultLocale, localePrefix, locales } from "@/config";

export default createMiddleware({
  defaultLocale,
  localePrefix,
  locales,
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(ua|en)/:path*"],
};
