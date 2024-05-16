import React from "react";
import Container from "@/components/Container";
import Heading from "@/components/partials/Heading";
import Heading2 from "@/components/ui/typography/Heading2";
import { useMessages, useTranslations } from "next-intl";
import { AbstractIntlMessages } from "use-intl";

const Experience: React.FC = () => {
  const t = useTranslations("Experience");
  const messages = useMessages() as AbstractIntlMessages & MessagesType;

  return (
    <div className="bg-gray-50 dark:bg-gray-950 py-24">
      <Container>
        <Heading>{t("heading")}</Heading>
        <Heading2 className="mt-4 mb-8 text-center">{t("title")}</Heading2>
        {Array(3)
          .fill(false)
          .map((el, index) => {
            return (
              <div
                key={index}
                className="max-w-4xl mx-auto mb-8 bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 mb-8 flex flex-col md:flex-row gap-4 md:gap-12"
              >
                <div className="flex items-center mb-2">
                  <img
                    src={`/images/${t(`companies.${index}.name`)}.png`}
                    alt={t(`companies.${index}.name`)}
                    className="max-w-32 mr-2 bg-gray-50 rounded-xl dark:bg-gray-900"
                  />
                </div>
                <div className="flex-grow">
                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">
                    {t(`companies.${index}.role`)}
                  </p>
                  <ul className="list-disc list-inside">
                    {Object.keys(
                      messages.Experience.companies[index].responsibilities
                    ).map((key) => (
                      <li
                        key={key}
                        className="mb-1 text-gray-900 dark:text-gray-50"
                      >
                        {t(`companies.${index}.responsibilities.${key}`)}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-gray-500 mb-4 whitespace-nowrap">
                    {t(`companies.${index}.period`)}
                  </p>
                </div>
              </div>
            );
          })}
      </Container>
    </div>
  );
};

type MessagesType = {
  Experience: {
    companies: {
      [index: number]: {
        responsibilities: {
          [key: string]: string;
        };
      };
    };
  };
};

export default Experience;
