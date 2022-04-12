import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { useIsPresent } from 'framer-motion'
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { addresses, providers, staticData, evmChains, _infuraID, etherscanLinks } from './backend/staticVariables'
import { getVanity, fixedNoRound2, getLiveDexPrice, getBlockReward, initBlocks } from './backend/coreFunctions'
import 'react-toastify/dist/ReactToastify.css';
import AppLayout from './components/Layouts/AppLayout';
import ErrorPage from './components/Pages/ErrorPage';
import Dashboard from './components/Pages/Dashboard'
import LatestBlocksView from './components/Views/LatestBlocksView'
const MyBlocksView = React.lazy(() => import('./components/Views/MyBlocksView'));
const TxView = React.lazy(() => import('./components/Views/TxView'));

// -- app component -- //
const App = () => {

    // set user state
    const [userDataState, setUserDataState] = useState(false);
    const [userViewBlocksHistory, setUserViewBlocksHistory] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [loadingUserLogin, setLoadingUserLogin] = useState(false);

    // set data state
    const [priceData, setPriceData] = useState('....');
    const [blocksData, setBlocksData] = useState('....');
    const [selectedBlock, setSelectedBlock] = useState(false);
    const [selectedBlockRewardData, setSelectedBlockRewardData] = useState(false);

    // live update settings, use refs to persist data between renders
    const currentProvider = useRef(false);
    const isProviderListening = useRef(false);
    const isBlockNotificationLive = useRef(true);
    const isDashboardUpdateLive = useRef(true);
    const enableLiveUpdates = useRef(true);

    // added state to rerender the buttons
    const [toggleLiveUpdatesState, setToggleLiveUpdatesState] = useState(true);
    const [toggleLiveNotifyUpdatesState, setToggleLiveNotifyUpdatesState] = useState(true);
    const [toggleLiveDashboardUpdatesState, setToggleLiveDashboardUpdatesState] = useState(true);

    //-- view states --//
    const [didCoreDataFail, setDidCoreDataFail] = useState(false);
    const [loadingDashboardData, setLoadingDashboardData] = useState(true);
    const [loadingTxViewData, setLoadingTxViewData] = useState(true);
    const [loadingBlockRewardData, setLoadingBlockRewardData] = useState(false);
    const [txViewBlockSelectedData, setTxViewBlockSelectedData] = useState(false);

    // live update state handler
    const liveUpdateStateHandler = (newState) => {
        enableLiveUpdates.current = newState;
        setToggleLiveUpdatesState(newState)
    }
    // toggle updates - enable or disable all forms of update
    const toggleLiveUpdates = async () => {
        setToggleLiveUpdatesState(prev => {
            enableLiveUpdates.current = !prev;
            isDashboardUpdateLive.current = !prev;
            isBlockNotificationLive.current = !prev;
            setToggleLiveDashboardUpdatesState(!prev);
            setToggleLiveNotifyUpdatesState(!prev);
            return !prev
        });
    };
    // enable or disable rerendering of the dashboard for new blocks
    const toggleLiveDashboardUpdates = async () => {
        setToggleLiveDashboardUpdatesState(prev => {
            let newState = !prev;
            isDashboardUpdateLive.current = newState;
            // enable all live updates again if it was disabled
            if (newState) liveUpdateStateHandler(newState)
            // disable all live updates if live notify updates was disabled
            if (newState === isBlockNotificationLive.current) {
                liveUpdateStateHandler(newState)
            }
            return newState
        });
    };
    // enable or disable nofitications of the latest block
    const toggleLiveNotifyUpdates = async () => {
        setToggleLiveNotifyUpdatesState(prev => {
            let newState = !prev;
            isBlockNotificationLive.current = newState;
            // enable all live updates again if it was disabled
            if (newState) liveUpdateStateHandler(newState)
            // disable all live updates if live dashboard updates was disabled
            if (newState === isDashboardUpdateLive.current) {
                liveUpdateStateHandler(newState)
            }
            return newState
        });
    };

    //-- web3 auth --//
    const web3Login = async () => {
        setLoadingUserLogin(true)

        let provider;
        let metaWallet;

        const providerOptions = {
            walletconnect: {
                package: WalletConnectProvider, // required
                options: {
                    infuraId: _infuraID,
                }
            }
        }

        const web3Modal = new Web3Modal({
            theme: 'dark', // optional
            providerOptions, // required
            cacheProvider: true, // optional
        });

        try {
            provider = await web3Modal.connect();
            await provider.request({ method: 'eth_requestAccounts' });
            metaWallet = new ethers.providers.Web3Provider(provider, 'any')
            console.log({ msg: 'Connection successful!', metaWallet })
        } catch (e) {
            setUserDataState(false)
            setIsUserLoggedIn(false);
            return null;
        }

        let chainID = await metaWallet.provider.networkVersion

        console.log({ chainID })

        if (chainID === evmChains.eth) {
            let signer = metaWallet.getSigner();
            let userID = await signer.getAddress();
            let userVanity = getVanity(userID, 4, 4);
            let userData = { userID, userVanity, metaWallet, signer, provider, chainID };
            setUserDataState(userData);
            setIsUserLoggedIn(true);
        } else {
            setUserDataState(false);
            setIsUserLoggedIn(false);
            toast.error('Wrong Network. Please swtich to ETH Mainnet!', { position: toast.POSITION.TOP_CENTER })
        }

        setLoadingUserLogin(false)

    }
    const web3Logout = async () => {
        setLoadingUserLogin(true)
        setIsUserLoggedIn(false)
        setLoadingUserLogin(false)
    }

    //-- handlers --//
    // try to set data give to localStorage
    const tryToCacheBlockViewed = (userID, cacheData) => {
        try {
            localStorage.setItem(userID, JSON.stringify(cacheData))
            console.log({ msg: 'complete cache' })
        } catch (err) {
            toast.error('LocalStorage Error ~ Out of space!', { position: toast.POSITION.TOP_RIGHT })
        }
    }
    // cache blocks viewed if user logged in
    const storeBlocksViewedHandler = async (blockSelectedData) => {

        let userID = userDataState.userID;
        let userViewCache = localStorage.getItem(userDataState.userID) || false;

        if (userViewCache) {
            userViewCache = JSON.parse(userViewCache)
            // check if user already viewed block
            if (!userViewCache.find(block => block.block === blockSelectedData.block)) userViewCache.push(blockSelectedData);
            tryToCacheBlockViewed(userID, userViewCache);
            console.log({ msg: 'block viewed', userViewCache, blockSelectedData })
        } else {
            tryToCacheBlockViewed(userID, [blockSelectedData]);
        }

    }

    // -- view state controllers --//
    // myBlocksView, txView, latestBlocksView
    const myBlocksViewSelect = () => {
        // small user auth handle
        if (!isUserLoggedIn) return
        let userID = userDataState.userID;
        let userViewCache = localStorage.getItem(userID) || false;
        userViewCache = userViewCache !== false ? JSON.parse(userViewCache) : userViewCache
        console.log({ isUserLoggedIn, userViewCache })
        setLoadingTxViewData(true)
        setUserViewBlocksHistory(userViewCache);
        setLoadingTxViewData(false);
    }
    const txViewSelect = async (blockSelected, isMyBlocksView) => {
        setSelectedBlock(blockSelected);
        if (blockSelected === false) return

        let blockSelectedData;

        // show transactions for user blocks stored
        if (isMyBlocksView) {
            blockSelectedData = localStorage.getItem(userDataState.userID) || false;
            blockSelectedData = blockSelectedData !== false ? JSON.parse(blockSelectedData) : blockSelectedData
            blockSelectedData = blockSelectedData.find(data => data.block === blockSelected);
        } else {
            let latestBlocks = blocksData.latestBlocksFiltered;
            blockSelectedData = latestBlocks.find(data => data.block === blockSelected);
            storeBlocksViewedHandler(blockSelectedData)
        }

        setTxViewBlockSelectedData(blockSelectedData);
        setLoadingTxViewData(false)

    }

    // -- Gather data -- //
    // load block reward, uncle block not inlcuded
    const loadBlockRewardData = async (blockSelected) => {
        if (loadingBlockRewardData) return toast.warning('Only 1 Block at time ~ Due to rate limiting!')
        if (blockSelected === false) return
        if (blockSelected.blockTxsLength > 100) throw toast.warning('Try a Block with 100 TXs or Less ~ Due to rate limiting!')
        setLoadingBlockRewardData(true);
        let block = blockSelected.block;
        let blockTxsLength = blockSelected.blockTxsLength;
        let rewardPromiseFail;
        // used for toast notification
        const rewardPromise = new Promise(async (resolve, reject) => {

            // disable all live updates due to rate limiting that may occur when collecting total tx fees from a given block
            let previousLiveUpdatestate = enableLiveUpdates.current;
            if (enableLiveUpdates.current) toggleLiveUpdates();

            // wait 1 sec per tx loaded if no resolve by then websocket hit rate limit, used to throw toast error
            rewardPromiseFail = new Promise((resolve, reject) => {
                let waitTime = blockTxsLength * 1000;
                setTimeout(() => {
                    setLoadingBlockRewardData(false)
                    reject(console.log({ msg: 'timeout activated loadblock reward' }))
                }, waitTime);
            });

            // get block reward for block selected 
            let blockRewardData = await getBlockReward(providers.ethWSS, blockSelected, staticData.blockReward);

            // restore user toggleLiveUpdatesState state incase it was enabled
            if (previousLiveUpdatestate) toggleLiveUpdates();
            setSelectedBlockRewardData({ block, blockRewardData });
            // notify block reward data upon success
            let resolveCallback = () => {
                setLoadingBlockRewardData(false)
                toast.success(`Block: #${block} ~ Reward: ${blockRewardData} ETH ~ Value: $${fixedNoRound2(priceData.price * blockRewardData)}`)
            }
            resolve(resolveCallback());
            reject(setLoadingBlockRewardData(false));
        });

        // if timeout resolves before data loaded, show error notification 
        let toastPromiseResult = Promise.race([rewardPromise, rewardPromiseFail])
        toast.promise(toastPromiseResult, {
            pending: `Block: #${block} ~ Total TXs: ${blockTxsLength}\n\nLoading Reward.....`,
            error: 'Reward Loading Error ~ Rate Limit :(\n\nTry Again Later.....'
        });

    }
    // load init data
    const getAppData = async (providerWSS, latestCount) => {
        try {
            let getPriceData = await getLiveDexPrice(providerWSS, addresses.uniRouter, [addresses.usdc, addresses.weth], { tokenName: 'eth', tokenDecimals: 18 }, { tokenName: 'usdc', tokenDecimals: 6 })
            let getBlocksData = await initBlocks(providerWSS, latestCount);
            //console.log({getBlocksData})
            setPriceData(getPriceData);
            setBlocksData(getBlocksData);
            setLoadingDashboardData(false);
            setDidCoreDataFail(false)
        } catch (err) {
            console.log({ err })
            // show site down or try later
            setDidCoreDataFail(true)
        }
    }

    const props = { userViewBlocksHistory, loadingDashboardData, loadingTxViewData, txViewBlockSelectedData, priceData, blocksData, txViewSelect, loadBlockRewardData, selectedBlockRewardData, getVanity, etherscanLinks, fixedNoRound2, toggleLiveUpdates, toggleLiveUpdatesState, toggleLiveDashboardUpdates, toggleLiveDashboardUpdatesState, toggleLiveNotifyUpdates, toggleLiveNotifyUpdatesState, ethers, currentProvider, isProviderListening, isBlockNotificationLive, isDashboardUpdateLive, enableLiveUpdates, getAppData, web3Login, web3Logout, userDataState, didCoreDataFail };

    const navProps = { web3Login, web3Logout, isUserLoggedIn, loadingUserLogin, userDataState, myBlocksViewSelect };

    const infoProps = { priceData, blocksData, toggleLiveUpdates, toggleLiveUpdatesState, toggleLiveDashboardUpdates, toggleLiveDashboardUpdatesState, toggleLiveNotifyUpdates, toggleLiveNotifyUpdatesState };

    const layoutProps = { didCoreDataFail }

    // light in & out animation with framer for realtime block updates
    const isPresent = useIsPresent();
    const animations = {
        style: {
            position: isPresent ? 'static' : 'absolute'
        },
        initial: { scale: 1, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 1, opacity: 0.8 },
        transition: { ease: [0.42, 0, 0.58, 1], duration: 0.8 }
    }

    return (

        <span data-testid='app'>
            <Router>
                <AppLayout props={layoutProps} navProps={navProps} infoProps={infoProps}>
                    <Routes>
                        <Route path="/" element={<Dashboard props={props} />}>
                            <Route index element={<LatestBlocksView props={props} animations={animations} />} />
                            <Route path="myBlocksView" element={
                                isUserLoggedIn ?
                                    <React.Suspense fallback={<>...</>}>
                                        <MyBlocksView props={props} animations={animations} />
                                    </React.Suspense> : <Navigate to='/' />
                            }
                            />
                            <Route path="txView" element={
                                selectedBlock ?
                                    <React.Suspense fallback={<>...</>}>
                                        <TxView props={props} animations={animations} />
                                    </React.Suspense> : <Navigate to='/' />
                            }
                            />
                        </Route>
                        <Route path="*" element={<ErrorPage props={{ message: '404! Where are you?' }} />} />
                    </Routes>
                </AppLayout>
            </Router>
        </span>

    );
};

export default App;
