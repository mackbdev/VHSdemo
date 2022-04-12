import DivContainer from '../../Containers/DivContainer'
import LoadingBar from '../../Misc/LoadingBar'
import BlockPill from '../../Misc/BlockPill'
import TitleHeading from '../../Misc/TitleHeading'
import GoBackButton from '../../Buttons/GoBackButton'

const MyBlocksView = ({ props, animations }) => {

    let { userViewBlocksHistory } = { ...props }
    let blocksViewed = userViewBlocksHistory.length || 0;

    return (

        <DivContainer containerClass={{ class: 'myblockslistcontain' }}>
            <DivContainer containerClass={{ class: 'myblockscontain' }}>
                <DivContainer containerClass={{ class: 'blocktitlescontain' }}>
                    <TitleHeading props={{ headerSize: 3, title: `My Blocks List` }} titleClass={{ class: 'blocktitleheading' }} />
                    <TitleHeading props={{ headerSize: 3, title: `This is a list of Blocks you viewed on the Dashboard` }} titleClass={{ class: 'blocktitleheading' }} />
                    <TitleHeading props={{ headerSize: 3, title: `Total Blocks Viewed: ${blocksViewed}` }} titleClass={{ class: 'blocktitleheading' }} />
                </DivContainer>
                <DivContainer containerClass={{ class: 'listcontain' }}>
                    {!userViewBlocksHistory ? <LoadingBar props={{ msg: 'No History....Browse Some Blocks!' }} /> : userViewBlocksHistory.map((data) => {
                        let childProps = { parentProps: props, data };
                        return <BlockPill key={data.block} props={childProps} animations={animations} pillClass={{class:'txpillcontain'}}/>
                    })}
                </DivContainer>
                <GoBackButton />
            </DivContainer>
        </DivContainer>

    );
};

export default MyBlocksView;