/* eslint-disable max-len */
/** @jsxImportSource @emotion/react */
import {
  memo,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import { AiOutlineHeart, AiTwotoneHeart, AiOutlineEye } from "react-icons/ai";
import { GiRoundStar } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import UserHomeSpeedDial from "../../components/user/UserHomeSpeedDial";
import * as userHomeStyle from "../../components/user/UserHomeStyle";
import { ErrorMessage } from "../../components/ErrorMessage";
import ErrorBoundary from "../../components/ErrorBoundary";
import BottomMenuBar from "../../components/BottomMenuBar";
import DropDown from "../../components/UI/DropDown";
import Loading from "../../components/Loading";
import pinkBox from "../../assets/pinkBox.png";
import { Data, Props } from "../../type/UserHome";
import { UserHomeFetcher } from "../../components/user/UserHomeFetcher";
import { useLikeMutation } from "../../hooks/useLikeMutation";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

// 컨텐츠를 보여주는 컴포넌트
function UserHomeList(props: Partial<Props>) {
  const { fetchNextPage, data, hasNextPage } = props;
  const divRef = useRef<HTMLDivElement | any>({});
  const ImgUrl = process.env.REACT_APP_IMAGE_URL;
  const navigate = useNavigate();

  const { like } = useLikeMutation();

  const { observeElement } = useIntersectionObserver(
    fetchNextPage,
    hasNextPage
  );

  // data가 변경될 떄마다 새로운 요소를 감시한다.
  useEffect(() => {
    if (divRef?.current && data?.pages?.length) {
      const lastIndex = data?.pages?.length - 1;
      observeElement(divRef?.current[lastIndex]);
    }
  }, [data]);

  return (
    <>
      {data?.pages.length ? (
        data?.pages.map((data: Data, index: number) => {
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
          const date = new Date();
          let time = "";

          const YEAR = date.getFullYear();
          const MONTH = date.getMonth() + 1;
          const DAY = date.getDate();
          const HOUR = date.getHours();
          const MINUTES = date.getMinutes();

          const [uptYear, uptTime] = uptDt.split(".")[0].split("T");

          const UPTYEAR = +uptYear.split("-")[0];
          const UPTMONTH = +uptYear.split("-")[1];
          const UPTDAY = +uptYear.split("-")[2];
          const UPTHOUR = +uptTime.split(":")[0];
          const UPTMINUTES = +uptTime.split(":")[1];

          if (UPTYEAR < YEAR) {
            time = `${YEAR - UPTYEAR}년전 `;
          } else {
            if (UPTMONTH < MONTH) {
              time = `${MONTH - UPTMONTH}달전`;
            } else {
              if (UPTDAY < DAY) {
                time = `${DAY - UPTDAY}일전`;
              } else {
                if (UPTHOUR < HOUR) {
                  time = `${HOUR - UPTHOUR}시간전`;
                } else {
                  if (UPTMINUTES < MINUTES) {
                    time = `${MINUTES - UPTMINUTES}분전`;
                  } else {
                    time = `방금전`;
                  }
                }
              }
            }
          }

          return (
            <div
              className="item"
              key={index}
              ref={(ref) => {
                return (divRef.current[index] = ref);
              }}
              onClick={() => navigate(`/user/share-post/${id}`)}
            >
              {likeCheck ? (
                <div className="img-icon">
                  <AiTwotoneHeart
                    className="redHeart"
                    size="30"
                    onClick={(e) => like(e, id, likeCheck)}
                  />
                </div>
              ) : (
                <div className="img-icon">
                  <AiOutlineHeart
                    className="blankHeart"
                    style={{ fill: "black" }}
                    size="30"
                    onClick={(e) => like(e, id, likeCheck)}
                  />
                </div>
              )}

              {/* 추천 표시 */}
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
        })
      ) : (
        <div css={userHomeStyle.img}>
          <p>빈 리스트 입니다</p>
          <img src={pinkBox} alt="blank" />
        </div>
      )}
    </>
  );
}

// 상위 컴포넌트
const category = ["최신순", "가격순", "조회수"];

function UserHome() {
  const [value, setValue] = useState<string>("");
  const [sortNum, setSortNum] = useState<number>(0);

  useEffect(() => {
    // select box value
    if (value === "최신순") {
      setSortNum(0);
    } else if (value === "가격순") {
      setSortNum(1);
    } else if (value === "조회수") {
      setSortNum(2);
    }
  }, [value]);

  return (
    <>
      <div css={userHomeStyle.content(value)} id="scrollArea">
        {/* 드롭다운 */}
        <div className="sort-bar">
          <DropDown data={category} setValue={setValue} content={"최신순"} />
        </div>
        {/* 스피드 다이얼 */}
        <div className="speed-dial">
          <UserHomeSpeedDial />
        </div>
        {/* 컨텐츠 */}
        <div className="container">
          <ErrorBoundary fallback={ErrorMessage}>
            <Suspense fallback={<Loading />}>
              {/* <MemoUserHomeFetcher sortNum={sortNum}>
                <MemoUserHomeList />
              </MemoUserHomeFetcher> */}
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
      <BottomMenuBar />
    </>
  );
}

const MemoUserHomeList = memo(UserHomeList);
// const MemoUserHomeFetcher = memo(UserHomeFetcher);

export default UserHome;
