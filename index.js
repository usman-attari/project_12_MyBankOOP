import { faker } from "@faker-js/faker";
import chalk from "chalk";
import inquirer from "inquirer";
class Customer {
    constructor(fName, lName, age, gender, mob, acc) {
        this.firstName = fName;
        this.lastName = lName;
        this.age = age;
        this.grnder = gender;
        this.mobNumber = mob;
        this.accNumber = acc;
    }
}
class Bank {
    constructor() {
        this.customer = [];
        this.account = [];
    }
    addCustomer(obj) {
        this.customer.push(obj);
    }
    ;
    addAccountNumber(obj) {
        this.account.push(obj);
    }
    transcation(accobj) {
        let NewAccounts = this.account.filter((acc) => acc.accNumber !== accobj.accNumber);
        this.account = [...NewAccounts, accobj];
    }
}
let myBank = new Bank();
for (let i = 0; i <= 3; i++) {
    let fName = faker.person.firstName("male");
    let lName = faker.person.lastName();
    let num = parseInt(faker.phone.number('3##########'));
    const cus = new Customer(fName, lName, 18 * i, "Male", num, 1000 + i);
    myBank.addCustomer(cus);
    myBank.addAccountNumber({ accNumber: cus.accNumber, Balance: 100 * i });
}
async function bankService(bank) {
    let service = await inquirer.prompt({
        type: "list",
        name: "select",
        message: "Please Select the service",
        choices: ["View Balance", "Cash Withdraw", "Cash Deposit"]
    });
    // View Balance
    if (service.select == "View Balance") {
        let res = await inquirer.prompt({
            type: "input",
            name: "num",
            message: "Please Enter Your Account Number:"
        });
        let account = myBank.account.find((acc) => acc.accNumber == res.num);
        if (!account) {
            console.log(chalk.red.bold.italic("Invalid Account Number"));
        }
        ;
        if (account) {
            let name = myBank.customer.find((item) => item.accNumber == account?.accNumber);
            console.log(`Dear ${chalk.green.italic(name?.firstName)}${chalk.green.italic(name?.lastName)} your Account Balance is ${chalk.bold.blueBright(`$${account.Balance}`)}`);
        }
    }
    // Cash Withdraw
    if (service.select == "Cash Withdraw") {
        let res = await inquirer.prompt({
            type: "input",
            name: "num",
            message: "Please Enter Your Account Number:"
        });
        let account = myBank.account.find((acc) => acc.accNumber == res.num);
        if (!account) {
            console.log(chalk.red.bold.italic("Invalid Account Number"));
        }
        ;
        if (account) {
            let ans = await inquirer.prompt({
                type: "number",
                message: "Please Enter Your Amount.",
                name: "rupee"
            });
            if (ans.rupee > account.Balance) {
                console.log(chalk.red.bold("Mojoda Balance Nkafi hai..."));
            }
            let newBalance = account.Balance - ans.rupee;
            // transcation method call
            bank.transcation({ accNumber: account.accNumber, Balance: newBalance });
            console.log(newBalance);
        }
    }
    // Cash Deposit
    if (service.select == "Cash Deposit") {
        let res = await inquirer.prompt({
            type: "input",
            name: "num",
            message: "Please Enter Your Account Number:"
        });
        let account = myBank.account.find((acc) => acc.accNumber == res.num);
        if (!account) {
            console.log(chalk.red.bold.italic("Invalid Account Number"));
        }
        ;
        if (account) {
            let ans = await inquirer.prompt({
                type: "number",
                message: "Please Enter Your Amount.",
                name: "rupee"
            });
            let newBalance = account.Balance + ans.rupee;
            // transcation method call
            bank.transcation({ accNumber: account.accNumber, Balance: newBalance });
            console.log(newBalance);
        }
    }
}
bankService(myBank);
