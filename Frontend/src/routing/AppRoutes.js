import React,{Suspense} from "react";
import routes from "./routes";
import {Route,Routes} from 'react-router-dom'
import Loader from "components/components-general/Loader";

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loader/>}>
    <Routes>
      {Object.entries(routes).map(([path,element]) => {
            return <Route key={path} path={path} element={element} />;
        })
      }
    </Routes>
    </Suspense>
  )
}
