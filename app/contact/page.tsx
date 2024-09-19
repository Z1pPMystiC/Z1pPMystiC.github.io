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
                Contact Me!
              </h1>
            </div>
          </div>

          <div className="paragraph-text text-center">
            <div className="max-w-3xl mx-auto px-4">
              <div className="contact-paragraph-text text-left mb-6">
                You can also find me here. Feel free to reach out and contact me at any of the places below, 
                and I will get back to you as soon as possible. Thank you!
              </div>
        
              <div className="contact-subtitle-text text-left text-2xl font-bold mb-2">
                Gmail
              </div>
              <div className="contact-paragraph-text text-left mb-6">
                Reach out to me at 
                <a href="mailto:mishommetodiev@gmail.com?subject=I%20Just%20Saw%20Your%20Website%21" className="link-text ml-1">
                  mishommetodiev [at] gmail [dot] com
                </a>
              </div>
        
              <div className="contact-subtitle-text text-left text-2xl font-bold mb-2">
                LinkedIn
              </div>
              <div className="contact-paragraph-text text-left mb-6">
                Check out my LinkedIn page 
                <a href="https://www.linkedin.com/in/michail-metodiev/" className="link-text ml-1">here</a>
              </div>
        
              <div className="contact-subtitle-text text-left text-2xl font-bold mb-2">
                GitHub
              </div>
              <div className="contact-paragraph-text text-left">
                You can also find my GitHub profile 
                <a href="https://github.com/Z1pPMystiC" className="link-text ml-1">here</a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
