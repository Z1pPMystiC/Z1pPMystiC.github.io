"use client";

import Image from "next/image";
import React, { useState } from 'react';

// Define the interface for a project
interface Project {
  title: string;
  description: string;
  repoUrl?: string;
}

// Sample projects data
const projects: Project[] = [
  {
    title: 'Personal Website 2.0',
    description: `The website you are on was a complete overhaul of my original personal portfolio website, now written in
    the Next.js React-based framework, allowing for further optimization, easier styling, and component-based page structure.`,
    repoUrl: 'https://github.com/Z1pPMystiC/Z1pPMystiC.github.io'
  },
  {
    title: 'ESG Based Trading Web Application',
    description: `“Moral Trade” is a portfolio management web application developed by a team of myself and three others, 
    made to help investors organize their portfolios based on the ESG score of a company, allowing them to make sure that
    they're investing in companies that follow core ethical values important to them.
    We created a dynamic web app from scratch using React.js for the front-end, Flask Python web framework 
    for the back-end, and a mySQL database for user authentication and database management. Worked collaboratively 
    as a team with GitHub, maintaining an organized workflow and helping overcome any merge conflicts as the 
    front-end and back-end teams worked at the same time.`,
  },
  {
    title: 'Fantasy Football Web Application',
    description: `“MVP Fantasy” is a fantasy football web application developed by a team of myself and three others, 
    made to help fantasy football users organize their teams, make predictions, and optimize their lineup.
    Created a dynamic web app from scratch using React.js for the front-end, Flask Python web framework 
    for the back-end, and Firebase for user authentication and database management. Worked collaboratively 
    as a team with GitHub, maintaining an organized workflow and helping overcome any merge conflicts as the 
    front-end and back-end teams worked at the same time.`,
  },
  {
    title: 'Bin Store Website',
    description: `Created a website for Bin City Co., a new bin store in Peoria, IL, showcasing unique offerings, 
    company background, and contact details. Developed a dynamic React.js website for the upcoming 
    bin store, ensuring a seamless experience across devices, and integrated Google Maps API for 
    easy navigation to the store’s physical location. Collaborated closely with the client, 
    translating their vision into a functional website through strong communication and iterative 
    development, exceeding expectations, and ongoing updates until store grand opening.`,
    repoUrl: 'https://github.com/Z1pPMystiC/bincityco',
  },
  {
    title: 'AI Password Manager Web App',
    description: `IntelliVault is a password manager web app that utilizes an AI chat bot to assist users in 
    creating and storing unique and secure passwords across their accounts. Created a dynamic 
    web app from scratch using React.js, delivering a user-friendly interface for seamless 
    navigation and interaction. Engineered user profiles and preferences using Firebase, 
    enhancing engagement and personalization. Currently in the process of integrating OpenAI’s 
    GPT-4 API to enhance user interactions by providing automated assistance for password 
    management tasks.`,
    repoUrl: 'https://github.com/Z1pPMystiC/IntelliVault',
  },
  {
    title: 'Personal Website 1.0',
    description: `The website you are on was my first summer project in 2023, as I wanted a new way of showcasing 
    myself and my work to the world. I designed and developed this site using HTML, CSS, and JavaScript, 
    showcasing my projects and skills in a visually appealing manner while also ensuring mobile 
    responsiveness, allowing the website to seamlessly adapt to various devices. I managed project 
    end-to-end, demonstrating time management and polished delivery, and keeping it updated with 
    new information.`,
    repoUrl: 'https://github.com/Z1pPMystiC/portfolio1.0'
  },
  {
    title: 'First-Person Shooter Video Game',
    description: `I developed a PG first-person shooter video game that I worked on throughout my senior year of 
    high school as the main componant of my Independent Study Computer Science class. I utilized 
    many different skills and programs, including 3D modeling and animation in Blender and C# 
    programming and game development in Unity. I learned how to 3D model and animate in a 3D 
    modeling software, program in a new language (C#), and utilize different parts of the Unity 
    software to make the game visually pleasing, including map and user interface design and 
    lighting, all without any previous experience.`,
    repoUrl: 'https://github.com/Z1pPMystiC/UnityFinalProject'
  },
  {
    title: 'Others',
    description: `Along with major projects like the ones above, I have also worked on smaller projects as parts 
    of classes or hackathons that are not as well rounded or complete as my larger projects. Most 
    of these projects do not have a GitHub repository connceted to them, or if they do, it is 
    privated in GitHub classroom, thus inaccessible to the public. However, I felt that I should 
    include them here anyways, as they did help me improve myself.`,
  },
  {
    title: 'Chicago Crime Statistic Website',
    description: `This project was created as a part of my first ever hackathon, utilizing the only programming 
    abilities I knew at the time, which was website design and Python web-scraping, which I learned 
    through AP Computer Science Principles. Since I did not even know about GitHub at the time, our 
    group ended up saving the project locally on our school computers, thus redering it inaccessible 
    today. However, I definitely learned my lesson from that mistake and avidly use GitHub today. 😅`,
  },
  {
    title: 'Campus Attractions App',
    description: `This was the final project for my Intro to Computer Science I (Java) class in my freshman year 
    of college. While the majority of the app was already created for us, we were tasked with adding 
    a new functionality for the app from scratch. I decided to add the ability to input the user's 
    location on the map and have each attraction display its distance from the user's set location, 
    so that the user has a better idea of how far each attraction is relative to them.`,
  },
  {
    title: 'Weekly C++ Projects',
    description: `Throughout my Intro to Computer Science II class (C++), we were tasked with completing a new project 
    every week utilizing all the coding that we had learned up to that point in the class. With each 
    project we were given a detailed write-up with what functions we were expected to implement, how the 
    overall application should work, and we were sometimes also given test cases in order to see if our 
    code worked as intended before submitting it. For the projects that we were not given test cases for, 
    we were expected to come up with our own to test our projects locally before submitting to the final 
    autograder, which had a limited number of grading attempts for full credit.`,
  },
  {
    title: 'Weekly C/Python Projects',
    description: `Throughout my Computer Systems class (half in C and half in Python), we were tasked with completing a new project 
    every week utilizing all the coding that we had learned up to that point in the class. With each 
    project we were given a detailed write-up with what functions we were expected to implement, how the 
    overall application should work, and we were sometimes also given test cases in order to see if our 
    code worked as intended before submitting it. For the projects that we were not given test cases for, 
    we were expected to come up with our own to test our projects locally before submitting to the final 
    autograder, which had a limited number of grading attempts for full credit.`,
  },
];

