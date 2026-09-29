import express from 'express';

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

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running in PORT ${PORT}`)
})
