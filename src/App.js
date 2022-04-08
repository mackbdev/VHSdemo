import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { ethers } from 'ethers';
import { ToastContainer, toast } from 'react-toastify';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Nav from './components/Core/Nav'
import Dashboard from './components/Core/Dashboard'
import InfoBox from './components/Cards/InfoBox'
import Loadingbar from './components/Misc/LoadingBar';
import { addresses, providers, staticData, evmChains, _infuraID, etherscanLinks } from './backend/staticVariables'
import { getVanity, fixedNoRound2, getLiveDexPrice, getLatestBlock, getTxFee, initBlocks } from './backend/coreFunctions'
import 'react-toastify/dist/ReactToastify.css';


// -- app component -- //
const App = () => {

    // set user state
    const [userViewHistory, setUserViewHistory] = useState(false);
    const [userData, setUserData] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [loadingUserLogin, setLoadingUserLogin] = useState(false);

    // set data state
    const [priceData, setPriceData] = useState('....');
    const [blocksData, setBlocksData] = useState('....');
    const [selectedBlockRewardData, setSelectedBlockRewardData] = useState(false);
    
    // live update settings, use refs to persist data between renders
    const currentProvider = useRef(false);
    const isBlockNotificationLive = useRef(true);
    const isDashboardUpdateLive = useRef(true);
    const enableAllLiveUpdates = useRef(true);

    // added state to rerender the buttons
    const [toggleLiveBlockUpdatesState, setToggleLiveBlockUpdatesState] = useState(true);
    const [toggleLiveDashboardUpdatesState, setToggleLiveDashboardUpdatesState] = useState(true);
    const [toggleAllLiveUpdatesState, setToggleAllLiveUpdatesState] = useState(true);

    // toggle updates - enable or disable all forms of update
    const toggleAllLiveUpdates = async () => {
        setToggleAllLiveUpdatesState(prev => {
            enableAllLiveUpdates.current = !prev;
            setToggleLiveDashboardUpdatesState(prev => {
                isDashboardUpdateLive.current = !prev;
                return !prev
            });
            setToggleLiveBlockUpdatesState(prev => {
                isBlockNotificationLive.current = !prev;
                return !prev
            });
            return !prev
        });
    };
    // enable or disable rerendering of the dashboard for new blocks
    const toggleLiveDashboardUpdates = async () => {
        setToggleLiveDashboardUpdatesState(prev => {
            isDashboardUpdateLive.current = !prev;
            return !prev
        });
    };
    // enable or disable nofitications of the latest block
    const toggleLiveBlockUpdates = async () => {
        setToggleLiveBlockUpdatesState(prev => {
            isBlockNotificationLive.current = !prev;
            return !prev
        });
    };

    //-- view states --//
    const [didCoreDataFail, setDidCoreDataFail] = useState(false);
    const [loadingDashboardData, setLoadingDashboardData] = useState(true);
    const [loadingTxViewData, setLoadingTxViewData] = useState(true);
    const [loadingBlockRewardData, setLoadingBlockRewardData] = useState(false);
    const [txViewBlockSelectedData, setTxViewBlockSelectedData] = useState(false);
    const [view, setView] = useState('latestBlocksView');

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
            setIsUserLoggedIn(false)
            setLoadingUserLogin(false)
            return null;
        }

        let chainID = await metaWallet.provider.networkVersion
        console.log({ chainID })
        if (chainID === evmChains.eth) {
            let signer = metaWallet.getSigner();
            let userID = await signer.getAddress();
            let userVanity = getVanity(userID, 4, 4);
            let userData = { userID, userVanity, metaWallet, signer, provider, chainID };
            setUserData(userData)
            setIsUserLoggedIn(true);
            setLoadingUserLogin(false);
            return
        } else {
            setIsUserLoggedIn(false)
            setLoadingUserLogin(false)
            toast.error('Wrong Network. Please swtich to ETH Mainnet.', { position: toast.POSITION.TOP_CENTER })
            return
        }
    }
    const web3Logout = async () => {
        setLoadingUserLogin(true)
        setIsUserLoggedIn(false)
        setLoadingUserLogin(false)
        setView('latestBlocksView')
    }

    // -- view state controllers --//
    // myBlocksView, txView, latestBlocksView
    const latestBlocksViewSelect = () => setView('latestBlocksView');
    const myBlocksViewSelect = (userID) => {
        // small user auth handle
        if (!isUserLoggedIn) return latestBlocksViewSelect();
        let userViewCache = localStorage.getItem(userID) || false;
        userViewCache = userViewCache ? JSON.parse(userViewCache) : userViewCache
        console.log({ isUserLoggedIn, userViewCache })
        setLoadingTxViewData(true)
        setUserViewHistory(userViewCache);
        setLoadingTxViewData(false);
        setView('myBlocksView');
        console.log({ msg: 'myblocks', userID })
    }
    const txViewSelect = async (blockSelected) => {
        if (blockSelected === false) return latestBlocksViewSelect()
        let latestBlocks = blocksData.latestBlocksFiltered;
        let blockSelectedData = latestBlocks.find(data => data.block === blockSelected);

        // handle caching of blocks viewed by a given user
        if (isUserLoggedIn) {
            let userViewCache = localStorage.getItem(userData.userID) || false;
            if (userViewCache !== false) {
                userViewCache = JSON.parse(userViewCache)
                // check if block already exists before saving 
                //console.log({msg:'viewselect',isUserLoggedIn,userViewCache,blockSelectedData,res:userViewCache.find(block => block.block == blockSelectedData.block)})
                if (!userViewCache.find(block => block.block === blockSelectedData.block)) userViewCache.push(blockSelectedData);
                try {
                    localStorage.setItem(userData.userID, JSON.stringify(userViewCache))
                } catch (err) {
                    toast.error('LocalStorage Error, Out of space!', { position: toast.POSITION.TOP_RIGHT })
                }
            } else {
                localStorage.setItem(userData.userID, JSON.stringify([blockSelectedData]))
            }
        }

        setTxViewBlockSelectedData(blockSelectedData);
        setLoadingTxViewData(false)
        setView('txView');

    }

    // -- Gather data -- //
    // load block reward, uncle block not inlcuded
    const loadBlockRewardData = async (blockSelected) => {
        if (loadingBlockRewardData) throw toast.warning('Only 1 Block at time ~ Due to rate limiting!')
        if (blockSelected === false) return latestBlocksViewSelect()
        if (blockSelected.blockTxsLength > 100) throw toast.warning('Try a Block with 100 TXs or Less ~ Due to rate limiting!')
        setLoadingBlockRewardData(true);
        let blockGasPaid = 0;
        let block = blockSelected.block;
        let blockTxs = blockSelected.blockTxs;
        let blockTxsLength = blockSelected.blockTxsLength;
        let blockGasBurned = blockSelected.gasBurned;

        const rewardPromise = new Promise(async (resolve, reject) => {
            let previousAllLiveUpdateState = enableAllLiveUpdates.current;

            // disable all live updates due to rate limiting that may occur when collecting total tx fees from a given block
            if (enableAllLiveUpdates.current) enableAllLiveUpdates.current = false;
            let counter = 0
            for await (let tx of blockTxs) {
                let txFee = await getTxFee(providers.ethWSS, tx.hash)
                blockGasPaid += txFee
                counter++
                console.log({ progress: `${counter}/${blockTxsLength}` })
            }
            let blockRewardData = fixedNoRound2(staticData.blockReward + blockGasPaid - blockGasBurned);
            // restore user allUpdate state incase it was enabled
            enableAllLiveUpdates.current = previousAllLiveUpdateState;
            // Notify Block Reward Data upon success
            toast.success(`Block: #${block} ~ Reward: ${blockRewardData} ETH ~ Value: $${fixedNoRound2(priceData.price * blockRewardData)}`)
            setSelectedBlockRewardData({ block, blockRewardData });
            resolve(setLoadingBlockRewardData(false));
            reject(setLoadingBlockRewardData(false));
        });

        toast.promise(rewardPromise, {
            pending: `Block: #${block} ~ Total TXs: ${blockTxsLength}\n\nLoading Reward.....`,
            error: "Try Again Later....."
        });
    }
    // load init data
    const getAppData = async (providerWSS, latestCount) => {
        try {
            let getPriceData = await getLiveDexPrice(providerWSS, addresses.uniRouter, [addresses.usdc, addresses.weth], { tokenName: 'eth', tokenDecimals: 18 }, { tokenName: 'usdc', tokenDecimals: 6 })
            let latestBlock = await getLatestBlock(providerWSS)
            let getBlocksData = await initBlocks(providerWSS, latestBlock, latestCount);
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

    // -- useEffects --//
    useLayoutEffect(() => {
        getAppData(providers.ethWSS, staticData.latestCount)
        // listen for page reload & log back in if cached
        if (String(window.performance.getEntriesByType("navigation")[0].type) === 'reload') {
            web3Login()
        }
    }, [])
    // listen for window ethereum updates
    useEffect(() => {
        window.ethereum.removeListener("accountsChanged", () => { })
        window.ethereum.removeListener("chainChanged", () => { })
        if (!userData) return
        window.ethereum.on('chainChanged', (chainID) => {
            if (chainID !== evmChains.eth) web3Logout()
            console.log('chainChanged', chainID);
        });
        window.ethereum.on('accountsChanged', (accounts) => {
            window.location.reload()
        });

    }, [userData])
    // live update for blocks
    useEffect(() => {
        if (currentProvider.current === false) {
            try {
                let publicProvider = new ethers.providers.WebSocketProvider(providers.ethWSS);
                currentProvider.current = publicProvider
            } catch (err) {
                err = { msg: 'Websocket failed connection with provider!', err }
                toast.error(err.msg)
                throw console.log(err)

            }
        }

        // disable live updates
        if ((!isBlockNotificationLive.current && !isDashboardUpdateLive.current) || !enableAllLiveUpdates.current) {
            //console.log('disable listeners check', currentProvider.current.removeAllListeners('block'))
            return
        }
        //console.log('before listner starts count', currentProvider.current.listeners())
        currentProvider.current.on('block', (block) => {
            if (isBlockNotificationLive.current) toast(`Latest Block: #${block}`, { position: toast.POSITION.TOP_RIGHT })
            if (isDashboardUpdateLive.current) getAppData(providers.ethWSS, staticData.latestCount)
            console.log({ msg: 'latest', block })
        });
        //console.log('after listener starts count', currentProvider.current.listeners())
    }, [toggleLiveBlockUpdatesState, toggleLiveDashboardUpdatesState, toggleAllLiveUpdatesState])


    const props = { userViewHistory, loadingDashboardData, loadingTxViewData, txViewBlockSelectedData, priceData, blocksData, view, latestBlocksViewSelect, txViewSelect, loadBlockRewardData, selectedBlockRewardData, getVanity, etherscanLinks, fixedNoRound2, toggleAllLiveUpdates, toggleAllLiveUpdatesState, toggleLiveDashboardUpdates, toggleLiveDashboardUpdatesState, toggleLiveBlockUpdates, toggleLiveBlockUpdatesState, ethers };

    const navProps = { web3Login, web3Logout, isUserLoggedIn, loadingUserLogin, userData, myBlocksViewSelect, setView };

    const infoProps = { priceData, blocksData, toggleAllLiveUpdates, toggleAllLiveUpdatesState, toggleLiveDashboardUpdates, toggleLiveDashboardUpdatesState, toggleLiveBlockUpdates, toggleLiveBlockUpdatesState };

    return (

        <div className="appcontain">
            <Nav props={navProps} />
            <div className="sectioncontain">
                <div className="dashcontain">
                    {/* load try again later page if data cannot be pulled successfully */}
                    {!didCoreDataFail && <InfoBox props={infoProps} />}
                    {!didCoreDataFail && <Dashboard props={props} />}
                    {didCoreDataFail &&
                        <div className="loadingbarcontain">
                            <Loadingbar props={{ msg: 'Core Data Failed to Load....Please Try Again!', showLoader: false }} />
                        </div>
                    }
                    {/* mobile view placeholder */}
                    <div className="mobiledisclaimercontain">
                        <div className="minititlecontain">
                            <h6 className="discalimertitleheading">Mobile Not Ready :)</h6>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footercontain"></div>
            {/* container used to display toast notifications */}
            <ToastContainer position="top-right" autoClose={4000} hideProgressBar={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
};

export default App;
