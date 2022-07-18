"use strict";

class BankAccount {
  constructor(accountNumber, owner) {
    this.accountNumber = accountNumber;
    this.owner = owner;
    this.transaction = [];
  }

  balance() {
    let sum = 0;
    for (let i = 0; i < this.transaction.length; i++) {
      sum += this.transaction[i].amount;
    }
    return sum;
  }

  charge(payee, amount) {
    let currentBalance = this.balance();
    if (amount <= currentBalance) {
      let chargeTransaction = new Transaction(-amount, payee);
      this.transaction.push(chargeTransaction);
    }
  }

  deposit(amount) {
    if (amount < 0) {
      return;
    }
    let depositTransaction = new Transaction(amount, "deposit");
    this.transaction.push(depositTransaction);
  }
}

class Transaction {
  constructor(amount, payee) {
    this.amount = amount;
    this.payee = payee;
    this.date = new Date();
  }
}

const myTransaction = new Transaction(300, "Zak Kay");
console.log(myTransaction);
const assert = require("assert");

if (typeof describe === "function") {
  describe("bank account creation", () => {
    it("should create a new bank account", () => {
      let myBankAccount = new BankAccount("12345", "Zak Kay");
      assert.equal(myBankAccount.owner, "Zak Kay");
      assert.equal(myBankAccount.accountNumber, "12345");
      assert.equal(myBankAccount.transaction.length, 0);
    });
  });

  describe("transaction creation", () => {
    it("should create a new transaction for a deposit", () => {
      let myTransaction = new Transaction(18, "Deposit");
      assert.equal(myTransaction.amount, 18);
      assert.equal(myTransaction.payee, "Deposit");
      assert.notEqual(myTransaction.date, null);
    });
    it("should create a new transaction for a charge", () => {
      let myTransaction = new Transaction(-12.05, "Wingstop");
      assert.equal(myTransaction.amount, -12.05);
      assert.equal(myTransaction.payee, "Wingstop");
      assert.notEqual(myTransaction.date, null);
    });
  });

  describe("account balance", () => {
    it("should update account balance", () => {
      let myBankAccount = new BankAccount("12345", "Zak Kay");
      assert.equal(myBankAccount.balance(), 0);
      myBankAccount.deposit(35);
      assert.equal(myBankAccount.balance(), 35);
      myBankAccount.charge("Cabela's", 12);
      assert.equal(myBankAccount.balance(), 23);
    });
    it("should not allow negative deposits", () => {
      let myBankAccount = new BankAccount("12345", "Zak Kay");
      assert.equal(myBankAccount.balance(), 0);
      myBankAccount.deposit(35);
      assert.equal(myBankAccount.balance(), 35);
      myBankAccount.deposit(-100);
      assert.equal(myBankAccount.balance(), 35);
    });

    it("should not allow negative charges", () => {
      let myBankAccount = new BankAccount("12345", "Zak Kay");
      assert.equal(myBankAccount.balance(), 0);
      myBankAccount.charge("Mcdonalds", 25);
      assert.equal(myBankAccount.balance(), 0);
    });
  });
}
