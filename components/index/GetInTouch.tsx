"use client";
import Container from "@/components/Container";
import Heading from "@/components/partials/Heading";
import Heading2 from "@/components/ui/typography/Heading2";
import { useState } from "react";
import { FiMail, FiPhone } from "react-icons/fi";

import { BsCopy } from "react-icons/bs";

export const GetInTouch: React.FC = () => {
  const [copied, setCopied] = useState(false);

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
    const phone = "+380950839581";
    navigator.clipboard
      .writeText(phone)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error("Failed to copy phone: ", err));
  };
  return (
    <div id="contact">
      <Container className="py-24">
        <Heading>Get in touch</Heading>
        <Heading2 className="mt-4 mb-8 max-w-xl mx-auto text-center">
          What’s next? Feel free to reach out to me if you`re looking for a
          designer or a developer, have a query, or simply want to connect.
        </Heading2>
        <div className="p-4 relative">
          {copied && (
            <span className="absolute right-2/4 translate-x-2/4 -top-4 mx-auto whitespace-nowrap rounded-full bg-gray-300 dark:bg-gray-700 px-2.5 py-0.5 text-sm text-gray-700 dark:text-gray-50">
              Copied
            </span>
          )}
          <div className="flex flex-col justify-center items-center  mx-auto">
            <span
              className="relative w-max font-semibold text-lg md:text-4xl justify-center text-gray-900 dark:text-gray-100 flex flex-row gap-3 md:gap-6 items-center"
              onClick={handleCopyEmail}
              title="Click to copy email"
            >
              <FiMail size={32} />
              dychkosergey@gmail.com
              <BsCopy
                size={32}
                className="ml-2 cursor-pointer hover:text-blue-500"
              />
            </span>

            <span
              className="relative mt-4 w-max font-semibold justify-center text-lg md:text-4xl text-gray-900 dark:text-gray-100 flex flex-row gap-3 md:gap-6 items-center"
              onClick={handleCopyPhone}
              title="Click to copy phone"
            >
              <FiPhone size={32} />
              + 380 73 404 2536
              <BsCopy
                size={32}
                className="ml-2 cursor-pointer hover:text-blue-500"
              />
            </span>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default GetInTouch;
