import DivContainer from '../../Containers/DivContainer'
import LoadingBar from '../../Misc/LoadingBar'
import BlockPill from '../../Misc/BlockPill'
import TitleHeading from '../../Misc/TitleHeading'

const MyBlocksView = ({ props, animations }) => {

    let { userViewHistory } = { ...props }
    let blocksViewed = userViewHistory.length || 0;

    return (

        <DivContainer containerClass={{ class: 'myblockslistcontain' }}>
            <DivContainer containerClass={{ class: 'myblockscontain' }}>
                <DivContainer containerClass={{ class: 'blocktitlescontain' }}>
                    <TitleHeading props={{ headerSize: 4, title: `My Blocks List` }} titleClass={{ class: 'blocktitleheading' }} />
                    <TitleHeading props={{ headerSize: 4, title: `This is a list of Blocks you viewed on the Dashboard` }} titleClass={{ class: 'blocktitleheading' }} />
                    <TitleHeading props={{ headerSize: 4, title: `Total Blocks Viewed: ${blocksViewed}` }} titleClass={{ class: 'blocktitleheading' }} />
                </DivContainer>
                <DivContainer containerClass={{ class: 'listcontain' }}>
                    {!userViewHistory ? <LoadingBar props={{ msg: 'No History....Browse Some Blocks!' }} /> : userViewHistory.map((data) => {
                        let childProps = { parentProps: props, data };
                        return <BlockPill key={data.block} props={childProps} animations={animations} />
                    })}
                </DivContainer>
            </DivContainer>
        </DivContainer>

    );
};

export default MyBlocksView;