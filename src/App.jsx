import Auth from "./componentes/auth/Auth"
import List from "./componentes/dashboard/List";
import Dashboard from "./componentes/dashboard/Dashboard";
import { BrowserRouter as Router , Route , Routes} from "react-router-dom";
function App() {



  return (
    <>
     <Router>
      <Routes>
        <Route path="/"  element={<Auth/>} />
        <Route path="/dashboard"  element={<Dashboard/>} />
        <Route path="/list"  element={<List/>} />
      </Routes>
     </Router>
    </>
  )
}

export default App
