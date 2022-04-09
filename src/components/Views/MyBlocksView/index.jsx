import DivContainer from '../../Containers/DivContainer'
import LoadingBar from '../../Misc/LoadingBar'
import BlockPill from '../../Misc/BlockPill'

const MyBlocksView = ({ props, animations}) => {

    let { userViewHistory } = { ...props }
    let blocksViewed = userViewHistory.length || 0;
    
    return (

        <DivContainer containerClass={{class:'myblockslistcontain'}}>
            <DivContainer containerClass={{class:'myblockscontain'}}>
                <DivContainer containerClass={{class:'blocktitlescontain'}}>
                    <h4 className="blocktitleheading">My Block List</h4>
                    <h4 className="blocktitleheading">This is a list of Blocks you viewed on the Dashboard</h4>
                    <h4 className="blocktitleheading">Total Blocks Viewed: {blocksViewed}</h4>
                </DivContainer>
                <DivContainer containerClass={{class:'listcontain'}}>
                    {!userViewHistory ? <LoadingBar props={{ msg: 'No History....Browse Some Blocks!' }} /> : userViewHistory.map((data) => {
                        let childProps = { parentProps: props, data };
                        return <BlockPill key={data.block} props={childProps} animations={animations}/>
                    })}
                </DivContainer>
            </DivContainer>
        </DivContainer>

    );
};

export default MyBlocksView;