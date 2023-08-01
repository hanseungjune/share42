export function calculateTime(uptDt: string): string {
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

  return time;
}
