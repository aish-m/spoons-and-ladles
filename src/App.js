import React, {useState} from 'react';
import './App.css';
import Header from "./Header";


function App() {
    const [currentTab, setCurrentTab] = useState(0);
    console.log(currentTab);

      return (
          <div className="app">
            <Header currentTab={currentTab} tabHandler={setCurrentTab}/>
          </div>
      );
}

export default App;
