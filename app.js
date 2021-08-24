const express = require("express");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.use(express.static("public"));
app.use(express.json());

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res){
    var waterAmount = Number(req.body.waterAmount);
    var coffeeAmount = Number(req.body.coffeeAmount);

    var waterSelect = req.body.waterSelect;
    var coffeeSelect = req.body.coffeeSelect;

    if(waterAmount != 0 && coffeeAmount != 0){
        res.send("error");
    } else {
        var result = calculateWeight(waterSelect, waterAmount, coffeeSelect, coffeeAmount);
        if(waterAmount === 0){
           res.send("You need " + result + " " + waterSelect + " of water");
    
        }

        if(coffeeAmount === 0 ){
           res.send("You need " + result + " " + coffeeSelect + " of coffee");
    
        }
    }
});

function calculateWeight(waterSelect, waterAmount, coffeeSelect, coffeeAmount){
    var result = 0;

    if(waterAmount === 0){
        if(waterSelect === "cups" && coffeeSelect === "grams"){
            result = ((coffeeAmount * 15) / 240).toFixed(2);
        }

        if(waterSelect === "cups" && coffeeSelect === "tablespoons"){
            result = (((coffeeAmount * 6) * 15) / 240).toFixed(2);
        }

        if(waterSelect === "ounces" && coffeeSelect === "grams"){
            result = ((coffeeAmount * 15) / 28.3495).toFixed(2);
        }

        if(waterSelect === "ounces" && coffeeSelect === "tablespoons"){
            result = (((coffeeAmount * 6) * 15) / 28.3495).toFixed(2);
        }

        if(waterSelect === "grams" && coffeeSelect === "grams"){
            result = (coffeeAmount * 15).toFixed(2);
        }

        if(waterSelect === "grams" && coffeeSelect === "tablespoons"){
            result = ((coffeeAmount * 6) * 15).toFixed(2);
        }
    }

    if(coffeeAmount === 0){
        if(waterSelect === "cups" && coffeeSelect === "grams"){
            result = ((waterAmount * 240) / 15).toFixed(2);
        }

        if(waterSelect === "cups" && coffeeSelect === "tablespoons"){
            result = (((waterAmount * 240) / 15) / 3).toFixed(2);
        }

        if(waterSelect === "ounces" && coffeeSelect === "grams"){
            result = ((waterAmount * 28.3495) / 15).toFixed(2);
        }

        if(waterSelect === "ounces" && coffeeSelect === "tablespoons"){
            result = (((waterAmount * 28.3495) / 15) / 3).toFixed(2);
        }

        if(waterSelect === "grams" && coffeeSelect === "grams"){
            result = (waterAmount / 15).toFixed(2);
        }

        if(waterSelect === "grams" && coffeeSelect === "tablespoons"){
            result = ((waterAmount / 15) / 3).toFixed(2);
        }
    }

    return result;
}

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});

