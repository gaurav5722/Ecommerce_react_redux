import React from "react";
import Typewriter from 'typewriter-effect';
//text must be array of string
const Jumbotron =({texting})=>
    (
    <Typewriter
        options={{
          strings: texting,
          autoStart: true,
          loop: true,
        }}
      />
    )


export default Jumbotron;