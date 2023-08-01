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
  rest.get(
    `${HTTPS_URL}/address/reverse-geo/:latitude/:longitude`,
    (req, res, ctx) => {
      const { latitude, longitude } = req.params as { [key: string]: any };
      if (latitude === 36.107157 && longitude === 128.418008) {
        return res(
          ctx.status(200),
          ctx.json({
            message: {
              region_2depth_name: "구미시",
              region_3depth_name: "진평동",
            },
          })
        );
      } else if (latitude === 35.869996 && longitude === 128.594313) {
        return res(
          ctx.status(200),
          ctx.json({
            message: {
              region_2depth_name: "대구광역시",
              region_3depth_name: "중구 남일동",
            },
          })
        );
      }
    }
  ),
  rest.get(`${HTTPS_URL}/user/share/share-articles/search`, (req, res, ctx) => {
    const page: string | null = req.url.searchParams.get("page");
    const size: string | null = req.url.searchParams.get("size");
    const orderStandard: string | null =
      req.url.searchParams.get("orderStandard");
    const sigungu: string | null = req.url.searchParams.get("sigungu");
    const dong: string | null = req.url.searchParams.get("dong");
    const query: string | null = req.url.searchParams.get("query");
    const lat: string | null = req.url.searchParams.get("lat");
    const lng: string | null = req.url.searchParams.get("lng");

    // 이거는 Bearer 토큰 받아오는거
    const authorizationHeader = req.headers.get("Authorization");

    // 이후 검증 및 목 데이터를 생성하는 로직을 여기에 작성할 수 있습니다.
    // 예시로, 만약 page 파라미터가 1이고, size 파라미터가 8일 때 특정한 목 데이터를 반환하도록 하면
    if (page === "1" && size === "8") {
      return res(
        ctx.status(200),
        ctx.json({
          message: {
            article: {
              content: [
                {id: 1, title: 'Sample Article 1', content: 'This is a sample content for article 1'},
                {id: 2, title: 'Sample Article 2', content: 'This is a sample content for article 2'},
                {id: 3, title: 'Sample Article 3', content: 'This is a sample content for article 3'},
                {id: 4, title: 'Sample Article 4', content: 'This is a sample content for article 4'},
                {id: 5, title: 'Sample Article 5', content: 'This is a sample content for article 5'},
                {id: 6, title: 'Sample Article 6', content: 'This is a sample content for article 6'},
                {id: 7, title: 'Sample Article 7', content: 'This is a sample content for article 7'},
                {id: 8, title: 'Sample Article 8', content: 'This is a sample content for article 8'},
                {id: 9, title: 'Sample Article 9', content: 'This is a sample content for article 9'},
                {id: 10, title: 'Sample Article 10', content: 'This is a sample content for article 10'},
                {id: 11, title: 'Sample Article 11', content: 'This is a sample content for article 11'},
                {id: 12, title: 'Sample Article 12', content: 'This is a sample content for article 12'},
                {id: 13, title: 'Sample Article 13', content: 'This is a sample content for article 13'},
                {id: 14, title: 'Sample Article 14', content: 'This is a sample content for article 14'},
                {id: 15, title: 'Sample Article 15', content: 'This is a sample content for article 15'},
                {id: 16, title: 'Sample Article 16', content: 'This is a sample content for article 16'},
                {id: 17, title: 'Sample Article 17', content: 'This is a sample content for article 17'},
                {id: 18, title: 'Sample Article 18', content: 'This is a sample content for article 18'},
                {id: 19, title: 'Sample Article 19', content: 'This is a sample content for article 19'},
                {id: 20, title: 'Sample Article 20', content: 'This is a sample content for article 20'}
              ],
              totalPages: 20
            }
          },
        })
      );
    }

    return res(
      ctx.status(400),
      ctx.json({
        error: "Invalid request",
      })
    );
  }),
];
