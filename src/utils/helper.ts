import axios from 'axios';

export const getStates = async (req, res) => {
    try {
        axios({
            method: 'get',
            url: `https://api.countrystatecity.in/v1/countries/IN/states`,
            headers: {
                'X-CSCAPI-KEY': 'b3hubzR6YUxNeFZPMkxKQXFQNVl2T3F2MGhYYlVFS1VZclAyZEk1eQ=='
            }
        })
            .then((states) => {
                if (!states) {
                    return res.status(200).json({ success: true, message: 'No states found.' });
                }

                res.status(200).json({ success: true, message: 'States found', data: states.data });
            })
            .catch((err) => {
                res.status(400).json({ success: false, message: err.message });
            });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
export const getCities = async (req, res) => {
    try {
        const { stateCode } = req.params;
        axios({
            method: 'get',
            url: `https://api.countrystatecity.in/v1/countries/IN/states/${stateCode}/cities`,
            headers: {
                'X-CSCAPI-KEY': 'b3hubzR6YUxNeFZPMkxKQXFQNVl2T3F2MGhYYlVFS1VZclAyZEk1eQ=='
            }
        })
            .then((cities) => {
                if (!cities) {
                    return res.status(200).json({ success: true, message: 'No cities found.' });
                }

                res.status(200).json({ success: true, message: 'Cities found', data: cities.data });
            })
            .catch((err) => {
                res.status(400).json({ success: false, message: err.message });
            });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
