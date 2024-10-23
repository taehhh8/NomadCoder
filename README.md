# NomadCoder

2024.10.23
React Router Upgrade Guide version 6

BrowserRouter
createBrowserRouter
모든 React Router 웹 프로젝트에 권장되는 라우터입니다.
DOM History API를 사용하여 URL을 업데이트하고 기록 스택을 관리합니다.
Route
errorElement
userNavigate
useParams
Outlet
useOutletContext
useSearchParams
useSearchParams 훅은 현재 위치에 대한 URL의 쿼리 문자열을 읽고 수정하는 데 사용됩니다. useState 훅과 마찬가지로 useSearchParams는 현재 위치의 search params와 이를 업데이트하는 데 사용할 수 있는 함수라는 두 가지 값의 배열을 반환합니다.
setSearchParams 함수는 탐색과 같이 작동하지만 URL의 검색 부분에 대해서만 작동합니다.

useLoaderData
// react-router-dom

출처 : https://reactrouter.com/en/main
