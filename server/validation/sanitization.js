// utility function to escape HTML characters
const escapeHTML = (str) => str.replace(/[&<>"'`=]/g, "");

export default escapeHTML;
