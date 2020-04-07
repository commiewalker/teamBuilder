const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const writeFileAsync = util.promisify(fs.writeFile);

const myTeamArr = [];

function managerInfo() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter employee name, please.",
            name: "name"
        },
        {
            type: "input",
            message: "Enter employee id, please",
            name: "id"
        },
        {
            type: "input",
            message: "Enter employee e-mail, please",
            name: "eMail"
        },
        {
            type: "input",
            message: "Enter office number, please",
            name: "officeN"
        },
    ]).then(function (res) {
        const thisGuy = new Manager(res.name, res.id, res.eMail, res.officeN);
        myTeamArr.push(thisGuy);
        console.log(`Manager added. Now we have ${myTeamArr.length} people in our team`);
        mainMenu();
    })
}// END of manager

function engineerInfo() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter employee name, please.",
            name: "name"
        },
        {
            type: "input",
            message: "Enter employee id, please",
            name: "id"
        },
        {
            type: "input",
            message: "Enter employee e-mail, please",
            name: "eMail"
        },
        {
            type: "input",
            message: "Enter github username, please",
            name: "github"
        }
    ]).then(function (res) {
        const newEngi = new Engineer(res.name, res.id, res.eMail, res.github);
        myTeamArr.push(newEngi);
        console.log(`Engineer added. Now we have ${myTeamArr.length} people in our team`);
        mainMenu();
    })

}// END of engineer

function internInfo() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter employee name, please.",
            name: "name"
        },
        {
            type: "input",
            message: "Enter employee id, please",
            name: "id"
        },
        {
            type: "input",
            message: "Enter employee e-mail, please",
            name: "eMail"
        },
        {
            type: "input",
            message: "Enter school name, please",
            name: "schoolN"
        }
    ]).then(function (res) {
        const newInt = new Intern(res.name, res.id, res.eMail, res.schoolN);
        myTeamArr.push(newInt);
        console.log(`Intern added. Now we have ${myTeamArr.length} people in our team`);
        mainMenu();
    })
}// END of intern

function askUser() {
    return inquirer.prompt(
        {
            type: "list",
            message: "How can I help you?",
            name: "ans",
            choices: [
                "Add employee",
                "Generate HTML"]
        })
}

function getEmployeeRole() {
    return inquirer.prompt({
        type: "list",
        message: "Which role of employees?",
        name: "role",
        choices: [
            "Manager",
            "Engineer",
            "Intern"
        ]
    })
}

async function mainMenu() {
    try {

        let todo = await askUser();
        if (todo.ans === "Add employee") {
            const ansRole = await getEmployeeRole();
            switch (ansRole.role) {
                case "Manager":
                    managerInfo();
                    break;
                case "Engineer":
                    engineerInfo();
                    break;
                case "Intern":
                    internInfo();
                    break;
            }
        } else if (todo.ans === "Generate HTML" && myTeamArr.length < 1) {
            console.log("Please add employees to the team before generate HTML");
            mainMenu();
        } else {
            fs.exists(OUTPUT_DIR, (exists) => {
                if (exists){
                    writeFileAsync(outputPath,render(myTeamArr));
                } else {
                    fs.mkdirSync(OUTPUT_DIR);
                    writeFileAsync(outputPath,render(myTeamArr));
                }
            })
        }
    }
    catch (err) {
        console.log("ERROR : " + err);
    }
}

mainMenu();

