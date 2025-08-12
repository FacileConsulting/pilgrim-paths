const { constant } = require('../constant');
const { 
  getDashboard,
  updateDashboard,
  getAllInquiries,
  updateInquiry,
  saveInDB
} = require('../mongo');

exports.inquiries = async (req, res) => {
  const { 
    c200, 
    c500, 
    yS,
    nS,
    inquiries, 
  } = constant();
  try {
    console.log('req.body', req.body);
    const type = req.body.type;
    const inquiryId = req.body._id;
    inquiryId ? delete req.body._id : null; 
    delete req.body.type;
    if (type === inquiries.fetchAll) {
      const query = {};
      const inquiriesAllData = await getAllInquiries(query);
      console.log('req.body', inquiries.fetchAll);
      if (!inquiriesAllData || inquiriesAllData.length == 0) {
        res.status(c200).send({ ...inquiries.failed });
      } else {
        const result = await updateDashboard('6899669c88070a0970315bcc', {
          newInquiriesCurrMonth: inquiriesAllData.filter(item => item.inquiryStatus === 'Pending').length
        });
        res.status(c200).send({
          status: yS,
          data: inquiriesAllData
        });
      }
    } else if (type === inquiries.update) {
      const result = await updateInquiry(inquiryId, {      
        ...req.body
      });
      console.log('!!!!!!!!!!!@@!@!@ result', result);
      if (result.nModified) {
        const dashboard = await getDashboard({ _id: '6899669c88070a0970315bcc' });
        const result = await updateDashboard('6899669c88070a0970315bcc', {      
          activity: [
            {
              time: new Date(),
              type: 'inquiry',
              name: req.body.inquiryProvider,
              title: `Inquiry Updated: ${req.body.inquiryPackage}`,
              status: req.body.inquiryStatus
            }, 
            ...dashboard.activity]
        });
        return res.status(c200).send({ ...inquiries.updated });
      } else if (result.nModified === 0) {
        return res.status(c200).send({ ...inquiries.notUpdated });
      } else {
        return res.status(c200).send({ ...inquiries.notFound });
      }
    }

  } catch (error) {
    console.error(error);
    return res.status(c500).send({ ...inquiries.error });
  }
};
