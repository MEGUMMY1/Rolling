// Post.jsx
import Header from '../../components/Header';
import PostMain from '../../components/PostMain';
import Subheader from '../../components/Subheader';

//Post Page

function Post() {
  return (
    <>
      <Header isbutton={false} />
      <Subheader />
      <PostMain />
    </>
  );
}

export default Post;
