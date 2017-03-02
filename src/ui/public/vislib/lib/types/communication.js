import _ from 'lodash';

export default function CommConfig(Private) {

  return function (config) {
    if (!config.chart) {
      config.chart = _.defaults({}, config, {
        type: 'communication'
      });
    }
    return config;
  };
  
};
