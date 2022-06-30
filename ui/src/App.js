import React from 'react';
//import config from './config'
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Register from './User/Register/Register';
import Signin from './User/Signin/Signin';
import Home from './Pages/Home';
//const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const App = () => {

  //let [names, setNames] = useState([ ]);

  // useEffect(() => {
  //   fetch(ApiUrl + "/authors")
  //     .then(response => response.json())
  //     .then(data => setNames(data))
  //     .catch(err => console.log(err))
  // }, []);


  return (
    <Router>
      <Routes>
        <Route path = '/register' element = {<Register />}/>
        <Route path = '/signin' element = {<Signin />} />
        <Route path = '/home/:id' element = {<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
