/**
 * Express API "Bad Request" handler.
 */

function hasProperties(...properties) {
  return function (req, res, next) {
    const { data = {} } = req.body;

    try {
      properties.forEach((prop) => {
    //console.log(data[prop])
        
        if (!data[prop]) {
          const error = new Error(`Oops! ${prop} is missing!`);
          error.status = 400;
          throw error;
        }
      });
      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = hasProperties;


// function badRequest(...missing) {
//   return function (req, res, next) {
//     const { data = {} } = req.body;

//     try {
//       missing.forEach((prop) => {
//    //  console.log(data[prop])

//         if (
//           (!data[prop]) ||
//           (!isNaN(data[prop]))
//           // (!/\d{4}-\d{2}-\d{2}/.test(data[prop]))
//         ) {
//           //last parenthesis
//           const error = new Error(`Oops! ${prop} is missing!`);
//           error.status = 400;
//           throw error;
//         }
//       });
//       next();
//     } catch (error) {
//       next(error);
//     }
//   };
// }
