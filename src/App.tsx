import { RouterProvider } from "@tanstack/react-router";
import router from "./router";

function App() {
  return (
    <div className="h-screen">
       <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App;
