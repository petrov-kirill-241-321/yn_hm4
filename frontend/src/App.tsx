import { Route, Routes } from "react-router-dom";
import Container from "./components/Container/Container";
import { Header } from "./components/Header/Header";
import AnaliticPage from "./pages/analiticPage/analiticPage";
import GeneratorPage from "./pages/generatorPage/generatorPage";
import HistoryPage from "./pages/historyPage/historyPage";

function App() {
  return (
    <>
      <Container>
        <Header />
      </Container>
      <Routes>
        <Route path="" element={<AnaliticPage />} />
        <Route path="/generator" element={<GeneratorPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </>
  );
}

export default App;
