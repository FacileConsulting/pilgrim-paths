const { constant } = require('../constant');
const { 
  createPackage,
  getAllPackages,
  deletePackage,
  updatePackage,
  getPackage,
  saveInDB
} = require('../mongo');

exports.packages = async (req, res) => {
  const { 
    c200, 
    c500, 
    yS,
    nS,
    packages, 
  } = constant();
  try {
    console.log('req.body', req.body);
    const type = req.body.type;
    const { packageId } = req.body;
    packageId ? delete req.body.packageId : null; 
    delete req.body.type;
    if (type === packages.create) {
      const packageData = await createPackage({
        ...req.body
      });
      await saveInDB(packageData);
      res.status(c200).send({ ...packages.created });
    } else if (type === packages.fetchAll) {
      const query = {};
      const packagesAllData = await getAllPackages(query);
      console.log('req.body', packages.fetchAll);
      if (!packagesAllData || packagesAllData.length == 0) {
        res.status(c200).send({ ...packages.failed });
      } else {
        res.status(c200).send({
          status: yS,
          data: packagesAllData
        });
      }
    } else if (type === packages.delete) {
      // Delete the document by ID
      const result = await deletePackage(packageId);
      // console.log("$$$$$$$$$delte", result);
      if (result.deletedCount === 1) {
        return res.status(c200).send({ ...packages.deleted });
      } else {
        return res.status(c200).send({ ...packages.notFound });
      }
    } else if (type === packages.update) {
      const result = await updatePackage(packageId, {      
        ...req.body
      });
      console.log('!!!!!!!!!!!@@!@!@ result', result);
      if (result.nModified) {
        return res.status(c200).send({ ...packages.updated });
      } else if (result.nModified === 0) {
        return res.status(c200).send({ ...packages.notUpdated });
      } else {
        return res.status(c200).send({ ...packages.notFound });
      }
    } else if (type === packages.fetch) {
      const result = await getPackage({ _id: packageId });

      if (!result) {
        return res.status(c200).send({ ...packages.noPackage });
      } else {
        res.status(c200).send({
          status: yS,
          data: result || false
        });
      }
    }

  } catch (error) {
    console.error(error);
    return res.status(c500).send({ ...packages.error });
  }
};
