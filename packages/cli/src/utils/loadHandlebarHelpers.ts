import Handlebars from 'handlebars';

export function loadHandlebarsHelpers() {
  // raw helper
  Handlebars.registerHelper('raw', function (options) {
    return options.fn();
  });

  // eq helper
  Handlebars.registerHelper('eq', function (a, b) {
    return a === b;
  });

  // and helper
  Handlebars.registerHelper('and', function (a, b) {
    return a && b;
  });

  // or helper
  Handlebars.registerHelper('or', function (a, b) {
    return a || b;
  });
}
