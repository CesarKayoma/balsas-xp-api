import express from 'express';
import attractions from './src/data/attractions.json' with {type: 'json'};


const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        name: 'Balsas XP',
        version: '1.0.0',
        description: 'Balsas Tourist Attractions API'
    });
});

app.get('/health', (req, res) => {
    res.json({message: 'ok'});
});

app.use('/attractions', attractionsRoutes)

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running in PORT ${PORT}`)
})