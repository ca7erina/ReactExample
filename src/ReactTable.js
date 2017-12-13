import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

let products = [{
    id: 1,
    name: "Product1",
    price: 120
}, {
    id: 2,
    name: "Product2",
    price: 80
} ];

ReactDOM.render(
<BootstrapTable data={products} striped hover>
    <TableHeaderColumn isKey dataField='id'>Product ID</TableHeaderColumn>
    <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
    <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
</BootstrapTable>,
document.getElementById('basic')
);