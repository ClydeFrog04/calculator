/**
 * @author Randi Egan
 */
import React, {StrictMode} from "react";
import * as ReactDOMClient from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import {RootProvider} from "./contexts/RootProvider.tsx";

const container = document.getElementById("root") as HTMLElement;
const root = ReactDOMClient.createRoot(container);

root.render(
    <StrictMode>
        <RootProvider>
            <App/>
        </RootProvider>
    </StrictMode>
);
