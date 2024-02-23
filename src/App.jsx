import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Transfer from "./pages/Transfer.jsx";
import { AccountsProvider } from "./context/AccountsContext";

function App() {
  return (
    <Router>
      <AccountsProvider>
        <Routes>
          <Route exact path="/" element={<Index />} />
          <Route path="/transfer" element={<Transfer />} />
        </Routes>
      </AccountsProvider>
    </Router>
  );
}

export default App;
