import { AiOutlineEye, AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { GiRoundStar } from "react-icons/gi";
import { useCalculateTime } from "../../hooks/useCalculateTime";
import { memo } from "react";
import { Data } from "../../type/UserHome";

type UserHomeItemProps = {
  data: Data;
  like: (e: React.MouseEvent, id: number, likeCheck: boolean) => void;
  navigate: (path: string) => void;
  ImgUrl: string;
};

const UserHomeItem: React.FC<UserHomeItemProps> = memo(
  ({ data, like, navigate, ImgUrl }) => {
    const {
      category,
      content,
      hits,
      img,
      likeCount,
      sharePrice,
      uptDt,
      likeCheck,
      id,
      recommendation,
    } = data;

    const time = useCalculateTime(uptDt);

    return (
      <div className="item" onClick={() => navigate(`/user/share-post/${id}`)}>
        {likeCheck ? (
          <div className="img-icon">
            <AiTwotoneHeart
              className="redHeart"
              size="30"
              onClick={(e) => like(e, id, !!likeCheck)}
            />
          </div>
        ) : (
          <div className="img-icon">
            <AiOutlineHeart
              className="blankHeart"
              style={{ fill: "black" }}
              size="30"
              onClick={(e) => like(e, id, !!likeCheck)}
            />
          </div>
        )}

        {recommendation ? (
          <div className="recommend">
            <GiRoundStar style={{ fill: "orange" }} size={30} />
          </div>
        ) : null}

        <img src={`${ImgUrl}${img}`} alt="test" className="img" />

        <p>{`${sharePrice.toLocaleString()}원`}</p>
        <p>{`${
          content.length >= 10 ? `${content.slice(0, 10)}...` : content
        }`}</p>
        <p>{`${category} · ${time}`}</p>

        <div className="icon">
          <span className="eye">
            <AiOutlineEye />
            <span>{hits}</span>
          </span>

          <div className="heart">
            <AiOutlineHeart />
            <span>{likeCount ?? 0}</span>
          </div>
        </div>
      </div>
    );
  }
);

export default UserHomeItem;
