import Header from "../components/header"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">

  <Header />

  <main className="flex flex-1 justify-center items-center">
    <div className="flex flex-col items-center gap-8 font-roboto">
      <div className="flex items-center gap-4 justify-center w-full">
        <div className="header-text">
          <h1 className="text-left text-4xl font-bold">
            About Me!
          </h1>
        </div>
      </div>

      <div className="paragraph-text text-center max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4 text-left">The Origin Story</h2>
        <p className="text-left mb-8">
          I first began coding when I was a freshman in high school and decided to take AP Computer Science Principles
          to try it out, and I instantly fell in love. Since then, I took every computer science class that my
          school had to offer, as well as working with Leetcode and other websites to try and improve my coding 
          abilities.
          
          I also attended my first hackathon around the beginning of my sophomore year of high school to try and work in a team on a single 
          project for the first time. Our team, consisting completely of beginner coders with basic web design experience
          in HTML, CSS, and JavaScript, as well as a little bit of Python, made a website utilizing Python web scraping 
          to display many aspects of Chicago crime in 2019 in a user-friendly layout, including a heatmap and 
          a data table, organized by data types such as location, type of crime, and age of criminal.

          While we didn&apos;t end up winning anything, we all gained a lot of valuable experience with the division of responsibilities
          among our team and constant collaboration throughout the day, and ultimately finished our project on time and to the 
          quality that we were hoping to.
        </p>
        
        <h2 className="text-2xl font-bold mb-4 text-left">The Next Steps</h2>
        <p className="text-left mb-8">
          After finishing my first computer science class and hackathon, I knew that this was something I wanted to do for the 
          rest of my life. In the following years of high school, I took AP Computer Science A (Java), Mobile Application Development, 
          and Independent Study Computer Science.

          From there, I was blessed enough to be accepted into the University of Illinois at Urbana-Champaign to continue 
          my coding quest and pursue a bachelor&apos;s degree in Computer Science and Philosophy, where I have continued to 
          take classes and program in Java and C++, as well as learn about the philosophical foundations and applications 
          of computer science through studying the works of Alan Turing, Paul Churchland, and many other amazing philosophers 
          as they theorized the true extent of how the human brain can be applied to computers and neural networks, as well as 
          what the future holds for machine learning.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-left">What now?</h2>
        <p className="text-left mb-8">
          Today, I am continuing to program daily, working on Leetcode and side projects (like the website you are on right now) 
          to improve my programming abilities. In my free time, I also enjoy playing volleyball, both indoor and outdoor, 
          playing guitar, working on cars, and hanging out with my friends. I can&apos;t wait for what the future has in store for me!
        </p>
      </div>

    </div>
  </main>
</div>

  );
}
