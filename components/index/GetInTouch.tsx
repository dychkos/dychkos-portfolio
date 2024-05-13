"use client";
import Container from "@/components/Container";
import Heading from "@/components/partials/Heading";
import Heading2 from "@/components/ui/typography/Heading2";
import { useState } from "react";
import { FiMail, FiPhone } from "react-icons/fi";

import { BsCopy } from "react-icons/bs";

export const GetInTouch: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = () => {
    const email = "dychkosergey@gmail.com";
    navigator.clipboard
      .writeText(email)
      .then(() => {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      })
      .catch((err) => console.error("Failed to copy email: ", err));
  };

  const handleCopyPhone = () => {
    const phone = "+380950839581";
    navigator.clipboard
      .writeText(phone)
      .then(() => {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      })
      .catch((err) => console.error("Failed to copy phone: ", err));
  };
  return (
    <Container className="py-24">
      <Heading>Get in touch</Heading>
      <Heading2 className="mt-4 mb-8 max-w-xl mx-auto text-center">
        What’s next? Feel free to reach out to me if you`re looking for a
        designer or a developer, have a query, or simply want to connect.
      </Heading2>
      <div className="p-4">
        <div className="flex flex-col justify-center items-center relative mx-auto">
          <span
            className="relative w-max font-semibold text-lg md:text-4xl justify-center text-gray-800 flex flex-row gap-3 md:gap-6 items-center"
            onClick={handleCopyEmail}
            title="Click to copy email"
          >
            <FiMail size={32} />
            dychkosergey@gmail.com
            <BsCopy
              size={32}
              className="ml-2 cursor-pointer hover:text-blue-500"
            />
            {copiedEmail && (
              <span className="absolute -right-32 top-4 mx-auto whitespace-nowrap rounded-full bg-gray-100 px-2.5 py-0.5 text-sm text-gray-700">
                Email copied!
              </span>
            )}
          </span>

          <span
            className="relative mt-4 w-max font-semibold justify-center text-lg md:text-4xl text-gray-800 flex flex-row gap-3 md:gap-6 items-center"
            onClick={handleCopyPhone}
            title="Click to copy phone"
          >
            <FiPhone size={32} />
            + 380 73 404 2536
            <BsCopy
              size={32}
              className="ml-2 cursor-pointer hover:text-blue-500"
            />
            {copiedPhone && (
              <span className="absolute -right-32 top-4 mx-auto whitespace-nowrap rounded-full bg-gray-100 px-2.5 py-0.5 text-sm text-gray-700">
                Phone Copied!
              </span>
            )}
          </span>
        </div>
      </div>
    </Container>
  );
};

export default GetInTouch;
