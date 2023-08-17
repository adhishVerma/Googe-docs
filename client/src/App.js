import TextEditor from "./components/TextEditor";
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} exact />
        <Route path="/documents/:id" element={<TextEditor />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
