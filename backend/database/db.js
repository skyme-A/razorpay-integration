import { connect } from 'mongoose';

const connectToMongo = async () => {
    try {
        await connect(''); // Yahan MongoDB ka connection URL aayega
        console.log('---***Database Connected Successfully***---');
    } catch (error) {
        console.log(error);
    }
};

export default connectToMongo;