import { css } from "@emotion/react";

export const container = css`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .back {
    flex: 1;
  }
  .logo {
    flex: 5.5;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .loginInput {
    flex: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .textField {
      width: 70%;
      .MuiOutlinedInput-root {
        background-color: white;
        border-radius: 15px;
        box-shadow: -1px 2px 1px 2px rgba(209, 77, 114, 0.25);
      }
      &:nth-of-type(1) {
        margin-bottom: 20px;
      }
      &:nth-of-type(2) {
        margin-bottom: 10px;
      }
    }
  }
  .btn {
    flex: 6;
    display: flex;
    align-items: center;
    flex-direction: column;

    .signUp {
      margin-top: 10px;
      font-weight: bold;
      margin-right: 20px;
    }
    .admin {
      margin-top: 10px;
      font-weight: bold;
    }

    .link {
      display: flex;
      align-items: center;
    }
  }
`;