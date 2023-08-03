/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import { rest } from "msw";

const USER = 0;
const REPAIR = 1;
const INSPECTOR = 2;
const INSURANCE = 3;

const users = [
  { id: "user1", password: "pass1", userType: USER },
  { id: "user2", password: "pass2", userType: REPAIR },
  { id: "user3", password: "pass3", userType: INSPECTOR },
  { id: "user4", password: "pass4", userType: INSURANCE },
];

interface LoginRequestBody {
  loginid: string;
  loginpassword: string;
}

const HTTPS_URL = process.env.REACT_APP_API_MAIN_KEY;

const posts = [...Array(100).keys()].map((id) => {
  const date = new Date();
  date.setDate(date.getDate() + id + 1); // 현재 날짜에 id+1 일수를 더합니다.
  return {
    id: id + 1,
    category:
      id % 5 === 0
        ? "recent"
        : id % 5 === 1
        ? "popular"
        : id % 5 === 2
        ? "news"
        : id % 5 === 3
        ? "need"
        : "share",
    title: `게시물 제목 ${id + 1}`,
    content: `게시물 내용 ${id + 1}`,
    region: "서울특별시 종로구",
    date: date,
    hit: Math.floor(Math.random() * 100),
    commentCount: Math.floor(Math.random() * 10),
    userId: "hanseungjune",
  };
});

function getPosts(page = 1, sort = "recent", order = "asc") {
  let sortedPosts = [...posts];

  if (sort === "news" || sort === "need" || sort === "share") {
    sortedPosts = sortedPosts.filter((post) => post.category === sort);
  }

  if (
    sort === "recent" ||
    sort === "news" ||
    sort === "need" ||
    sort === "share"
  ) {
    sortedPosts.sort((a, b) => {
      return order === "asc"
        ? a.date.getTime() - b.date.getTime()
        : b.date.getTime() - a.date.getTime();
    });
  } else if (sort === "popular") {
    sortedPosts.sort((a, b) => {
      return order === "asc" ? a.hit - b.hit : b.hit - a.hit;
    });
  }

  return sortedPosts.slice((page - 1) * 10, page * 10);
}

export const handlers = [
  rest.post(`${HTTPS_URL}/login`, (req, res, ctx) => {
    const { loginid, loginpassword } = req.body as LoginRequestBody;

    const user = users.find(
      (user) => user.id === loginid && user.password === loginpassword
    );

    if (user) {
      const accessToken = "exampleAccessToken";
      const expire = Date.now() + 0.3 * 60 * 1000;

      return res(
        ctx.status(200),
        ctx.json({
          status: 200,
          accessToken: accessToken,
          userType: user.userType,
          expire: expire,
          userId: loginid,
        })
      );
    } else {
      return res(
        ctx.status(401),
        ctx.json({
          status: 401,
          error: "Invalid credentials",
        })
      );
    }
  }),
  // rest.get("https://www.share42-together.com/api/logout", (req, res, ctx) => {
  //   return res(ctx.status(200), ctx.json({ status: 200 }));
  // }),
  rest.get(`${HTTPS_URL}/posts`, (req, res, ctx) => {
    const page = Number(req.url.searchParams.get("page")) || 1;
    const sort = req.url.searchParams.get("sort") || "recent";
    const order = req.url.searchParams.get("order") || "asc";
    return res(ctx.status(200), ctx.json(getPosts(page, sort, order)));
  }),
];
