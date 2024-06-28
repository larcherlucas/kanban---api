import sanitizeHtml from 'sanitize-html';

export const bodySanitizer = (req, res, next) => {
  Object.keys(req.body).forEach((key) => {
    if (typeof req.body[key] === 'string') {
      req.body[key] = sanitizeHtml(req.body[key], {
        allowedTags: ['b', 'i', 'em', 'strong'], 
      });
    }
  });
  next();
};