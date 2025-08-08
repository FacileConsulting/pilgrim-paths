const { constant } = require('../constant');
const { 
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
