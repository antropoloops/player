import React, { Suspense } from "react";
const Visuals = React.lazy(() => import("./Visuals"));

const VisualsLazy = props => {
  return (
    <Suspense fallback={<div className="Visuals" />}>
      <Visuals {...props} />
    </Suspense>
  );
};

export default VisualsLazy;
