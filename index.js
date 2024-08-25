import express from 'express';

import { z } from 'zod'
import { config } from 'dotenv'

config();
const configSchema = z.object({
    PORT: z.string(),
    NODE_ENV: z.string(),
})

const env = configSchema.parse(process.env);

const app = express();

app.use(express.json());


app.get('/health', async (req, res) => {
    return res.send('Healthy');
});

app.get('/bfhl', async (req, res) => {
    return res.status(200).json({
        "operation_code": 1
    })
});

app.post('/bfhl', async (req, res) => {
    try {
        const { data } = req.body;
        console.log(data);

        if (!data ) {
            console.error("Invalid data" , typeof data);
            return res.status(400).json({
                "is_success": false
            });
        }
        // Data is an array "data": [“M”,”1”,”334”,”4”,”B”,”Z”,”a”]
        let numbers = [];
        let alphabets = []; // All alphabets in the array
        let highest_lowercase_alphabet = []; // Highest lowercase alphabet in the array

        for (let i = 0; i < data.length; i++) {
            if (!isNaN(data[i])) {
                numbers.push(data[i]);
            } else if (data[i].charCodeAt(0) >= 97 && data[i].charCodeAt(0) <= 122) {
                alphabets.push(data[i]);
                if (highest_lowercase_alphabet.length === 0) {
                    highest_lowercase_alphabet.push(data[i]);
                } else {
                    if (highest_lowercase_alphabet[0].charCodeAt(0) < data[i].charCodeAt(0)) {
                        highest_lowercase_alphabet = [];
                        highest_lowercase_alphabet.push(data[i]);
                    } else if (highest_lowercase_alphabet[0].charCodeAt(0) === data[i].charCodeAt(0)) {
                        highest_lowercase_alphabet.push(data[i]);
                    }
                }
            } else {
                // Invalid character
                //SKIP
            }

        }

        return res.status(200).json({
            is_success: true,
            user_id: "aadarsh_jha_20022003",
            email: "aadarsh.jha2021@vitstudent.ac.in",
            roll_number: "21BCE0360",
            numbers,
            alphabets,
            highest_lowercase_alphabet
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            "is_success": false,
            "message": "Internal Server Error"
        });
    }
})

app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
})