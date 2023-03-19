const express = require("express");
const router = express.Router();

let { PythonShell } = require('python-shell')

router.post("/myfertilizer", (req, res) => {
    try {
        const { nitrogen, phosphorous, pottasium, cropgrow } = req.body;

        if (!nitrogen || !phosphorous || !pottasium || !cropgrow) {
            return res.sendStatus(201);
        }

        var options = {
            mode: 'text',
            args: [nitrogen, phosphorous, pottasium, cropgrow]
        };

        PythonShell.run('app.py', options, function(err, results) {
            if (err) throw err;
            console.log('results: %j', results);
            // console.log(JSON.stringify(results))
            res.json([results])
        });

    } catch (error) {
        console.log("error occcured " + error);
    }
});

module.exports = router;