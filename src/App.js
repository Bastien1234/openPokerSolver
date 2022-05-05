import logo from './logo.svg';
import './App.css';
import React, {useState } from 'react';

import handSolver from './handSolver/handSolver.ts';
import makeDeck from './deck/makeDeck.ts';
import { TreeNode, TreeSubnode } from './tree/Node.ts';
import Tree from './tree/Tree.ts';

function App() {

  const [isLoading, setIsLoading ] = useState(false);

  
  const solving = () => 
    {
      setIsLoading(true);
      console.time('solving');
      let straightFlushes = 0;

      for (let i=0; i<1_000_000; i++)
      {
        let deck = makeDeck();
        let arr = deck.slice(0, 7);
        const myVal = handSolver(arr);
        if (myVal > 900_000_000_000)
        {
          straightFlushes ++;
        }
      }

      setIsLoading(false);
      console.timeEnd('solving');
      console.log(`Percentage of straight flushes : ${straightFlushes / 1000000 * 100} %`);
    }

    const node = new TreeNode();

    // const tree = new Tree();
    // tree.makeRiverTree();


  return (
    
    <div className="App">
      <h3>{isLoading.toString()}</h3>

      {
        isLoading === false ? 
        <button
        onClick={() => solving()}
        style={{
          marginTop: 50
        }}
        >solve 1 millions</button>
        :

        <h1>Loading...</h1>
      }
      
      
    </div>
  );
}

export default App;
