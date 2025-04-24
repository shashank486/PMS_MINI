// populate.js
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/yourdbname', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const slotSchema = new mongoose.Schema({
    date: String,
    morning: [{ time: String, available: Boolean }],
    afternoon: [{ time: String, available: Boolean }],
    evening: [{ time: String, available: Boolean }],
});

const Slot = mongoose.model('Slot', slotSchema);

const slotsData = [
    {
        date: '2023-08-16',
        morning: [
            { time: '6:00 AM - 7:00 AM', available: true },
            { time: '7:00 AM - 8:00 AM', available: true },
            { time: '8:00 AM - 9:00 AM', available: true },
            { time: '9:00 AM - 10:00 AM', available: false },
            { time: '10:00 AM - 11:00 AM', available: true },
            { time: '11:00 AM - 12:00 AM', available: true },
        ],
        afternoon: [
            { time: '12:00 PM - 1:00 PM', available: true },
            { time: '1:00 PM - 2:00 PM', available: true },
            { time: '2:00 PM - 3:00 PM', available: true },
            { time: '3:00 PM - 4:00 PM', available: false },
            { time: '4:00 PM - 5:00 PM', available: true },
            { time: '5:00 PM - 6:00 PM', available: true },
        ],
        evening: [
            { time: '6:00 PM - 7:00 PM', available: true },
            { time: '7:00 PM - 8:00 PM', available: true },
            { time: '8:00 PM - 9:00 PM', available: true },
            { time: '9:00 PM - 10:00 PM', available: false },
            { time: '10:00 PM - 11:00 PM', available: true },
            { time: '11:00 PM - 12:00 AM', available: true },
        ],
    },
    // Add more dates as needed
];

Slot.insertMany(slotsData)
    .then(() => {
        console.log('Data inserted');
        mongoose.connection.close();
    })
    .catch(err => {
        console.error(err);
        mongoose.connection.close();
    });