import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router-dom';

const TableRowDasboard = ({ form, deleteForm }) => {
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    const maritalStatusObj = form.maritalStatus;
    const genderObj = form.gender;
    const history = useHistory();
    const getMaritalStatus = (marStatusObj) => {
        if (!marStatusObj) {
            return null;
        }
        if (marStatusObj.single) {
            return 'Single';
        }

        if (marStatusObj.divorced) {
            return 'Divorced';
        }

        if (marStatusObj.married) {
            return 'Married';
        }

        if (marStatusObj.widowed) {
            return 'Widowed';
        }
    };
    const maritalStatus = getMaritalStatus(maritalStatusObj) || 'Single';


    const getGender = (genderObj) => {
        if (!genderObj) {
            return null;
        }
        if (genderObj.male) {
            return 'Male';
        }

        if (genderObj.female) {
            return 'Female';
        }

        if (genderObj.other) {
            return 'Other';
        }
    };
    const gender = getGender(genderObj) || 'Single';

    return (
        <>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {form.name}
                </TableCell>
                <TableCell >{form.email}</TableCell>
                <TableCell >{form.country}</TableCell>
                <TableCell ><EditIcon className="cursor-pointer" onClick={() => { history.push(`/form/${form._id}`) }} /></TableCell>
                <TableCell ><DeleteIcon className="cursor-pointer" onClick={() => { deleteForm(form._id) }} /></TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Other Details
              </Typography>
                            <Table size="small" aria-label="Other Details">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>City</TableCell>
                                        <TableCell>State</TableCell>
                                        <TableCell>Gender</TableCell>
                                        <TableCell>Marital Status</TableCell>
                                        <TableCell>Fav Food</TableCell>
                                        <TableCell>Fav Color</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow >
                                        <TableCell>{form.city}</TableCell>
                                        <TableCell>{form.state}</TableCell>
                                        <TableCell>{gender}</TableCell>
                                        <TableCell>{maritalStatus}</TableCell>
                                        <TableCell>{form.favFood}</TableCell>
                                        <TableCell>{form.favColor}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});


export default TableRowDasboard;