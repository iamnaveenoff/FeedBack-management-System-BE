const db = require("../models");
const Feedback = db.feedback;
const Parking = db.parking;
const Op = db.Sequelize.Op;
const  moment = require('moment');
  

exports.saveFeedback = (req, res) => {
    Feedback.create({
        feedback: req.body.feedback,
        name: req.body.name,
        category: req.body.category,
        remarks: req.body.remarks,
        status: req.body.status
      }).then(saveFeedback => {
        res.send({ message: "Feedback Saved successfully!" });
      }) .catch(err => {
        res.status(500).send({ message: err.message });
      });
}

exports.allSchedules = (req, res) => {
  var today=moment(new Date()).format('DD-MM-YYYY');
  var tomorrow=moment(new Date()).add(1, 'days').format('DD-MM-YYYY')
  Schedule.findAll({where : {"scheduledDate" : {[Op.between] : [today , tomorrow ]}}})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Schedules."
      });
    });
}

exports.allApprovedSchedules = (req, res) => {
  var today=moment(new Date()).format('DD-MM-YYYY');
  var tomorrow=moment(new Date()).add(1, 'days').format('DD-MM-YYYY')
  Schedule.findAll({where : {"scheduledDate" : {[Op.between] : [today , tomorrow ]},"status":"Approved"}})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Schedules."
      });
    });
}
exports.allSchedulesByUser = (req, res) => {
  const username = req.params.username;
  var today=moment(new Date()).format('DD-MM-YYYY');
  var tomorrow=moment(new Date()).add(1, 'days').format('DD-MM-YYYY')
  Schedule.findAll({where : {"scheduledDate" : {[Op.between] : [today , tomorrow ]},"username":username}})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Schedules."
      });
    });
}

exports.findSchedule = (req, res) => {
  const id = req.params.id;
  Schedule.findByPk(id).then(data => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find Schedule with id=${id}.`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error retrieving Schedules with id=" + id    });
  });
};



exports.updateSchedule = (req, res) => {
  const id = req.params.id;
  Schedule.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Schedule was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Schedule with id=${id}. Maybe Schedule was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Schedule with id=" + id
      });
    });
};

exports.updateParkingSlot = (req, res) => {
  const id = req.params.id;
  Parking.update(req.body, {
    where: { id: 1 }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Parking Slot was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Parking Slot. Maybe Parking Slot was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Parking Slot with id=" 
      });
    });
};

exports.findAvailableSlots = (req, res) => {
  Parking.findAll().then(data => {
    if (data) { 
      res.send({
        id: data[0].id,
        vehichleType: data[0].vehichleType,
        providedSlotCount: data[0].providedSlotCount,
        availableSlotCount: data[0].availableSlotCount,
      });
    } else {
      res.status(404).send({
        message: `Cannot find AvailableSlot .`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error retrieving AvailableSlot"   });
  });
};