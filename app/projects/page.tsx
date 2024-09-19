"use client";

import React, { useState } from "react";
import Header from "../components/header";

// Define the interface for a project
interface Project {
  title: string;
  description: string;
  repoUrl?: string;
}

// Main projects data (excluding the last four)
const projects: Project[] = [
  {
    title: "Personal Website 2.0",
    description: `The website you are on was a complete overhaul of my original personal portfolio website, now written in
    the Next.js React-based framework, allowing for further optimization, easier styling, and component-based page structure.`,
    repoUrl: "https://github.com/Z1pPMystiC/Z1pPMystiC.github.io",
  },
  {
    title: "ESG Based Trading Web Application",
    description: `“Moral Trade” is a portfolio management web application developed by a team of myself and three others, 
    made to help investors organize their portfolios based on the ESG score of a company, allowing them to make sure that
    they're investing in companies that follow core ethical values important to them.`,
  },
  {
    title: "Fantasy Football Web Application",
    description: `“MVP Fantasy” is a fantasy football web application developed by a team of myself and three others, 
    made to help fantasy football users organize their teams, make predictions, and optimize their lineup.`,
  },
  {
    title: "Bin Store Website",
    description: `Created a website for Bin City Co., a new bin store in Peoria, IL, showcasing unique offerings, company background, and contact details.`,
    repoUrl: "https://github.com/Z1pPMystiC/bincityco",
  },
  {
    title: "AI Password Manager Web App",
    description: `IntelliVault is a password manager web app that utilizes an AI chat bot to assist users in creating and storing unique and secure passwords.`,
    repoUrl: "https://github.com/Z1pPMystiC/IntelliVault",
  },
  {
    title: "Personal Website 1.0",
    description: `The website you are on was my first summer project in 2023, as I wanted a new way of showcasing 
    myself and my work to the world.`,
    repoUrl: "https://github.com/Z1pPMystiC/portfolio1.0",
  },
  {
    title: "First-Person Shooter Video Game",
    description: `I developed a PG first-person shooter video game that I worked on throughout my senior year of high school as the main component of my Independent Study Computer Science class.`,
    repoUrl: "https://github.com/Z1pPMystiC/UnityFinalProject",
  },
];

// Last four projects (to be placed under "Others")
const otherProjects: Project[] = [
  {
    title: "Chicago Crime Statistic Website",
    description: `This project was created as a part of my first ever hackathon, utilizing website design and Python web-scraping, which I learned through AP Computer Science Principles.`,
  },
  {
    title: "Campus Attractions App",
    description: `This was the final project for my Intro to Computer Science I (Java) class in my freshman year of college.`,
  },
  {
    title: "Weekly C++ Projects",
    description: `Throughout my Intro to Computer Science II class (C++), we were tasked with completing a new project every week utilizing all the coding that we had learned up to that point in the class.`,
  },
  {
    title: "Weekly C/Python Projects",
    description: `Throughout my Computer Systems class (half in C and half in Python), we were tasked with completing a new project every week utilizing all the coding that we had learned up to that point in the class.`,
  },
];

const Projects: React.FC = () => {
  const [openProjects, setOpenProjects] = useState<Set<string>>(new Set());

  const toggleProject = (title: string) => {
    setOpenProjects((prev) => {
      const newOpenProjects = new Set(prev);
      if (newOpenProjects.has(title)) {
        newOpenProjects.delete(title);
      } else {
        newOpenProjects.add(title);
      }
      return newOpenProjects;
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="project-paragraph-text mb-4 text-left">
        Throughout my coding career, I have worked on many side projects, some bigger than others, 
        to try and continuously improve my abilities. This page is dedicated to showcasing them along
        with some explanation behind each one. This list is also continuously expanding as I work on 
        various new projects, which I will post here.
      </div>

      {projects.map((project) => {
        const isOpen = openProjects.has(project.title);
        return (
          <div key={project.title} className="mb-4">
            <button
              onClick={() => toggleProject(project.title)}
              className="project-subtitle-text text-lg font-bold w-full text-left focus:outline-none flex justify-between items-center"
            >
              <span>{project.title}</span>
              <span className="ml-2">{isOpen ? "▲" : "▼"}</span>
            </button>
            {isOpen && (
              <div className="project-paragraph-text mt-2 text-left">
                <p>{project.description}</p>
                {project.repoUrl && (
                  <p className="mt-2">
                    You can check out the GitHub repo for this project
                    <a
                      href={project.repoUrl}
                      className="github-repo-link ml-1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      here
                    </a>
                    .
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}

      {/* Others Section */}
      <div className="mb-4">
        <button
          onClick={() => toggleProject("Others")}
          className="project-subtitle-text text-lg font-bold w-full text-left focus:outline-none flex justify-between items-center"
        >
          <span>Others</span>
          <span className="ml-2">
            {openProjects.has("Others") ? "▲" : "▼"}
          </span>
        </button>
        {openProjects.has("Others") && (
          <div className="ml-4">
            <div className="text-left py-2">
              Along with major projects like the ones above, I have also worked on smaller projects as parts 
              of classes or hackathons that are not as well rounded or complete as my larger projects. Most 
              of these projects do not have a GitHub repository connceted to them, or if they do, it is 
              privated in GitHub classroom, thus inaccessible to the public. However, I felt that I should 
              include them here anyways, as they did help me improve myself.
            </div>
            {otherProjects.map((project) => {
              const isOpen = openProjects.has(project.title);
              return (
                <div key={project.title} className="mb-4">
                  <button
                    onClick={() => toggleProject(project.title)}
                    className="project-subtitle-text text-lg font-bold w-full text-left focus:outline-none flex justify-between items-center"
                  >
                    <span>{project.title}</span>
                    <span className="ml-2">{isOpen ? "▲" : "▼"}</span>
                  </button>
                  {isOpen && (
                    <div className="project-paragraph-text mt-2 text-left">
                      <p>{project.description}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main className="flex flex-1 justify-center items-center">
        <div className="flex flex-col items-center gap-8 font-roboto">
          <div className="flex items-center gap-4 justify-center w-full">
            <div className="header-text">
              <h1 className="text-left text-4xl font-bold">My Projects!</h1>
            </div>
          </div>
          <div className="paragraph-text text-center">
            <Projects />
          </div>
        </div>
      </main>
    </div>
  );
}
