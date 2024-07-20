import React, { Component } from 'react';
import { PerspectiveViewerElement } from '@finos/perspective';
import { PerspectivePlugin } from 'react-perspective';

interface Props {}
interface State {
  data: any[];
  showGraph: boolean;
}

class Graph extends Component<Props, State> {
  private table: PerspectiveViewerElement | null = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      data: [],
      showGraph: false
    };
  }

  componentDidMount() {
    // Define the schema for the Perspective table
    const schema = {
      ratio: 'float',
      upper_bound: 'float',
      lower_bound: 'float',
      trigger_alert: 'float',
      price_abc: 'float',
      price_def: 'float',
      timestamp: 'datetime'
    };

    // Initialize the Perspective table with the schema
    this.table = new PerspectiveViewerElement();
    this.table.load(schema);
    document.getElementById('graph-container')?.appendChild(this.table);

    // Set up the initial graph configuration
    this.table.setAttributes({
      view: 'y_line',
      row_pivots: ['timestamp'],
      columns: ['ratio', 'upper_bound', 'lower_bound', 'trigger_alert'],
      aggregates: {
        ratio: 'avg',
        upper_bound: 'avg',
        lower_bound: 'avg',
        trigger_alert: 'avg',
        price_abc: 'avg',
        price_def: 'avg'
      }
    });
  }

  componentDidUpdate() {
    if (this.table) {
      // Update the table with the latest data
      this.table.update(this.state.data);
    }
  }

  render() {
    return (
      <div>
        {this.state.showGraph && <div id="graph-container" />}
      </div>
    );
  }
}

export default Graph;
