import React, { useEffect, useLayoutEffect } from 'react';
import { useIsPresent } from 'framer-motion'
import { toast } from 'react-toastify';
import MyBlocksView from '../../Views/MyBlocksView'
import LatestBlocksView from '../../Views/LatestBlocksView'
import TxView from '../../Views/TxView'
import { providers, staticData, evmChains, _infuraID } from '../../../backend/staticVariables'

// toggle between views
const Dashboard = ({ props }) => {

    const { view, toggleLiveUpdatesState, toggleLiveDashboardUpdatesState, toggleLiveNotifyUpdatesState, ethers, currentProvider, isProviderListening, isBlockNotificationLive, isDashboardUpdateLive, enableLiveUpdates, web3Login, web3Logout, userDataState, getAppData, didCoreDataFail } = { ...props }
    // -- useEffects --//
    useLayoutEffect(() => {

        getAppData(providers.ethWSS, staticData.latestCount)

        // no metamask on safari
        let isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

        if (typeof window.performance.getEntriesByType !== 'undefined' && !isSafari) {
            // listen for page reload & log back in if cached
            if (String(window.performance.getEntriesByType("navigation")[0].type) === 'reload') {
                web3Login()
            }
        }

    }, [])

    // listen for metamask events
    useEffect(() => {

        if (typeof window.ethereum !== 'undefined') {
            window.ethereum.removeListener("accountsChanged", () => { })
            window.ethereum.removeListener("chainChanged", () => { })
            window.ethereum.on('chainChanged', (chainID) => {
                if (chainID !== evmChains.eth) web3Logout()
                console.log('chainChanged', chainID);
            });
            window.ethereum.on('accountsChanged', (accounts) => {
                window.location.reload()
            });
        }

    }, [userDataState])

    // live update for blocks
    useEffect(() => {

        // do not run if core data failed to load
        if (didCoreDataFail) return

        // start new socket connection if none exist
        if (currentProvider.current === false) {
            try {
                let publicProvider = new ethers.providers.WebSocketProvider(providers.ethWSS);
                currentProvider.current = publicProvider;
            } catch (err) {
                err = { msg: 'Websocket failed connection with provider!', err }
                console.log({ err })
                toast.error(err.msg)
            }
        }

        // disable live updates
        if ((!isBlockNotificationLive.current && !isDashboardUpdateLive.current) || !enableLiveUpdates.current) {
            currentProvider.current.removeAllListeners('block')
            isProviderListening.current = false;
            //console.log('disable listeners check', currentProvider.current.removeAllListeners('block'))
            return
        }
        //console.log('before listner starts count', currentProvider.current.listeners())
        if (isProviderListening.current) return
        currentProvider.current.on('block', (block) => {
            if (isBlockNotificationLive.current) toast(`Latest Block: #${block}`, { position: toast.POSITION.TOP_RIGHT })
            if (isDashboardUpdateLive.current) getAppData(providers.ethWSS, staticData.latestCount)
            isProviderListening.current = true;
            console.log({ msg: 'latest', block })
        });
        //console.log('after listener starts count', currentProvider.current.listeners())
    }, [toggleLiveNotifyUpdatesState, toggleLiveDashboardUpdatesState, toggleLiveUpdatesState])

    // light in & out animation with framer for realtime block updates
    let isPresent = useIsPresent();
    let animations = {
        style: {
            position: isPresent ? 'static' : 'absolute'
        },
        initial: { scale: 1, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 1, opacity: 0.8 },
        transition: { ease: [0.42, 0, 0.58, 1], duration: 0.8 }
    }

    return (
        <>
            {view === "myBlocksView" && (
                <MyBlocksView props={props} animations={animations} />
            )}

            {view === "txView" && (
                <TxView props={props} animations={animations} />
            )}

            {view === "latestBlocksView" && (
                <LatestBlocksView props={props} animations={animations} />
            )}
        </>
    )
};

export default Dashboard;
