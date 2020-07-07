import React from 'react';
import logo from './assets/images/logo.svg';
import './assets/css/App.css';


//importar componentes
import MarkdownPreviewer from './components/MarkdownPreviewer.js';



function App() {
  return (
    <div className="components">

            <MarkdownPreviewer />
    
    </div>
    
  );
}

export default App;
