import React, {} from 'react';
import { useIsPresent } from 'framer-motion'
import MyBlocksView from '../Views/MyBlocksView'
import LatestBlocksView from '../Views/LatestBlocksView'
import TxView from '../Views/TxView'

// toggle between views
const Dashboard = ({props}) => {
    
    const { view } = { ...props }

    // light in & out animation with framer for realtime block updates
    let isPresent = useIsPresent();
    let animations = {
        style: {
            position: isPresent ? 'static' : 'absolute'
        },
        initial: { scale: 0.8,  opacity: 0},
        animate: { scale: 1 , opacity: 1},
        exit: { scale: 1, opacity: 0.8 },
        transition: { ease: [0.42, 0, 0.58, 1], duration:0.8 }
    }
    return (
        <>
            {view === "myBlocksView" && (
                <MyBlocksView props={props} animations={animations}/>
            )}

            {view === "txView" && (
                <TxView props={props} animations={animations}/>
            )}

            {view === "latestBlocksView" && (
                <LatestBlocksView props={props} animations={animations} />
            )}
        </>
    )
};

export default Dashboard;
