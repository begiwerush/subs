import SubscribeWrapper from "./components";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {EmailList} from "./components/backend";

function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
              <Route path="/" exact element={<SubscribeWrapper />} />
              <Route path="/backend" exact element={<EmailList />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
