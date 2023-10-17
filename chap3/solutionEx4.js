// Exercise 4: Bank account application with constructor functions

function Account(number) {
  "use strict";
  this.number = number;
  this.euros = 0;

  this.deposit = function(euros) {
    console.log(euros + ' Euros payed to the bank');
    this.euros += euros;
  };
  this.withdraw = function(euros) {
    console.log(euros + ' Euros withdrawn from the bank');
    this.euros -= euros;
  };

  this.print = function() {
    console.log('Account ' + this.number + ' contains ' + this.euros + ' Euros');
  };

}

// Define the account
const acc = new Account(5678);
// Note: the "use strict" guarantees that code like 'acc = Account(5678)' creates an error

// Do the account transactions
acc.deposit(300);
acc.withdraw(200);
acc.print();
