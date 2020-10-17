import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import TableRowDasboard from './TableRowDashboard/TableRowDasboard';

const TableDashboard = ({ formData, deleteForm }) => {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Name</TableCell>
                        <TableCell >Email</TableCell>
                        <TableCell >Country</TableCell>
                        <TableCell ><EditIcon /></TableCell>
                        <TableCell ><DeleteIcon /></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        formData.map((form) => {

                            return (
                                <TableRowDasboard deleteForm={deleteForm} key={form._id} form={form} />
                            )
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableDashboard;