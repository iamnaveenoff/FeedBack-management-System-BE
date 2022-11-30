module.exports = (sequelize, Sequelize) => {
  const Schedule = sequelize.define("schedule", {
    username: {
      type: Sequelize.STRING
    },
    // userId: {
    //   type: Sequelize.INTEGER
    // },
    email: {
      type: Sequelize.STRING
    },
    scheduledDate: {
      type: Sequelize.STRING
    },
    phoneNumber: {
      type: Sequelize.STRING
    },
    createdBy: {
      type: Sequelize.STRING
    },
    updatedBy: {
      type: Sequelize.STRING
    },
    remarks: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING,
      defaultValue: "Pending",
    },
  });

  return Schedule;
};
