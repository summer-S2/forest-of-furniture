import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import { AuthContextProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ScrollRestoration } from "react-router-dom";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

function App() {
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <NavBar />
        <ScrollRestoration />
        <div className="mt-[57px]">
          <Outlet />
        </div>
        <Footer />
      </QueryClientProvider>
    </AuthContextProvider>
  );
}

export default App;
