import React, { Component } from 'react'
import { Segment, Container, Grid, Button, Header } from 'semantic-ui-react'

const url = "http://localhost:8080"

function getState(state) {
  var estate;
  switch (state) {
    case 0:
      estate = "Starting";
      break;
    case 1:
      estate = "EV Not connected";
      break;
    case 2:
      estate = "EV Connected";
      break;
    case 3:
      estate = "Charging";
      break;
    case 4:
      estate = "Vent Required";
      break;
    case 5:
      estate = "Diode Check Failed";
      break;
    case 6:
      estate = "GFCI Fault";
      break;
    case 7:
      estate = "No Earth Ground";
      break;
    case 8:
      estate = "Stuck Relay";
      break;
    case 9:
      estate = "GFCI Self Test Failed";
      break;
    case 10:
      estate = "Over Temperature";
      break;
    case 11:
      estate = "Over Current";
      break;
    case 254:
    case 255:
      estate = "Waiting";
      break;
    default:
      estate = "Invalid";
      break;
  }
  return estate;
}

class App extends Component {
  state = {
    chargeKwh: "∞",
    sessionEnergy: 0,
    state: 0
  }
  //TODO CHANGE URL!!!!
  componentDidMount() {
    fetch(url + "/r?json=1&rapi=$GH", {
      "method": "GET",
    }).then(response => response.json())
      .then(data => {

        var a = data.ret.replace("$OK ", "");
        a = a.substring(0, a.indexOf('^'))

        if (a === "0") {
          a = "∞";
        }else{
          a= Math.ceil(parseFloat(a)-this.state.sessionEnergy)
        }

        this.setState((chargeKwh) => ({ chargeKwh: a }))
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    fetch(url + "/status", {
      "method": "GET",
    }).then(response => response.json())
      .then(data => {
        this.setState((sessionEnergy) => ({ sessionEnergy: parseFloat(data.session_energy)/1000 }))
        this.setState((sessionEnergy) => ({ state: getState(data.state) }))
        console.log(data.state);
      })
      .catch((error) => {
        console.error('Error:', error);
      });


  }


  handleClick = (arg) => {
    this.setState((chargeKwh) => ({ chargeKwh: "..." }))

    var currentSoc = parseInt(arg)

    var toCharge = 0

    if (currentSoc !== 0) {
      var totalBatteryCapacity = 32;
      var targetKwh = totalBatteryCapacity * 0.9 //charge to 90%

      var currentCapacity = totalBatteryCapacity * (currentSoc / 100)

      toCharge = targetKwh - currentCapacity + this.state.sessionEnergy;

    }

    fetch(url + "/r?json=1&rapi=$SH+" + Math.ceil(toCharge), {
      "method": "GET",
    }).then(data => {
      this.componentDidMount();
    }).catch((error) => {
      console.error('Error:', error);
    });

  }

  handleReset = (arg) => {


    fetch(url + "/override", {
      "body": "{\"state\":\"active\"}",
      "method": "POST",
    }).then(data => {

      fetch(url + "/override", {
        "method": "DELETE",
      }).then(data => {

        fetch(url + "/r?json=1&rapi=$SH+0", {
          "method": "GET",
        }).then(data => {
          this.componentDidMount();
        }).catch((error) => {
          console.error('Error:', error);
        });

      });

    });
  }

  render() {
    return (
      <div className="App">
        <Container style={{ marginTop: '2em' }}>
          <Header as='h1' textAlign='center'>Charge my Bimmer to 90%</Header>
          <Header as='h1' textAlign='center'>Status: {this.state.state}</Header>
          <Segment>
            <Header as='h1' textAlign='center'>Select currenct SOC</Header>
            <Grid container columns={2} doubling>
              <Grid.Column>
                <Button onClick={() => this.handleClick(5)} fluid primary size='massive'>5 %</Button>
              </Grid.Column>
              <Grid.Column>
                <Button onClick={() => this.handleClick(10)} fluid primary size='massive'>10 %</Button>
              </Grid.Column>
              <Grid.Column>
                <Button onClick={() => this.handleClick(15)} fluid primary size='massive'>15 %</Button>
              </Grid.Column>
              <Grid.Column>
                <Button onClick={() => this.handleClick(20)} fluid primary size='massive'>20 %</Button>
              </Grid.Column>
              <Grid.Column>
                <Button onClick={() => this.handleClick(25)} fluid primary size='massive'>25 %</Button>
              </Grid.Column>
              <Grid.Column>
                <Button onClick={() => this.handleClick(30)} fluid primary size='massive'>30 %</Button>
              </Grid.Column>
              <Grid.Column>
                <Button onClick={() => this.handleClick(35)} fluid primary size='massive'>35 %</Button>
              </Grid.Column>
              <Grid.Column>
                <Button onClick={() => this.handleClick(40)} fluid primary size='massive'>40 %</Button>
              </Grid.Column>
              <Grid.Column>
                <Button onClick={() => this.handleClick(45)} fluid primary size='massive'>45 %</Button>
              </Grid.Column>
              <Grid.Column>
                <Button onClick={() => this.handleClick(50)} fluid primary size='massive'>50 %</Button>
              </Grid.Column>
              <Grid.Column>
                <Button onClick={() => this.handleClick(55)} fluid primary size='massive'>55 %</Button>
              </Grid.Column>
              <Grid.Column>
                <Button onClick={() => this.handleClick(60)} fluid primary size='massive'>60 %</Button>
              </Grid.Column>
              <Grid.Column>
                <Button onClick={() => this.handleClick(65)} fluid primary size='massive'>65 %</Button>
              </Grid.Column>
              <Grid.Column>
                <Button onClick={() => this.handleClick(70)} fluid primary size='massive'>70 %</Button>
              </Grid.Column>
              <Grid.Column>
                <Button onClick={() => this.handleClick(75)} fluid primary size='massive'>75 %</Button>
              </Grid.Column>
              <Grid.Column>
                <Button onClick={() => this.handleClick(80)} fluid primary size='massive'>80 %</Button>
              </Grid.Column>
              <Grid.Column>
                <Button onClick={() => this.handleClick(85)} fluid primary size='massive'>85 %</Button>
              </Grid.Column>
              <Grid.Column>
                <Button onClick={() => this.handleReset()} fluid primary size='massive'>Reset</Button>
              </Grid.Column>
            </Grid>
            <Header as='h2' textAlign='center'>Will charge for {this.state.chargeKwh} kwh</Header>
          </Segment>
        </Container>

      </div>
    );
  }

}

export default App;
