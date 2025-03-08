"use client";
import React from "react";
import { useTheme } from "next-themes";
import { RiMoonLine, RiSunLine } from "react-icons/ri";
import Body1 from "@/components/ui/typography/Body1";
import { useTranslations } from "next-intl";

const DarkModeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("Header");

  React.useEffect(() => {
    if (!theme) {
      setTheme("light");
    }
  }, [setTheme, theme]);

  return (
    <button
      className="md:p-2 flex flex-row items-center w-full md:w-auto justify-between rounded transition duration-150 ease-out hover:ease-in hover:bg-gray-100 dark:hover:bg-gray-900"
      onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
    >
      <Body1 className="md:hidden">{t("switch-theme")}</Body1>
      {theme === "light" ? (
        <RiMoonLine className="text-gray-700 h-6 w-6" />
      ) : (
        <RiSunLine className="text-gray-700 h-6 w-6" />
      )}
    </button>
  );
};

export default DarkModeToggle;
