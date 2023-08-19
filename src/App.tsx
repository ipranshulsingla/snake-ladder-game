import { BrowserRouter, Route, Routes } from "react-router-dom";
import DisclaimerPage from "./pages/DisclaimerPage";
import GameBoardPage from "./pages/GameBoardPage";
import GamesPage from "./pages/GamesPage";
import ShopPage from "./pages/ShopPage";
import MainLayout from "./components/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={DisclaimerPage} />
        <Route element={<MainLayout />}>
          <Route path="/shop" Component={ShopPage} />
          <Route path="/play-games" Component={GamesPage} />
        </Route>
        <Route path="/snake-ladder" Component={GameBoardPage} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
