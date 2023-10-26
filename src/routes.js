var fs = require('fs');

const { resolve } = require('path');
const { Router } = require('express');
const { format } = require('date-fns');
const { get6DigitsCode } = require('./helpers/has6DigitsCode');


const routes = Router();

routes.get('/', (req, res) => {
    console.log("teste")
    res.json({ teste: "ola mundo" })

})

routes.post('/criar-arquivo', async (req, res) => {

    const { message_text } = req.body;

    try {

        fs.writeFile(`${resolve(__dirname, ".", "files")}/${get6DigitsCode(1, 9999999)}.txt`, message_text, (erro) => {

            if (erro) {
                throw erro;
            }

            console.log(`Arquivo salvo => ${get6DigitsCode(1, 9999999)}.txt`);
        });
        res.status(200).json({ date: `${get6DigitsCode(1, 9999999)}.txt` })

    } catch (error) {
        res.status(400).json({ date: "Erro" })
    }



})

module.exports = routes;