"use strict";

/** Get the current logged-in username.
 *
 * Returns the username if available, otherwise returns null;
 */

function getCurrentLoggedInUsername(req) {
  return req?.res?.locals?.user?.username || null;
}

module.exports = {
  getCurrentLoggedInUsername,
};

