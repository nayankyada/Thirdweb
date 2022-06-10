import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

ReactDOM.render(
  <React.StrictMode>
    <ThirdwebProvider
      desiredChainId={ChainId.Rinkeby}
      chainRpc={{
        [ChainId.Rinkeby]:
          "https://rinkeby.infura.io/v3/d5ffcd2812e4416d8d3fc5c43918286f",
      }}
      supportedChains={[ChainId.Rinkeby]}
      walletConnectors={["walletConnect",{ name: "injected", options: { shimDisconnect: false } },]}
    >
      <App />
    </ThirdwebProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
