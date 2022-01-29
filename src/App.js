import React, { Component } from 'react'
import { Segment, Container, Grid, Button, Header } from 'semantic-ui-react'

const url = "http://192.168.1.50:1330"


class App extends Component {
  state = {
    status: { carStatus: {}, chargerStatus: {} }
  }

  componentDidMount() {
    fetch(url + "/status", {
      "method": "GET",
    }).then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState(() => ({ status: data }))
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }


  handleClick = (arg) => {
    var currentSoc = parseInt(arg)

    fetch(url + "/setTargetPercent", {
      "method": "POST",
      "body": JSON.stringify({ targetPercent: Math.ceil(currentSoc) }),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(data => {
      this.componentDidMount();
    }).catch((error) => {
      console.error('Error:', error);
    });

  }


  render() {
    return (
      <div className="App">
        <Container style={{ marginTop: '2em' }}>
          <Header as='h1' textAlign='center'>{this.state.status.isBimmerChargingAtHome ? "BMW is charging at home" : "BMW is NOT charging at home"}</Header>

          <Segment>
            <Header as='h2' textAlign='center'>System status</Header>
            <Grid container columns={2}>
              <Grid.Column>
                <Header as='h4' textAlign='center'>{this.state.status.didLockUp ? "Issue on backend!!!" : "All systems nominal"}</Header>
              </Grid.Column>
              <Grid.Column>
                <Header as='h4' textAlign='center'>Target percent: {this.state.status.targetPercent}</Header>
              </Grid.Column>
            </Grid>

          </Segment>



          <Segment>
            <Header as='h2' textAlign='center'>Select currenct SOC</Header>
            <Grid container columns={2}>

              <Grid.Column>
                <Button onClick={() => this.handleClick(10)} fluid primary size='massive'>10%</Button>
              </Grid.Column>

              <Grid.Column>
                <Button onClick={() => this.handleClick(20)} fluid primary size='massive'>20%</Button>
              </Grid.Column>

              <Grid.Column>
                <Button onClick={() => this.handleClick(30)} fluid primary size='massive'>30%</Button>
              </Grid.Column>

              <Grid.Column>
                <Button onClick={() => this.handleClick(40)} fluid primary size='massive'>40%</Button>
              </Grid.Column>

              <Grid.Column>
                <Button onClick={() => this.handleClick(50)} fluid primary size='massive'>50%</Button>
              </Grid.Column>

              <Grid.Column>
                <Button onClick={() => this.handleClick(60)} fluid primary size='massive'>60%</Button>
              </Grid.Column>

              <Grid.Column>
                <Button onClick={() => this.handleClick(70)} fluid primary size='massive'>70%</Button>
              </Grid.Column>

              <Grid.Column>
                <Button onClick={() => this.handleClick(80)} fluid primary size='massive'>80%</Button>
              </Grid.Column>
              <Grid.Column>
                <Button onClick={() => this.handleClick(90)} fluid primary size='massive'>90%</Button>
              </Grid.Column>
              <Grid.Column>
                <Button onClick={() => this.handleClick(100)} fluid primary size='massive'>100%</Button>
              </Grid.Column>
            </Grid>
          </Segment>


        <Segment>
          <Header as='h2' textAlign='center'>Car status</Header>
          <Grid container columns={3}>
            <Grid.Column>
              <Header as='h4' textAlign='center'>SOC: {this.state.status.carStatus.carSoc}</Header>
            </Grid.Column>
            <Grid.Column>
              <Header as='h4' textAlign='center'>{this.state.status.carStatus.isCharging ? "Charging" : "Not charging"}</Header>
            </Grid.Column>
            <Grid.Column>
              <Header as='h4' textAlign='center'>Is home: {this.state.status.carStatus.isHome ? "Home" : "Away"}</Header>
            </Grid.Column>
          </Grid>
        </Segment>

        <Segment>
          <Header as='h2' textAlign='center'>Charger status</Header>
          <Grid container columns={3}>
            <Grid.Column>
              <Header as='h4' textAlign='center'>Session energy: {this.state.status.chargerStatus.session_energy}kWh</Header>
            </Grid.Column>
            <Grid.Column>
              <Header as='h4' textAlign='center'>{this.state.status.chargerStatus.state}</Header>
            </Grid.Column>
            <Grid.Column>
              <Header as='h4' textAlign='center'>Charge limit: {this.state.status.chargeLimit}kWh</Header>
            </Grid.Column>
          </Grid>
        </Segment>
        </Container>
      </div>
    );
  }

}

export default App;
