const path = require("path");
const route = require("express").Router();
const {addEmail, fetchAllEmails, handlePagination, filterEmails, sortEmailProviders, deleteEmailAddresses} = require(path.join(__dirname, "..", "controllers", "subscribtion"));

// @GET
route.get("/fetch-all-emails", fetchAllEmails);
route.get("/pagination", handlePagination);
route.get("/filter", filterEmails);
route.get("/sort-email-providers", sortEmailProviders);

// @POST
route.post("/add-new-email", addEmail);

// @PUT

// @DELETE
route.delete("/delete-email-address/:id", deleteEmailAddresses);

module.exports = route;