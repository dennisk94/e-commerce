import { MongoClient } from 'mongodb';

async function handler( req, res ) {
    if ( req.method === 'POST' ) {
        try {
            // Retrieve data from incoming request
            const order = req.body.cart;
            const customerInfo = req.body.customerInfo;

            //Error validation and general clean up incoming data
            const firstName = customerInfo.firstName.trim();
            const lastName = customerInfo.lastName.trim();
            const address = customerInfo.address.trim();
            const city = customerInfo.city.trim();
            const postalCode = customerInfo.postalCode.trim();
            const email = customerInfo.email.trim();
            const phoneNumber = customerInfo.phone.trim();

            // Function for validating postal code
            const validatePostalCode = (postalCode) => {
                const postalCodeRegex = new RegExp(/^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVXY][ -]?\d[ABCEGHJKLMNPRSTVXY]\d$/i);
                return postalCodeRegex.test(postalCode);
            };

            // Function for validating phone number
            const validatePhoneNumber = (number) => {
                const phoneNumber = new RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
                return phoneNumber.test(number);
            };

            if ( 
                firstName                         === '' ||
                lastName                          === '' ||
                address                           === '' ||
                city                              === '' ||
                postalCode                        === '' ||
                !validatePostalCode(postalCode)          ||
                email                             === '' ||
                !email.includes('@')                     ||
                phoneNumber  === ''                      ||
                !validatePhoneNumber(phoneNumber)
            ) {
                res.status(422).json({message: 'Invalid form information'});
                return;
            }

            const newOrder = {
                customerInfo: customerInfo,
                order: order,
            }

            const connectionString = `mongodb+srv://${ process.env.mongodb_username }:${ process.env.mongodb_password }@${ process.env.mongodb_clustername }.hkr7a.mongodb.net/${ process.env.mongodb_database }?retryWrites=true&w=majority`;

            const client = await MongoClient.connect(connectionString);
            const db = client.db();
            const result = await db.collection('orders').insertOne(newOrder);
            await client.close();

            res.status(201).json({message: 'success'});
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

export default handler;