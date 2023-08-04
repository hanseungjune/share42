import { FaEye, FaRegComment } from "react-icons/fa";
import { getTimeAgo } from "../../utils/getTimeAgo";

export type PostTypes = {
  item: any;
  handleDetailNavigate: (id: string) => void;
};

const PostItem = ({ item, handleDetailNavigate }: PostTypes) => {
  return (
    <div
      style={{
        padding: "1rem",
        height: "140px",
        width: "90vw",
        borderBottom: "1px solid #adadad",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      onClick={() => handleDetailNavigate(item.userId)}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span
          style={{
            padding: "0.5rem 1rem",
            width: "4rem",
            height: "1.4rem",
            backgroundColor: "#EFEFEF",
            color: "#3b3b3b",
          }}
        >
          {item.category}
        </span>
        <span
          style={{
            fontSize: "1.4rem",
            fontWeight: "900",
            lineHeight: "2.5rem",
          }}
        >
          {item.title.slice(0, 15) + "..."}
        </span>
        <span
          style={{
            color: "#adadad",
            lineHeight: "1rem",
            fontWeight: "900",
          }}
        >
          {item.content.slice(0, 15) + "..."}
        </span>
        <span
          style={{
            color: "#adadad",
            lineHeight: "2rem",
            fontWeight: "900",
          }}
        >
          {item.region + " " + getTimeAgo(item.date)}
        </span>
      </div>
      <div
        style={{
          width: "24vw",
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "end",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#adadad",
            fontSize: "1rem",
          }}
        >
          <FaRegComment
            style={{
              fontSize: "1rem",
              color: "#adadad",
            }}
          />
          <div
            style={{
              marginLeft: "0.5rem",
              marginRight: "0.5rem",
            }}
          >
            {item.commentCount}
          </div>
          <FaEye
            style={{
              fontSize: "1.2rem",
              color: "#adadad",
            }}
          />
          <div
            style={{
              marginLeft: "0.5rem",
            }}
          >
            {item.hit}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
