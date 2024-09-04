"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { RiMapPin2Line } from "react-icons/ri";
import { FiGithub } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { cn, isWorkingHoursInUkraine } from "@/utils/helper";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/Container";
import Body1 from "@/components/ui/typography/Body1";

interface PreviewProps {
  className?: string;
}

const Preview: React.FC<PreviewProps> = ({ className }) => {
  const t = useTranslations("Preview");
  const isWorkHours = isWorkingHoursInUkraine();

  return (
    <Container
      className={clsx(
        "py-16 lg:py-24 flex flex-col-reverse md:flex-row gap-12 justify-between",
        className
      )}
    >
      <div>
        <h1 className="text-5xl md:text-7xl text-gray-900 dark:text-gray-100 font-bold">
          {t("greeting")}
        </h1>
        <Body1 className="mt-3 max-w-3xl">{t("about")}</Body1>
        <Body1 className="mt-12 mb-2 flex flex-row gap-2 items-center text-gray-600 dark:text-gray-100">
          <RiMapPin2Line />
          {t("locale")}
        </Body1>
        <Body1
          className={cn([isWorkHours ? "text-green-700" : "text-red-800"])}
        >
          • {isWorkHours ? t("availability-yes") : t("availability-no")}
        </Body1>
        <Body1 className="mt-12 flex flex-row gap-2">
          <Link href="https://github.com/dychkos">
            <FiGithub size={24} />
          </Link>
          <Link href="https://www.linkedin.com/in/dychkos/">
            <FaLinkedinIn size={24} />
          </Link>
          <Link href="https://instagram.com/dychkos">
            <FaInstagram size={24} />
          </Link>
        </Body1>
      </div>
      <div className="flex justify-center md:justify-start">
        <div className="w-72 h-80 relative">
          <div className="z-0 absolute bg-gray-400 top-5 left-5 w-[280px] h-[280px]"></div>

          <Image
            src="/images/me.jpg"
            alt="Me"
            width={500}
            height={500}
            className="relative mx-auto w-[280px] h-[280px] object-cover"
            style={{ zIndex: "1" }}
          />
        </div>
      </div>
    </Container>
  );
};

export default Preview;
