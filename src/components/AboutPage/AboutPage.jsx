import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <p>Technologies used
          <br></br>
          -React
          <br></br>
          -Redux
          <br></br>
          -Sagas
          <br></br>
          -Material UI
          <br></br>
          -Node.js
          <br></br>
          -Express
          <br></br>
          -PostgreSql
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