const Projects: React.FC = () => {
  const [openProjects, setOpenProjects] = useState<Set<string>>(new Set());

  const toggleProject = (title: string) => {
    setOpenProjects(prev => {
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

      {projects.map((project) => (
        <div key={project.title} className="mb-4">
          <button 
            onClick={() => toggleProject(project.title)} 
            className="project-subtitle-text text-lg font-bold w-full text-left focus:outline-none"
          >
            {project.title}
          </button>
          {openProjects.has(project.title) && (
            <div className="project-paragraph-text mt-2 text-left">
              <p>{project.description}</p>
              {project.repoUrl && (
                <p className="mt-2">
                  You can check out the GitHub repo for this project
                  <a href={project.repoUrl} className="github-repo-link ml-1" target="_blank" rel="noopener noreferrer">here</a>.
                </p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">

  <header className="flex items-center justify-between p-4 bg-transparent">
    <a className="flex items-center gap-3" href="/">
      <div className="flex items-center gap-2">
        <Image
          className="logo-img"
          src="/images/pfp.png"
          alt="Profile Picture"
          width={40}
          height={40}
          priority
        />
        <div className="title-text text-xl font-bold">
          Misho Metodiev
        </div>
      </div>
    </a>
    <div className="nav-buttons flex gap-4">
      <a className="header-button-text text-lg font-bold hover:underline" href="/">Home</a>
      <a className="header-button-text text-lg font-bold hover:underline" href="/about">About</a>
      <a className="header-button-text text-lg font-bold hover:underline" href="/projects">Projects</a>
      <a className="header-button-text text-lg font-bold hover:underline" href="/contact">Contact</a>
    </div>
  </header>

  <main className="flex flex-1 justify-center items-center">
    <div className="flex flex-col items-center gap-8 font-roboto">
      <div className="flex items-center gap-4 justify-center w-full">
        <div className="header-text">
          <h1 className="text-left text-4xl font-bold">
            My Projects!
          </h1>
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
