const controllerWrapper = (controllerMethod) => async (req, res, next) =>
  await controllerMethod(req, res).catch(next);

export default controllerWrapper;
