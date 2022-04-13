import React, { useEffect, useLayoutEffect } from "react";
import { toast } from "react-toastify";
import { Outlet } from "react-router-dom";
import {
    providers,
    staticData,
    evmChains,
} from "../../../backend/staticVariables";

// toggle between views
const Dashboard = ({ props }) => {

    const {
        toggleLiveUpdatesState,
        toggleLiveDashboardUpdatesState,
        toggleLiveNotifyUpdatesState,
        ethers,
        currentProvider,
        isProviderListening,
        isBlockNotificationLive,
        isDashboardUpdateLive,
        enableLiveUpdates,
        web3Login,
        web3Logout,
        userDataState,
        loadAppData,
        didCoreDataFail,
    } = { ...props };

    // -- useEffects --//
    useLayoutEffect(() => {

        loadAppData(staticData.latestCount);

        // no metamask on safari
        let isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        // listen for page reload & log back in if cached
        if (
            typeof window.performance.getEntriesByType !== "undefined" &&
            !isSafari
        ) {
            if (
                String(window.performance.getEntriesByType("navigation")[0].type) ===
                "reload"
            ) {
                web3Login();
            }
        }

    }, []);

    // listen for metamask events
    useEffect(() => {

        if (typeof window.ethereum !== "undefined") {
            window.ethereum.removeListener("accountsChanged", () => { });
            window.ethereum.removeListener("chainChanged", () => { });
            window.ethereum.on("chainChanged", (chainID) => {
                if (chainID !== evmChains.eth) web3Logout();
                console.log("chainChanged", chainID);
            });
            window.ethereum.on("accountsChanged", (accounts) => {
                window.location.reload();
            });
        }

    }, [userDataState]);

    // live update for blocks
    useEffect(() => {

        // do not run if core data failed to load
        if (didCoreDataFail) return;

        // start new socket connection if none exist
        if (currentProvider.current === false) {
            try {
                let publicProvider = new ethers.providers.WebSocketProvider(
                    providers.ethWSS
                );
                currentProvider.current = publicProvider;
            } catch (err) {
                err = { msg: "Websocket failed connection with provider!", err };
                console.log({ err });
                toast.error(err.msg);
            }
        }

        // disable live updates
        if (
            (!isBlockNotificationLive.current && !isDashboardUpdateLive.current) ||
            !enableLiveUpdates.current
        ) {
            currentProvider.current.removeAllListeners("block");
            isProviderListening.current = false;
            //console.log('disable listeners check', currentProvider.current.removeAllListeners('block'))
            return;
        }
        //console.log('before listner starts count', currentProvider.current.listeners())
        if (isProviderListening.current) return;
        currentProvider.current.on("block", (block) => {
            if (isBlockNotificationLive.current)
                toast(`Latest Block: #${block}`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            if (isDashboardUpdateLive.current) loadAppData(staticData.latestCount);
            isProviderListening.current = true;
            console.log({ msg: "latest", block });
        });
        //console.log('after listener starts count', currentProvider.current.listeners())
    }, [ toggleLiveNotifyUpdatesState, toggleLiveDashboardUpdatesState,toggleLiveUpdatesState]);

    return <Outlet />;
};

export default Dashboard;
