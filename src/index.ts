export const hello: AWSLambda.Handler = (event: AWSLambda.APIGatewayEvent, context: AWSLambda.Context, cb: AWSLambda.Callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  cb(null, response);
};
