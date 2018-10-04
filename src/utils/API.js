import axios from "axios";

export default {
    // getBooks: function () {
    //     return axios.get("/api/books");
    // },
    // getBook: function (id) {
    //     return axios.get("/api/books/" + id);
    // },
    // deleteBook: function (id) {
    //     return axios.delete("/api/books/" + id);
    // },
    createItem: function (item) {
        console.log(item)
        return axios.post("/api/bucket/", item);
    },

    updateProfile: function(id, description) {
        // console.log(id, description)
        return axios.put("/api/profile/" + id, description);
    },

    getListItems: function (profileId) {
        // console.log(profileId)
        return axios.get("/api/bucket/" + profileId);
    },

    getProfileDesc: function (profileId) {
        // console.log(profileId)
        return axios.get("/api/profile/" + profileId);
    },
    deleteItem: function (id) {
        return axios.delete("/api/bucket/" + id);
    }
};
