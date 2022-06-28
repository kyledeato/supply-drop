const { Client } = require('@googlemaps/google-maps-services-js');
const client = new Client({});

async function getAutocompleteResult(req, res) {
    const search = req.query.q;
    let result = [];
    let errorMessage;
    let status = 200;
    console.log(search);
    if (search && typeof search === 'string') {
        let params = {
            input: search,
            key: process.env.GOOGLEAPI_KEY,
        };

        await client
            .placeAutocomplete({
                params,
            })
            .then(async (response) => {
                response.data.predictions.forEach((resultItem) => {
                    result.push({
                        label: resultItem.description,
                        id: resultItem.place_id,
                    });
                });
            })
            .catch((e) => {
                errorMessage = e.response.data.error_message;
                console.log(e.response.data.error_message);
                status = 500;
            });
    } else {
        status = 422;
    }

    if (status === 200) {
        res.status(status).send(result);
    } else if (status === 500) {
        res.status(status).send(errorMessage);
    } else {
        res.sendStatus(status);
    }
}

module.exports = { getAutocompleteResult };
