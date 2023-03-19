const express = require("express");
const router = express.Router();

let { PythonShell } = require("python-shell");

router.post("/myrecommendedcrop", (req, res) => {
  try {
    const { nitrogen, phosphorous, pottasium, phlevel, rainfall, state, city } =
      req.body;

    if (
      !nitrogen ||
      !phosphorous ||
      !pottasium ||
      !phlevel ||
      !rainfall ||
      !state ||
      !city
    ) {
      return res.sendStatus(201);
    }

    var options = {
      mode: "text",
      args: [nitrogen, phosphorous, pottasium, phlevel, rainfall, state, city],
    };

    PythonShell.run("crop.py", options, function (err, results) {
      if (err) throw err;
      console.log("results: %j", results);
      // console.log(JSON.stringify(results))
      res.json([results]);
    });
  } catch (error) {
    console.log("error occcured " + error);
  }
});

module.exports = router;
