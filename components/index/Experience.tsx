import React from "react";
import Container from "@/components/Container";
import Heading from "@/components/partials/Heading";
import Heading2 from "@/components/ui/typography/Heading2";

const Experience: React.FC = () => {
  const experiences = [
    {
      company: "Wyvate",
      image: "newgen-logo.png",
      role: "Full Stack Developer",
      duration: "Apr 2024 - Present",
      responsibilities: [
        "Supported Design the Wyvate Admin and Vendor Panel.",
        "Supported making the QR and Tape Design for the brand.",
      ],
    },
    {
      company: "Wyvate",
      image: "fluidweb-logo.png",
      role: "Full Stack Developer",
      duration: "Nov 2021 - Apr 2024",
      responsibilities: [
        "Supported Design the Wyvate Admin and Vendor Panel.",
        "Supported making the QR and Tape Design for the brand.",
      ],
    },
    {
      company: "Sense Original",
      image: "grandysoft-logo.webp",
      role: "Front End Developer",
      duration: "Jun 2021 - Aug 2021",
      responsibilities: [
        "Designed Website for Sense Original",
        "Designed a SOIPSIT application that was a collaboration of Sense Original with PSIT College.",
        "Designed the CRM Panel, along with its user flow, wireframing and prototyping.",
      ],
    },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-950 py-24">
      <Container>
        <Heading>Experience</Heading>
        <Heading2 className="mt-4 mb-8 text-center">
          Here is a quick summary of my most recent experiences:
        </Heading2>
        {experiences.map((experience, index) => (
          <div
            key={index}
            className="max-w-4xl mx-auto mb-8 bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 mb-8 flex flex-col md:flex-row gap-4 md:gap-12"
          >
            <div className="flex items-center mb-2">
              <img
                src={`/images/${experience.image}`}
                alt={experience.company}
                className="max-w-32 mr-2 bg-white"
              />
            </div>
            <div className="flex-grow">
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">
                {experience.role}
              </p>
              <ul className="list-disc list-inside">
                {experience.responsibilities.map((responsibility, index) => (
                  <li key={index} className="text-gray-900 dark:text-gray-50">
                    {responsibility}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-gray-500 mb-4 whitespace-nowrap">
                {experience.duration}
              </p>
            </div>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default Experience;
