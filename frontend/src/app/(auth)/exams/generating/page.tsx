import { Suspense } from "react";

import GeneratingContent from "./generating-content";

export default function GeneratingPage() {

  return (

    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">

          Loading...

        </div>
      }
    >

      <GeneratingContent />

    </Suspense>

  );

}