import "./App.css";
import { Route, Routes } from "react-router-dom";
import Main from "./containers/main";
import Layout from "./containers/layout";
import Item from "./containers/item";

function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Main />
            </Layout>
          }
        />
        <Route
          path="/:id"
          element={
            <Layout>
              <Item />
            </Layout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
