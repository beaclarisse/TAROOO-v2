import * as React from "react";
import Header from "./layout/Header";
import Hero from "./layout/Hero";
import withRoot from "./modules/withRoot";

function Index() {
  return (
    <div className="App">
      <div>
        <div className="white-gradient" />
        <React.Fragment>
          <Header />
          <Hero />
        </React.Fragment>
      </div>
    </div>
  );
}

export default withRoot(Index);
