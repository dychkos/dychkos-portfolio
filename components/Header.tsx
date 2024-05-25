"use client";
import React, { useEffect, useState } from "react";
import DarkModeToggle from "@/components/partials/DarkModeToggle";
import RegularButton from "@/components/ui/RegularButton";
import LocaleSwitcher from "@/components/partials/LocaleSwitcher";
import { useTranslations } from "next-intl";
import Container from "@/components/Container";
import BurgerButton from "@/components/ui/BurgerButton";
import { cn } from "@/utils/helper";
import { Link } from "@/lib/navigation";

const Header: React.FC = () => {
  const t = useTranslations("Header");
  const [isOpened, setIsOpened] = useState<boolean>(false);

  useEffect(() => {
    if (isOpened) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpened]);

  const hide = () => setIsOpened(false);

  return (
    <Container className="py-4 md:py-4 flex flex-row justify-between items-center">
      <Link href="/" className="text-3xl font-bold dark:text-white">
        &lt;dy /&gt;
      </Link>

      <div
        className={cn(
          "absolute px-4 pt-2 top-16 left-0 w-full h-screen z-50 flex-col bg-white dark:bg-gray-900 md:w-auto md:h-auto md:relative md:top-0 md:left-0 md:bg-transparent md:flex md:flex-row items-center",
          [isOpened ? "flex" : "hidden"]
        )}
      >
        <ul className="flex flex-col border-y-2 w-full py-4 gap-4 whitespace-nowrap md:flex-row md:gap-6 md:w-auto md:pr-6 md:py-0 border-gray-300 md:border-y-0 md:border-r-2">
          <li className="text-base text-gray-600 dark:text-gray-300 font-medium">
            <Link href="/#about" onClick={hide}>
              {t("about")}
            </Link>
          </li>
          <li className="text-base text-gray-600 dark:text-gray-300 font-medium">
            <Link href="/#experience" onClick={hide}>
              {t("experience")}
            </Link>
          </li>
          <li className="text-base text-gray-600 dark:text-gray-300 font-medium">
            <Link href={{ pathname: "/" }} onClick={hide}>
              {t("contact")}
            </Link>
          </li>
        </ul>
        <div className="my-4 flex flex-col w-full md:flex-row items-center md:ml-6 md:my-0 gap-4">
          <DarkModeToggle />
          <LocaleSwitcher />
          <RegularButton
            className="w-full md:w-auto"
            onClick={() => window.open("/CV.pdf")}
          >
            {t("get-cv")}
          </RegularButton>
        </div>
      </div>

      <BurgerButton
        isOpened={isOpened}
        onClick={() => setIsOpened((state) => !state)}
        className="block md:hidden"
      />
    </Container>
  );
};

export default Header;
