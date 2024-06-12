import Home from "./components/Home/Home"
import Random from "./components/Random/Random"
import Screenshots from './components/Screenshots/Screenshots'
import Screenshot from "./components/Screenshots/Screenshot"
import PostComment from "./components/Screenshots/PostComment"
import Upload from "./components/Upload/Upload"
import Login from "./components/Admin/Login"
import Admin from "./components/Admin/Admin"
import Register from "./components/Admin/Register"
import Edit from "./components/Admin/Edit"
import Tags from "./components/Tags/Tags"
import Tag from "./components/Tags/Tag"
import SearchScreenshots from "./components/Screenshots/ScreenshotsSearch"
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/random" element={<Random />} />
      <Route path="/screenshots" element={<Screenshots/>} />
      <Route path="/screenshot/:id" element={<Screenshot/>} />
	  <Route path="/upload" element={<Upload/>} />
      <Route path="/postcomment/:id" element={<PostComment/>} />
	  <Route path="/login" element={<Login/>} />
	  <Route path="/register" element={<Register/>} />
	  <Route path="/admin" element={<Admin/>} />	  
	  <Route path="/tags" element={<Tags/>} />
	  <Route path="/tags/:id" element={<Tag/>} />
	  <Route path="/search/:search" element={<SearchScreenshots/>} />
	  <Route path="/search" element={<Screenshots/>} />
	  <Route path="/edit/:id" element={<Edit/>} />
    </Routes>
  );
}
export default App;
