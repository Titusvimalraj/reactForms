import React, { useEffect, useState } from 'react';
import Api from '../../Api/Api';
import TableDashboard from './TableDashboard/TableDashboard';
import swal from '@sweetalert/with-react';

const Dashboard = () => {
    const [forms, setforms] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const response = await Api.get("/forms");
                if (response.status === 200) {
                    setforms(response.data);
                    // console.log(response.data);
                } else {
                    throw new Error('No Forms present');
                }

            } catch (error) {
                console.log(error);
            }

        })()
    }, []);

    const deleteForm = async (_id) => {
        if (_id) {
            try {
                const response = await Api.delete(`/forms/${_id}`);
                if (response.status === 200) {
                    console.log(response);
                    swal(
                        <div>
                            <h1>Success!</h1>
                            <p>{'Successfully Deleted the Form'}</p>
                        </div>
                    )
                    setforms(forms.filter(form => form._id !== _id));
                } else {
                    throw new Error(response);
                }
            } catch (error) {
                console.log(error);
                swal(
                    <div>
                        <h1>Error!</h1>
                        <p>{error}</p>
                    </div>
                )
            }
        }
        return;
    }

    return (
        <>
            <h2>hello dashboard!</h2>
            <TableDashboard deleteForm={deleteForm} formData={forms} />
        </>
    )
}

export default Dashboard;