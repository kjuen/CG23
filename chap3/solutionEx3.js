// Exercise 3: Bank account application with plain objects

// Definition of the account object
const account = {
  number: 1234,
  euros: 0,
  deposit(euros) {
    console.log(euros + ' Euros payed to the bank');
    this.euros += euros;
  },

  withdraw(euros) {
    console.log(euros + ' Euros withdrawn from the bank');
    this.euros -= euros;
  },
  print () {
    console.log('Account ' + this.number + ' contains ' + this.euros + ' Euros');
  }
};

// Do the account transactions
account.deposit(300);
account.withdraw(200);
account.print();
