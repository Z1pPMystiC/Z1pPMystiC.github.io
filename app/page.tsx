"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import Header from './components/header';

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

const Name: React.FC = () => {
  const initialName = "Michail";
  const finalName = "Misho";
  const roleTextArr = ["student.", "goalie", "guitarist", "libero", "Software Engineer."];

  const [typedText, setTypedText] = useState(initialName);
  const [typedRole, setTypedRole] = useState(roleTextArr[0]); // Start with the first role already typed
  const [isTypingRole, setIsTypingRole] = useState(false); // Tracks whether we're typing the role
  const [showCursorAtEnd, setShowCursorAtEnd] = useState(false); // Tracks if the cursor should stay at the end of the final role

  const typingSpeed = 150; // Typing speed for name
  const backspacingSpeed = 100; // Backspacing speed
  const cursorChangeDelay = 1500;
  const roleTypingSpeed = 100; // Typing speed for role
  const roleBackspacingSpeed = 100; // Backspacing speed for role
  const delayBetweenRoles = 1000; // Delay between typing out roles
  const beginningDelay = 2000;

  const nameIndexRef = useRef(initialName.length); // Start with full initial name
  const roleIndexRef = useRef(roleTextArr[0].length); // Role typing progress, starting with the first role already typed
  const roleArrIndexRef = useRef(0); // Which role to type
  const isBackspacingRef = useRef(false); // Is backspacing the name/role?
  const isTypingNameDoneRef = useRef(false); // Has the final name "Misho" been typed?
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const typeOutName = () => {
      if (isBackspacingRef.current) {
        if (nameIndexRef.current > 0) {
          setTypedText((prev) => prev.slice(0, -1)); // Backspace the name
          nameIndexRef.current--;
          timeoutRef.current = setTimeout(typeOutName, backspacingSpeed);
        } else {
          // Once name is fully backspaced, start typing "Misho"
          isBackspacingRef.current = false;
          timeoutRef.current = setTimeout(typeOutName, typingSpeed);
        }
      } else {
        if (nameIndexRef.current < finalName.length) {
          setTypedText(finalName.slice(0, nameIndexRef.current + 1)); // Type final name
          nameIndexRef.current++;
          timeoutRef.current = setTimeout(typeOutName, typingSpeed);
        } else {
          timeoutRef.current = setTimeout(() => {
            isTypingNameDoneRef.current = true;
            setIsTypingRole(true); // Start typing roles, cursor will move to roles
            timeoutRef.current = setTimeout(typeOutRole, delayBetweenRoles); // Start typing role
          }, cursorChangeDelay);
        }
      }
    };

    const typeOutRole = () => {
      if (roleIndexRef.current < roleTextArr[roleArrIndexRef.current].length) {
        setTypedRole(
          roleTextArr[roleArrIndexRef.current].slice(0, roleIndexRef.current + 1)
        ); // Type each character of the role
        roleIndexRef.current++;
        timeoutRef.current = setTimeout(typeOutRole, roleTypingSpeed);
      } else {
        if (roleArrIndexRef.current === roleTextArr.length - 1) {
          // When the last role is fully typed, stop
          clearTimeout(timeoutRef.current!);
          setShowCursorAtEnd(true); // Show the cursor at the end of the final role
          setIsTypingRole(false); // Stop showing cursor for roles
        } else {
          // Backspace the role after a delay
          timeoutRef.current = setTimeout(backspaceRole, delayBetweenRoles);
        }
      }
    };

    const backspaceRole = () => {
      if (roleIndexRef.current > 0) {
        setTypedRole((prev) => prev.slice(0, -1)); // Backspace the role
        roleIndexRef.current--;
        timeoutRef.current = setTimeout(backspaceRole, roleBackspacingSpeed);
      } else {
        roleArrIndexRef.current++; // Move to the next role
        timeoutRef.current = setTimeout(typeOutRole, typingSpeed);
      }
    };

    const startTyping = () => {
      // Start by backspacing the initial name
      isBackspacingRef.current = true;
      timeoutRef.current = setTimeout(typeOutName, typingSpeed);
    };
    
    const startDelay = () => {
      timeoutRef.current = setTimeout(startTyping, beginningDelay);
    };
    
    startDelay();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const cursorStyle: React.CSSProperties = {
    display: 'inline-block',
    width: '5px',
    backgroundColor: 'black',
    animation: 'blink 1s steps(1) infinite', // Pure blinking effect (not fading)
    position: 'absolute', // Absolute positioning to avoid text shifting
    fontSize: '30px',
    fontWeight: 'normal',
  };

  const cursorPlaceholderStyle: React.CSSProperties = {
    width: '0px', // Maintain the space of the cursor to prevent layout shift
    display: 'inline-block',
  };

  return (
    <div className="header-text" style={{ position: 'relative' }}>
      <h1 className="text-center sm:text-left text-2xl font-bold">
        Hey there, I&apos;m {typedText}
        {!isTypingNameDoneRef.current && (
          <>
            <span style={cursorStyle}>|</span>
            <span style={cursorPlaceholderStyle} />
          </>
        )},
        <br />
        and I&apos;m a {typedRole}
        {isTypingRole && (
          <>
            <span style={cursorStyle}>|</span>
            <span style={cursorPlaceholderStyle} />
          </>
        )}
        {showCursorAtEnd && <span style={cursorStyle}>|</span>}
      </h1>

      <style>{`
        @keyframes blink {
          0% { visibility: visible; }
          50% { visibility: hidden; }
          100% { visibility: visible; }
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
        I am {age} years old and studying Computer Science and Philosophy 
        at the University of Illinois at Urbana-Champaign.
        I enjoy coding, problem solving, and playing volleyball. Feel free to contact me!
      </p>
    </div>
  );
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Header />

      <main className="flex flex-1 justify-center items-center">
        <div className="flex flex-col items-center gap-8 font-roboto">
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center w-full">
            {/* Adjust image size based on screen width */}
            <Image
              src="/images/skyIntroPic.png"
              alt="Personal Picture"
              width={180}
              height={180}
              priority
              className="w-48 h-48 sm:w-48 sm:h-48 rounded-3xl" // Increase size on larger screens
            />
            {/* Make Name font smaller */}
            <div className="sm:ml-4 mt-4 sm:mt-0 text-center sm:text-left">
              <Name />
            </div>
          </div>

          {/* Make PersonalInfo narrower */}
          <div className="mt-4 sm:mt-0 max-w-2xl w-full">
            <PersonalInfo />
          </div>
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

      <style jsx>{`
        @media (max-width: 640px) {
          main {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
