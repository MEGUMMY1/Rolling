// App.js
import "./global.scss";
import "./reset.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Post from "./pages/Post/Post";
import FromMsgPage from "./pages/Msg/FromMsg/FromMsgPage";
import PostId from "./pages/Post/Postid";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post">
          <Route index element={<Post />} />
          <Route path=":postId" element={<PostId />} />
        </Route>
        <Route path="/post/:id/message" element={<FromMsgPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
