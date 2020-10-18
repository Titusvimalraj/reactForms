import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Api from '../../Api/Api';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CountriesAPI from '../../Api/CountriesAPI';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router-dom';
import swal from '@sweetalert/with-react';

const Form = () => {
    const classes = useStyles();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const initialState = {
        name: "",
        email: "",
        country: "",
        state: "",
        city: "",
        addressLine1: "",
        addressLine2: "",
        gender: "male",
        maritalStatus: "single",
        favFood: "",
        favColor: ""
    }

    const [name, setname] = useState(initialState.name);
    const [email, setemail] = useState(initialState.email);
    const [country, setcountry] = useState(initialState.country);
    const [state, setstate] = useState(initialState.state);
    const [city, setcity] = useState(initialState.city);
    const [addressLine1, setaddressLine1] = useState(initialState.addressLine1);
    const [addressLine2, setaddressLine2] = useState(initialState.addressLine2);
    const [gender, setgender] = useState(initialState.gender);
    const [maritalStatus, setmaritalStatus] = useState(initialState.maritalStatus);
    const [favFood, setfavFood] = useState(initialState.favFood);
    const [favColor, setfavColor] = useState(initialState.favColor);
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        (async () => {
            try {
                const response = await CountriesAPI.get('/countries/');

                setCountries(response.data)

                if (id) {
                    (async (id) => {
                        setLoading(true);
                        const response = await Api.get(`/forms/${id}`);
                        setname(response.data.name);
                        setemail(response.data.email);
                        setcountry(response.data.country);
                        const responseState = await CountriesAPI.get(`/states/${response.data.country}`);
                        setStates(responseState.data);
                        setstate(response.data.state);
                        const responseCity = await CountriesAPI.get(`/cities/${response.data.state}`);
                        if (responseCity.data.length > 0) {
                            setCities(responseCity.data);
                        } else {
                            setCities([{ city_name: response.data.state }]);
                        }
                        setcity(response.data.city);
                        setaddressLine1(response.data.addressLine1);
                        setaddressLine2(response.data.addressLine2);
                        setgender(response.data.gender);
                        setmaritalStatus(response.data.maritalStatus);
                        setfavFood(response.data.favFood);
                        setfavColor(response.data.favColor);
                        setFormData(response.data);
                        setLoading(false);
                    })(id)
                }
            } catch (error) {
                console.log(error);
                swal(
                    <div>
                        <h1 style={{ color: 'black' }}>Error!</h1>
                        <p>{error}</p>
                    </div>
                )
            }
        })();
    }, [id])

    useEffect(() => {
        if (state) {
            (async (country) => {
                try {
                    const response = await CountriesAPI.get(`/states/${country}`);

                    setStates(response.data)
                } catch (error) {
                    console.log(error);
                    swal(
                        <div>
                            <h1 style={{ color: 'black' }}>Error!</h1>
                            <p>{error}</p>
                        </div>
                    )
                }
            })(country);
        }
    }, [country, state])

    useEffect(() => {
        if (city) {
            (async (state) => {
                try {
                    const response = await CountriesAPI.get(`/cities/${state}`);

                    setCities(response.data)
                } catch (error) {
                    console.log(error);
                    swal(
                        <div>
                            <h1 style={{ color: 'black' }}>Error!</h1>
                            <p>{error}</p>
                        </div>
                    )
                }
            })(state);
        }
    }, [state, city])

    const updateCountry = (event) => {
        const currentCountry = event.target.value;
        setcountry(currentCountry);
        setFormData({ ...formData, country: currentCountry, state: '', city: '' });
        setstate('');
        setcity('');
        setCities('');
        (async (country) => {
            try {
                const response = await CountriesAPI.get(`/states/${country}`);

                setStates(response.data);
            } catch (error) {
                console.log(error);
                swal(
                    <div>
                        <h1 style={{ color: 'black' }}>Error!</h1>
                        <p>{error}</p>
                    </div>
                )
            }
        })(event.target.value);
    }


    const updateState = (event) => {
        const currentState = event.target.value;
        setstate(currentState);
        setcity('');
        setFormData({ ...formData, state: currentState, city: '' });
        (async (state) => {
            try {
                const response = await CountriesAPI.get(`/cities/${state}`);
                if (response.data.length > 0) {
                    setCities(response.data);
                } else {
                    setCities([{ city_name: currentState }]);
                }
            } catch (error) {
                console.log(error);
                swal(
                    <div>
                        <h1 style={{ color: 'black' }}>Error!</h1>
                        <p>{error}</p>
                    </div>
                )
            }
        })(event.target.value);
    }

    const updateGender = (event) => {

        const currentGenderValue = event.target.value;
        setgender(currentGenderValue);
        setFormData({ ...formData, gender: currentGenderValue });
    }

    const updateMaritalStatus = (event) => {

        const currentMaritalStatus = event.target.value;
        setmaritalStatus(currentMaritalStatus);
        setFormData({ ...formData, maritalStatus: currentMaritalStatus });
    }

    const submitForm = async (event) => {
        event.preventDefault();
        console.log(formData);
        if (id) {
            try {
                const response = await Api.put('/forms', formData);
                if (response.status === 200) {
                    swal(
                        <div>
                            <h1 style={{ color: 'black' }}>Success!</h1>
                            <p>{'Successfully Updated the Form'}</p>
                        </div>
                    )
                    history.replace('/dashboard');
                }
                console.log(response);
            } catch (error) {
                console.log(error);
                swal(
                    <div>
                        <h1 style={{ color: 'black' }}>Error!</h1>
                        <p>{error}</p>
                    </div>
                )
            }
        } else {
            try {
                const response = await Api.post('/forms', formData);
                if (response.status === 200) {
                    swal(
                        <div>
                            <h1 style={{ color: 'black' }}>Success!</h1>
                            <p>{'Successfully Submitted the Form'}</p>
                        </div>
                    )
                    history.replace('/dashboard');
                } else {
                    throw new Error(response);
                }
                console.log(response);
            } catch (error) {
                console.log(error);
                swal(
                    <div>
                        <h1 style={{ color: 'black' }}>Error!</h1>
                        <p>{error}</p>
                    </div>
                )
            }
        }
    }


    return (
        <>
            {!loading ? (<div className={classes.spacing} >
                <form className={classes.root} autoComplete="off" onSubmit={submitForm}>
                    <div> <TextField
                        required
                        id='name'
                        label="Name"
                        variant="outlined"
                        placeholder="Titus vimal raj"
                        value={name}
                        onChange={event => { setname(event.target.value); setFormData({ ...formData, name: event.target.value }); }}
                    />
                        <TextField
                            required
                            id='email'
                            label="Email"
                            placeholder="user@gmail.com"
                            variant="outlined"
                            value={email}
                            onChange={event => { setemail(event.target.value); setFormData({ ...formData, email: event.target.value }); }}
                        />
                    </div>
                    <div>
                        <div>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="country-label">Country</InputLabel>
                                <Select
                                    required
                                    labelId="country-label"
                                    id="country"
                                    placeholder="India"
                                    value={country}
                                    onChange={updateCountry}
                                >
                                    {
                                        countries.map((countr) => {

                                            return (
                                                <MenuItem key={countr.country_name} value={countr.country_name}>{countr.country_name}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl className={classes.formControl}>
                                {
                                    countries && states ? (
                                        <>
                                            <InputLabel id="state-label">State</InputLabel>
                                            <Select
                                                required
                                                labelId="state-label"
                                                id="state"
                                                placeholder="Tamil Nadu"
                                                value={state}
                                                onChange={updateState}
                                            >
                                                {
                                                    states.map((st) => {

                                                        return (
                                                            <MenuItem key={st.state_name} value={st.state_name}>{st.state_name}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </>) : null
                                }

                            </FormControl>
                        </div>

                        <div>
                            <FormControl className={classes.formControl}>
                                {states && cities ? (<><InputLabel id="city-label">City</InputLabel>
                                    <Select
                                        required
                                        labelId="city-label"
                                        id="city"
                                        placeholder="Chennai"
                                        value={city}
                                        onChange={event => { setcity(event.target.value); setFormData({ ...formData, city: event.target.value }) }}
                                    >
                                        {
                                            cities.map((cty) => {

                                                return (
                                                    <MenuItem key={cty.city_name} value={cty.city_name}>{cty.city_name}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select></>) : null}

                            </FormControl>
                        </div>
                    </div>
                    <div>
                        <TextField
                            required
                            id='addressLine1'
                            label="Address Line 1"
                            variant="outlined"
                            placeholder="First Street"
                            value={addressLine1}
                            onChange={event => { setaddressLine1(event.target.value); setFormData({ ...formData, addressLine1: event.target.value }); }}
                        />

                        <TextField
                            required
                            id='addressLine2'
                            label="Address Line 2"
                            placeholder="Colony"
                            variant="outlined"
                            value={addressLine2}
                            onChange={event => { setaddressLine2(event.target.value); setFormData({ ...formData, addressLine2: event.target.value }); }}
                        />
                    </div>
                    <div>  <TextField
                        required
                        id='favColor'
                        label="Favorite Color"
                        variant="outlined"
                        placeholder="Blue"
                        value={favColor}
                        onChange={event => { setfavColor(event.target.value); setFormData({ ...formData, favColor: event.target.value }); }}
                    />
                        <TextField
                            required
                            id='favFood'
                            label="Favorite Food"
                            variant="outlined"
                            placeholder="Noodles"
                            value={favFood}
                            onChange={event => { setfavFood(event.target.value); setFormData({ ...formData, favFood: event.target.value }); }}
                        /></div>


                    <div>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Gender</FormLabel>
                            <RadioGroup required aria-label="gender" name="gender" value={gender} onChange={updateGender}>
                                <FormControlLabel value="female" control={gender === 'female' ? <Radio checked /> : <Radio />} label="Female" />
                                <FormControlLabel value="male" control={gender === 'male' ? <Radio checked /> : <Radio />} label="Male" />
                                <FormControlLabel value="other" control={gender === 'other' ? <Radio checked /> : <Radio />} label="Other" />
                            </RadioGroup>
                        </FormControl>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Marital Status</FormLabel>
                            <RadioGroup required aria-label="maritalStatus" name="maritalStatus" value={maritalStatus} onChange={updateMaritalStatus}>
                                <FormControlLabel value="single" control={maritalStatus === 'single' ? <Radio checked /> : <Radio />} label="Single" />
                                <FormControlLabel value="married" control={maritalStatus === 'married' ? <Radio checked /> : <Radio />} label="Married" />
                                <FormControlLabel value="widowed" control={maritalStatus === 'widowed' ? <Radio checked /> : <Radio />} label="Widowed" />
                                <FormControlLabel value="divorced" control={maritalStatus === 'divorced' ? <Radio checked /> : <Radio />} label="Divorced" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div>
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                </Button>
                    </div>
                </form>
            </div>) : <CircularProgress />}
        </>
    )
}



const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
    spacing: {
        marginTop: 15
    }
}));

export default Form;