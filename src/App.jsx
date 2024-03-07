import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./containers/Login";
import Register from "./containers/Register";
import Header from "./components/common/Header/Header";
import Footer from "./components/common/Footer/Footer";
import StudentRoutes from "./routes/studentRoutes";
import LecturerRoutes from "./routes/lectureRoutes";
import UserType from "./containers/UserType";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClientProvider, QueryClient } from "react-query";
import { persistor } from "./store/configureStore";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <Header />
          <PersistGate persistor={persistor}>
            <Routes>
              <Route index to={"/"} element={<UserType />} />
              <Route path={"/login"} element={<Login />} />
              <Route path={"/register"} element={<Register />} />
              <Route path={"/student/*"} element={<StudentRoutes />} />
              <Route path={"/lecturer/*"} element={<LecturerRoutes />} />
            </Routes>
          </PersistGate>
          {/* <Footer /> */}
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
