import { Chart } from "react-google-charts";
import { NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Card, CardBody, CardTitle, CardText, CardSubtitle, CardImg } from 'reactstrap';
import React, { Component } from "react";
import image from '../../../images/shelter-aboriginal.png';
import logo from '../../../images/blue-logo.png';

export default class Stats extends Component {
    constructor(props) {
      super(props);
      this.state = {
        dropdownOpen: false,
        type: 1,
        dropName: "Demographics"
      };

      // Hard Coded for now
        this.volumedata = [
            ["Date", "Male", "Female", "Other"],
            ["Nov 24th", 22, 32, 2],
            ["Nov 25th", 26, 12, 5],
            ["Nov 26th", 19, 18, 7],
            ["Nov 27th", 20, 35, 2],
            ["Nov 28th", 25, 14, 5],
            ["Nov 29th", 16, 20, 7],
            ["Nov 30th", 13, 26, 2]
        ];

        this.bedsdata = [
            ["Date", "Number of Beds"],
            ["Nov 24th", 2],
            ["Nov 25th", 5],
            ["Nov 26th", 0],
            ["Nov 27th", 2],
            ["Nov 28th", 5],
            ["Nov 29th", 0],
            ["Nov 30th", 2]
        ];
        
        this.agedata = [
            ['Age', 'Percentage'],
            ['Children (Under 18)', 16],
            ['Adult (18+)', 52],
            ['Seniors (65+)', 32],
        ];

        this.optionsDemand = {
            title: "Past Week's Shelter Visitor Demographic",
            curveType: "function",
            legend: { position: "bottom" }
        };

        this.optionsBeds = {
            title: "Beds Availability",
            curveType: "function",
            legend: { position: "bottom" }
        };

        this.optionsAge = {
            title: 'Age of Visitors Over Last Week',
            pieHole: 0.3,
        };
        this.toggle = this.toggle.bind(this);
        this.setTypeVolume = this.setTypeVolume.bind(this);
        this.setTypeBeds = this.setTypeBeds.bind(this);
    }
  
    toggle() {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
      }

    componentDidMount() {
    }

    loadChart(){
        if(this.state.type === 1){
          return (
            <Chart
              chartType="Bar"
              height="400px"
              loader={<div>Loading Chart</div>}
              data={this.volumedata}
              options={this.optionsDemand}
              style={{marginLeft: "12px", marginRight: "12px"}}
            />
          );
        }
        else{
          return (
            <Chart
                chartType="Bar"
                width="100%"
                height="400px"
                loader={<div>Loading Chart</div>}
                data={this.bedsdata}
                options={this.optionsBeds}
            />
          )
        }
    }
  
    setTypeVolume(){
        this.setState({type : 1, dropName: "Demographics"});
    }

    setTypeBeds(){
        this.setState({type : 0, dropName: "Traffic"});
    }

    render() {
      return (
        <div className = "stats">
          <div className="Navbar">
            <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
            <a className="navbar-brand" href="#"><img style={{width: "50px", height: "50px"}} src={logo} alt="logo"/>&nbsp; Sheltermap</a>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <div className="navbar-nav ml-auto">
                  <NavItem>
                    <NavLink href="/shelters">Shelter List</NavLink>
                  </NavItem>
                  <a href="/signin"><button type="button" className="btn btn-primary">Shelter Worker's Portal</button></a>
                </div>
              </div>
            </nav>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div className = "topChart">
                <Chart
                    chartType="PieChart"
                    width={'600px'}
                    height={'600px'}
                    loader={<div>Loading Chart</div>}
                    data={this.agedata}
                    options={this.optionsAge}
                    rootProps={{ 'data-testid': '3' }}
                />     
              </div>
            </div>
            <div class="col-md-6">
              <Card>
                <CardBody>
                <CardImg top src={image} style={{width: "400px", height: "400px", display: "block", marginLeft:"auto", marginRight:"auto", marginBottom: "10px"}}/>
                  <CardTitle>Aboriginal Shelter Vancouver</CardTitle>
                  <CardSubtitle>201 Central Street</CardSubtitle>
                  <CardText>Beds Available: 60</CardText>
                </CardBody>
              </Card>  
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} style={{marginBottom: "10px", marginLeft: "10px"}}>
                  <DropdownToggle caret>
                      {this.state.dropName}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>Chart Type</DropdownItem>
                    <DropdownItem onClick={this.setTypeBeds}>Traffic</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={this.setTypeVolume}>Demographic</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                {this.loadChart()}
            </div>
          </div>
        </div>
      );
    }
};
