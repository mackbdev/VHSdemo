import DivContainer from '../../Containers/DivContainer'
import LoadingBar from '../../Misc/LoadingBar'
import BlockPill from '../../Misc/BlockPill'

const LatestBlocksView = ({ props, animations }) => {

    const { loadingDashboardData, blocksData, txViewSelect, priceData, fixedNoRound2 } = { ...props };
    const blockPillProps = { txViewSelect, priceData, fixedNoRound2 };
    
    let latestBlocks = blocksData?.latestBlocksFiltered || [];
    let isBlocksLoaded = latestBlocks.length > 0;

    return (
        
        <DivContainer containerClass={{ class: 'blockslistcontain' }}>
            <DivContainer containerClass={{ class: 'allpillcontain' }}>
                {loadingDashboardData && !isBlocksLoaded ?
                    <LoadingBar props={{ msg: 'Loading Blocks Data....', showLoader: true }} /> :
                    latestBlocks.map((data) => {
                        let childProps = { parentProps: blockPillProps, data };
                        return <BlockPill key={data.block} props={childProps} animations={animations} pillClass={{class:'pillcontain'}}/>
                    })}
            </DivContainer>
        </DivContainer>

    );
};

export default LatestBlocksView;