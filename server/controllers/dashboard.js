const { constant } = require('../constant');
const {
  getDashboard,
  saveInDB
} = require('../mongo');

exports.dashboard = async (req, res) => {
  const { 
    c200, 
    c500, 
    yS,
    nS,
    dashboard, 
  } = constant();
  try {
    const type = req.body.type;
    if (type === dashboard.fetch) {
      const result = await getDashboard({ _id: '6899669c88070a0970315bcc' });
      if (!result) {
        return res.status(c200).send({ ...dashboard.noDashboard });
      } else {
        res.status(c200).send({
          status: yS,
          data: result || false
        });
      }
    }

  } catch (error) {
    console.error(error);
    return res.status(c500).send({ ...providers.error });
  }
};
