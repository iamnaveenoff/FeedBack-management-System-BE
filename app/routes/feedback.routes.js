const controller = require("../controllers/schedule.controller");
const { authJwt } = require("../middleware");
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

      app.post(
        "/api/saveSchedule",
        // [authJwt.verifyToken],
        controller.saveSchedule
      );

      app.get(
        "/api/allSchedules",
        // [authJwt.verifyToken,authJwt.isAdmin],
        controller.allSchedules
      );

      app.get(
        "/api/allApprovedSchedules",
        // [authJwt.verifyToken,authJwt.isAdmin],
        controller.allApprovedSchedules
      );
      app.get(
        "/api/allSchedulesByUser/:username",
        // [authJwt.verifyToken],
        controller.allSchedulesByUser
      );

      app.get(
        "/api/Schedule/:id",
        // [authJwt.verifyToken,authJwt.isAdmin],
        controller.findSchedule
      );
      
      app.put(
        "/api/updateSchedule/:id",
        // [authJwt.verifyToken,authJwt.isAdmin],
        controller.updateSchedule
      );
     
      app.put(
        "/api/updateParkingSlot",
        // [authJwt.verifyToken,authJwt.isAdmin],
        controller.updateParkingSlot
      );
     
      app.get(
        "/api/availableSlots",
        // [authJwt.verifyToken,authJwt.isAdmin],
        controller.findAvailableSlots
      );
}