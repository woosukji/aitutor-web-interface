# 디렉토리 설명

```
.
│  App.vue
│     # SPA 구조를 정하는 top component. navigation bar와 router로 구성되고,
│     # 로딩 시 overlay와 알림 바 alert 같은 global한 컴포넌트를 포함합니다.
│  main.js
│     # Entry point. Vue app을 instantiate 합니다.
│
├─assets
│      agilesoda_logo.png
│      agilesoda_name.png
│      agilesoda_name_white.png
│
├─components
│     # 여러 페이지에서 공통되거나, 기능/중요도 상 분리가 필요한 컴포넌트를 정의합니다.
│     # 대부분 최소한의 로직을 가지며, 상위 컴포넌트로부터 데이터를 전달받아
│     # 단순 view 및 최소한의 event를 올려주는 기능만 가집니다.
│      BaseTopBar.vue
│           # ./Navigation.vue 및 landing, sign-up 페이지에서 사용되는 탑바 베이스
│      CardProblem.vue
│           # ./Problem.vue, ./ProblemResult.vue 에서 문두+이미지 보여주는 컴포넌트
│      CardVertical.vue
│           # main 페이지에서 메인메뉴를 구성하는 이미지+텍스트 컴포넌트
│      ChapterSelection.vue
│           # chapter-test, daily-problems 페이지에서 소/중단원 검색 및 선택
│      LoginForm.vue
│           # landing 페이지 로그인 form
│      Navigation.vue
│           # landing, sign-up을 제외하고 항상 보이는 top navigation bar
│      NChoice.vue
│           # ./Problem.vue 에서 선택지 및 제출 버튼을 모아놓은 컴포넌트
│      Problem.vue
│           # chapter-test, daily-problems 페이지에서 문제 오브젝트를 받아
│           # 문제를 표시하고, 선택한 선지를 이벤트로 올려주는 주요 컴포넌트
│      ProblemResult.vue
│           # chapter-test 페이지에서 해결한 문제의 정/오답 결과를 표시
│      ReportBadProblem.vue
│           # 문제 풀이 시 이상이 있는 문제를 보고하는 팝업 + 팝업 띄우기 버튼
│
├─plugins
│     # 프로젝트에 쓰이는 플러그인 API를 instantiate 합니다.
│      firebase.js
│           # Firebase Backend API를 configuration하고, db의 collections export
│      vue-katex.js
│           # 문제의 Latex 수식과 표를 웹에서 render 해주는 KaTex init & export config
│      vuetify.js
│           # UI library => 'v-'로 시작하는 태그로 UI component 사용
│
├─router
│     # Vue router 의 페이지 디렉토리 셋업을 정의합니다.
│      index.js
│
├─store
│     # Vuex 상태관리 라이브러리, 서버와 통신하고 global state를 관리하는 함수들
│     # 앞으로 남은 코드 변경 작업은 대부분 이곳에서 이루어집니다.
│      index.js
│
├─util
│      ProblemHelper.js
│           # 서버에서 전송된 문제 데이터를 파싱, 내부에서 쓰이는 문제 오브젝트로 정리합니다.
│
└─views
      # router의 현재 디렉토리에 따라 갈아끼워지는 페이지 컴포넌트
      # URL의 디렉토리와 컴포넌트 이름이 일치합니다. (Landing 제외)
        ChangeInfo.vue
            # 회원정보 변경
        ChapterTest.vue
            # 소단원 테스트
        DailyProblems.vue
            # 추천문제
        Dashboard.vue
            # 대시보드 - 현재 비활성화
        KatexTest.vue
            # Katex 관련 실험을 위한 비공개 페이지 - local 실행시 URL로만 접근 가능
        Landing.vue
            # 초기화면, 랜딩페이지 - URL 루트 디렉토리 "/"
        Main.vue
            # 로그인 시 입장하는 메인페이지
        SignUp.vue
            # 회원가입
```
