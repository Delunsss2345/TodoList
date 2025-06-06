import Layout from "./components/Layout"
import { Routes, Route, Navigate } from "react-router-dom"
import Container from "./pages/Container"
import SignUp from "./pages/SignUp";
import useAuthStore from "./store/useAuthStore.js";
import { useEffect } from "react";
import Loading from "./components/Loading.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";


function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth])
  console.log(authUser)
  if (isCheckingAuth && !authUser) {
    return <Loading />
  }
  return (
    <Routes>
      <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
      <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to="/" />} />
      <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/login" />} />
      <Route path="/" element={authUser ? <Layout /> : <Navigate to="/login" />}> {/*Truyền Layout 
      vào thì các con trong Outlet sẽ nhân được 
      Route không cho truyền Layout thằng hoặc div
      */}
        <Route path="/" element={<Container />} />
      </Route>
    </Routes>
  );
}
export default App
