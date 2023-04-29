import React from 'react';
import NavBar from '../components/nav-bar';

function Home() {

  return (
    <>
      <NavBar />
      <section className="hero is-link is-halfheight">
        <div className="hero-body">
          <div>
            <p className="title is-spaced">
              Tutor Finder
            </p>
            <p className="subtitle">
              TutorFinderTW allows you to find tutors based in Taiwan. Here you can find tutors that teach in person or remotely, or even both! A wide variety of subjects/branches are offered by tutors at different prices, and you can even become one yourself for free by registering!
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;