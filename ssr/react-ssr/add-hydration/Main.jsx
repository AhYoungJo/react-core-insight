import React from "react";
import { hydrateRoot } from "react-dom/client";
import HydrationApp from "./HydrationApp.jsx";

hydrateRoot(document, <HydrationApp title="클라이언트에서 렌더링" />);
