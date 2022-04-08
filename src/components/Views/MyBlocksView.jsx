import BlockPill from '../Misc/BlockPill'
import LoadingBar from '../Misc/LoadingBar'

const MyBlocksView = ({ props, animations}) => {
    let { userViewHistory } = { ...props }
    let blocksViewed = userViewHistory.length || 0;
    return (

        <div className="myblockslistcontain">
            <div className="myblockscontain">
                <div className="blocktitlescontain">
                    <h4 className="blocktitleheading">My Block List</h4>
                    <h4 className="blocktitleheading">This is a list of Blocks you viewed on the Dashboard</h4>
                    <h4 className="blocktitleheading">Total Blocks Viewed: {blocksViewed}</h4>
                </div>
                <div className="listcontain">
                    {!userViewHistory ? <LoadingBar props={{ msg: 'No History....Browse Some Blocks!' }} /> : userViewHistory.map((data) => {
                        let childProps = { parentProps: props, data };
                        return <BlockPill key={data.block} props={childProps} animations={animations}/>
                    })}
                </div>
            </div>
        </div>

    );
};

export default MyBlocksView;