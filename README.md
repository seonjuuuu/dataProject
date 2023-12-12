## 기능구현

반응형페이지, 복사기능,msw 목데이터를 이용한 데이터 통신 기능

## 사용기술

- React.js
- styled-components
- context api

## 사용 라이브러리

- react-table - 테이블을 만들기 위해 사용
- msw - Mock Data 통신을 위해 사용
- react-datepicker - 날짜 달력을 위해 사용
- react-modal - 모달창 라이브러리 사용

## 구성

netlify로 배포

배포 주소 : https://thunderous-crisp-3f4ec0.netlify.app/

### 컴포넌트 구성

- BasicForm.jsx : 기본 등록 폼을 받는 컴포넌트 구현
- PlaceInfo.jsx : 상차지 정보를 받는 컴포넌트 구현
- Address.jsx : 주소지 받는 컴포넌트 구현
- CustomModal.jsx : 모달창의 경우 여러곳에서 사용이 되고있어 children값으로 모달창 내부에 값만 변하도록 구현
- DataTable.jsx : 테이블 컴포넌트 구현

### page 구성

- TableList.jsx : 테이블, 삭제, 갯수필터링을 위한 페이지 단으로 구성
- TopForm.jsx : 기본 등록 입력 폼, 상차지 정보, 상차지 정보 추가 부분 , 등록을 위한 페이지단 구성

### contexts 구성

- Order.js : 오더복사시 클릭한 오더의 정보를 가지고 있는 값을 전역에서 관리하도록 구성, 삭제하려는 order의 id값도 전역으로 관리하도록하도록 구성
