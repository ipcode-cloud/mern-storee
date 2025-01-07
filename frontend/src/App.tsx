import { Route, Routes } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import UpdatePage from "./pages/UpdatePage";

import Home from "./pages/Home";
import { AppSidebar } from "./components/Navbar";
import { SidebarTrigger } from "./components/ui/sidebar";
import { Toaster } from "./components/ui/toaster";

const App = () => {
  return (
    <>
      <AppSidebar />
      <SidebarTrigger />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/update" element={<UpdatePage />} />
      </Routes>
    </>
  );
};

export default App;
