import { Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes, loginRoute } from "./routes/index.js";
// import { useSelector } from "react-redux";
// import jwtDecode from "jwt-decode";

// import HomePage from "./pages/Home.js";
// import PackagePage from "./pages/Package.js";

function App() {
  // let user = useSelector((state) => state?.auth.login?.currentUser);
  // let flag = true;
  // let day = new Date();
  // if (user !== null) {
  //   const decodedToken = jwtDecode(user?.accessToken);
  //   if (decodedToken.exp < day.getTime() / 1000) {
  //     flag = false;
  //   }
  // }
  // console.log("flag", flag);
  return (
    <Routes>
      {/* <Route path="/">
        {flag ? (
          <Route path="/home" element={<HomePage />} />
        ) : (
          <Route path="/package" element={<PackagePage />} />
        )}
      </Route> */}

      {publicRoutes.map((route, index) => {
        const Page = route.component;
        return <Route key={index} path={route.path} element={<Page />} />;
      })}
      
      {privateRoutes.map((route, index) => {
        const Page = route.component;
        return <Route key={index} path={route.path} element={<Page />} />;
      })}

      {loginRoute.map((route, index) => {
        const Page = route.component;
        return <Route key={index} path={route.path} element={<Page />} />;
      })}

    </Routes>
  );
}

export default App;
