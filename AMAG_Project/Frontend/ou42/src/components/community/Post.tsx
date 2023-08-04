import { PostType } from "../../hooks/useLoadPosts";
import { useNavigate } from "react-router-dom";
import PostItem from "./PostItem";

export type PostTypes = {
  posts: PostType[];
};

const Post = ({ posts }: PostTypes) => {
  const navigate = useNavigate();

  const handleDetailNavigate = (id: string) => {
    navigate(`/user/community/${id}`);
  };

  return (
    <div
      style={{
        borderTop: "1px solid #adadad",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "7vh",
        marginTop: "11vh",
      }}
    >
      {posts.map((item: any, index: number) => (
        <PostItem
          key={index}
          item={item}
          handleDetailNavigate={handleDetailNavigate}
        />
      ))}
    </div>
  );
};

export default Post;
