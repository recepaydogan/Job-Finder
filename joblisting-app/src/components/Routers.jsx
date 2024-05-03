import { Routes, Route } from "react-router-dom";
import JobCards from "./JobCards";
function Routers() {
  return (
    <Routes>
      <Route path="/jobs" element={<JobCards></JobCards>}></Route>
    </Routes>
  );
}

export default Routers;
