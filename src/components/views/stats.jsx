import { Chart } from "react-google-charts";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import React, { Component } from "react";
import axios from 'axios';


export default class Stats extends Component {
    constructor(props) {
      super(props);
      this.state = {
        dropdownOpen: false,
        type: 1,
      };
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
                    width="100%"
                    height="400px"
                    loader={<div>Loading Chart</div>}
                    data={this.volumedata}
                    options={this.optionsDemand}
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
        this.setState({type : 1});
    }

    setTypeBeds(){
        this.setState({type : 0});
    }

    render() {
        return (
            <div className = "stats">  
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

                <div className = "botChart">
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret>
                            Dropdown
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

                {/* <Chart
                    chartType="Bar"
                    width="100%"
                    height="400px"
                    loader={<div>Loading Chart</div>}
                    data={this.volumedata}
                    options={this.optionsDemand}
                />

                <Chart
                    chartType="Bar"
                    width="100%"
                    height="400px"
                    loader={<div>Loading Chart</div>}
                    data={this.bedsdata}
                    options={this.optionsBeds}
                /> */}

            </div>
          );
    }
};
