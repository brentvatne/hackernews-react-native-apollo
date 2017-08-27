export default function getNavigationParam(navigation, param, fallback = null) {
  let result = fallback;
  if (navigation.state && navigation.state.params) {
    if (navigation.state.params.hasOwnProperty(param)) {
      result = navigation.state.params[param];
    }
  }

  return result;
}