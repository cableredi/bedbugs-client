import React from 'react';

export default function Landing() {
  return (
    <section className = 'section-page'>
      <header role="banner">
        <h1>bedbugs</h1>
        <h2>Keep track of those annoying bugs in your applications!</h2>
      </header>

      <section>
        <h3>
          What bedbugs can do for you?
        </h3>
        <div>
          <p>Have you ever been new to a project and dont know where to start?</p>
          <p>Maybe you are a seasoned veteran, go on vacation and come back to find you've forgotten what bugs you were working
            on?</p>
          <p>Or maybe you just like writing down and being able to keep track of your bugs</p>
        </div>
        <p>
          If so, bedbugs is for you!!!  Check it out as our new developer, Nugget, to see what bedbugs is all about. 
        </p>
        <button>Login to bedbugs as Nugget</button>
      </section>
    </section>
  )
}