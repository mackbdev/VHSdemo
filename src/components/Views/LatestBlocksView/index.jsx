import DivContainer from '../../Containers/DivContainer'
import LoadingBar from '../../Misc/LoadingBar'
import BlockPill from '../../Misc/BlockPill'

const LatestBlocksView = ({ props, animations }) => {
    
    const { loadingDashboardData, blocksData } = { ...props };
    let latestBlocks = blocksData.latestBlocksFiltered;

    return (
        <DivContainer containerClass={{class:'blockslistcontain'}}>
            <DivContainer containerClass={{class:'allpillcontain'}}>
                {loadingDashboardData ?
                    <LoadingBar props={{ msg: 'Loading Blocks Data....', showLoader: true }} /> : latestBlocks.map((data) => {
                        let childProps = { parentProps: props, data };
                        return <BlockPill key={data.block} props={childProps} animations={animations} />
                    })}
            </DivContainer>
            </DivContainer>
    );
};

export default LatestBlocksView;