import * as React from "react";
import { ThemeProvider } from "next-themes";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";


type Props = {
  children?: React.ReactNode;
  session: any
};

export default async function Providers({ children, session }: Props) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (


    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
    </ThemeProvider>

  );
}
