import React from 'react';
import { connect } from 'react-redux';

// Actions
import {
    showDetailAction
} from './data/actions';

// Selectors
import {
    getShowDetailSelector,
    getDetailsSelector
} from './data/selectors';

// Components
import {
    Modal,
    Image,
    Button,
    Icon,
    Progress,
    Container,
    Accordion,
    Label
} from 'semantic-ui-react';

interface Props {
    isShown: boolean,
    details: any,
    showDetailAction: (value: boolean) => void
}

interface State {
    activeIndex: number
}

class Details extends React.Component<Props, State> {

    constructor(props: Props){
        super(props);
        this.state = {
            activeIndex: -1
        };
    }

    getColor = (percent: number) => {
        if(percent > 70)
            return 'green';
        else if(percent > 30)
            return 'orange';
        else return 'red';
    };

    handleClick = (index: any) => {
        const { activeIndex } = this.state;
        this.setState({
            activeIndex: activeIndex === index ? -1 : index
        });
    };

    render() {
        const { isShown, showDetailAction, details } = this.props;
        const { activeIndex } = this.state;
        if(details.name === undefined) return null;
        return (
        <Modal
            open={isShown}
            onClose={() => showDetailAction(false)}
            size="small"
        >
            <Modal.Header><Icon name='address card outline' />{details.name} profile | order number: {details.order}</Modal.Header>
            <Modal.Content image>
                <Image size='medium' src={details.sprites.front_default} wrapped />
                <Modal.Description>
                    <Container>
                        <h3>Stats:</h3>
                        {
                            details.stats.map((item: any) => (
                              <div key={`stat-${item.stat.name}`}>
                                  <span>{item.stat.name}:</span>
                                  <Progress style={{ margin: '0 0 0.5em' }} size='small' percent={item.base_stat} color={this.getColor(item.base_stat)} />
                              </div>
                            ))
                        }
                        <div style={{padding: '1em 0'}}>
                            <Accordion fluid styled>
                                <Accordion.Title
                                  active={activeIndex === 1}
                                  index={1}
                                  onClick={(e, {index}) => this.handleClick(index)}
                                >
                                  <Icon name='dropdown' />Types:
                                </Accordion.Title>
                                <Accordion.Content active={activeIndex === 1}>
                                    {
                                        details.types.map((item: any) => (
                                            <Label style={{ marginBottom: '0.3em' }} color='green' key={`type-${item.type.name}`}><Icon name='angle right' />{item.type.name}</Label>
                                        ))
                                    }
                                </Accordion.Content>

                                <Accordion.Title
                                  active={activeIndex === 2}
                                  index={2}
                                  onClick={(e, {index}) => this.handleClick(index)}
                                >
                                  <Icon name='dropdown' />Abilities:
                                </Accordion.Title>
                                <Accordion.Content active={activeIndex === 2}>
                                    {
                                        details.abilities.map((item: any) => (
                                            <Label style={{ marginBottom: '0.3em' }} color='blue' key={`ability-${item.ability.name}`}><Icon name='angle right' />{item.ability.name}</Label>
                                        ))
                                    }
                                </Accordion.Content>
                                <Accordion.Title
                                  active={activeIndex === 0}
                                  index={0}
                                  onClick={(e, {index}) => this.handleClick(index)}
                                >
                                  <Icon name='dropdown' />Moves:
                                </Accordion.Title>
                                <Accordion.Content active={activeIndex === 0}>
                                    {
                                        details.moves.map((item: any) => (
                                            <Label style={{ marginBottom: '0.3em' }} color='purple' key={`move-${item.move.name}`}><Icon name='angle right' />{item.move.name}</Label>
                                        ))
                                    }
                                </Accordion.Content>
                            </Accordion>
                        </div>
                        
                    </Container>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => showDetailAction(false)} primary>
                    <Icon name='chevron left' /> Back
                </Button>
            </Modal.Actions>
        </Modal>
        );
    }

};

export default connect(
    state => ({
        isShown: getShowDetailSelector(state),
        details: getDetailsSelector(state)
    }),
    {
        showDetailAction
    }
)(Details);