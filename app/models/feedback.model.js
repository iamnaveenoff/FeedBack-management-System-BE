module.exports = (sequelize, Sequelize) => {
  const feedback = sequelize.define("feedback", {
    feedback: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    category: {
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

  return feedback;
};
