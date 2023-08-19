# 공유사이
<div align="left">
<img width="300" src="image/s42-logo.png">
</div>
<br/>




## 목차
- [프로젝트소개](#프로젝트소개)
- [프로젝트기간](#프로젝트기간)
- [사용기술스택](#사용기술스택)
- [기능구현](#기능구현)
- [스크린샷](#스크린샷)
- [발표자료](#발표자료)
- [UCC](#UCC)
- [참여자](#참여자)
- [느낀점](#느낀점)




<br/>


## 프로젝트소개
- **공유사이**는 비대면 물품 대여 플랫폼입니다.
- **공유사이**는 유용한 물품이지만 비싼 비용을 지불하며 구매하기 어려운 물품을 대여해주는 서비스 입니다.
- 기존 거래 플랫폼의 대면 거래로 인한 범죄의 위험성과 얼굴 노출에 대한 부담감을 감소시키기 위한 비대면 물품 대여 플랫폼입니다.
- 비대면 대여를 통해 기존 대면 거래 플랫폼에 있었던 시간적 제약(시간 약속 등)의 불편함을 해소하였습니다.
- 크게 웹 Front-end, Back-end, Blockchain, AI, IoT 파트로 나누어 6주동안 프로젝트를 진행했습니다.

<br/>

## 수상 이력
- SSAFY 특화프로젝트 우수 (삼성멀티캠퍼스)

<img src="https://file.notion.so/f/s/4f28797f-d583-4459-b3f9-dcb0285c70a9/prize.jpg?id=590bbaf4-76b6-4470-93c2-c91a90ecadf7&table=block&spaceId=e6f818a6-de6c-4678-9bd5-0453b49aebcd&expirationTimestamp=1692511200000&signature=vRMOgLivR7_d-tK0oHchkGJfQH_oEZawJ-3oja7bHIs&downloadName=prize.jpg" alt="teukhwa" width="300"/>

<br/>

## 프로젝트기간
2023.04.10. ~ 2023.05.19. (6주)

<br/>


## 사용기술스택
<img src="image/tech-stack.png">

<br/>

## 기능구현

- Back-end
    - Spring Security + JWT + Redis 기반의 로그인/로그아웃 구현
    - 회원가입 시 문자 인증
    - 사용자 계좌정보(결제수단) 등록
    - DB 인덱싱 처리를 통한 주소 API 조회
    - 공유 물품 등록, 수납, 대여, 반납, 회수 기능
    - 사용자 커뮤니티 기능
    - 웹 소켓을 활용한 채팅 기능
    - 지도에 표시할 대여함 지점 데이터 반환
    - 공유 물품 게시글에 협업 필터링을 적용하여 추천 알고리즘 구현
    - MultipartFile을 통한 React↔Spring Boot 파일 업로드
    - Kakao Map에 사용될 주소↔좌표 변환 API 기능
    - BootPay를 통한 자동 결제 기능 구현
    - Swagger를 통한 API 테스트 환경 구축
    - Nginx, Spring Boot 등에 SSL 적용
    - NFC 시리얼 번호를 기반으로한 대여함 오픈 기능
    - Query를 통한 사용량 통계값 도출
    - 관리자 사물함 별 정보 조회
    - 웹소켓을 이용한 IoT와 통신
- Front-end
    - 회원가입 기능 구현
    - 로그인, 로그아웃 기능 구현
    - 공유 물품 사용 관련 안내가이드 조회 기능
    - 커뮤니티 글 작성, 수정, 삭제, 조회 기능 구현
    - 커뮤니티 글 목록 조회 기능 구현
    - 커뮤니티 댓글 조회, 등록, 수정, 삭제 기능 구현
    - 공유 물품 글 조회, 등록, 조회, 삭제 기능 구현
    - 공유 물품 사용 신청 및 회수 신청 기능 구현
    - 사용자 정보 변경 기능 구현
    - 사용자 결제 수단 등록 및 수정 기능 구현
    - 공유함 및 공유글 신고 기능 구현
    - 사용자 수익 통계 조회 기능 구현
    - 사용자 작성 글 목록 조회 기능 구현
    - 사용자 찜한 목록 조회 기능 구현
    - NFC 를 통한 결제 기능 구현
    - 관리자 지점별 사용 로그 조회 기능 구현
    - 관리자 시도별 사용량 조회 기능구현
    - 관리자 사물함 사용량 조회 기능 구현
- Blockchain
    - Klaytn API 호출을 통한 지갑 및 메타데이터 생성, 컨트랙트 배포
    - 공유 물품 수납, 대여, 반납, 회수 기록을 Klaytn 블록체인에 저장
- Infra
    - Jenkins(Java 17), Docker, Docker-Compose를 활용하여 Merge Request WebHook 발생시 빌드 및 배포
    - Jenkins Pipeline를 활용한 React, Spring Boot 빌드 자동화
    - Nginx를 활용한 리버스 프록시 구현
- AI
    - ONNX 기반 Yolo v5 모델을 활용하여 대여에 적합한 물품인지 판단 (이미지에서 물체 인식)
- IoT
    - 웹 소켓을 활용한 서버와 통신
    - NFC 태그 기능
    - 웹 소켓을 활용한 대여함 내부 이미지를 서버로 전송
    - 아두이노 동작 코딩
    - 대여함 케이스 제작

<br/>

## 스크린샷

|🖥️ 로그인 / 물품 검색|🖥️ 공유 물품 등록|🖥️ 채팅|
|------|---|---|
|<img width="250" src="image/screenshot/01_login,search.gif">|<img width="250" src="image/screenshot/02_enrollProduct.gif">|<img width="250" src="image/screenshot/03_chat.gif">|


|🖥️ 마이페이지|🖥️ 마이페이지: 공유내역|🖥️ 마이페이지: 사용내역|
|------|---|---|
|<img width="250" src="image/screenshot/08-1_mypage.gif">|<img width="250" src="image/screenshot/08-2_mypage-shareList.gif">|<img width="250" src="image/screenshot/08-3_mypage-usedList.gif">|


|🖥️ 커뮤니티|🖥️ 커뮤니티: 게시글 작성|🖥️ 커뮤니티: 댓글 작성|
|------|---|---|
|<img width="250" src="image/screenshot/09-1_community.gif">|<img width="250" src="image/screenshot/09-2_community-write.gif">|<img width="250" src="image/screenshot/09-3_community-comment.gif">|


|🖥️ 관리자 로그|🖥️ 관리자 통계|
|------|---|
|<img width="250" src="image/screenshot/04_admin-log.gif">|<img width="250" src="image/screenshot/05_admin-stats.gif">|



|🖥️ NFC를 활용한 물품 보관|
|------|
|<img width="250" src="image/screenshot/06_putProduct.gif">|


### 
|🖥️ Swagger (API 테스트)|
|------|
|<img width="1000" src="image/screenshot/07_swagger.gif">|


## 발표자료
[기획발표 자료 다운로드](data/공유사이-D102-자율중간발표.pdf) (*.pdf)
<br/>

[최종발표 자료 다운로드](data/공유사이-D102-자율최종발표.pdf) (*.pdf)
<br/>

## UCC
[![Video Label](http://img.youtube.com/vi/AO7gHPbdjEc/0.jpg)](https://youtu.be/AO7gHPbdjEc)

<br/>


## 참여자

### Back-end

| 한상우([@miracle3070](https://github.com/miracle3070)) | 정명관([@rhalsemd](https://github.com/rhalsemd)) | 김지현([@potatohyun](https://github.com/potatohyun)) |
|:----:|:----:|:----:|
|<img width="200" src="image/s42-swhan.png">|<img width="200" src="image/s42-mkjeong.png">|<img width="200" src="image/s42-jhkim.png">|

<br/>

### Front-end

| 이주형([@22JH](https://github.com/22JH)) | 한승준([@hanseungjune](https://github.com/hanseungjune)) | 김태헌([@gangnamssal](https://github.com/gangnamssal)) |
|:----:|:----:|:----:|
|<img width="200" src="image/s42-jhlee.png">|<img width="200" src="image/s42-sjhan.png">|<img width="200" src="image/s42-thkim.png">|

<br/>

## 느낀점

### 한상우
이번 프로젝트에서 Spring Boot와 JPA의 활용은 제 기술 능력을 한 단계 끌어올린 중요한 경험이었습니다. 특히, 대여/반납 로직을 구현하면서 섬세한 요구사항에 부응해야 했고, 그 과정에서 문제 해결 능력과 협업 능력이 향상되었습니다. 코드의 중복을 최소화하고 변화에 빠르게 대응할 수 있는 구조를 만들기 위한 리팩토링 방법의 필요성을 느꼈으며, 이는 제 앞으로의 프로젝트에서 큰 가르침이 될 것입니다. 팀원들과 밤낮없이 고민하고 함께 해결해 나간 추억은 이 프로젝트를 더욱 값지게 만들었습니다.

### 정명관
프로젝트가 완성되지 못한 것은 분명 아쉬움이 남는 점입니다. 그러나, 이번 프로젝트에서 저는 시간 관리와 목표 설정의 중요성을 깨닫게 되었고, 이를 다음 프로젝트에 살릴 방법을 모색하고 있습니다. AI와 추천 알고리즘을 프로젝트에 적용하는 도전은 저에게 새로운 기술 영역을 열어줬고, 앞으로 이 분야에 더 깊게 뛰어들 예정입니다. 이 프로젝트가 제게 주는 교훈과 경험은 다가올 기회에서 더 큰 성공을 만들기 위한 기반입니다.

### 한승준
병원을 방문해야 했던 상황은 팀과 프로젝트에 헌신하고 싶었던 저로서는 힘든 순간이었습니다. 하지만 그 과정에서 자기 관리의 중요성과 건강의 소중함을 다시 한 번 느낄 수 있었습니다. 새로운 기술을 배우고 적용하는 과정은 도전과 성장의 연속이었으며, 이를 통해 두려움을 극복하고 전문성을 향상시킬 수 있었습니다. 취업 준비와 병행하는 과정에서 깊이 있는 학습을 하지 못한 것은 아쉽지만, 이를 극복하는 방안을 찾는 중입니다.

### 이주형
새로운 기술을 도입하는 것은 많은 시행착오를 동반했지만, 그 과정에서 얻은 지식과 경험은 무엇보다 소중했습니다. 아쉽게도 시간 관계로 완벽하게 구현하지 못한 부분들이 있었지만, 이러한 도전을 통해 앞으로 더욱 안정적으로 프로젝트를 진행할 수 있는 자신감과 능력을 키웠습니다.

### 김태헌
PWA의 도입으로 웹에서도 모바일 앱과 같은 사용자 경험을 성공적으로 구현했습니다. 또한 D3를 활용하여 사용자에게 시각적으로 매력적인 데이터 전달 방식을 제공할 수 있었습니다. 일정이 타이트해 푸시 알림 기능을 구현하지 못한 점은 아쉽지만, 이번 프로젝트를 통해 일정 관리와 계획 수립의 중요성을 체감했습니다.

### 김지현
이번 프로젝트에서의 채팅 기능 구현은 저에게 큰 도전이었습니다. 처음 접해본 소켓 통신은 초기에 어려움을 겪게 했으나, 다양한 방법을 탐색하고 실험하면서 저만의 해결책을 찾을 수 있었습니다. 이 과정에서 얻은 기술과 지식은 IoT와의 연계 등 다른 영역에서도 활용될 수 있으며, 이를 통해 기본적인 이해와 전문성의 중요성을 더욱 깨닫게 되었습니다. 또한, 복잡한 쿼리문 작성과 DB 설계 업무는 데이터 구조와 조작에 대한 깊은 이해를 필요로 했으며, 이를 통해 DB와의 작업 능력을 향상시켰습니다.

<br/>

