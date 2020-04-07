const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, officeN) {
        super(name, id, email);
        this.officeNumber = officeN;
        this.role = "Manager";
    }

    getOfficeNumber() {
        return this.officeNumber;
    }
}
module.exports = Manager;