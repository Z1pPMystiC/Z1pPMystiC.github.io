"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";

const calculateAge = (birthDate: string) => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

const Header: React.FC = () => {
  const initialText = "Michail";
  const finalText = "Misho";
  const [typedText, setTypedText] = useState(initialText);
  const typingSpeed = 400; // Typing speed
  const backspacingSpeed = 200; // Backspacing speed
  const beginningDelay = 3000;

  const indexRef = useRef(initialText.length);
  const isBackspacingRef = useRef(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const typeOutText = () => {
      if (isBackspacingRef.current) {
        if (indexRef.current > 0) {
          setTypedText((prev) => prev.slice(0, -1));
          indexRef.current--;
          timeoutRef.current = setTimeout(typeOutText, backspacingSpeed);
        } else {
          isBackspacingRef.current = false;
          indexRef.current = 0;
          timeoutRef.current = setTimeout(typeOutText, typingSpeed); // Start typing after backspacing
        }
      } else {
        if (indexRef.current < finalText.length) {
          setTypedText((prev) => finalText.slice(0, indexRef.current));
          indexRef.current++;
          timeoutRef.current = setTimeout(typeOutText, typingSpeed);
        } else {
          clearTimeout(timeoutRef.current!); // Clear timeout if done
          return; // Stop execution if complete
        }
      }
    };

    const startTyping = () => {
      timeoutRef.current = setTimeout(() => {
        typeOutText();
      }, beginningDelay);
    };

    startTyping();

    return () => {
      // Cleanup on unmount
      clearTimeout(timeoutRef.current!);
    };
  }, [initialText, finalText, beginningDelay, typingSpeed, backspacingSpeed]);

  const cursorStyle: React.CSSProperties = {
    display: 'inline-block',
    width: '6px',
    backgroundColor: 'black',
    animation: 'blink 0.7s infinite',
    fontSize: '40px',
    fontWeight: 'normal',
  };

  return (
    <div className="header-text">
      <h1 className="text-left text-4xl font-bold">
        Hey there, I&apos;m {typedText}
        <span style={cursorStyle}>|</span>,<br />
        and I am a Software Engineer.
      </h1>

      <style>{`
        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

const PersonalInfo = () => {
  const [age, setAge] = useState(calculateAge('2004-04-28'));

  useEffect(() => {
    const timer = setInterval(() => {
      setAge(calculateAge('2004-04-28'));
    }, 1000 * 60 * 60 * 24);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="paragraph-text text-center">
      <p>
        I am {age} years old and studying Computer Science and Philosophy<br />
        at the University of Illinois at Urbana-Champaign
      </p>
      <p>
        I enjoy coding, problem solving, and playing volleyball. Feel free to contact me!
      </p>
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
            <Image
              src="/images/me3.png"
              alt="Personal Picture"
              width={180}
              height={180}
              priority
            />
            <Header />
          </div>

          <PersonalInfo />
        </div>
      </main>

      <footer className="flex gap-32 flex-wrap items-center justify-center py-4 bg-transparent">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.linkedin.com/in/michail-metodiev/"
        >
          <Image
            aria-hidden
            src="/images/linkedin.png"
            alt="LinkedIn icon"
            width={40}
            height={40}
          />
        </a>
        <a 
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/Z1pPMystiC"
        >
          <Image
            aria-hidden
            src="/images/github.png"
            alt="Github icon"
            width={40}
            height={40}
          />
        </a>
      </footer>

    </div>
  );
}