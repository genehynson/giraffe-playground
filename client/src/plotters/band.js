import React from 'react'
import {fromFlux, Plot, NINETEEN_EIGHTY_FOUR, timeFormatter} from '@influxdata/giraffe'
import axios from 'axios'
import { findStringColumns } from '../helpers'

const REASONABLE_API_REFRESH_RATE = 5000;

export class Band extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      table: {},
      lastUpdated: ''
    };
  }

  animationFrameId = 0;
  style = {
    width: "calc(70vw - 20px)",
    height: "calc(70vh - 20px)",
    margin: "40px",
  };

  getDataAndUpdateTable = async () => {
    const resp = await axios.get('http://localhost:3001/cpu/client');

    try {
      let results = fromFlux(resp.data.csv);
      let currentDate = new Date();
      this.setState({ table: results.table, lastUpdated: currentDate.toLocaleTimeString() });
    } catch (error) {
      console.error('error', error.message);
    }
  }

  async componentDidMount() {
    try {
      this.getDataAndUpdateTable();
      this.animationFrameId = window.setInterval(this.getDataAndUpdateTable, REASONABLE_API_REFRESH_RATE);
    } catch (error) {
      console.error(error);
    }
  }

  componentWillUnmount = () => {
    window.clearInterval(this.animationFrameId);
  }

  renderPlot = () => {
    const fill = findStringColumns(this.state.table)
    const config = {
      table: this.state.table,
      layers: [
        {
          type: 'band',
          x: '_time',
          y: '_value',
          fill,
          colors: NINETEEN_EIGHTY_FOUR,
          interpolation: "monotoneX",
          lineWidth: 3,
          lineOpacity: 0.7,
          shadeOpacity: 0.3,
          hoverDimension: "auto",
          upperColumnName: "max",
          mainColumnName: "mean",
          lowerColumnName: "min",
        }
      ],
      valueFormatters: {
        _time: timeFormatter({
          timeFormat: "UTC",
          format: "HH:mm",
        }),
        _value: val =>
          typeof val === 'number'
            ? `${val.toFixed(2)}%`
            : val,
      },
      xScale: "linear",
      yScale: "linear",
      legendFont: "12px sans-serif",
      tickFont: "12px sans-serif",
      showAxes: true,
    };
    return (
    <div style={this.style}>
      <h3>CPU Usage</h3>
      <h5>Last Updated: {this.state.lastUpdated}</h5>
      <Plot config={config} />
    </div>
    )
  }

  renderEmpty = () => {
    return (
      <div style={this.style}>
        <h3>Loading...</h3>
      </div>
    )
  }

  render = () => {
    return Object.keys(this.state.table).length > 0 ? this.renderPlot() : this.renderEmpty();
  }
}
