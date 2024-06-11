"use client";
import Container from "@/components/Container";
import Heading from "@/components/partials/Heading";
import Heading2 from "@/components/ui/typography/Heading2";
import React, { useState } from "react";
import { FiMail, FiPhone } from "react-icons/fi";
import { FaThreads } from "react-icons/fa6";
import { BsCopy } from "react-icons/bs";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { LiaTelegram } from "react-icons/lia";
import Body1 from "@/components/ui/typography/Body1";

export const GetInTouch: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);

  const [showPhoneEggs, setShowPhoneEggs] = useState<boolean>(false);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setShowPhoneEggs((prev) => !prev);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const t = useTranslations("GetInTouch");

  const handleCopyEmail = () => {
    const email = "dychkosergey@gmail.com";
    navigator.clipboard
      .writeText(email)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error("Failed to copy email: ", err));
  };

  const handleCopyPhone = () => {
    const phone = "+380734042536";
    navigator.clipboard
      .writeText(phone)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error("Failed to copy phone: ", err));
  };
  return (
    <Container id="contact" className="py-16 lg:py-24">
      <Heading>{t("heading")}</Heading>
      <Heading2 className="mt-4 mb-8 max-w-xl mx-auto text-center">
        {t("title")}
      </Heading2>
      <div className="p-4 relative">
        {copied && (
          <span className="absolute right-2/4 translate-x-2/4 -top-4 mx-auto whitespace-nowrap rounded-full bg-gray-300 dark:bg-gray-700 px-2.5 py-0.5 text-sm text-gray-700 dark:text-gray-50">
            {t("copied")}
          </span>
        )}
        <div className="flex flex-col justify-center items-center mx-auto">
          <span
            className="relative w-max font-semibold text-lg md:text-4xl justify-center text-gray-900 dark:text-gray-100 flex flex-row gap-3 md:gap-6 items-center"
            onClick={handleCopyEmail}
            title={t("email")}
          >
            <FiMail size={28} />
            dychkosergey@gmail.com
            <BsCopy
              size={28}
              className="ml-2 cursor-pointer hover:text-blue-500"
            />
          </span>
          <span
            className="relative mt-4 w-max font-semibold justify-center text-lg md:text-4xl text-gray-900 dark:text-gray-100 flex flex-row gap-3 md:gap-6 items-center"
            onClick={handleCopyPhone}
            title={t("phone")}
          >
            <FiPhone size={28} />
            <div className="relative">
              <p
                className={`transition-opacity duration-1000 ${
                  showPhoneEggs ? "opacity-0 invisible" : "opacity-100 visible"
                }`}
                style={{
                  position: showPhoneEggs ? "absolute" : "relative",
                  top: 0,
                  left: 0,
                }}
              >
                + 380 73 404 25 36
              </p>
              <p
                className={`transition-opacity duration-1000 ${
                  showPhoneEggs ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
                style={{
                  position: showPhoneEggs ? "relative" : "absolute",
                  top: 0,
                  left: 0,
                }}
              >
                + 380 73 <span className="text-red-400">404</span>{" "}
                <span className="bg-gradient-to-r from-green-700 to-green-400 bg-clip-text text-transparent">
                  5&#178; 6&#178;
                </span>
              </p>
            </div>
            <BsCopy
              size={28}
              className="ml-2 cursor-pointer hover:text-blue-500"
            />
          </span>
        </div>
      </div>
      <Heading2 className="mt-12 text-center">{t("other")}</Heading2>
      <Body1 className="mt-4 flex flex-row gap-2 justify-center">
        <Link href="https://www.threads.net/@dychkos">
          <FaThreads size={24} />
        </Link>
        <Link href="https://x.com/SerhiiDychko">
          <FaXTwitter size={24} />
        </Link>
        <Link href="https://t.me/dychkos/">
          <LiaTelegram size={24} />
        </Link>
      </Body1>
    </Container>
  );
};

export default GetInTouch;
