import React from 'react';
const Help = () => {
  return (
    <div className="content-container">
      <p>Your goal is to guess the pattern of the four hidden pegs.
      Multiple occurrence of the same colour is possible, empty holes are not. After each attempt a feedback is provided by placing
      up to four small black/white pegs on the left side:
          </p>
      <ul>
        <li>
          <p>Each white peg means that one of the guessed pegs is correct, but is in the wrong hole.</p>
        </li>
        <li>
          <p>Each black peg means that one of the guessed pegs is correct, and is in the right hole.</p>
        </li>
        <li>
          <p>The order of the white and black pegs does not matter.</p>
        </li>
      </ul>
      <p>You need to combine all the given feddback to get to the hidden pattern. If
      you enter the hidden pattern, your round will be rated by the number of attempts.
      After 9 failed attempts the round will be over and automatically rated with 10.
        </p>
    </div>
  );
}
export default Help;