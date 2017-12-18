import React from 'react';
import ReactDOM from 'react-dom';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import "./index.css";


const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newRow = () => {
  const statusChance = Math.random();
  return {
    firstname: Math.floor(Math.random() * 30),
    lastName: Math.floor(Math.random() * 30),
    age: Math.floor(Math.random() * 30),
    status: Math.floor(Math.random() * 100),
    lastUpdatedTime: Math.floor(Math.random() * 100),
    Location: statusChance > 0.66 ?
      'relationship' :
      statusChance > 0.33 ? 'complicated' : 'single',
  };
};

const makeData = (len = 40) => {
  return range(len).map(d => ({
    ...newRow(),
    children: range(30).map(newRow),
  }));
}

class DataRow extends React.Component {
  constructor() {
    super();
    this.state = {
      data: makeData(),
    };
  }
  render() {
    const {
      data,
    } = this.state;
    return (<div >
      <ReactTable
        data={
                data
            }
        columns={
                [{
                        Header: 'Name',
                        columns: [{
                                Header: 'First Name',
                                accessor: 'firstname',
                            },
                            {
                                Header: 'Last Name',
                                id: 'lastName',
                                accessor: d => d.lastName,
                            },
                        ],
                    },
                    {
                        Header: 'Info',
                        columns: [{
                                Header: 'Age',
                                accessor: 'age',
                            },
                            {
                                Header: 'Status',
                                accessor: 'status',
                            },
                        ],
                    },
                    {
                        Header: '3',
                        columns: [{
                            Header: 'Visits',
                            accessor: 'lastUpdatedTime',
                        }],
                    },
                ]
            }
        defaultPageSize={
                10
            }
        className="-striped -highlight"
      />
    </div>
    );
  }
}


export default class Grid extends React.Component {
  render() {
    return <div id="grid" > <DataRow /> </div>;
  }
}
