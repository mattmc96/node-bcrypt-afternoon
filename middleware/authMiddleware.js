/** @format */

module.exports = {
  usersOnly: (req, res, next) => {
    if (!req.session.user) {
      return res.status(401).send('Log yo self in man');
    }
    next();
  },
  adminsOnly: (req, res, next) => {
    if (!req.session.user.isAdmin) {
      return res.status(403).send('Get yo self out her you aint no admin');
    }
    next();
  },
};
