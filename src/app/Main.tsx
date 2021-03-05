import { connect } from 'react-redux';
import React from 'react';

// Actions
import {
    loadListAsyncAction,
    setCountInPageAction,
    setActivePageAction,
    loadPokemonAsyncAction
} from './data/actions';

// Selectors
import {
    isLoadingSelector,
    pokemonListSelector,
    getCountInPageSelector,
    getActivePageSelector,
    pokemonListCountSelector
} from './data/selectors';

// Components
import {
    Pagination,
    Container,
    Table,
    Button,
    Icon,
    Dimmer,
    Loader,
    Dropdown,
    Image,
    Grid
} from 'semantic-ui-react'
import Details from './Details';

interface Props {
    isLoading: boolean,
    pokemonList: Array<any>,
    countInPage: number,
    activePage: number,
    listCount: number,
    loadListAsyncAction: (page: number, count: number) => void,
    setCountInPageAction: (value: number) => void,
    setActivePageAction: (value: number) => void,
    loadPokemonAsyncAction: (value: string) => void
}

class Main extends React.Component<Props> {

    componentDidMount(){
        const { loadListAsyncAction, countInPage } = this.props;
        loadListAsyncAction(1, countInPage);
    }

    changeCountInPage = (count: any) => {
        const { setCountInPageAction, setActivePageAction, countInPage, loadListAsyncAction } = this.props;
        if(countInPage === count) return;
        setCountInPageAction(count);
        setActivePageAction(1);
        loadListAsyncAction(1, count);
    };

    changePage = (page: any) => {
        const { setActivePageAction, loadListAsyncAction, countInPage } = this.props;
        setActivePageAction(page);
        loadListAsyncAction(page, countInPage);
    };

    loadPokemon = (url: string) => {
        const { loadPokemonAsyncAction } = this.props;
        loadPokemonAsyncAction(url);
    };

    render() {
        const {
            isLoading,
            pokemonList,
            countInPage,
            activePage,
            listCount
        } = this.props;

        return (
            <Container>
                {
                    pokemonList.length > 0 &&
                    <div style={{
                        padding: 50
                    }}>
                        <Grid stackable>
                            <Grid.Row>
                                <Grid.Column width={6}>
                                    <Image src='/ash.png' />
                                </Grid.Column>
                                <Grid.Column width={10}>
                                    <Table striped selectable color='orange'>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>#</Table.HeaderCell>
                                                <Table.HeaderCell>Name</Table.HeaderCell>
                                                <Table.HeaderCell textAlign='right'>
                                                    <span style={{ paddingRight: 15 }}>Count in page:</span>
                                                    <Dropdown value={countInPage} onChange={(e, {value}) => this.changeCountInPage(value)} options={[
                                                        {key: '1', text: '10', value: 10},
                                                        {key: '2', text: '20', value: 20},
                                                        {key: '3', text: '50', value: 50},
                                                        {key: '4', text: '100', value: 100},
                                                        {key: '5', text: '200', value: 200}
                                                    ]} />
                                                </Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                        {
                                            pokemonList.map((item: any, index: number) => (
                                                <Table.Row key={`pokemon-${item.name}`}>
                                                    <Table.Cell>{isLoading ? null : (activePage - 1) * countInPage + index + 1}</Table.Cell>
                                                    <Table.Cell>{isLoading ? null : item.name}</Table.Cell>
                                                    <Table.Cell textAlign='right'>
                                                        <Button disabled={isLoading} size='tiny' primary animated='vertical' onClick={() => this.loadPokemon(item.url)}>
                                                            <Button.Content hidden>Profile</Button.Content>
                                                            <Button.Content visible>
                                                                <Icon name='address card' />
                                                            </Button.Content>
                                                        </Button>
                                                    </Table.Cell>
                                                </Table.Row>
                                            ))
                                        }
                                        </Table.Body>
                                    </Table>
                                    <div style={{
                                        textAlign: 'center'
                                    }}>
                                        <Pagination
                                            style={{margin: 'auto'}}
                                            ellipsisItem={null}
                                            activePage={activePage}
                                            firstItem={null}
                                            lastItem={null}
                                            secondary
                                            totalPages={Math.ceil(listCount / countInPage)}
                                            boundaryRange={1}
                                            siblingRange={2}
                                            size='mini'
                                            onPageChange={(e, {activePage}) => this.changePage(activePage)}
                                        />
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <Details />
                    </div>
                }
                <Dimmer active={isLoading} inverted style={{
                    position: 'fixed'
                }}>
                    <Loader data-testid="loading" content='Loading' />
                </Dimmer>
            </Container>
        );
    }
}

export default connect(
    state => ({
        isLoading: isLoadingSelector(state),
        pokemonList: pokemonListSelector(state),
        countInPage: getCountInPageSelector(state),
        activePage: getActivePageSelector(state),
        listCount: pokemonListCountSelector(state)
    }),
    {
        loadListAsyncAction,
        setCountInPageAction,
        setActivePageAction,
        loadPokemonAsyncAction
    }
)(Main);