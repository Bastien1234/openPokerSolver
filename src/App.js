import logo from './logo.svg';
import './App.css';
import React from 'react';

import handSolver from './solver/handSolver.ts';
import makeDeck from './deck/makeDeck.ts';
import { TreeNode, TreeSubnode } from './tree/Node.ts';

function App() {
  
  const solving = () => 
    {
      console.time('solving');

      for (let i=0; i<1_000_000; i++)
      {
        let deck = makeDeck();
        let arr = deck.slice(0, 7);
        const myVal = handSolver(arr);
      }


      console.timeEnd('solving');
    }

    const node = new TreeNode();


  return (
    <div className="App">
      <button
        onClick={() => solving()}
        style={{
          marginTop: 50
        }}
      >solve 1 millions</button>
    </div>
  );
}

export default App;
