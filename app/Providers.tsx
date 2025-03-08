import * as React from "react";
import {ThemeProvider} from "@/components/ThemeProvider"
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";


type Props = {
  children?: React.ReactNode;
};

export default async function Providers({ children }: Props) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (


    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
    </ThemeProvider>

  );
}
