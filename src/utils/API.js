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

    updateProfile: function(id, property) {
        console.log(id, property)
        return axios.put("/api/profile/" + id, property);
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
    },

    // saveImage: function(id, image) {
    //     console.log(id, image)
    //     return axios.put("/api/profile/" + id, image);
    // }
};
