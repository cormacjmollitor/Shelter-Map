"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var searchController_1 = require("../controllers/searchController");
function default_1(app) {
    /********  Api details  **********/
    app.get("/api", function (req, res) {
        res.json({ message: "Internado", version: "v1.0.0" });
    });
    /********************************/
    app.get("/express_backend", function (req, res) {
        res.send({ express: "React client is connected to Express server" });
    });
    app.post("/search", searchController_1.searchJobs);
    app.options("/search", function (req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.header("Access-Control-Allow-Methods", "POST");
        res.status(200).send({ message: "Success" });
    });
}
exports.default = default_1;
//# sourceMappingURL=v1.js.map