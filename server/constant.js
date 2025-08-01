const constant = () => {
  const yS = 'success';
  const nS = 'error';
  return {
    c200: 200,
    c500: 500,
    yS,
    nS,
    health: {
      valid: {
        message: 'Health API called successfully',
        status: yS
      },
      error: {
        message: 'Error in /health',
        status: nS
      }
    },
    providers: {
      create: 'PROVIDER_CREATE',
      update: 'PROVIDER_UPDATE',
      fetchAll: 'PROVIDER_FETCH_ALL',
      fetch: 'PROVIDER_FETCH',
      delete: 'PROVIDER_DELETE',
      deleted: {
        message: 'Provider deleted successfully',
        deleted: true,
        status: yS
      },
      noProvider: {
        message: 'Provider does not exit. Contact Admin',
        noProvider: true,
        status: yS
      },
      notUpdated: {
        message: 'No Modification in Provider',
        notUpdated: true,
        status: yS
      },
      updated: {
        message: 'Provider updated successfully',
        updated: true,
        status: yS
      },
      notFound: {
        message: 'Provider does not found',
        notFound: true,
        status: yS
      },
      failed: {
        message: 'Something went wrong. Please check with admin',
        data: [],
        status: yS
      },
      created: {
        message: 'Provider created successfully',
        created: true,
        status: yS
      },
      errorType: {
        message: 'Error in /providers API ',
        status: nS
      },
      error: {
        message: 'Error in /providers method',
        status: nS
      }
    }
  }
}

module.exports = {
  constant
};