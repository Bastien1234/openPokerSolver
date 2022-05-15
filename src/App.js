import logo from './logo.svg';
import './App.css';
import React, {useState } from 'react';

import handSolver from './handSolver/handSolver.ts';
import makeDeck from './deck/makeDeck.ts';
import { TreeNode, TreeSubnode } from './tree/Node.ts';
import Tree from './tree/Tree.ts';
import main from './main.ts';

function App() {

  return (
    
    <div className="App">
      

      <button
      onClick={() => main()}
      style={{
        marginTop: 50
      }}
      >solve 1 millions</button>
      
      
    </div>
  );
}

export default App;
