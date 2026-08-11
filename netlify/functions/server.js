// Netlify functions handler for Smart Step Academy API endpoints

exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
    },
    body: JSON.stringify({
      message: "Smart Step Academy API is running on Netlify Functions.",
      timestamp: new Date().toISOString()
    })
  };
};
