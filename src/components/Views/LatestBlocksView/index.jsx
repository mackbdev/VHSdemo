
import BlockPill from '../../Misc/BlockPill'
import LoadingBar from '../../Misc/LoadingBar'

const LatestBlocksView = ({ props, animations }) => {
    const { loadingDashboardData, blocksData } = { ...props };
    let latestBlocks = blocksData.latestBlocksFiltered;
    return (
        <div className="blockslistcontain">
            <div className="allpillcontain">
                {loadingDashboardData ?
                    <LoadingBar props={{ msg: 'Loading Blocks Data....', showLoader: true }} /> : latestBlocks.map((data) => {
                        let childProps = { parentProps: props, data };
                        return <BlockPill key={data.block} props={childProps} animations={animations} />
                    })}
            </div>
        </div>
    );
};

export default LatestBlocksView;