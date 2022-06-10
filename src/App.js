import React, { useState,useEffect } from "react";
import "./style/index.css";
import {
  useNFTDrop,
  useMetamask,
  useWalletConnect,
  useAddress,
  useDisconnect,
  useChainId,
  useNetwork
} from "@thirdweb-dev/react";
import NFTPage from "./NFTPage";
function App() {
  const network = useNetwork();
  console.log(network)
  const [errorMessage, setErrorMessage] = useState("");
  const connectWithMetamask = useMetamask();
  const activeChain = useChainId()
  const connectWithWalletConnect = useWalletConnect();
  const address = useAddress();
  const disconnect = useDisconnect();
  const [,switchNetwork] = useNetwork()
  const [ownedNFT, setOwnedNFT] = useState([]);
  const nftDrop = useNFTDrop("0x310dE633632f53492791b59206DdA7aF08A909fC");

  const mintPig = () => {
    const quantity = 1; // how many unique NFTs you want to claim
    nftDrop
      .claimTo(address, quantity)
      .then((d) => console.log(d))
      .catch((e) => console.log(e));
  };
  const getMintedNFT = () => {
    console.log(address)
    nftDrop
      .getOwned(address)
      .then((d) => {
        setOwnedNFT(d);
        console.log(d);
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    console.log(activeChain,typeof(activeChain))
    if (address && activeChain !== 4) {
      setErrorMessage("Please Connect With Rinkeby Network");
    } else {
      setErrorMessage("");
    }
  }, [activeChain]);
  return (
    <div className="App">
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Public Private Mint
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg ">
          {address  && (
            <div className="rounded-md  mx-8 p-4  shadow-sm">
              <div className="flex justify-center">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-600">
                    {errorMessage}
                  </h3>
                  {address && errorMessage && (
                    <button
                      onClick={() => {
                        switchNetwork(4);
                      }}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Connect With Rinkeby
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
          {address && !errorMessage ? (
            <div className="px-4">
              <div className="px-4 py-5 my-4 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                <dt
                  className="text-md font-extrabold cursor-pointer text-gray-500 truncate"
                  onClick={() => {
                    navigator.clipboard.writeText("account");
                  }}
                >
                  <abbr title="Click To Copy">{address}</abbr>
                </dt>
                <dd className="mt-1 text-xl font-semibold text-gray-900">
                  ETH
                </dd>
                <button
                  onClick={disconnect}
                  className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Disconnect Wallet
                </button>
              </div>
              <div className="bg-white py-4 px-4 mt-6 shadow sm:rounded-lg sm:px-10">
                <div className="space-y-6">
                  <div className="flex justify-center space-x-4 items-center">
                    <button
                      onClick={mintPig}
                      type="button"
                      className=" flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Mint Pig
                    </button>
                    <button
                      onClick={getMintedNFT}
                      type="button"
                      className=" flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      getMintedNFT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : !address ? (
            <div className="mx-8 flex space-x-3">
              <button
                className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={connectWithMetamask}
              >
                Metamask
              </button>

              <button
                className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={connectWithWalletConnect}
              >
                WalletConnect
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {address && ownedNFT.length > 0 && <NFTPage ownedNFT={ownedNFT} />}
    </div>
  );
}

export default App;
