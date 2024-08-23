import React from "react";
import Heading from "@/components/partials/Heading";
import Container from "@/components/Container";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Heading3 from "@/components/ui/typography/Heading3";
import Body1 from "@/components/ui/typography/Body1";
import Link from "next/link";

const About: React.FC = () => {
  const t = useTranslations("About");

  return (
    <div className="bg-gray-50 dark:bg-gray-950 py-16 lg:py-24" id="about">
      <Container>
        <Heading>{t("heading")}</Heading>

        <div className="mt-12 flex flex-col items-center md:items-start md:flex-row gap-12 xl:gap-[192px]">
          <div className="min-w-80 w-72 h-80 relative">
            <div className="z-0 absolute w-80 h-80 bg-gray-400 top-5 left-5"></div>

            <Image
              src="/images/img_me.jpg"
              alt="Me"
              width={480}
              height={480}
              className="relative mx-auto"
              style={{ zIndex: "1" }}
            />
          </div>

          <div>
            <Heading3 className="mb-6 text-3xl font-semibold text-gray-900 dark:text-gray-100">
              {t("title")}
            </Heading3>

            {Array(2)
              .fill(false)
              .map((el, index) => (
                <Body1 className="mb-4" key={index}>
                  {t(`body.${index}`)}
                </Body1>
              ))}
            <Body1 className="mb-4">{t("avocation")}</Body1>
            <div className="flex flex-row gap-4 mb-4">
              <Link
                href="https://www.runtastic.com/user/Q59CQ2ZBAVRS3NZN"
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-600 flex gap-2 items-center"
              >
                <Image
                  src="/images/adidas-logo.svg"
                  height={32}
                  width={32}
                  alt="Adidas Running"
                />{" "}
                {t("running")}
              </Link>
              <Link
                href="https://hevy.com/user/dychkos"
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-600 flex gap-2 items-center"
              >
                <img
                  src="/images/hevy-logo.svg"
                  height={32}
                  width={32}
                  alt="Hevy sport"
                />{" "}
                {t("sport")}
              </Link>
            </div>
            <Body1 className="mb-4">{t("summary")}</Body1>
            <ul className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 list-disc list-inside gap-x-2.5">
              {Array(4)
                .fill(false)
                .map((skill, index) => (
                  <li
                    className="text-base lg:text-lg text-gray-900 dark:text-gray-200"
                    key={index}
                  >
                    {t(`main.${index}`)}
                  </li>
                ))}
            </ul>
            <Body1 className="mt-4">{t("last-thing")}</Body1>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default About;
