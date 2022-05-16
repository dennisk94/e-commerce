import { MongoClient } from 'mongodb';

async function handler( req, res ) {
    if ( req.method === 'POST' ) {
        try {
            // Retrieve data from incoming request   
            const data = req.body;
            // Error validation and general clean up
            const firstName = data.firstName.trim();
            const lastName = data.lastName.trim();
            const email = data.email.trim();
            const phone = data.phone.trim();
            const message = data.message.trim();

            // Function for validating phone number
            const validatePhoneNumber = (number) => {
            const phoneNumber = new RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
                return phoneNumber.test(number);
            };

            if ( 
                firstName                   === '' ||
                lastName                    === '' ||
                email                       === '' ||
                !email.includes('@')               ||
                message                     === '' ||
                phone  === ''                      ||
                !validatePhoneNumber(phone)
            ) {
                res.status(422).json({message: 'Invalid form information'});
                return;
            }

            const newMessage = {
                firstName,
                lastName,
                email,
                phone,
                message
            }

            const connectionString = `mongodb+srv://${ process.env.mongodb_username }:${ process.env.mongodb_password }@${ process.env.mongodb_clustername }.hkr7a.mongodb.net/${ process.env.mongodb_database }?retryWrites=true&w=majority`;

            const client = await MongoClient.connect(connectionString);
            const db = client.db();
            const result = await db.collection('messages').insertOne(newMessage);
            await client.close();

            res.status(201).json({message: 'success'});
        } catch (err) {
            res.status(500).json(err);
        }
    }
};

export default handler;