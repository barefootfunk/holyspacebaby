// Modeled from https://stackoverflow.com/a/49528229

const amplitude =  typeof window !== `undefined` ? require('amplitude-js') : null;

export const initAmplitude = () => {
  amplitude.getInstance().init('3bff446fc308ac8c3717e84e1ee0e48f');
};

export const sendAmplitudeData = (eventType, eventProperties) => {
  console.log('amplitude',eventType, eventProperties)
  amplitude.getInstance().logEvent(eventType, eventProperties);
};

// export const setAmplitudeUserDevice = installationToken => {
//   amplitude.getInstance().setDeviceId(installationToken);
// };

// export const setAmplitudeUserId = userId => {
//   amplitude.getInstance().setUserId(userId);
// };

// export const setAmplitudeUserProperties = properties => {
//   amplitude.getInstance().setUserProperties(properties);
// };

