import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import LogIn from "./components/auth/LogIn";
import ProtectedRout from "./components/routes/ProtectedRout";
import { applyMiddleware, createStore } from "redux";
import { reducer } from "./redux/reducer";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import AdminPanel from "./components/admin/AdminPanel";
const store = createStore(reducer, applyMiddleware(thunk));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<LogIn />} />

      <Route path="/" element={<ProtectedRout />}>
        <Route index element={<AdminPanel />} />
      </Route>
    </>
  )
);

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
