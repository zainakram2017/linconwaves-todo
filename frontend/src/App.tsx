import React from "react";
import { AuthProvider } from "./contexts/AuthContext";

import Routes from "./routes/Routes";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </>
  );
};

export default App;
