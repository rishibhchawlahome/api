const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(
    cors({
        origin: "*",
    })
);

async function getToken() {
    console.log("getToken")
    console.log(process.env.API_KEY)
    const response = await fetch("https://dev-test.cimet.io/generate-token", {
        method: "POST",
        headers: {
            "API-key": process.env.API_KEY,
        },
    });
    const data = await response.json();
    console.log(response,data);
    return data?.data.token;
}
async function getProductData(token) {
    const response = await fetch("https://dev-test.cimet.io/plan-list", {
        method: "POST",
        body: JSON.stringify({
            session_id: process.env.SESSION_ID,
        }),
        headers: {
            "Content-Type": "application/json",
            "API-key": process.env.API_KEY,
            "Auth-token": token,
        },
    });
    const data = await response.json();
    return data?.data.electricity;
}

app.get("/getdata", async (req, res) => {
    const token = await getToken();
    const productData = await getProductData(token);
    console.log(typeof productData);
    res.status(200).json(productData);
});

app.listen(process.env.PORT || 3000, () => {
    console.log("server is up and running", process.env.PORT || "3000");
});