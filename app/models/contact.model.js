module.exports = mongoose => {

    var schema = mongoose.Schema(
        {
            first_name: String,
            last_name: String,
            contact_number: String,
            email_address: String,
            message: String
        },
    );

    schema.method("toJSON", function () {

        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Contacts = mongoose.model("contacts", schema);

    return Contacts;
};