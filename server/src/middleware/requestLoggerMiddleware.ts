import { Request, Response } from 'express';

function requestLoggerMiddleware(req: Request, res: Response, next) {
  const startTime = Date.now();

  res.on('finish', () => {
    const endTime = Date.now();
    const elapsedTime = endTime - startTime;

    const { protocol, originalUrl } = req;
    const host = req.get('host');

    const debug = process.env.DEBUG === 'true';

    if (debug) {
      console.log(
        `${req.method} ${protocol}://${host + originalUrl} - Estado: ${res.statusCode} - Tiempo de ejecución: ${elapsedTime}ms`,
      );
    }
  });

  next();
}

export {
  requestLoggerMiddleware,
};
